
const {Router } = require('express');

const {
    post_new_race,
    delete_race_id,
    get_race_id_field,
    get_race_all,
    get_race,
    put_race
} = require('../controllers/races');

const router = Router();

router.post('/new',post_new_race);
router.get('/all', get_race_all);
router.get('/:id',get_race);
router.get('/:id/:field', get_race_id_field);
router.delete('/:id', delete_race_id);
router.put('/:id', put_race)

module.exports = router;