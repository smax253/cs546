const express = require("express");
const router = express.Router();
const { reviews, books } = require("../data");

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const result = await books.get(id);
    const list = [];
    for (const reviewId of result.reviews) {
      list.push(await reviews.get(reviewId));
    }
    res.json(list);
  } catch (error) {
    console.log(error);
    if (error === "document with the given id does not exist")
      res.status(404).json({ error });
    else res.status(400).json({ error: error.toString() });
  }
});

router.post("/:id", async (req, res) => {
  const id = req.params.id;
  const body = req.body;
  if (id !== req.body.bookBeingReviewed) res.status(400).send();
  else {
    try {
      const args = [
        body.title,
        body.reviewer,
        body.bookBeingReviewed,
        body.rating,
        body.dateOfReview,
        body.review,
      ];
      const result = await reviews.create(...args);
      res.json(result);
    } catch (error) {
      res.status(400).json({ error });
    }
  }
});

router.get("/:bookId/:reviewId", async (req, res) => {
  const reviewId = req.params.reviewId;
  try {
    const result = await reviews.get(reviewId);
    if (result.bookBeingReviewed !== req.params.bookId) throw "bookId mismatch";
    res.json(result);
  } catch (error) {
    res.status(404).json({ error });
  }
});

router.delete("/:bookId/:reviewId", async (req, res) => {
  const reviewId = req.params.reviewId;
  try {
    const result = await reviews.get(reviewId);
    if (result.bookBeingReviewed !== req.params.bookId) throw "bookId mismatch";
    await reviews.remove(reviewId);
    res.json({
      reviewId: reviewId,
      deleted: true,
    });
  } catch (error) {
    res.status(400).json({ error });
  }
});

module.exports = router;
