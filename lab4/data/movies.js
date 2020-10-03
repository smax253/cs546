const { ObjectId } = require('mongodb');
const { movies } = require('../config/mongoCollections');

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

const checkYearReleased = (year) => {
    if (
        !year ||
        !`${year}`.match(/[0-9]{4}/) ||
        year < 1930 ||
        year > new Date(Date.now()).getFullYear() + 5
    )
        throw 'year is not a valid year';
};

const parseId = (id) => {
    checkValidStrings({ id });
    return ObjectId(id);
};

async function create(title, plot, rating, runtime, genre, cast, info) {
    checkValidArrayOfStrings(cast, 'cast');
    checkValidObject(info, 'info');
    checkValidStrings({
        title,
        plot,
        rating,
        runtime,
        genre,
        'info.director': info.director,
    });
    checkYearReleased(info.yearReleased);
    const moviesCollection = await movies();
    const result = await moviesCollection.insertOne({
        title,
        plot,
        rating,
        runtime,
        genre,
        cast,
        info,
    });
    return {
        title,
        plot,
        rating,
        runtime,
        genre,
        cast,
        info,
        _id: result.insertedId.toString(),
    };
}

async function getAll() {
    const moviesCollection = await movies();
    const allDocuments = await moviesCollection.find({}).toArray();
    const result = allDocuments.map((document) => {
        return convertIdInDocument(document);
    });
    return result;
}

async function get(id) {
    const parsedId = parseId(id);
    const moviesCollection = await movies();
    const documentQuery = await moviesCollection.findOne({ _id: parsedId });
    if (!documentQuery) throw 'document with the given id does not exist';
    return convertIdInDocument(documentQuery);
}

async function remove(id) {
    const parsedId = parseId(id);
    const moviesCollection = await movies();
    const removeResult = await moviesCollection.findOneAndDelete({
        _id: parsedId,
    });
    if (removeResult.value)
        return `${removeResult.value.title} has been successfully deleted`;
    else throw 'failed to remove movie entry';
}

async function rename(id, newTitle) {
    checkValidStrings({ newTitle });
    const parsedId = parseId(id);
    const moviesCollection = await movies();
    const updateResult = await moviesCollection.findOneAndUpdate(
        { _id: parsedId },
        {
            $set: { title: newTitle },
        },
    );
    if (updateResult.value) {
        updateResult.value.title = newTitle;
        return convertIdInDocument(updateResult.value);
    } else throw 'failed to rename movie entry';
}

module.exports = {
    create,
    getAll,
    get,
    remove,
    rename,
};
