(function () {
    let pokemonRepository = (function () {
        let pokemonList = [];
        let apiURL = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

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
            let pokemonList = $(".pokemon-list");
            let listpokemon = $("<li>").addClass('list-group-item');
            let button = $('<button>').addClass('btn btn-primary')
                .attr('data-target', '#pokemonModal')
                .attr('data-toggle', 'modal')
                .text(pokemon.name);
            listpokemon.append(button);
            pokemonList.append(listpokemon);
            button.on('click', function () {
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
                });
            }).catch(function (e) {
                console.error(e);
            })
        }
        function loadDetails(item) {
            console.log('loadDetails() called with:', item);
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
        
        $('#pokemonModal').on('hide.bs.modal', function () {
            $modalTitle.empty();
            $modalBody.empty();
        });
        
            let $nameElement = $('<h1>').text(pokemon.name);
            let $imageElement = $('<img>').addClass('modal-img').attr('src', pokemon.imageUrl);
            let $heightElement = $('<p>').text('Height: ' + pokemon.height);
            let typeNames = pokemon.types.map(type => type.type.name);
            let $typeElement = $('<p>').text('Types: ' + typeNames.join(', '));
        
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
