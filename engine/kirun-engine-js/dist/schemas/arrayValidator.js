"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = arrayValidator;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _deepEqual = require("../util/deepEqual");

var _constants = require("./constants");

function arrayValidator(parents, schema, schemaRepository, functionRepository, element, validate) {
  if (!Array.isArray(element)) throw "".concat((0, _constants.path)(parents, schema.title)).concat(JSON.stringify(element), " is not an Array");
  checkMinMaxItems(parents, schema, element);
  checkItems(parents, schema, schemaRepository, functionRepository, element, validate);
  checkUniqueItems(parents, schema, element);
  checkContains(parents, schema, schemaRepository, functionRepository, element, validate);
}

function checkContains(parents, schema, schemaRepository, functionRepository, array, validate) {
  if (!schema.contains) return;
  var flag = false;

  for (var i = 0; i < array.length; i++) {
    var newParents = (0, _toConsumableArray2["default"])(parents !== null && parents !== void 0 ? parents : []);
    newParents.push("" + i);

    try {
      validate(newParents, schema.contains, schemaRepository, functionRepository, array[i]);
      flag = true;
      break;
    } catch (err) {
      flag = false;
    }
  }

  if (!flag) throw "".concat((0, _constants.path)(parents, schema.title), "None of the items are of type contains schema");
}

function checkUniqueItems(parents, schema, array) {
  if (!schema.uniqueItems) return;

  for (var i = 0; i < array.length; i++) {
    for (var j = i + 1; j < array.length; j++) {
      if ((0, _deepEqual.deepEqual)(array[i], array[j])) throw "".concat((0, _constants.path)(parents, schema.title), "Items on the array are not unique");
    }
  }
}

function checkMinMaxItems(parents, schema, array) {
  if (schema.minItems && schema.minItems > array.length) throw "".concat((0, _constants.path)(parents, schema.title), "Array should have minimum of ").concat(schema.minItems, " elements");
  if (schema.maxItems && schema.maxItems < array.length) throw "".concat((0, _constants.path)(parents, schema.title), "Array can have maximum of ").concat(schema.maxItems, " elements");
}

function checkItems(parents, schema, schemaRepository, functionRepository, array, validate) {
  if (!schema.items) return;

  if (schema.items.singleSchema) {
    for (var i = 0; i < array.length; i++) {
      var newParents = [].concat((0, _toConsumableArray2["default"])(parents !== null && parents !== void 0 ? parents : []), ["" + i]);
      array[i] = validate(newParents, schema.items.singleSchema, schemaRepository, functionRepository, array[i]);
    }
  }

  if (schema.items.tupleSchema) {
    if (schema.items.tupleSchema.length !== array.length) throw "".concat((0, _constants.path)(parents, schema.title), "Expected an array with only ").concat(schema.items.tupleSchema.length, " but found ").concat(array.length);

    for (var _i = 0; _i < array.length; _i++) {
      var _newParents = [].concat((0, _toConsumableArray2["default"])(parents !== null && parents !== void 0 ? parents : []), ["" + _i]);

      array[_i] = validate(_newParents, schema.items.tupleSchema[_i], schemaRepository, functionRepository, array);
    }
  }
}
//# sourceMappingURL=arrayValidator.js.map