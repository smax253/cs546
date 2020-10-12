const express = require('express');

const router = express.Router();

router.get('/', async (_, res) => {
    res.status(200).json({
        name: 'Max Shi',
        cwid: '10439248',
        biography:
            'My name is Max Shi, and I am a junior pursuing an undergrad degree in Computer Science. I am originally from Princeton, NJ!\nIn my free time I like to listen to music, play video games, and program.',
        favoriteShows: ['Mythbusters', 'The Big Bang Theory', 'The Office'],
    });
});

module.exports = router;
