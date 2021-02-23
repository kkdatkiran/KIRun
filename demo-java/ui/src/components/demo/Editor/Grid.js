import React, { useState } from "react";
import { useEditorContextState } from "../../../contexts/EditorContext";

export default function Grid({ canvasContainer }) {
  const [dragInfo, setDragInfo] = useState({ dragStart: false });
  const [selector, setSelector] = useState({
    selectionStart: false,
    width: 0,
    height: 0,
  });

  const { dragStart, startLeft, startTop, oldLeft, oldTop } = dragInfo;
  const { selectionStart, left, top, width = 0, height = 0 } = selector;

  const { gridSize } = useEditorContextState();

  let dragger = undefined;
  if (selectionStart)
    dragger = (
      <div
        className="selector"
        style={{
          left: left + (width < 0 ? width : 0),
          top: top + (height < 0 ? height : 0),
          width: Math.abs(width),
          height: Math.abs(height),
        }}
      ></div>
    );
  return (
    <div
      role="presentation"
      className={`bodyDesigner ${dragStart ? "moving" : ""}`}
      style={{ backgroundSize: `${gridSize}px ${gridSize}px` }}
      onMouseDown={(e) => {
        e.preventDefault();
        if (e.altKey) {
          setDragInfo({
            ...dragInfo,
            dragStart: true,
            startLeft: e.screenX,
            startTop: e.screenY,
            oldLeft: canvasContainer.current.scrollLeft,
            oldTop: canvasContainer.current.scrollTop,
          });
        } else {
          const rect = canvasContainer.current.getBoundingClientRect();
          setSelector({
            selectionStart: true,
            left: e.clientX - rect.left + canvasContainer.current.scrollLeft,
            top: e.clientY - rect.top + canvasContainer.current.scrollTop,
          });
        }
      }}
      onMouseUp={() => {
        setDragInfo({ ...dragInfo, dragStart: false });
        setSelector({ ...selector, selectionStart: false });
      }}
      onMouseMove={(e) => {
        e.preventDefault();
        if (selectionStart) {
          const rect = canvasContainer.current.getBoundingClientRect();
          if (e.clientY - rect.top < gridSize * 1.5)
            canvasContainer.current.scrollTop -= gridSize / 2;
          else if (e.clientY - rect.top + gridSize * 1.5 > rect.height)
            canvasContainer.current.scrollTop += gridSize / 2;
          if (e.clientX - rect.left < gridSize * 1.5)
            canvasContainer.current.scrollLeft -= gridSize / 2;
          else if (e.clientX - rect.left + gridSize * 1.5 > rect.width)
            canvasContainer.current.scrollLeft += gridSize / 2;
          setSelector({
            ...selector,
            width:
              e.clientX - rect.left - left + canvasContainer.current.scrollLeft,
            height:
              e.clientY - rect.top - top + canvasContainer.current.scrollTop,
          });
        } else if (dragStart) {
          if (e.screenX === 0 && e.screenY === 0) return;
          const x = e.screenX - startLeft;
          const y = e.screenY - startTop;
          canvasContainer.current.scrollLeft =
            gridSize * Math.round((oldLeft - x) / gridSize);
          canvasContainer.current.scrollTop =
            gridSize * Math.round((oldTop - y) / gridSize);
        }
      }}
    >
      {dragger}
    </div>
  );
}
