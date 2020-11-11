const express = require('express');
const Router = express.Router();

Router.get('/', (req, res) => {
    res.render('search', { title: 'Show Finder' });
});

module.exports = Router;
