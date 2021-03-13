import React from "react";

export default function Node({ id, node }) {
  return (
    <g
      style={{
        transform: `translate(${node.properties?.x}px, ${node.properties?.y}px)`,
      }}
      className={`statement ${node.type}`}
    >
      <rect className="box" />
      <rect className="titleBack" />
      <text className="nodeTitle">{node.type}</text>
    </g>
  );
}
