"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _default = {
  ASSERT: {
    "in": 1,
    out: 1,
    dependency: {}
  },
  BREAK: {
    "in": 1,
    out: 0,
    dependency: {
      parent: ["LOOP", " WHILESTART", " WHILEEND"]
    }
  },
  CATCH: {
    "in": 1,
    out: 1,
    hasChildren: true,
    dependency: {
      predecessor: ["TRY"]
    }
  },
  CASE: {
    "in": 1,
    out: 0,
    hasChildren: true,
    dependency: {
      parent: ["SWITCH"]
    }
  },
  CONTINUE: {
    "in": 1,
    out: 0,
    dependency: {
      parent: ["LOOP", " WHILESTART", " WHILEEND"]
    }
  },
  END: {
    "in": 1,
    out: 0,
    dependency: {}
  },
  ELSE: {
    "in": 1,
    out: 0,
    hasChildren: true,
    dependency: {
      parent: ["IF", " ELSEIF"]
    }
  },
  ELSEIF: {
    "in": 1,
    out: 1,
    hasChildren: true,
    childrenAllowed: ["THEN", " ELSE", " ELSEIF"],
    dependency: {
      parent: ["IF"],
      children: ["ELSE", "ELSEIF"]
    }
  },
  EXPRESSION: {
    "in": 1,
    out: 1,
    dependency: {}
  },
  FINALLY: {
    "in": 1,
    out: 1,
    hasChildren: true,
    dependency: {
      predecessor: ["TRY", " CATCH"]
    }
  },
  FUNCTION: {
    "in": 0,
    out: 1,
    hasChildren: true,
    dependency: {}
  },
  IF: {
    "in": 1,
    out: 1,
    hasChildren: true,
    childrenAllowed: ["THEN", " ELSE", " ELSEIF"],
    dependency: {
      children: ["ELSE", "ELSEIF"]
    }
  },
  LOOP: {
    "in": 1,
    out: 1,
    hasChildren: true,
    dependency: {}
  },
  START: {
    "in": 0,
    out: 1,
    dependency: {}
  },
  SWITCH: {
    "in": 1,
    out: 1,
    hasChildren: true,
    childrenAllowed: ["CASE"],
    dependency: {}
  },
  THEN: {
    "in": 1,
    out: 0,
    hasChildren: true,
    dependency: {}
  },
  THROW: {
    "in": 1,
    out: 1,
    dependency: {}
  },
  TRY: {
    "in": 1,
    out: 1,
    hasChildren: true,
    dependency: {}
  },
  WHILESTART: {
    "in": 1,
    out: 1,
    hasChildren: true,
    dependency: {}
  },
  WHILEEND: {
    "in": 1,
    out: 1,
    hasChildren: true,
    dependency: {}
  }
};
exports["default"] = _default;