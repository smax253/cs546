const { books } = require('../config/mongoCollections');
const {
    checkValidObject,
    checkValidStrings,
    checkValidArrayOfStrings,
    checkBooksFields,
    checkDate,
    parseId,
    convertIdInDocument,
} = require('../helpers');

const create = async (title, author, genre, datePublished, summary) => {
    checkValidObject(author, 'author');
    checkValidStrings({
        title,
        summary,
        datePublished,
        authorFirstName: author.authorFirstName,
        authorLastName: author.authorLastName,
    });
    checkDate(datePublished);
    checkValidArrayOfStrings(genre);

    title = title.trim();
    genre = genre.map((element) => element.trim());
    datePublished = datePublished.trim();
    summary = summary.trim();
    for (const key of Object.keys(author)) {
        author[key] = author[key].trim();
    }

    const booksCollection = await books();
    const itemToInsert = {
        title,
        author,
        genre,
        datePublished,
        summary,
        reviews: [],
    };
    itemToInsert._id = (
        await booksCollection.insertOne(itemToInsert)
    ).insertedId.toString();
    return itemToInsert;
};

const getAll = async () => {
    const booksCollection = await books();
    const allDocuments = await booksCollection.find({}).toArray();
    const result = allDocuments.map((document) => {
        return convertIdInDocument(document);
    });
    return result;
};

const get = async (id) => {
    const parsedId = parseId(id);
    const booksCollection = await books();
    const documentQuery = await booksCollection.findOne({ _id: parsedId });
    if (!documentQuery) throw 'document with the given id does not exist';
    return convertIdInDocument(documentQuery);
};

async function remove(id) {
    const parsedId = parseId(id);
    const booksCollection = await books();
    const removeResult = await booksCollection.findOneAndDelete({
        _id: parsedId,
    });
    if (removeResult.value)
        return `${removeResult.value.title} has been successfully deleted`;
    else throw 'failed to remove movie entry';
}

async function update(id, fields) {
    checkValidObject(fields, 'fields');
    checkBooksFields(fields);

    const parsedId = parseId(id);
    if (fields.title) fields.title = fields.title.trim();
    if (fields.genre)
        fields.genre = fields.genre.map((element) => element.trim());
    if (fields.datePublished)
        fields.datePublished = fields.datePublished.trim();
    if (fields.summary) fields.summary = fields.summary.trim();
    const bookCollection = await books();
    if (fields.author) {
        const currentAuthorName = (await get(id)).author;
        for (const name of Object.keys(fields.author)) {
            currentAuthorName[name] = fields.author[name].trim();
        }
        fields.author = currentAuthorName;
    }
    const updateResult = await bookCollection.findOneAndUpdate(
        { _id: parsedId },
        {
            $set: { ...fields },
        },
    );
    if (updateResult.value) {
        return convertIdInDocument(await get(id));
    } else throw 'failed to update movie entry';
}

module.exports = {
    create,
    get,
    getAll,
    update,
    remove,
};
