const { ObjectId } = require('mongodb');
const { books } = require('../config/mongoCollections');

const convertIdInDocument = (document) => {
    const newDocument = { ...document };
    newDocument._id = document._id.toString();
    return newDocument;
};

const checkValidStrings = (stringObject) => {
    for (const key of Object.keys(stringObject)) {
        const value = stringObject[key];
        if (!value || typeof value !== 'string' || !value.trim())
            throw `${key} must be a non-empty string.`;
    }
};

const checkValidArrayOfStrings = (array, name = 'array') => {
    if (
        !array ||
        array.constructor !== Array ||
        array.length === 0 ||
        array.filter((item) => item && !!item.trim()).length === 0
    )
        throw `${name} must be a non-empty array.`;
};

const checkValidObject = (object, name = 'object') => {
    if (!object || typeof object !== 'object' || object === null)
        throw `${name} must be an object.`;
};

const checkDate = (date) => {
    const mdy = date.split('/');
    if(mdy.length !== 3) throw "invalid date";
    const date = new Date(date);
    if(date.getTime() !== date.getTime()) throw "invalid date";
};

const parseId = (id) => {
    checkValidStrings({ id });
    return ObjectId(id);
};

const create = (title, author, genre, datePublished, summary) => {
    checkValidObject(author, 'author')
    checkValidStrings({
        title, summary, datePublished, authorFirstName: author.authorFirstName, authorLastName: author.authorLastName
    })
    checkDate(datePublished)
    checkValidArrayOfStrings(genre);

    
}