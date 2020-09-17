const arrayUtils = require('./arrayUtils');
const objUtils = require('./objUtils');
const stringUtils = require('./stringUtils');

// Mean tests
try {
    const meanOne = arrayUtils.mean([3, 5, 7, 9, 10]);
    console.log('mean passed successfully');
} catch (e) {
    console.error('mean failed test case');
}
try {
    const meanTwo = arrayUtils.mean(123214);
    console.error('mean did not fail');
} catch (e) {
    console.log('mean failed successfully');
}

//median squared tests
try {
    const medianSquaredOne = arrayUtils.medianSquared([3, 5, 7, 9, 10]);
    console.log('medianSquared passed successfully');
} catch (e) {
    console.error('medianSquared failed test case');
}
try {
    const medianSquaredTwo = arrayUtils.medianSquared(123214);
    console.error('medianSquared did not fail');
} catch (e) {
    console.log('medianSquared failed successfully');
}

//max element tests
try {
    const maxOne = arrayUtils.maxElement([3, 5, 7, 9, 10]);
    console.log('maxElement passed successfully');
} catch (e) {
    console.error('maxElement failed test case');
}
try {
    const maxElementTwo = arrayUtils.maxElement(123214);
    console.error('maxElement did not fail');
} catch (e) {
    console.log('maxElement failed successfully');
}

// fill tests
try {
    const fillOne = arrayUtils.fill(10);
    console.log('fill passed successfully');
} catch (e) {
    console.error('fill failed test case');
}
try {
    const fillTwo = arrayUtils.fill(-1239);
    console.error('fill did not fail');
} catch (e) {
    console.log('fill failed successfully');
}

//countRepeating Tests
try {
    const countOne = arrayUtils.countRepeating([
        4,
        '4',
        7,
        10,
        25,
        'hello',
        'hello',
        '4',
    ]);
    console.log('countRepeating passed successfully');
} catch (e) {
    console.error('countRepeating failed test case');
}
try {
    const countTwo = arrayUtils.countRepeating(-1239);
    console.error('countRepeating did not fail');
} catch (e) {
    console.log('countRepeating failed successfully');
}

//isEqual tests

try {
    const equalOne = arrayUtils.isEqual([5, 6, [7, 2]], [5, 6, [2, 7]]);
    console.log('isEqual passed successfully');
} catch (e) {
    console.error('isEqual failed test case');
}
try {
    const isEqualTwo = arrayUtils.isEqual(-1239);
    console.error('isEqual did not fail');
} catch (e) {
    console.log('isEqual failed successfully');
}
