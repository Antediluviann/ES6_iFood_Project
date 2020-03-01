const moveMargin = where => {
	const elem = document.querySelector('.paginationItem');
	const width = elem.offsetWidth;

}

const positionSwitch = where => {

	const elem = document.querySelectorAll('.paginationItem');
	
	const firstElem = elem[1];
	const lastElem = elem[elem.length - 1];

	if(where === 'after') {
		lastElem.after(firstElem);	
	} else if (where === 'before') {
		firstElem.before(lastElem);
	}
}

const previousPage = () => {

	moveMargin('left');
	positionSwitch('before');
}

const nextPage = () => {
	
	positionSwitch('after');
	moveMargin('right');
}

export {previousPage, nextPage};