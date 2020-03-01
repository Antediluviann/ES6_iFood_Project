// IMPORT FROM OTHER MODULES

import * as path from './path.js';
import * as paginationItems from './pagination.js';
const {subButton, input, calMin, calMax, recipesPage, recipesCounter, health, diet, leftArrow, rightArrow, paginationNumbers, paginationItem, loader, url} = path;
const {previousPage, nextPage} = paginationItems;

// GIF LOADER 

const gif = document.createElement('img');

gif.setAttribute('src', './img/loader.gif');
loader.appendChild(gif);
loader.style.display = 'none';

// BUTTON ENABLE/DISABLE FUNCTION

const buttonEnableDisable = () => {

	if (input.value.length > 3 ) {
	    subButton.disabled = false;
	}
	else {
	    subButton.disabled = true;
	}
}

// FUNCTIONS FOR SUBMITING VALUES, SENDING THE REQUESTS, LISTING RECIPES AND ADDING RECIPE CARDS 

const submit = () => {
	
	sessionStorage.setItem('inputValue', input.value);
	sessionStorage.setItem('healthValue', health.value);
	sessionStorage.setItem('dietValue', diet.value);
	sessionStorage.setItem('calMinValue', calMin.value);
	sessionStorage.setItem('calMaxValue', calMax.value);

	input.value.trim() && reqData(input);
	input.value = '';
	health.value = '';
	diet.value = '';
	calMin.value = '';
	calMax.value = '';
}

const reqData = searchValue => {

	loader.style.display = 'block';
	fetch(url(input.value, health.value, diet.value, calMin.value, calMax.value), {
		method: 'GET',
		headers: {
			"apiKey": "eb350133d3efbfbe950d3263917eb376"
		}
	})
	.then(response => response.json())
	.then(data => {
		
		listRecipe(data);
		loader.style.display = 'none';
	})
	.catch(error => console.log(error))
}

const listRecipe = recipes => {
	recipesPage.innerHTML = '';
	recipesCounter.innerHTML = recipes.count;
	pagination(recipes);

	const recipesGroup = recipes.hits;

	recipesGroup.forEach( recipes => {
		
		addCard(recipes);		
	})	  
}

const addCard = recipe => {

	const foodCard = document.createElement('div');
	foodCard.classList.add('recipe-element');
	
	const foodName = `<h3>${recipe.recipe.label}</h3>`;
	const foodImg = `<img src="${recipe.recipe.image}" />`;
	const foodCalories = `<span class="calories" >${Math.ceil(recipe.recipe.calories / recipe.recipe.yield)}</span>`;

	const list = recipe.recipe.healthLabels;
	const healthLabelsList = [];

	for(var i = 0; i < list.length; i++) {
		const healthLabels = `<label class="label">${list[i]}</label>`;
		healthLabelsList[healthLabelsList.length] = healthLabels;
	}

	const healthLabelsContainer = `<div class="labels">${healthLabelsList}</div>`;

	foodCard.innerHTML = `${foodImg}${foodName}${foodCalories}${healthLabelsContainer}`;

	recipesPage.appendChild(foodCard);

	return foodCard
}

// FUNCTION FOR ADDING PAGINATION

const pagination = recipes => {

	paginationItem.style.display = 'flex';
	paginationNumbers.innerHTML = '';

	const numbersOfRecepies = recipes.count + 1;
	const numberOfPages = Math.ceil(numbersOfRecepies / 10);
	
	const pagesArr = [];

	for(var i = 1; i < numberOfPages; i++){
		pagesArr[pagesArr.length] = i
	}
	
	pagesArr.forEach( item => {

		const elem = document.createElement('span');
		elem.classList.add('paginationItem');
		elem.innerHTML =  item ;
		paginationNumbers.appendChild(elem);
		elem.addEventListener('click', () => {
			pageData(item)
			});		
	})	 
}

// FUNCTION FOR DISPLAYING DATA ON PAGE

const pageData = num => {

	loader.style.display = 'block';
	fetch(url(sessionStorage.inputValue, sessionStorage.healthValue, sessionStorage.dietValue, sessionStorage.calMinValue, sessionStorage.calMaxValue, num), {
		method: 'GET',
		headers: {
			"apiKey": "eb350133d3efbfbe950d3263917eb376"
		}
	})
	.then(response => response.json())
	.then(data => {
		listRecipe(data);
		loader.style.display = 'none';
	})
	.catch(error => console.log(error))
}

leftArrow.addEventListener('click', previousPage);
rightArrow.addEventListener('click', nextPage);

input.addEventListener('keyup', buttonEnableDisable);
subButton.addEventListener('click', submit);