import React, { useState, useRef } from "react";
import Node from "./Node";

import { onStatementTypeChange, onDragNodeStart, onDragNodeEnd, onAddStatement, onKeyUp } from "./gridFunctions";

function mouseDown(e, { setScrMove, scrMove, container, setSelector }) {
  if (e.buttons !== 1) return;
  e.preventDefault();

  if (e.altKey) {
    setScrMove({
      ...scrMove,
      dragStart: true,
      startLeft: e.screenX,
      startTop: e.screenY,
      oldLeft: container.current.scrollLeft,
      oldTop: container.current.scrollTop,
    });
  } else {
    const rect = container.current.getBoundingClientRect();
    const left = e.clientX - rect.left + container.current.scrollLeft;
    const top = e.clientY - rect.top + container.current.scrollTop;

    setSelector({
      selectionStart: true,
      left,
      top,
    });
  }
}

function mouseMove(e, { selectionStart, container, options, setSelector, selector, scrMove, dragNode, setDragNode, sNodes }) {
  const rect = container.current.getBoundingClientRect();
  const { gridSize } = options;
  const { dragStart, startLeft, startTop, oldLeft, oldTop } = scrMove;

  if (selectionStart || dragNode) {
    if (e.clientY - rect.top < gridSize * 1.5) container.current.scrollTop -= gridSize / 2;
    else if (e.clientY - rect.top + gridSize * 1.5 > rect.height) container.current.scrollTop += gridSize / 2;
    if (e.clientX - rect.left < gridSize * 1.5) container.current.scrollLeft -= gridSize / 2;
    else if (e.clientX - rect.left + gridSize * 1.5 > rect.width) container.current.scrollLeft += gridSize / 2;
  }

  if (selectionStart) {
    e.preventDefault();
    const { left, top } = selector;
    setSelector({
      ...selector,
      width: e.clientX - rect.left - left + container.current.scrollLeft,
      height: e.clientY - rect.top - top + container.current.scrollTop,
    });
  } else if (dragStart) {
    e.preventDefault();
    if (e.screenX === 0 && e.screenY === 0) return;
    const x = e.screenX - startLeft;
    const y = e.screenY - startTop;
    if (dragStart) {
      container.current.scrollLeft = gridSize * Math.round((oldLeft - x) / gridSize);
      container.current.scrollTop = gridSize * Math.round((oldTop - y) / gridSize);
    }
  } else if (dragNode) {
    e.preventDefault();
    if (!sNodes) return;
    const left = e.clientX - rect.left - dragNode.start.left + container.current.scrollLeft;
    const top = e.clientY - rect.top - dragNode.start.top + container.current.scrollTop;
    setDragNode({ ...dragNode, delta: { left, top } });
  }
}

function mouseUp({ selector, code, sNodes, setSNodes, dragNode, setDragNode, scrMove, setScrMove, setSelector, onChange }) {
  if (!dragNode && !scrMove.dragStart && !selector?.width) {
    setSNodes({});
  }
  if (!dragNode && selector.selectionStart) {
    let { left, top, width, height } = selector;
    if (width && height) {
      width = left + width;
      height = top + height;
      if (left > width) {
        const t = left;
        left = width;
        width = t;
      }
      if (top > height) {
        const t = top;
        top = height;
        height = t;
      }

      const nodes = Object.entries(code?.definition?.steps || {})
        .filter(([, v]) => {
          const { properties: { x, y } = {} } = v;
          return left <= x && x <= width && top <= y && y <= height;
        })
        .reduce((a, [k]) => {
          a[k] = true;
          return a;
        }, {});
      setSNodes(nodes);
    }
  }
  setScrMove({ ...scrMove, dragStart: false });
  setSelector({ ...selector, selectionStart: false });
  if (dragNode) {
    setDragNode(undefined);
    onDragNodeEnd({ code, onChange, sNodes, dragNode });
  }
}

function generateNodes({ code, engine, container, options, onChange, sNodes, setSNodes, dragNode, setDragNode, setChType }) {
  if (!code?.definition?.steps) return;
  const { delta: { left: dx, top: dy } = {} } = dragNode ?? {};
  return Object.entries(code.definition.steps).map(([k, s]) => (
    <Node
      key={k}
      id={k}
      node={dragNode && sNodes[k] ? { ...s, properties: { ...s.properties, x: s.properties.x + dx, y: s.properties.y + dy } } : s}
      engine={engine}
      container={container}
      options={options}
      selected={sNodes?.[k]}
      onChange={(id, node) => {
        let x = JSON.parse(JSON.stringify(code));
        x.definition.steps[id] = node;
        onChange(x);
      }}
      onDragStart={(append, id, start) => onDragNodeStart({ append, id, start, sNodes, setSNodes, setDragNode })}
      onClick={(append, id) => {
        if (!append) {
          setSNodes({ [id]: true });
        } else {
          const x = sNodes ? { ...sNodes } : {};
          if (x[id]) delete x[id];
          else x[id] = true;
          setSNodes(x);
        }
      }}
      onTypeChange={(data) => setChType(data)}
    />
  ));
}

