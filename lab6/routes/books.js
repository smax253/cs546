const express = require("express");
const router = express.Router();
const { books, reviews } = require("../data");
const { update } = require("../data/books");

router.get("/", async (_, res) => {
  const allBooks = await books.getAll();
  const parsedAllBooks = allBooks.map((elem) => ({
    _id: elem._id,
    title: elem.title,
  }));
  res.json(parsedAllBooks);
});

router.post("/", async (req, res) => {
  try {
    const body = req.body;
    const result = await books.create(
      body.title,
      body.author,
      body.genre,
      body.datePublished,
      body.summary
    );
    res.json(result);
  } catch (error) {
    res.status(400).json({ error });
  }
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const result = await books.get(id);
    res.json(result);
  } catch (error) {
    if (error === "document with the given id does not exist")
      res.status(404).json({ error });
    else res.status(400).json({ error: error.toString() });
  }
});

router.put("/:id", async (req, res) => {
  const fields = ["title", "author", "genre", "datePublished", "summary"];
  const body = req.body;
  const id = req.params.id;
  try {
    for (const field of fields) {
      if (!body[field]) throw "missing field";
      if (field === "author") {
        if (!body.author.authorFirstName || !body.author.authorLastName)
          throw "missing field";
      }
    }
    if (body.reviews) throw "cannot modify reviews";
    const result = await books.update(id, body);
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: error.toString() });
  }
});

router.patch("/:id", async (req, res) => {
  const body = req.body;
  const id = req.params.id;
  try {
    const updatedObject = {};
    const oldBook = await books.get(id);
    if (body.title && body.title !== oldBook.title)
      updatedObject.title = body.title;
    if (
      body.genre &&
      body.genre instanceof Array &&
      (body.genre.length !== oldBook.genre.length ||
        body.genre
          .map((elem) => oldBook.genre.includes(elem))
          .reduce((a, b) => a && b, true) === false)
    )
      updatedObject.genre = body.genre;
    if (
      body.datePublished &&
      new Date(body.datePublished).getTime() !==
        new Date(oldBook.datePublished).getTime()
    )
      updatedObject.datePublished = body.datePublished;
    if (
      body.author &&
      (body.author.authorFirstName !== oldBook.author.authorFirstName ||
        body.author.authorLastName !== oldBook.author.authorLastName)
    )
      updatedObject.author = body.author;
    if (body.summary && body.summary !== oldBook.summary)
      updatedObject.summary = body.summary;
    if (Object.keys(updatedObject).length === 0) throw "no changes";
    if (body.reviews) throw "cannot modify reviews";
    const result = await books.update(id, updatedObject);
    res.json(result);
  } catch (json) {
    res.status(400).json({ error: error.toString() });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const reviewIds = (await books.get(req.params.id)).reviews;
    for (const reviewId of reviewIds) {
      try {
        await reviews.remove(reviewId);
      } catch (error) {}
    }
    await books.remove(req.params.id);
    res.json({
      bookId: req.params.id,
      deleted: true,
    });
  } catch (error) {
    res.status(400).json({ error: error.toString() });
  }
});

module.exports = router;
