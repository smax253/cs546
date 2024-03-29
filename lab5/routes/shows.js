const express = require('express');
const axios = require('axios');

const router = express.Router();

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    if (!id.match(/^[0-9]+$/)) {
        console.warn(`invalid id passed: ${id}`);
        res.status(400).json({
            error:
                'id must be a positive whole number with only characters 0-9!',
        });
        return;
    }
    try {
        const showsData = (await axios.get(`http://api.tvmaze.com/shows/${id}`))
            .data;
        res.status(200).json(showsData);
    } catch (error) {
        console.log(`no matching show found for id ${id}`);
        res.status(404).json({
            error: 'no show matching id found in database!',
        });
    }
});

router.get('/', async (_, res) => {
    const showsData = await axios.get('http://api.tvmaze.com/shows');
    res.status(200).send(showsData.data);
});

module.exports = router;
