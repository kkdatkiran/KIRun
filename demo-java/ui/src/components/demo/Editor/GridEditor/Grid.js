import React, { useState } from "react";
import Node from "./Node";

function mouseDown({ event, setDragInfo, dragInfo, container, setSelector }) {
  if (event.button !== 0) return;
  event.preventDefault();
  if (event.altKey) {
    setDragInfo({
      ...dragInfo,
      dragStart: true,
      startLeft: event.screenX,
      startTop: event.screenY,
      oldLeft: container.current.scrollLeft,
      oldTop: container.current.scrollTop,
    });
  } else {
    const rect = container.current.getBoundingClientRect();
    setSelector({
      selectionStart: true,
      left: event.clientX - rect.left + container.current.scrollLeft,
      top: event.clientY - rect.top + container.current.scrollTop,
    });
  }
}

function mouseMove({
  event,
  selectionStart,
  container,
  gridSize,
  setSelector,
  selector,
  dragInfo: { dragStart, startLeft, startTop, oldLeft, oldTop },
}) {
  event.preventDefault();
  if (selectionStart) {
    const rect = container.current.getBoundingClientRect();
    const { left, top } = selector;
    if (event.clientY - rect.top < gridSize * 1.5)
      container.current.scrollTop -= gridSize / 2;
    else if (event.clientY - rect.top + gridSize * 1.5 > rect.height)
      container.current.scrollTop += gridSize / 2;
    if (event.clientX - rect.left < gridSize * 1.5)
      container.current.scrollLeft -= gridSize / 2;
    else if (event.clientX - rect.left + gridSize * 1.5 > rect.width)
      container.current.scrollLeft += gridSize / 2;

    setSelector({
      ...selector,
      width: event.clientX - rect.left - left + container.current.scrollLeft,
      height: event.clientY - rect.top - top + container.current.scrollTop,
    });
  } else if (dragStart) {
    if (event.screenX === 0 && event.screenY === 0) return;
    const x = event.screenX - startLeft;
    const y = event.screenY - startTop;
    container.current.scrollLeft =
      gridSize * Math.round((oldLeft - x) / gridSize);
    container.current.scrollTop =
      gridSize * Math.round((oldTop - y) / gridSize);
  }
}

function generateNodes({ code }) {
  if (!code?.definition?.steps) return;
  return Object.entries(code.definition.steps).map(([k, s]) => (
    <Node key={k} id={k} node={s} />
  ));
}

function addStatement() {}

export default function Grid({
  container,
  code,
  onChange,
  version,
  options: { gridSize },
}) {
  //Hooks
  const [dragInfo, setDragInfo] = useState({ dragStart: false });
  const [selector, setSelector] = useState({
    selectionStart: false,
    width: 0,
    height: 0,
  });
  const [dragNode, setDragNode] = useState();
  const [selectedNode, setSelectedNode] = useState();

  const { dragStart } = dragInfo;
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
  return (
    <svg
      role="presentation"
      className={`bodyDesigner ${dragStart ? "moving" : ""}`}
      style={{ backgroundSize: `${gridSize}px ${gridSize}px` }}
      onMouseDown={(event) =>
        mouseDown({ event, setDragInfo, dragInfo, container, setSelector })
      }
      onMouseUp={() => {
        setDragInfo({ ...dragInfo, dragStart: false });
        setSelector({ ...selector, selectionStart: false });
      }}
      onMouseMove={(event) =>
        mouseMove({
          event,
          selectionStart,
          container,
          gridSize,
          setSelector,
          selector,
          dragInfo,
        })
      }
      onClick={(event) => addStatement({ event, code, onChange })}
    >
      {generateNodes({ code })}
      {dragger}
    </svg>
  );
}
