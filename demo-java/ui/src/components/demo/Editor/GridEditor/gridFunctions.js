import { Util } from "kirun-engine-js";

export function onStatementTypeChange({ code, chType, toType, engine, onChange }) {
  if (code.definition.steps[chType.id].type === toType) return;
  let x = JSON.parse(JSON.stringify(code));
  x.definition.steps[chType.id].type = toType;
  const tt = engine.statements[toType];

  if (tt.outPort === 0 && x.definition.flow?.[chType.id]) delete x.definition.flow[chType.id];

  if (tt.inPort === 0 && x.definition.flow) {
    Object.values(x.definition.flow).forEach((e) => {
      if (e.next === chType.id) delete e.next;
      if (e.children) delete e.children[chType.id];
    });
  }

  onChange(x);
}

export function onDragNodeStart({ append, id, start, sNodes, setSNodes, setDragNode }) {
  if (!sNodes?.[id]) {
    if (!append) setSNodes({ [id]: true });
    else {
      const x = sNodes ? { ...sNodes } : {};
      x[id] = true;
      setSNodes(x);
    }
  }
  setDragNode({ start });
}

export function onDragNodeEnd({ code, onChange, sNodes, dragNode }) {
  if (!sNodes) return;
  if (!code?.definition?.steps) return;

  const newCode = JSON.parse(JSON.stringify(code));
  const nodes = newCode.definition.steps;

  const { delta: { left, top } = {} } = dragNode;

  if (!left || !top) return;

  Object.keys(sNodes)
    .map((e) => nodes[e])
    .forEach((e) => (e.properties = { ...e.properties, x: e.properties.x + left, y: e.properties.y + top }));

  onChange(newCode);
}

export function onAddStatement(e, { code, container, onChange }) {
  const newCode = JSON.parse(JSON.stringify(code ?? {}));
  if (!newCode.definition) newCode.definition = { steps: {}, flow: {} };
  if (!newCode.definition.steps) newCode.definition.steps = {};

  const rect = container.current.getBoundingClientRect();

  newCode.definition.steps[Util.uuid()] = {
    type: "UNKNOWN",
    properties: {
      x: e.clientX - rect.left + container.current.scrollLeft,
      y: e.clientY - rect.top + container.current.scrollTop,
    },
  };
  onChange(newCode);
}

export function onKeyUp(e, { code, sNodes, setSNodes, onChange }) {
  console.log(e.code);
  if (e.code === "Delete" || e.code === "Backspace") {
    if (!sNodes) return;
    let x = JSON.parse(JSON.stringify(code));
    Object.keys(sNodes).forEach((e) => {
      delete x.definition.steps[e];
      delete x.definition.flow[e];
      Object.values(x.definition.flow).forEach((f) => {
        if (f.next === e) delete f.next;
        if (f.children && f.children[e]) delete f.children[e];
      });
    });

    setSNodes({});
    onChange(x);
  }
}
