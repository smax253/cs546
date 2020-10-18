const { reviews } = require('../config/mongoCollections');
const {
    checkValidStrings,
    checkValidRating,
    parseId,
    checkDate,
    convertIdInDocument,
    checkReviewsFields,
} = require('../helpers');
const books = require('./books');

const create = async (
    title,
    reviewer,
    bookBeingReviewed,
    rating,
    dateOfReview,
    review,
) => {
    checkValidStrings({ title, reviewer, review });
    checkValidRating(rating);
    checkDate(dateOfReview);
    parseId(bookBeingReviewed);
    const book = await books.get(bookBeingReviewed);
    const reviewsCollection = await reviews();
    const insertedObject = {
        title,
        reviewer,
        bookBeingReviewed,
        rating,
        dateOfReview,
        review,
    };
    insertedObject._id = (
        await reviewsCollection.insertOne(insertedObject)
    ).insertedId.toString();
    const newReviews = book.reviews;
    newReviews.push(insertedObject._id);
    await books.update(bookBeingReviewed, { reviews: newReviews });
};

const get = async (id) => {
    const parsedId = parseid(id);
    const reviewsCollection = await reviews();
    const documentQuery = await reviewsCollection.findOne({ _id: parsedId });
    if (!documentQuery) throw 'document with the given id does not exist';
    return convertIdInDocument(documentQuery);
};

const getAll = async () => {
    const reviewsCollection = await reviews();
    const allDocuments = await reviewsCollection.find({}).toArray();
    const result = allDocuments.map((document) => {
        return convertIdInDocument(document);
    });
    return result;
};

async function remove(id) {
    const parsedId = parseId(id);
    const reviewsCollection = await reviews();
    const removeResult = await reviewsCollection.findOneAndDelete({
        _id: parsedId,
    });
    if (removeResult.value) {
        const reviewedBook = await books.get(
            removeResult.value.bookBeingReviewed,
        );
        const newReviews = reviewedBook.reviewedBook.filter(
            (elem) => elem !== id,
        );
        await books.update(reviewedBook._id, { reviews: newReviews });
        return `${removeResult.value.title} has been successfully deleted`;
    } else throw 'failed to remove movie entry';
}

async function update(id, fields) {
    checkValidObject(fields, 'fields');
    checkReviewsFields(fields);

    const parsedId = parseId(id);
    if (fields.bookBeingReviewed) {
        const newBook = await books.get(fields.bookBeingReviewed);
        if (!newBook) throw 'book with that id does not exist!';
        const currentBookId = (await get(id)).bookBeingReviewed;
        const oldBook = await books.get(currentBookId);
        const updatedOldBookReviews = oldBook.reviews.filter(
            (element) => element === currentBookId,
        );
        const updatedNewBookReviews = newBook.reviews;
        updatedNewBookReviews.push(id);
        books.update(oldBook._id, { reviews: updatedOldBookReviews });
        books.update(newBook._id, { reviews: updatedNewBookReviews });
    }
    const reviewsCollection = await reviews();
    const updateResult = await reviewsCollection.findOneAndUpdate(
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
    remove,
    update,
};
