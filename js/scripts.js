
let pokemonRepository = (function () {
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
    function add(newPokemon) {
        if (typeof newPokemon === 'object') {
            pokemonList.push(newPokemon);
        } else {
            document.write('Error: Only ojects can be pokemon - TEST');
        }
    }
    function getAll() {
        return pokemonList;
    }
    function addListItem(pokemon) {
        let pokemonList = document.querySelector(".pokemon-list");
        let listpokemon = document.createElement("li");
        let button = document.createElement("button");
        button.innerText = pokemon.name;
        button.classList.add("button-class");
        listpokemon.appendChild(button);
        pokemonList.appendChild(listpokemon);
    }
    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem
    };
})();


pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);

});

//pokemonRepository.add({ name: 'Pikachu', height: 1.4, type: 'Electric' });
//pokemonRepository.add('I am not a pokemon'); //testing out conditional

/* let heightCat;
if (pokemon.height > 1.5) {
    heightCat = '  That is a <span> BIG </span> pokemon!';
} else if (pokemon.height > 0.5 && pokemon.height <= 1.5) {
    heightCat = ' This is a regular size pokemon.';
} else {
    heightCat = ' This is a small pokemon.';
}
document.write('<p>' + pokemon.name + ' (height ' + pokemon.height + ') -- ' + heightCat + '</p>');
*/