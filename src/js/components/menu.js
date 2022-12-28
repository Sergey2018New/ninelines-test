import helpers from '../helpers';

/*
	  -------- 
	|   MENU   |
	  --------

	* Базовые селекторы:
		* .js-menu - обёртка меню
		* .js-menu-burger - кнопка "бургер" открытия/закрытия меню
        * .js-menu-body - основной блок меню
		* .js-menu-overlay - фоновая подложка
		* .js-menu-close - кнопка закрытия меню

    * Селекторы многоуровнего меню
		* .js-menu-dropdown - применяется для li элементов, у которых есть вложенное меню
        * .js-menu-link - селектор для открытия вложенного меню
        * .js-menu-submenu - вложенное меню
*/

function init(delay = 300, maxWidth = 991) {
    /* 
		@param  {number} delay - время открытия меню (также необходимо изменить в CSS)
		@param  {number} maxWidth - максимальная ширина браузера, при котором срабатывает вложенное меню при клике
	*/

    const menu = document.querySelector('.js-menu');

    if (!menu) return;
    
    const menuBurger = menu.querySelector('.js-menu-burger');
    const menuBody = menu.querySelector('.js-menu-body');
    const menuOverlay = menu.querySelector('.js-menu-overlay');
    const menuClose = menu.querySelector('.js-menu-close');
    const menuLinks = menu.querySelectorAll('.js-menu-link');
    let isMenu = true;

    if (menuBurger) {
        menuBurger.addEventListener('click', () => {
            if (menuBurger.classList.contains('is-active')) {
                closeMenu();
            } else {
                openMenu();
            }
        });
    }

    if (menuClose) {
        menuClose.addEventListener('click', () => {
            closeMenu();
        });
    }

    if (menuOverlay) {
        menuOverlay.addEventListener('click', () => {
            closeMenu();
        });
    }

    if (menuLinks.length) {
        menuLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
        
                if (window.innerWidth <= maxWidth) {
                    closeMenu()
                }
            })
        })
    }

    function openMenu () {
        if (isMenu) {
            isMenu = false;

            if (menuBurger) {
                menuBurger.classList.add('is-active');
            }

            if (menuOverlay) {
                menuOverlay.classList.add('is-active');
            }
            
            if (menuBody) {
                menuBody.classList.add('is-visible');

                setTimeout(() => {
                    menuBody.classList.add('is-active');
                }, 1);
            }
    
            helpers.$html.addClass('is-menu-active');

            setTimeout(() => {
                isMenu = true;
            }, delay);
        }
    }

    function closeMenu () {
        if (isMenu) {
            isMenu = false;

            if (menuBurger) {
                menuBurger.classList.remove('is-active');
            }

            if (menuOverlay) {
                menuOverlay.classList.remove('is-active');
            }
            
            if (menuBody) {
                menuBody.classList.remove('is-active');

                setTimeout(() => {
                    menuBody.classList.remove('is-visible');
                }, delay);
            }
            
            helpers.$html.removeClass('is-menu-active');

            setTimeout(() => {
                isMenu = true;
            }, delay);
        }
    }
}

export default {
	init
};
