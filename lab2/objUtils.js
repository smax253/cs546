const { isEqual } = require("./arrayUtils");

const isEmptyObject = (object) => {
  return Object.keys(object).length === 0;
};

const makeArrays = (objects) => {
  if (!objects || !(objects instanceof Array) || objects.length < 2)
    throw "objects must be an array of at least 2 elements";
  for (const obj of objects) {
    if (
      typeof obj !== "object" ||
      obj.constructor !== Object ||
      isEmptyObject(obj)
    )
      throw "all elements of objects must be a non-empty object";
  }
  const result = [];
  objects.forEach((obj) => {
    Object.keys(obj).forEach((key) => {
      result.push([key, obj[key]]);
    });
  });
  return result;
};

const isDeepEqual = (obj1, obj2) => {
  if (
    !obj1 ||
    !obj2 ||
    obj1.constructor !== Object ||
    obj2.constructor !== Object
  )
    throw "both arguments must be objects";
  const keys = Object.keys(obj1);
  if (keys.length != Object.keys(obj2).length) return false;
  return !keys
    .map((key) => {
      if (!obj2[key]) return false;
      if (obj1[key].constructor === Object && obj2[key].constructor === Object)
        return isDeepEqual(obj1[key], obj2[key]);
      if (obj1[key] instanceof Array && obj2[key] instanceof Array)
        return isEqual(obj1[key], obj2[key]);
      return obj1[key] === obj2[key];
    })
    .includes(false);
};

const computeObject = (object, func) => {
  if (!func && {}.toString.call(func) !== "[object Function]")
    throw "func must be a function";
  if (!object && object.constructor !== Object)
    throw "object must be an object";
  const result = {};
  Object.keys(object).forEach((key) => {
    result[key] = func(object[key]);
  });
  return result;
};

module.exports = {
  computeObject,
  isDeepEqual,
  makeArrays,
};
