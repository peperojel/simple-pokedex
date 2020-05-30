var Pokedex = require('pokedex-promise-v2');

const {getBasicPokeInfo, getPokeDescription} = require('../utils/poke-utils')

const POKE_COUNT = 807;
const LIMIT = 20;
const MAX_PAGES = Math.ceil(POKE_COUNT/LIMIT)

var options = {
  cacheLimit: 604800 * 1000, // 7 days
  timeout: 20 * 1000 // 10 s
}

var P = new Pokedex(options);

const getPokeInstancesByPage = async (req, res, next) => {
  var pageReq = Number(req.params.page);

  if (isNaN(pageReq) || !Number.isInteger(pageReq) || pageReq < 0 || pageReq > MAX_PAGES) {
    res.status(400).json({message: "Invalid parameter."})
  }

  var pokeId = 20*pageReq-19;
  var pokeInstances = [];
  
  for (var i = 0; i < LIMIT; i++) {
    if (pokeId > POKE_COUNT) {
      break;
    }
    await P.getPokemonByName(pokeId)
      .then(function(response) {
        var pokeInstance = getBasicPokeInfo(response)
        pokeInstances.push(pokeInstance)
      })
      .catch(function(error) {
        res.status(404).json({message: "PokeApi is not reachable."})
      });
    pokeId++
  }

  res.status(200).json(pokeInstances)
};

const getPokeDetailsById = async (req, res, next) => {
  var pokeId = Number(req.params.id);
  var pokeDetails = {hello: "Si"};

  if (isNaN(pokeId) || !Number.isInteger(pokeId) || pokeId < 0 || pokeId > POKE_COUNT) {
    res.status(400).json({message: "Invalid parameter."})
  }

  await P.getPokemonByName(pokeId)
    .then(function(response) {
      pokeDetails = getBasicPokeInfo(response)
    })
    .catch(function(error) {
      res.status(404).json({message: "getPokemonByName is not reachable."})
      next()
    });

  await P.getCharacteristicById(pokeId)
    .then(function(response) {
      pokeDetails.description = getPokeDescription(response)
    })
    .catch(function(error) {
    });

  res.status(200).json(pokeDetails)
  next()
};

exports.getPokeInstancesByPage = getPokeInstancesByPage;
exports.getPokeDetailsById = getPokeDetailsById;
