import helpers from '../helpers';

/**
* Модуль "Возврат наверх"
*/
const init = () => {
	const className = '.js-back-to-top';
	const shownClass = 'is-active';

	helpers.$document.on('click.backTop', `${className}`, () => {
		helpers.scrollTo($('body'));
	});

	helpers.$window.on('scroll.backTop', () => {
		const scrollTop = window.pageYOffset;
		
		if (scrollTop >= (document.body.clientHeight - window.innerHeight - window.innerHeight / 2)) {
			$(className).addClass(shownClass);
		} else {
			$(className).removeClass(shownClass);
		}
	});
};

const destroy = () => {
	helpers.$window.off('.backTop');
	helpers.$document.off('.backTop');
};

export default {
	init,
	destroy,
};
