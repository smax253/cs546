const { ObjectId } = require('mongodb');

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
        array.filter((item) => item && !!item.trim()).length === 0 ||
        array.filter((item, ind) => array.indexOf(item) !== ind).length !== 0
    )
        throw `${name} must be a non-empty array with no duplicates.`;
};

const checkValidObject = (object, name = 'object') => {
    if (!object || typeof object !== 'object' || object === null)
        throw `${name} must be an object.`;
};

const checkDate = (dateString) => {
    const date = new Date(dateString);
    if (date.getTime() !== date.getTime()) throw 'invalid date';
};

const parseId = (id) => {
    checkValidStrings({ id });
    return ObjectId(id);
};

function checkReviewsFields(fields) {
    const validFields = {
        title: (title) => checkValidStrings({ title }),
        reviewer: (reviewer) => checkValidStrings({ reviewer }),
        bookBeingReviewed: (id) => parseId(id),
        rating: (rating) => checkValidRating(rating),
        dateOfReview: (date) => checkDate(date),
        review: (review) => checkValidStrings({ review }),
    };
    for (const field of Object.keys(fields)) {
        if (!validFields[field]) throw `invalid field ${field} passed in!`;
        validFields[field](fields[field]);
    }
}

function checkBooksFields(fields) {
    const validFields = {
        title: (title) => checkValidStrings({ title }),
        author: (author) => {
            checkValidObject(author);
            try {
                checkValidStrings({
                    firstName: author.authorFirstName,
                });
            } catch (error) {
                try {
                    checkValidStrings({ lastName: author.authorLastName });
                } catch (error) {
                    throw 'missing fields';
                }
            }
        },
        genre: (genre) => checkValidArrayOfStrings(genre),
        datePublished: (date) => checkDate(date),
        summary: (summary) => checkValidStrings({ summary }),
        reviews: (reviews) => checkValidArrayOfStrings(reviews),
    };
    for (const field of Object.keys(fields)) {
        if (!validFields[field]) throw `invalid field ${field} passed in!`;
        validFields[field](fields[field]);
    }
}

const checkValidRating = (number) => {
    const convert = Number(number);
    if (
        isNaN(convert) ||
        convert < 1 ||
        convert > 5 ||
        !Number.isInteger(number)
    )
        throw 'rating must be an integer between 1 and 5';
};

module.exports = {
    checkBooksFields,
    parseId,
    checkDate,
    checkValidArrayOfStrings,
    checkValidObject,
    checkValidStrings,
    checkValidRating,
    convertIdInDocument,
    checkReviewsFields,
};
