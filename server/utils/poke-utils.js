const upperCaseFirstLetter = (string) => {
   return (string.charAt(0).toUpperCase() + 
    string.slice(1)); 
};

const hasNestedProperty = (obj, level,  ...rest) => {
  if (obj === undefined) return false
  if (rest.length == 0 && obj.hasOwnProperty(level)) return true
  return hasNestedProperty(obj[level], ...rest)
};

const getNestedEvolutions = (evChain, evChainJson) => {
  if (evChainJson == null) return;
  if (evChainJson.hasOwnProperty('species')) {
    evChain.push(upperCaseFirstLetter(evChainJson.species.name))
  }
  if (evChainJson.hasOwnProperty('evolves_to')) {
    getNestedEvolutions(evChain, evChainJson.evolves_to[0])
  }
};

const getBasicPokeInfo = (pokeInfo) => {

  var basicPokeInfo = {};

  if (pokeInfo.hasOwnProperty('id')) {
    basicPokeInfo.id = pokeInfo.id;
  }

  if (pokeInfo.hasOwnProperty('name')) {
    basicPokeInfo.name = upperCaseFirstLetter(pokeInfo.name);
  }

  if (pokeInfo.hasOwnProperty('weight')) {
    basicPokeInfo.weight = pokeInfo.weight;
  }

  if (hasNestedProperty(pokeInfo, 'sprites', 'front_default')) {
    basicPokeInfo.imgUrl = pokeInfo.sprites.front_default;
  }

  if (pokeInfo.hasOwnProperty('abilities')) {
    basicPokeInfo.abilities = pokeInfo.abilities.map(ab => {
      return upperCaseFirstLetter(ab.ability.name);
    });
  }

  if (pokeInfo.hasOwnProperty('types')) {
    basicPokeInfo.types = pokeInfo.types.map(typeJson => {
      return upperCaseFirstLetter(typeJson.type.name);
    });
  }

  return basicPokeInfo;
};

const getPokeDescription = (pokeCharac) => {
  var pokeDesc = '';
  if (pokeCharac.hasOwnProperty('descriptions')) {
    pokeCharac.descriptions.map(descJson => {
      if (descJson.language.name == 'en') {
        pokeDesc = descJson.description;
      }
    });
  };

  return pokeDesc;
};

const getEvolutionaryChain = (pokeEvChain) => {
  const evChain = [];

  if (pokeEvChain.hasOwnProperty('chain')) {
    if (pokeEvChain.chain.hasOwnProperty('evolves_to')) {
      getNestedEvolutions(evChain, pokeEvChain.chain.evolves_to[0]);
    }
  };

  return evChain;
};

module.exports = {getBasicPokeInfo, getPokeDescription, getEvolutionaryChain};