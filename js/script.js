let pokemon = "pikachu"

const inputSearch = document.querySelector('.searchPokemon');
const modifPokemon = document.querySelector('.modifier');

  // bouton recherche
modifPokemon.addEventListener('click', function () {
  // On assigne la valeur de l'input a pokemon
  pokemon = inputSearch.value;
  // console.log(pokemon);

  // on appelle chaque function avec "pokemon" comme argument 
  imagePokemon(pokemon);
  fetchName(pokemon);
  type(pokemon);
  imagePokemon(pokemon);
  taillePoids(pokemon);
  categorie(pokemon);
  capacity(pokemon);
  description(pokemon);
  gender(pokemon);
  stats(pokemon);
});

window.onload = function () {

  fetchName();
  type();
  imagePokemon();
  taillePoids();
  categorie();
  capacity();
  description();
  gender();
  stats();
  
  //.then permet d'attendre que la fucntion d'avant soit résolue avant de procéder à la suivante
    fetchPokemonList().then(() => {
    displayPokemonNames();
  });

//conversion en entier
  const poundsWeight = parseInt(specificationsWeight.textContent);
  // console.log({ poundsWeight });
  const kgWeight = Math.round(poundsToKg(poundsWeight) * 100) / 100;
  // console.log({ kgWeight });
  specificationsWeight.textContent = `${kgWeight}kg`;
}

  // Conerversion en kg 
function poundsToKg(poundsWeight) {
  return poundsWeight / 2.2046;
}
const specificationsWeight = document.querySelector('#specifications-weight');


async function fetchName() {
  const response = await fetch('https://pokeapi.co/api/v2/pokemon/?limit=2000');
  const data = await response.json();
  const datalist = document.querySelector('#pokemonList');
  // datalist.innerHTML = ''; // Supprimer les anciennes données

  for (const pokemon of data.results) {
    const option = document.createElement('option');
    option.value = pokemon.name;
    datalist.appendChild(option);
  }

  const h1 = document.querySelector('h1');
  h1.textContent =  pokemon ;
}


async function type() {
  const response = await fetch('https://pokeapi.co/api/v2/pokemon/' + pokemon );
  const data = await response.json();
  const typeList = document.querySelector('.type-list');
  typeList.innerHTML = ''; // Supprimer les anciennes données

  for (const iterator of data.types) {
    const li = document.createElement('li');
    const btn1 = document.createElement('button');
    btn1.classList.add(iterator.type.name);
    btn1.textContent = iterator.type.name;
    typeList.appendChild(li);
    li.appendChild(btn1);

    faiblesse(iterator.type.name);
  }
}

async function imagePokemon() {
  const response = await fetch('https://pokeapi.co/api/v2/pokemon/' + pokemon);
  const data = await response.json();
  const imagePokemon = document.querySelector('.w-100');
  imagePokemon.src = data.sprites.other["official-artwork"].front_default;
  const imagePokemonShiny = document.querySelector('.shiny');
  imagePokemonShiny.src = data.sprites.other["official-artwork"].front_shiny;
  // console.log(imagePokemon);
}

async function taillePoids(pokemon) {
  const response = await fetch('https://pokeapi.co/api/v2/pokemon/' + pokemon);
  const data = await response.json();
  
  const taillePokemon = document.querySelector('.taille');
  taillePokemon.textContent = data.height + '"';

  const poidsPokemon = document.querySelector('#specifications-weight');
  poidsPokemon.textContent = Math.round(poundsToKg(data.weight)) + 'Kg';

}

async function categorie() {
  const response = await fetch('https://pokeapi.co/api/v2/pokemon-species/' + pokemon);
  const data = await response.json();
  const categoriePokemon = document.querySelector('.categorie');
  categoriePokemon.textContent = data.genera[3].genus;
}

async function capacity() {
  const response = await fetch('https://pokeapi.co/api/v2/pokemon/' + pokemon);
  const data = await response.json();
  const capaciteContain = document.querySelector('.capacite');
  capaciteContain.innerHTML = ''; // Supprimer les anciennes données

  for (const iterator of data.abilities) {
    const capacite = document.createElement('strong');
    capacite.textContent = iterator.ability.name;
    capaciteContain.appendChild(capacite);
  }
}

async function description() {
  const response = await fetch('https://pokeapi.co/api/v2/pokemon-species/' + pokemon);
  const data = await response.json();
  const descriptionPokemon = document.querySelector('.description');
  // console.log(descriptionPokemon);
  descriptionPokemon.textContent = data.flavor_text_entries[40].flavor_text;
}

async function gender() {
  const response = await fetch('https://pokeapi.co/api/v2/pokemon-species/' + pokemon);
  const data = await response.json();
  const valeurGender = data.gender_rate;
  // console.log(valeurGender);
  // console.log(data);


  if (valeurGender < 0) {
    document.querySelector('.bi-gender-female').style.display = 'none';
    document.querySelector('.bi-gender-male').style.display = 'none';
  }
  else if (valeurGender == 0) {
    document.querySelector('.bi-gender-female').style.display = 'none';
    document.querySelector('.bi-gender-male').style.display = 'inline';

  }
  else if (valeurGender == 8) {
    document.querySelector('.bi-gender-male').style.display = 'none';
    document.querySelector('.bi-gender-female').style.display = 'inline';
    // console.log(valeurGender);
  }
  else if (valeurGender > 0 && valeurGender < 8) {
    document.querySelector('.bi-gender-male').style.display = 'inline';
    document.querySelector('.bi-gender-female').style.display = 'inline';
  }

}

async function faiblesse(type) {
  const response1 = await fetch('https://pokeapi.co/api/v2/type/' + type);
  const data1 = await response1.json();

  const ul = document.querySelectorAll('.type-list')[1];
  ul.innerHTML = ''; // Supprimer les anciennes données

  for (const iterator of data1.damage_relations.double_damage_from) {
    const li = document.createElement('li');
    const btn = document.createElement('button');
    btn.classList.add(iterator.name);
    btn.textContent = iterator.name;
    ul.appendChild(li);
    li.appendChild(btn);
  }
}

async function stats() {
  const response = await fetch('https://pokeapi.co/api/v2/pokemon/' + pokemon);
  const data = await response.json();
  const statsPokemon = document.querySelector(".stats");

  for (const iterator of data.stats) {
    statsPokemon.classList.add(iterator.stat.name + '-' + Math.round(iterator.base_stat * 15 / 100));
  }
}

//functionsTESTaffichagePokemon
async function fetchPokemonList() {
  const response = await fetch('https://pokeapi.co/api/v2/pokemon');
  const data = await response.json();
  console.log(response);  
  return data.results;
}

function displayPokemonNames() {
  fetchPokemonList().then((pokemonList) => {
    pokemonList.forEach((pokemon) => {
      const option = document.createElement('option');
      option.value = pokemon.name;
      inputSearch.appendChild(option);
      // console.log(option);
    });
  });
}
