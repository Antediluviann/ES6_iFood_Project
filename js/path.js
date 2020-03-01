// GLOBAL VARIABLES, KEY AND ID

const subButton = document.querySelector('.search-button');
const input = document.querySelector('.keyword-input');
const calMin = document.querySelector('.min-calories-input');
const calMax = document.querySelector('.max-calories-input');
const recipesPage = document.querySelector('#recipes');
const recipesCounter = document.querySelector('.recipe-count-number');
const health = document.querySelectorAll('#food-form select')[0];
const diet = document.querySelectorAll('#food-form select')[1];
const leftArrow = document.querySelector('.left-arrow');
const rightArrow = document.querySelector('.right-arrow');
const paginationNumbers = document.querySelector('.paginationNumbers');
const paginationItem = document.querySelector('.pagination');
const loader = document.querySelector('.loader');

const url = (input, health, diet, calMin, calMax, num = 0) => {

	const key = 'eb350133d3efbfbe950d3263917eb376';
	const id = '5ab3022e';
	let url;
	let pathPart =  `https://api.edamam.com/search?q=${input}`;
	let parts = `&app_id=${id}&app_key=${key}&count=10&from=${num}0`;

	let healthValue = '';

	if(health.value) {
		healthValue =  `&health=${health}`;
	}
	
	let dietValue = '';

	if(diet.value) {
		dietValue = `&diet=${diet}`;
	}

	let healthAndDietPart = `${healthValue}${dietValue}`; 

	let calMinValue = '';
	let calMaxValue = '';
	if(calMin && calMax) {
		calMinValue = `&calories=${calMin}`;
		calMaxValue = `-${calMax}`;
	}
	
	let caloriesPart = `${calMinValue}${calMaxValue}`;

	url = `${pathPart}${healthAndDietPart}${parts}${caloriesPart}`;

	return url;
}

export {subButton, input, calMin, calMax, recipesPage, recipesCounter, health, diet, leftArrow, rightArrow, paginationNumbers, paginationItem, loader, url};
