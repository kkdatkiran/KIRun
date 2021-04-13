export class Queue {
  constructor() {
    this.head = undefined;
    this.tail = undefined;
    this.length = 0;
  }

  push(item) {
    this.length++;
    if (!this.head && !this.tail) {
      this.head = this.tail = { value: item };
      return;
    }

    this.tail.next = { value: item };
    this.tail = this.tail.next;
  }

  deque() {
    if (!this.length) return undefined;
    this.length--;
    const x = this.head.value;
    this.head = this.head.next;
    if (!this.head) this.tail = undefined;
    return x;
  }

  head() {
    return this.head;
  }

  tail() {
    return this.tail;
  }

  list(x = this.head, a = []) {
    if (!x) return a;
    a.push(x.value);
    if (x.next) this.list(x.next, a);
    return a;
  }

  dispose() {
    let node = this.head;
    let n;
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
}

export function deepEqual(v1, v2) {
  let que = new Queue();
  que.push([v1, v2]);
  let flag = true;
  let o1, o2;

  while (que.length && flag) {
    [o1, o2] = que.deque();

    if (typeof o1 !== typeof o2) {
      flag = false;
      break;
    }

    if (Array.isArray(o1)) {
      if (!Array.isArray(o2)) {
        flag = false;
        break;
      }

      let len = o1.length;
      if (len !== o2.length) {
        flag = false;
        break;
      }

      len = len - 1;
      while (len >= 0) {
        que.push([o1[len], o2[len]]);
        len--;
      }
    } else if (typeof o1 === "object") {
      if (typeof o2 !== "object") {
        flag = false;
        break;
      }

      let keys1 = Object.keys(o1);
      let keys2 = Object.keys(o2);

      if (keys1.length !== keys2.length) {
        flag = false;
        break;
      }

      let i = keys1.length - 1;
      let keys = {};
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
