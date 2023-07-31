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
let pokemon = ['Bulbasaur', 'Charmander', 'Squirtle', 'Weedle'];
let heights = [0.5, 2.0, 1.8, 1.0];

for (let i = 0; i <pokemon.length; i++) {
document.write('<p>' + pokemon[i] + ' (height ' + heights[i] + ')</p>');

}
