'use strict';

const totalDrinks = document.querySelector('.js-totalDrinks');
const input = document.querySelector('.js-input');
const btnSearch = document.querySelector('.js-btnSearch');
const btnReset = document.querySelector('.js-btnReset');
const favoriteDrinks = document.querySelector('.js-favoriteDrinks');
let drinks = [];
let favorites = [];

//escuchar click a cada drink
function listenerDrinks() {
  console.log('jfhjeb');
  const liDrinks = document.querySelectorAll('.js_listdrink');
  console.log(liDrinks);
  for (const itemDrink of liDrinks) {
    itemDrink.addEventListener('click', handleClickDrink);
  }
}
//pintar y llamar la info

function rendertotalDrinks(drinks) {
  let html = '';
  for (const drinkItem of drinks) {
    html += `<li class = "js_listdrink" id= ${drinkItem.idDrink}>`;
    html += `<h3 class = "js_nameDrink"> ${drinkItem.strDrink}</h3>`;
    html += `img src ${drinkItem.strDrinkThumb} alt="Imagen Bebida" class ="img_drink"/>`;
    html += `</li>`;
  }
  totalDrinks.innerHTML = html;
  //llamamos la funcion
  listenerDrinks();
}
//INICIO FAVORITO
//saber a que drink le doy click
function handleClickDrink(event) {
  console.log('hola');
  const idDrink = event.currentTarget.id;

  //bsucamos si un drink esta en el listado de favpritos, byscando en el total de bebdias
  const drinkFavFound = favorites.find((favorites) => {
    return favorites.id === idDrink;
  });
  const drinkFavFoundIndex = favorites.findIndex((favorites) => {
    return favorites.id === idDrink;
  });
  //esto es si no lo encontro
  if (drinkFavFoundIndex === -1) {
    favorites.push(drinkFavFound);
  } else {
    //splice, elimina un elemento de mis favoritos
    favorites.splice(drinkFavFoundIndex, 1);
  }
  //pinta favoritos
  renderfavoriteDrinks(favorites);
}
//lista favpritos
function renderfavoriteDrinks(favoriteDrinks) {
  let htmlFavDrinks = '';
  for (const FavoriteItem of favoriteDrinks) {
    htmlFavDrinks += `<li class = "favdrink js_Favlistdrink"> ${FavoriteItem.idDrink}>`;
    htmlFavDrinks += `<h3 class = "favName js_FavnameDrink"> ${FavoriteItem.strDrink}</h3>`;
    htmlFavDrinks += `img src ${FavoriteItem.strDrinkThumb} alt="Imagen de Bebida" class ="img_drinkFav"/>`;
    htmlFavDrinks += `</li>`;
  }
  favoriteDrinks.innerHTML = htmlFavDrinks;
}

//filtrar nombres de drink cuando usuaria escribe en input
function handleInput(event) {
  event.preventDefault();
  const filter = input.value; //coge el valor que ingresa usuaria
  const listfilter = drinks.filter((drink) => {
    return drink.strDrink.toLowerCase().includes(filter.toLowerCase());
  });
  // rendertotalDrinks(listfilter);
}

//local storage, si esta o no
const listFavDrinks = JSON.parse(localStorage.getItem('listFavoDrinks'));
if (listFavDrinks !== null) {
  favoriteDrinks = listFavoDrinks; //guardo fav en lista de favoritos
  renderfavoriteDrinks(favoriteDrinks);
}
function handleClickSearch(event) {
  event.preventDefault();
  fetch(
    `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${input.value}`
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data.drinks);
      //salvar la info de bebidas
      drinks = data.drinks;

      localStorage.setItem('listFavDrinks', JSON.stringify(drinks));
      rendertotalDrinks(drinks);
    });
}
//boton reset
function handleClickReset() {
  input.value = '';
  localStorage.removeItem('listFavDrinks');
  favoriteDrinks.innerHTML = '';
  favorites = [];
  totalDrinks.innerHTML = '';
}

//evento
input.addEventListener('keyup', handleInput);
btnSearch.addEventListener('click', handleClickSearch);
btnReset.addEventListener('click', handleClickReset);
