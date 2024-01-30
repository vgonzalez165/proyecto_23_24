
const {Router } = require('express');

const {
    post_race
} = require('../controllers/races');

const router = Router();

router.post('/new',
    post_new_race);

module.exports = router;