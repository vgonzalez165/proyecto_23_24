
const {Router } = require('express');

const {
    post_login,
    get_token
} = require('../controllers/auth');

const router = Router();

router.post('/login',
    post_login);

router.get('/token', 
    get_token);


module.exports = router;