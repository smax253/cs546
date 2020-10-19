const express = require('express');
const router = express.Router();
const { reviews } = require('../data');

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const result = await reviews.get(id);
        res.json(result);
    } catch (error) {
        res.status(404).send();
    }
});

router.post('/:id', async (req, res) => {
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
            res.status(400).send();
        }
    }
});

router.get('/:bookId/:reviewId', async (req, res) => {
    const reviewId = req.params.reviewId;
    try {
        const result = await reviews.get(reviewId);
        if (result.bookBeingReviewed !== req.params.bookId)
            throw 'bookId mismatch';
        res.json(result);
    } catch (error) {
        res.status(404).send();
    }
});

router.delete('/:bookId/:reviewId', async (req, res) => {
    const reviewId = req.params.reviewId;
    try {
        const result = await reviews.get(reviewId);
        if (result.bookBeingReviewed !== req.params.bookId)
            throw 'bookId mismatch';
        await reviews.remove(reviewId);
        res.json({
            reviewId: reviewId,
            deleted: true,
        });
    } catch (error) {
        res.status(400).send();
    }
});

module.exports = router;
