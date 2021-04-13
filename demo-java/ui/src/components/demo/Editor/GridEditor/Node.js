import React, { useState } from "react";

import * as C from "../constants";

function nodeMouseMove(e, { mouseDown, setMouseDown, mouseMove, setMouseMove, id, container, onDragStart, onClick }) {
  if (!mouseDown) return;

  if (e.type === "mouseup") {
    if (!mouseMove && e.button === 0) {
      e.stopPropagation();
      e.preventDefault();
      onClick(e.shiftKey, id);
    }

    setMouseMove(false);
    setMouseDown(false);
  } else if (!mouseMove) {
    const rect = container.current.getBoundingClientRect();
    const left = e.clientX - rect.left + container.current.scrollLeft;
    const top = e.clientY - rect.top + container.current.scrollTop;
    const delta = { left, top };

    setMouseMove(true);
    onDragStart(e.shiftKey, id, delta);
  }
}

export default function Node({ id, node, engine, container, selected, options, onDragStart, onClick, onTypeChange }) {
  const x = engine.statements[node.type];
  let inPort = undefined;
  let outPort = undefined;

  const [mouseDown, setMouseDown] = useState(false);
  const [mouseMove, setMouseMove] = useState(false);

  if (x.inPorts)
    inPort = (
      <circle
        className="inPort"
        r="5"
        cy={options.direction === C.TOP_TO_BOTTOM_DIRECTION ? "-60" : "0"}
        cx={options.direction === C.LEFT_TO_RIGHT_DIRECTION ? "-35" : "0"}
      />
    );

  if (x.outPorts)
    outPort = (
      <circle
        className="outPort"
        r="5"
        cy={options.direction === C.TOP_TO_BOTTOM_DIRECTION ? "35" : "0"}
        cx={options.direction === C.LEFT_TO_RIGHT_DIRECTION ? "35" : "0"}
      />
    );

  let select = undefined;
  if (selected) select = <rect className="selectBox" rx="6" ry="6" />;

  return (
    <g
      key={id}
      style={{
        transform: `translate(${node.properties?.x}px, ${node.properties?.y}px)`,
      }}
      className={`statement ${node.type}`}
    >
      <rect
        className="box"
        onMouseDown={(e) => {
          if (e.button !== 0) return;
          e.stopPropagation();
          e.preventDefault();
          setMouseDown(true);
        }}
        onMouseMove={(e) =>
          nodeMouseMove(e, { mouseDown, setMouseDown, mouseMove, setMouseMove, id, container, onDragStart, onClick })
        }
        onMouseUp={(e) =>
          nodeMouseMove(e, { mouseDown, setMouseDown, mouseMove, setMouseMove, id, container, onDragStart, onClick })
        }
        onDoubleClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
        }}
        rx="10"
        ry="10"
      />
      <rect className="titleBack" rx="10" ry="10" onMouseUp={(e) => onTypeChange({ id, x: e.clientX, y: e.clientY })} />
      {select}
      <text className="nodeTitle">{node.type}</text>
      {inPort}
      {outPort}
    </g>
  );
}
