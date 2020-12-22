const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    req.session.destroy();
    res.render('logged_out', { title: 'Logged Out' });
});

module.exports = router;
