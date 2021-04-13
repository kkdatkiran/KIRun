import * as Math from "./Math";

let functions = {
  namespaces: { Math },
  regular: {},
};

const functionRepository = {
  add: function (namespace, name, func) {
    if (namespace && !functions.namespaces[namespace]) functions.namespaces[namespace] = {};
    const place = namespace ? functions.namespaces[namespace] : functions.regular;
    return (place[name] = func);
  },

  find: function (namespace, name) {
    const place = namespace ? functions.namespaces[namespace] : functions.regular;
    return place[name];
  },
};

export default functionRepository;
