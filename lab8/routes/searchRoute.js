const express = require('express');
const Router = express.Router();
const axios = require('axios');

Router.post('/', async (req, res) => {
    const query = req.body.searchTerm;
    if (!query || typeof query !== 'string' || !query.trim()) {
        res.status(400).render('search_results', { title: 'Search Result' });
        return;
    }
    const searchResults = (
        await axios.get(`http://api.tvmaze.com/search/shows?q=${query}`)
    ).data;

    const parsedResults = searchResults.slice(0, 20).map((entry) => {
        return {
            link: `/shows/${entry.show.id}`,
            title: entry.show.name,
        };
    });
    const statusCode = parsedResults.length !== 0 ? 200 : 404;
    res.status(statusCode).render('search_results', {
        results: parsedResults,
        title: 'Search Result',
        searchTerm: query,
    });
});

module.exports = Router;
