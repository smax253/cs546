const express = require('express');
const login = require('../helpers/pass-decrypt');
const router = express.Router();

router.post('/', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    if (!username || !password) {
        res.status(401).render('login', { title: 'Login Page', error: true });
        return;
    }
    const user = await login(username, password);
    if (user) {
        req.session.user = user;
        res.redirect('/private');
    } else {
        res.status(401).render('login', { title: 'Login Page', error: true });
    }
});

module.exports = router;
