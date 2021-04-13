"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deepEqual = deepEqual;
exports.Queue = void 0;

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var Queue = /*#__PURE__*/function () {
  function Queue() {
    (0, _classCallCheck2["default"])(this, Queue);
    this.head = undefined;
    this.tail = undefined;
    this.length = 0;
  }

  (0, _createClass2["default"])(Queue, [{
    key: "push",
    value: function push(item) {
      this.length++;

      if (!this.head && !this.tail) {
        this.head = this.tail = {
          value: item
        };
        return;
      }

      this.tail.next = {
        value: item
      };
      this.tail = this.tail.next;
    }
  }, {
    key: "deque",
    value: function deque() {
      if (!this.length) return undefined;
      this.length--;
      var x = this.head.value;
      this.head = this.head.next;
      if (!this.head) this.tail = undefined;
      return x;
    }
  }, {
    key: "head",
    value: function head() {
      return this.head;
    }
  }, {
    key: "tail",
    value: function tail() {
      return this.tail;
    }
  }, {
    key: "list",
    value: function list() {
      var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.head;
      var a = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
      if (!x) return a;
      a.push(x.value);
      if (x.next) this.list(x.next, a);
      return a;
    }
  }, {
    key: "dispose",
    value: function dispose() {
      var node = this.head;
      var n;

      while (node) {
        delete node.value;
        n = node.next;
        delete node.next;
        node = n;
      }

      this.head = undefined;
      this.tail = undefined;
      this.length = 0;
    }
  }]);
  return Queue;
}();

exports.Queue = Queue;

function deepEqual(v1, v2) {
  var que = new Queue();
  que.push([v1, v2]);
  var flag = true;
  var o1, o2;

  while (que.length && flag) {
    var _que$deque = que.deque();

    var _que$deque2 = (0, _slicedToArray2["default"])(_que$deque, 2);

    o1 = _que$deque2[0];
    o2 = _que$deque2[1];

    if ((0, _typeof2["default"])(o1) !== (0, _typeof2["default"])(o2)) {
      flag = false;
      break;
    }

    if (Array.isArray(o1)) {
      if (!Array.isArray(o2)) {
        flag = false;
        break;
      }

      var len = o1.length;

      if (len !== o2.length) {
        flag = false;
        break;
      }

      len = len - 1;

      while (len >= 0) {
        que.push([o1[len], o2[len]]);
        len--;
      }
    } else if ((0, _typeof2["default"])(o1) === "object") {
      if ((0, _typeof2["default"])(o2) !== "object") {
        flag = false;
        break;
      }

      var keys1 = Object.keys(o1);
      var keys2 = Object.keys(o2);

      if (keys1.length !== keys2.length) {
        flag = false;
        break;
      }

      var i = keys1.length - 1;
      var keys = {};

      while (i >= 0) {
        keys[keys1[i]] = true;
        i--;
      }

      i = keys1.length - 1;

      while (i >= 0) {
        if (!keys[keys2[i]]) {
          flag = false;
          break;
        }

        que.push([o1[keys2[i]], o2[keys2[i]]]);
        i--;
      }
    } else {
      flag = o1 === o2;
    }
  }

  que.dispose();
  return flag;
}
//# sourceMappingURL=deepEqual.js.map