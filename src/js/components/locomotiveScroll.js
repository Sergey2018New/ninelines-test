import helpers from '../helpers';
import LocomotiveScroll from 'locomotive-scroll';
import preloader from './preloader';

const sections = document.querySelectorAll('.js-section');

function scrollInit() {
    const scroll = new LocomotiveScroll({
        el: document.querySelector('[data-scroll-container]'),
        smooth: true,
        scrollFromAnywhere: true
    });

    // Scroll
    scroll.on('scroll', (func) => {
        const scrollTop = func.scroll.y;

        for (let index = 0; index < sections.length; index++) {
            const section = sections[index];
            const sectionTop = section.getBoundingClientRect().top + scrollTop;

            if ((scrollTop + window.innerHeight * 0.3) >= sectionTop) {
                const sectionId = section.getAttribute('id');
                const activeLink = document.querySelector('.js-scroll-to.is-active');
                let currentLink = document.querySelector(`.js-scroll-to[href="#${sectionId}"]`);
                
                if (activeLink) {
                    activeLink.classList.remove('is-active');
                }

                if (currentLink) {
                    currentLink.classList.add('is-active');
                }
            }
        }
    });

    // Progress and back to top
    const progressEl = document.querySelector('.js-progress');
    const backToTop = document.querySelector('.js-back-to-top');

    if (progressEl) {
        const progressCircleEl = progressEl.querySelector('.js-progress-circle');
        const progressPercentEl = progressEl.querySelector('.js-progress-percent');

        if (backToTop) {
            backToTop.addEventListener('click', () => {
                scroll.scrollTo(0);
            });
        }

        scroll.on('scroll', ({ limit, scroll }) => {
            const progress = (scroll.y / limit.y * 100).toFixed(0);
            let dasharray = `${progress * 48 * 3 / 100}px 450px`;
            
            if (backToTop && helpers.$html.hasClass('has-scroll-smooth')) {
                if (scroll.y + 200 >= limit.y) {
                    backToTop.classList.add('is-active');
                } else {
                    backToTop.classList.remove('is-active');
                }
            }

            if (progress >= 100) {
                progressEl.classList.add('is-finished');
            } else {
                progressEl.classList.remove('is-finished');
            }

            if (progressPercentEl) {
                progressPercentEl.innerHTML = `${progress} %`;
            }

            if (progressPercentEl) {
                progressPercentEl.setAttribute('style', `stroke-dasharray: ${dasharray}`);
            }
        })
    }
}

preloader.init(scrollInit);