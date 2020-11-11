const { reviews } = require("../config/mongoCollections");
const {
  checkValidStrings,
  checkValidRating,
  parseId,
  checkDate,
  convertIdInDocument,
} = require("../helpers");
const books = require("./books");

const create = async (
  title,
  reviewer,
  bookBeingReviewed,
  rating,
  dateOfReview,
  review
) => {
  checkValidStrings({ title, reviewer, review });
  checkValidRating(rating);
  checkDate(dateOfReview);
  parseId(bookBeingReviewed);

  title = title.trim();
  reviewer = reviewer.trim();
  review = review.trim();
  bookBeingReviewed = bookBeingReviewed.trim();
  dateOfReview = dateOfReview.trim();

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
  return insertedObject;
};

const get = async (id) => {
  const parsedId = parseId(id);
  const reviewsCollection = await reviews();
  const documentQuery = await reviewsCollection.findOne({ _id: parsedId });
  if (!documentQuery) throw "document with the given id does not exist";
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
    const reviewedBook = await books.get(removeResult.value.bookBeingReviewed);
    const newReviews = reviewedBook.reviews.filter((elem) => elem !== id);
    await books.update(reviewedBook._id, { reviews: newReviews });
    return `${removeResult.value.title} has been successfully deleted`;
  } else throw "failed to remove movie entry";
}

module.exports = {
  create,
  get,
  getAll,
  remove,
};
