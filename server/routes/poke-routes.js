const express = require('express');

const router = express.Router();
const pokeControllers = require('../controllers/poke-controllers');

router.get('/:page', pokeControllers.getPokeInstancesByPage);
router.get('/details/:id', pokeControllers.getPokeDetailsById);

module.exports = router;