function generateContextMenu({ code, contextMenu, setContextMenu, sNodes, setSNodes, onChange, container }) {
  if (!contextMenu) return undefined;

  let deleteItem = undefined;
  const selectedCount = Object.keys(sNodes ?? {}).length;

  if (selectedCount !== 0)
    deleteItem = (
      <div
        className="ctxMenuItem"
        tabIndex="0"
        role="button"
        onKeyPress={() => {}}
        onClick={() => onKeyUp({ code: "Delete" }, { code, sNodes, setSNodes, onChange })}
      >
        Delete Selected Statements
      </div>
    );

  return (
    <div className="ctxMenuBack" tabIndex="0" role="button" onKeyPress={() => {}} onClick={() => setContextMenu(undefined)}>
      <div className="ctxMenu" style={{ left: `${contextMenu.x}px`, top: `${contextMenu.y}px` }}>
        <div
          className="ctxMenuItem"
          tabIndex="0"
          role="button"
          onKeyPress={() => {}}
          onClick={() => onAddStatement({ clientX: contextMenu.x, clientY: contextMenu.y }, { code, container, onChange })}
        >
          Add Statement
        </div>
        {deleteItem}
      </div>
    </div>
  );
}

function generateTypeMenu({ chType, setChType, code, onChange, engine, container }) {
  if (!chType) return undefined;

  const rect = container.current.getBoundingClientRect();
  let x = chType.x;
  let y = chType.y;

  if (chType.x > rect.left + rect.width - 275) x -= 275;
  if (chType.y > rect.top + rect.height - 160) y -= 160;

  return (
    <div className="ctxMenuBack" tabIndex="0" role="button" onKeyPress={() => {}} onClick={() => setChType(undefined)}>
      <div className="ctxMenu groups statements" style={{ left: `${x}px`, top: `${y}px` }}>
        {Object.keys(engine.statements)
          .sort()
          .reduce((a, c, i) => {
            const ind = i % 3;
            if (!a[ind]) a[ind] = [];
            a[ind].push(c);
            return a;
          }, [])
          .map((arr) => (
            <div className="ctxMenuGroup" key={arr.join("")}>
              {arr.map((e) => (
                <div
                  key={e}
                  className={`ctxMenuItem ${code.definition.steps[chType.id] === e ? "selected" : ""}`}
                  tabIndex="0"
                  role="button"
                  onKeyPress={() => {}}
                  onClick={() => onStatementTypeChange({ code, chType, toType: e, engine, onChange })}
                >
                  {e}
                </div>
              ))}
            </div>
          ))}
      </div>
    </div>
  );
}

export default function Grid({ container, code, onChange, engine, options }) {
  const [scrMove, setScrMove] = useState({ dragStart: false });
  const [selector, setSelector] = useState({ selectionStart: false, width: 0, height: 0 });
  const [sNodes, setSNodes] = useState();
  const [dragNode, setDragNode] = useState();
  const [contextMenu, setContextMenu] = useState();
  const [chType, setChType] = useState();

  const svgRef = useRef();

  const { dragStart } = scrMove;
  const { selectionStart, left, top, width = 0, height = 0 } = selector;

  let dragger = undefined;
  if (selectionStart)
    dragger = (
      <rect
        className="selector"
        x={left + (width < 0 ? width : 0)}
        y={top + (height < 0 ? height : 0)}
        width={Math.abs(width)}
        height={Math.abs(height)}
      />
    );

  let ctxMenu = generateContextMenu({ code, contextMenu, setContextMenu, sNodes, setSNodes, onChange, container });
  let typeMenu = generateTypeMenu({ chType, setChType, code, onChange, engine, container });

  return (
    <>
      <svg
        role="button"
        tabIndex="0"
        className={`bodyDesigner ${dragStart ? "moving" : ""}`}
        style={{ backgroundSize: `${options.gridSize}px ${options.gridSize}px` }}
        ref={svgRef}
        onMouseDown={(e) => mouseDown(e, { setScrMove, scrMove, container, setSelector, code })}
        onMouseUp={() =>
          mouseUp({ selector, code, sNodes, setSNodes, dragNode, setDragNode, scrMove, setScrMove, setSelector, onChange })
        }
        onMouseMove={(e) =>
          mouseMove(e, { selectionStart, container, options, setSelector, selector, scrMove, dragNode, setDragNode, sNodes })
        }
        onDoubleClick={(e) => onAddStatement(e, { code, container, onChange })}
        onKeyPress={(e) => onKeyUp(e, { code, sNodes, setSNodes, onChange })}
        // onClick={(e) => {
        //   if (e.buttons !== 1 || !svgRef.current) return;
        //   svgRef.current.focus();
        // }}
        onContextMenu={(e) => {
          e.stopPropagation();
          e.preventDefault();
          setContextMenu({ x: e.clientX, y: e.clientY });
        }}
      >
        {generateNodes({ code, engine, container, options, onChange, sNodes, setSNodes, dragNode, setDragNode, setChType })}
        {dragger}
      </svg>
      {ctxMenu}
      {typeMenu}
    </>
  );
}
