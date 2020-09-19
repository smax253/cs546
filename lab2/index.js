const arrayUtils = require("./arrayUtils");
const objUtils = require("./objUtils");
const stringUtils = require("./stringUtils");
const { mashUp } = require("./stringUtils");

// Mean tests
try {
  const meanOne = arrayUtils.mean([3, 5, 7, 9, 10]);
  console.log("mean passed successfully", meanOne);
} catch (e) {
  console.error("mean failed test case");
}
try {
  const meanTwo = arrayUtils.mean(123214);
  console.error("mean did not fail");
} catch (e) {
  console.log("mean failed successfully", e);
}

//median squared tests
try {
  const medianSquaredOne = arrayUtils.medianSquared([3, 5, 7, 9, 10, 12]);
  console.log("medianSquared passed successfully", medianSquaredOne);
} catch (e) {
  console.error("medianSquared failed test case");
}
try {
  const medianSquaredTwo = arrayUtils.medianSquared(123214);
  console.error("medianSquared did not fail");
} catch (e) {
  console.log("medianSquared failed successfully", e);
}

//max element tests
try {
  const maxOne = arrayUtils.maxElement([3, 5, 7, 9, 10]);
  console.log("maxElement passed successfully", maxOne);
} catch (e) {
  console.error("maxElement failed test case");
}
try {
  const maxElementTwo = arrayUtils.maxElement(123214);
  console.error("maxElement did not fail");
} catch (e) {
  console.log("maxElement failed successfully", e);
}

// fill tests
try {
  const fillOne = arrayUtils.fill(10);
  console.log("fill passed successfully", fillOne);
} catch (e) {
  console.error("fill failed test case");
}
try {
  const fillTwo = arrayUtils.fill(-1239);
  console.error("fill did not fail");
} catch (e) {
  console.log("fill failed successfully", e);
}

//countRepeating Tests
try {
  const countOne = arrayUtils.countRepeating([
    4,
    "4",
    7,
    10,
    25,
    "hello",
    "hello",
    "4",
  ]);
  console.log("countRepeating passed successfully: ", countOne);
} catch (e) {
  console.error("countRepeating failed test case: ", e);
}
try {
  const countTwo = arrayUtils.countRepeating(-1239);
  console.error("countRepeating did not fail: ", countTwo);
} catch (e) {
  console.log("countRepeating failed successfully", e);
}

//isEqual tests

try {
  const equalOne = arrayUtils.isEqual([5, 6, [7, 2]], [5, 6, [2, 7]]);
  console.log("isEqual passed successfully", equalOne);
} catch (e) {
  console.error("isEqual failed test case");
}
try {
  const isEqualTwo = arrayUtils.isEqual(-1239);
  console.error("isEqual did not fail");
} catch (e) {
  console.log("isEqual failed successfully", e);
}

//makeArrays tests
try {
  const makeArraysOne = objUtils.makeArrays([
    {
      a: "5",
      b: "7",
      c: "hello",
    },
    {
      b: 23,
      c: "bye",
    },
  ]);
  console.log("makeArrays passed successfully", makeArraysOne);
} catch (e) {
  console.error("makeArrays failed test case");
}
try {
  const makeArraysTwo = objUtils.makeArrays({ obj: "obj" });
  console.error("makeArrays did not fail");
} catch (e) {
  console.log("makeArrays failed successfully", e);
}

//isDeepEqual tests
try {
  const equalOne = objUtils.isDeepEqual({ a: "hehe" }, { b: "no" });
  console.log("isDeepEqual passed successfully", equalOne);
} catch (e) {
  console.error("isDeepEqual failed test case");
}
try {
  const isEqualTwo = objUtils.isDeepEqual({ obj: "obj" });
  console.error("isDeepEqual did not fail");
} catch (e) {
  console.log("isDeepEqual failed successfully", e);
}

// computeObject tests
try {
  const computedObjectOne = objUtils.computeObject(
    { a: "hello", b: "goodbye", c: "how are you" },
    (word) => {
      return word.concat(", Max!");
    }
  );
  console.log("computeObject passed successfully", computedObjectOne);
} catch (e) {
  console.error("computeObject failed test case");
}
try {
  const computedObjectTwo = objUtils.computeObject({ obj: "obj" });
  console.error("computeObject did not fail");
} catch (e) {
  console.log("computeObject failed successfully", e);
}

//camelCase tests
try {
  const camelOne = stringUtils.camelCase("hello camel case this");
  console.log("camelCase passed successfully", camelOne);
} catch (e) {
  console.error("camelCase failed test case");
}
try {
  const camelTwo = stringUtils.camelCase({ obj: "obj" });
  console.error("camelCase did not fail");
} catch (e) {
  console.log("camelCase failed successfully", e);
}

//replaceChar tests
try {
  const replacedOne = stringUtils.replaceChar("hello hi heh this");
  console.log("replaceChar passed successfully", replacedOne);
} catch (e) {
  console.error("replaceChar failed test case");
}
try {
  const replacedTwo = stringUtils.replaceChar({ obj: "obj" });
  console.error("replaceChar did not fail");
} catch (e) {
  console.log("replaceChar failed successfully", e);
}

//mashUp tests
try {
  const mashUpOne = stringUtils.mashUp("hello", "goodbye");
  console.log("mashUp passed successfully", mashUpOne);
} catch (e) {
  console.error("mashUp failed test case");
}
try {
  const mashUpTwo = stringUtils.mashUp({ obj: "obj" });
  console.error("mashUp did not fail");
} catch (e) {
  console.log("mashUp failed successfully", e);
}
