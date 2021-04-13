"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _default = {
  ASSERT: {
    inPorts: 1,
    outPorts: 1,
    dependency: {}
  },
  BREAK: {
    inPorts: 1,
    outPorts: 0,
    dependency: {
      parent: ["LOOP", "WHILESTART", "WHILEEND"]
    }
  },
  CATCH: {
    inPorts: 1,
    outPorts: 1,
    hasChildren: true,
    dependency: {
      predecessor: ["TRY"]
    }
  },
  CASE: {
    inPorts: 1,
    outPorts: 0,
    hasChildren: true,
    dependency: {
      parent: ["SWITCH"]
    }
  },
  CONTINUE: {
    inPorts: 1,
    outPorts: 0,
    dependency: {
      parent: ["LOOP", "WHILESTART", "WHILEEND"]
    }
  },
  END: {
    inPorts: 1,
    outPorts: 0,
    dependency: {}
  },
  ELSE: {
    inPorts: 1,
    outPorts: 0,
    hasChildren: true,
    dependency: {
      parent: ["IF", "ELSEIF"]
    }
  },
  ELSEIF: {
    inPorts: 1,
    outPorts: 1,
    multiChildren: true,
    hasChildren: true,
    childrenAllowed: ["THEN", "ELSE", "ELSEIF"],
    dependency: {
      parent: ["IF"],
      children: ["ELSE", "ELSEIF"]
    }
  },
  EXPRESSION: {
    inPorts: 1,
    outPorts: 1,
    dependency: {}
  },
  FINALLY: {
    inPorts: 1,
    outPorts: 1,
    hasChildren: true,
    dependency: {
      predecessor: ["TRY", "CATCH"]
    }
  },
  FUNCTION: {
    inPorts: 0,
    outPorts: 1,
    hasChildren: true,
    dependency: {}
  },
  IF: {
    inPorts: 1,
    outPorts: 1,
    hasChildren: true,
    multiChildren: true,
    childrenAllowed: ["THEN", "ELSE", "ELSEIF"],
    dependency: {
      children: ["ELSE", "ELSEIF"]
    }
  },
  LOOP: {
    inPorts: 1,
    outPorts: 1,
    hasChildren: true,
    dependency: {}
  },
  START: {
    inPorts: 0,
    outPorts: 1,
    dependency: {}
  },
  SWITCH: {
    inPorts: 1,
    outPorts: 1,
    hasChildren: true,
    multiChildren: true,
    childrenAllowed: ["CASE"],
    dependency: {}
  },
  THEN: {
    inPorts: 1,
    outPorts: 0,
    hasChildren: true,
    dependency: {}
  },
  THROW: {
    inPorts: 1,
    outPorts: 1,
    dependency: {}
  },
  TRY: {
    inPorts: 1,
    outPorts: 1,
    hasChildren: true,
    dependency: {}
  },
  WHILESTART: {
    inPorts: 1,
    outPorts: 1,
    hasChildren: true,
    dependency: {}
  },
  WHILEEND: {
    inPorts: 1,
    outPorts: 1,
    hasChildren: true,
    dependency: {}
  },
  UNKNOWN: {
    inPorts: 0,
    outPorts: 0
  }
};
exports["default"] = _default;
//# sourceMappingURL=statements.js.map