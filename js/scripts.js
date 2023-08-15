(function() {
let pokemonRepository = (function () {
    let pokemonList = [];
    let apiURL = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
    let modalContainer = document.querySelector("#modal-pokemon-container");

    function add(pokemon) {
        if (
            typeof pokemon === 'object' &&
            "name" in pokemon //&&
            //"detailsURL" in pokemon
            ) {
            pokemonList.push(pokemon);
        } else {
            document.write('Error: Only ojects can be pokemon');
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
        button.addEventListener('click', function(event) {
            showDetails(pokemon);
        });
    }
    function loadList() {
        return fetch(apiURL).then(function (response) {
            return response.json();
        }).then(function (json) {
            json.results.forEach(function (item) {
                let pokemon = {
                    name: item.name,
                    detailsUrl: item.url
                };
                add(pokemon);
                console.log(pokemon);
            });
        }).catch(function (e) {
            console.error(e);
        })
    }
    function loadDetails(item) {
        let url = item.detailsUrl;
        return fetch(url).then(function (response) {
            return response.json();
        }).then(function (details) {
            // Now we add the details to the item
            item.imageUrl = details.sprites.front_default;
            item.height = details.height;
            item.types = details.types;
            return item;
        }).catch(function (e) {
            console.error(e);
        });
    }

    function showDetails(pokemon) {
        loadDetails(pokemon).then(function (pokemonWithDetails) {
            showModal(pokemonWithDetails);
        });
    }
    function showModal(pokemon) {
        modalContainer.innerHTML = '';
        let modal = document.createElement('div');
        modal.classList.add('modal-pokemon');

        let closeButtonElement = document.createElement('button');
        closeButtonElement.classList.add('modal-close');
        closeButtonElement.innerText = 'Close';
        closeButtonElement.addEventListener('click', hideModal);

        let titleElement = document.createElement('h1');
        titleElement.innerText = pokemon.name;

        let contentElement = document.createElement('p');
        contentElement.innerText = 'Height: ' + pokemon.height;

        let imageElement = document.createElement('img');
        imageElement.classList.add('modal-image');
        imageElement.src = pokemon.imageUrl;
        imageElement.alt = pokemon.name;


        modal.appendChild(closeButtonElement);
        modal.appendChild(titleElement);
        modal.appendChild(contentElement);
        modal.appendChild(imageElement);
        modalContainer.appendChild(modal);

        modalContainer.classList.add('is-visible');
    }
    function hideModal() {
        modalContainer.classList.remove('is-visible');
    }
    window.addEventListener('keydown', (e) => {
        if (e.key ==='Escape' &&
    modalContainer.classList.contains('is-visible')) {
        hideModal();
    }
});

modalContainer.addEventListener('click', (e) => {
    let target = e.target;
    if (target === modalContainer) {
        hideModal();
    }
});

document.querySelector('.pokemon-list').addEventListener('click', function(event) {
    let clickedButton = event.target;
    if (clickedButton.classList.contains('button-class')) {
        let pokemonName = clickedButton.innerText;
        let selectedPokemon = pokemonRepository.getAll().find(pokemon => pokemon.name === pokemonName);
        showDetails(selectedPokemon);
    }
});

    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem,
        loadList: loadList,
        loadDetails: loadDetails,
        showDetails: showDetails
    };
})();

pokemonRepository.loadList().then(function () {
    pokemonRepository.getAll().forEach(function (pokemon) {
        pokemonRepository.addListItem(pokemon);
    });
});
})();
