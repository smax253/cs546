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

    const sorted = array.sort((a, b) => a - b);
    const middle = (sorted.length - 1) / 2;
    if (sorted.length % 2 === 0)
        return Math.pow(
            (sorted[Math.floor(middle)] + sorted[Math.ceil(middle)]) / 2,
            2,
        );
    else return Math.pow(sorted[middle], 2);
};

const maxElement = (array) => {
    if (!array) throw 'array is undefined';
    else if (!(array instanceof Array)) throw 'array is not an array';
    else if (array.length === 0) throw 'array is empty';
    else if (array.map((number) => typeof number === 'number').includes(false))
        throw 'array does not contain all numbers';

    let max = array[0];
    let maxind = 0;
    array.forEach((val, ind) => {
        if (val > max) {
            max = val;
            maxind = ind;
        }
    });
    const result = {};
    result[max] = maxind;
    return result;
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
        if (itemOne instanceof Array && itemTwo instanceof Array) {
            if (!isEqual(itemOne, itemTwo)) return false;
        } else if (itemOne !== itemTwo) {
            return false;
        }
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
