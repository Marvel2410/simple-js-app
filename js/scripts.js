(function () {
    let pokemonRepository = (function () {
        let pokemonList = [];
        let apiURL = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
        let modalContainer = document.querySelector("#pokemonModal");

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
            listpokemon.classList.add("list-group-item");
            let button = document.createElement("button");
            button.classList.add('btn','btn-primary');
            button.innerText = pokemon.name;
            button.setAttribute('data-target', '#pokemonModal');
            button.setAttribute('data-toggle', 'modal');
            button.classList.add("button-class");
            listpokemon.appendChild(button);
            pokemonList.appendChild(listpokemon);
            button.addEventListener('click', function (event) {
                showDetails(pokemon);
            });
            function showDetails (pokemon) {
                loadDetails(pokemon);
            }
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
            let $modalBody = $('.modal-body');
            let $modalTitle = $('.modal-title');
        
            $modalTitle.empty();
            $modalBody.empty();
        
            let $nameElement = $('<h1>').text(pokemon.name);
            let $imageElement = $('<img>').addClass('modal-img').attr('src', pokemon.imageUrl);
            let $heightElement = $('<p>').text('Height: ' + pokemon.height);
            let $typeElement = $('<p>').text('Types: ' + pokemon.types.join(', '));
        
            $modalTitle.append($nameElement);
            $modalBody.append($imageElement, $heightElement, $typeElement);
        
            $('#pokemonModal').modal('show');
        }
     
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

let dialogPromiseReject; 

function hideModal () {
    let modalContainer = document.querySelector ('#pokemonModal');
    modalContainer.classList.remove('is-visible');

    if(dialogPromiseReject) {
        dialogPromiseReject();
        dialogPromiseReject = null;
    }
}
