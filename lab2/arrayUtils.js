const mean = (array) => {
    if (!array) throw 'array is undefined';
    else if (!(array instanceof Array)) throw 'array is not an array';
    else if (array.length === 0) throw 'array is empty';
    else if (array.map((number) => typeof number === 'number').includes(false))
        throw 'array does not contain all numbers';

    return array.reduce((prev, next) => prev + next, 0) / array.length;
};

const medianSquared = (array) => {
    if (!array) throw 'array is undefined';
    else if (!(array instanceof Array)) throw 'array is not an array';
    else if (array.length === 0) throw 'array is empty';
    else if (array.map((number) => typeof number === 'number').includes(false))
        throw 'array does not contain all numbers';

    const arrSquared = array.map((number) => number * number);
    const sorted = arrSquared.sort((a, b) => a - b);
    const middle = (sorted.length - 1) / 2;
    if (sorted.length % 2 === 0)
        return (sorted[Math.floor(middle)] + sorted[Math.ceil(middle)]) / 2;
    else return sorted[middle];
};

const maxElement = (array) => {
    if (!array) throw 'array is undefined';
    else if (!(array instanceof Array)) throw 'array is not an array';
    else if (array.length === 0) throw 'array is empty';
    else if (array.map((number) => typeof number === 'number').includes(false))
        throw 'array does not contain all numbers';

    const max = array[0];
    const maxind = 0;
    array.forEach((val, ind) => {
        if (val > max) {
            max = val;
            maxind = ind;
        }
    });
    return { max: maxind };
};

const fill = (end, value) => {
    if (typeof end !== 'number' || end <= 0 || Math.floor(end) !== end)
        throw 'end must be a positive integer';
    const result = [];
    for (let i = 0; i < end; i++) {
        if (value === undefined) result.push(i);
        else result.push(value);
    }
    return result;
};

const countRepeating = (array) => {
    if (!array || !(array instanceof Array)) throw 'array is not an Array';
    const result = {};
    array.forEach((value) => {
        if (result[value]) result[value] += 1;
        else result[value] = 1;
    });
    Object.keys(result).forEach((key) => {
        if (result[key] === 1) delete result[key];
    });
    return result;
};

const isEqual = (arrayOne, arrayTwo) => {
    if (!arrayOne || !(arrayOne instanceof Array))
        throw 'arrayOne is not an Array';
    if (!arrayTwo || !(arrayTwo instanceof Array))
        throw 'arrayTwo is not an Array';
    if (arrayOne.length !== arrayTwo.length) return false;

    const sortedArrayOne = arrayOne.sort(),
        sortedArrayTwo = arrayTwo.sort();
    for (let i = 0; i < sortedArrayOne.length; i++) {
        const itemOne = sortedArrayOne[i];
        const itemTwo = sortedArrayTwo[i];
        if (
            itemOne instanceof Array &&
            itemTwo instanceof Array &&
            !isEqual(itemOne, itemTwo)
        )
            return false;
        if (itemOne !== itemTwo) return false;
    }
    return true;
};

module.exports = {
    countRepeating,
    fill,
    isEqual,
    maxElement,
    mean,
    medianSquared,
};

console.log(
    medianSquared([1, 6, 2, 10]), // Returns: 4
    //medianSquared([]), // throws an error
    //medianSquared('banana'), // throws an error
    //medianSquared(1, 2, 3), // throws an error
    //medianSquared(['guitar', 1, 3, 'apple']), // throws an error
    //medianSquared(),
); // throws an error])
