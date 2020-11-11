const express = require('express');
const Router = express.Router();
const axios = require('axios');

Router.get('/:id', async (req, res) => {
    const id = req.params.id;
    if (!id.match(/^[0-9]+$/)) {
        console.warn(`invalid id passed: ${id}`);
        res.status(400).render('show_info', {
            title: 'Error',
            error:
                'ID must be a positive whole number with only characters 0-9!',
        });
        return;
    }
    try {
        const showsData = (await axios.get(`http://api.tvmaze.com/shows/${id}`))
            .data;
        const parsedDescription = showsData.summary.replace(/<.*?>/g, '');
        res.render('show_info', {
            name: showsData.name,
            language: showsData.language,
            genres: showsData.genres.map((entry) => ({ genre: entry })),
            rating: showsData.rating.average,
            network: showsData.network,
            summary: parsedDescription,
            imageLink: showsData.image.medium,
            title: `Info for ${showsData.name}`,
        });
    } catch (error) {
        console.log(`no matching show found for id ${id}`);
        res.status(404).render('show_info', {
            error: 'No show matching id found in database!',
            title: 'Error',
        });
    }
});

module.exports = Router;
