const express = require('express');
const router = express.Router();
const { books } = require('../data');

router.get('/', async (_, res) => {
    const allBooks = await books.getAll();
    const parsedAllBooks = allBooks.map((elem) => ({
        _id: elem._id,
        title: elem.title,
    }));
    res.json(parsedAllBooks);
});

router.post('/', async (req, res) => {
    try {
        const body = req.body;
        const result = await books.create(
            body.title,
            body.author,
            body.genre,
            body.datePublished,
            body.summary,
        );
        res.json(result);
    } catch (error) {
        res.status(400).send();
    }
});

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const result = await books.get(id);
        res.json(result);
    } catch (error) {
        res.status(400).send();
    }
});

router.put('/:id', async (req, res) => {
    const fields = ['title', 'author', 'genre', 'datePublished', 'summary'];
    const body = req.body;
    const id = req.params.id;
    try {
        for (const field of fields) {
            if (!body[field]) throw 'missing field';
        }
        if (body.reviews) throw 'cannot modify reviews';
        const result = await books.update(id, body);
        res.json(result);
    } catch (error) {
        res.status(400).send();
    }
});

router.patch('/:id', async (req, res) => {
    const body = req.body;
    const id = req.params.id;
    try {
        if (body.reviews) throw 'cannot modify reviews';
        const result = await books.update(id, body);
        res.json(result);
    } catch (error) {
        res.status(400).send();
    }
});

module.exports = router;
