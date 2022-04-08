'use strict';

const totalDrinks = document.querySelector('.js-totalDrinks');
const input = document.querySelector('.js-input');
const btnSearch = document.querySelector('.js-btnSearch');
const btnReset = document.querySelector('.js-btnReset');
const favoriteDrinks = document.querySelector('.js-favoriteDrinks');
let drinks = [];

fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita')
  .then((response) => response.json())
  .then((data) => {
    console.log(data.drinks);
    //salvar la info de bebidas
    drinks = data.drinks;
  });

//pintar y llamar la info
function renderListDrinks() {
  let html = '';
  for (const drinkItem of drinks) {
    html += `<li class = "js_listdrink" id= ${drinkItem.idDrink}>`;
    html += `<h3 class = "js_nameDrink"> ${drinkItem.strDrink}</h3>`;
    html += `img src ${drinkItem.strDrinkThumb} alt="Imagen Bebida" class ="img_drink" />`;
    html += `</li>`;
  }
  totalDrinks.innerHTML = html;
  //llamamos la funcion
  listenerDrinks();
}
