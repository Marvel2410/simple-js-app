
let pokemonRepository = (function() {
    let pokemonList = [
        {
            name: 'Bulbasaur',
            height: 0.5,
            type: ['grass', 'poison']
        },
        {
            name: 'Charmander',
            height: 2,
            type: 'fire'
        },
        {
            name: 'Squirtle',
            height: 1.8,
            type: 'water'
        },
        {
            name: 'Weedle',
            height: 1.0,
            type: ['bug', 'poison']
        }
    ];
    function add (newPokemon) {
            pokemonList.push(newPokemon);
        }
    function getAll() {
            return pokemonList;
        }
    return {
        add: add,
        getAll: getAll
    };
})();

pokemonRepository.add({name: 'Pikachu', height: 1.4, type: 'Electric'});

pokemonRepository.getAll().forEach(function (pokemon) {
    let heightCat;
    if (pokemon.height > 1.5) {
        heightCat = '  That is a <span> BIG </span> pokemon!';
    } else if (pokemon.height > 0.5 && pokemon.height <= 1.5) {
        heightCat = ' This is a regular size pokemon.';
    } else {
        heightCat = ' This is a small pokemon.';
    }
    document.write('<p>' + pokemon.name + ' (height ' + pokemon.height + ') -- ' + heightCat + '</p>');
});


