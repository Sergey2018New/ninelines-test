import helpers from '../helpers';

const init = (callback) => {
	const site = $('.site');
	const preloader = $('.js-preloader');
	const preloaderImage = $('.js-preloader-image');

	if (!preloader.length) {
		return;
	}

	const timeout = 800;
	let	imagesCount = $('img').length;
	let	percent = 100 / imagesCount;
	let	translateX = 0;
	let	translateY = 0;
	let	progress  = 0;
	let	loadedImg = 0;

	if (imagesCount > 0) {
		for (var i = 0; i < imagesCount; i++) {
			let imgCopy        = new Image();
			imgCopy.src        = document.images[i].src;
			imgCopy.onload     = imgLoad;
			imgCopy.onerror    = imgLoad;
		}

		function imgLoad () {
			progress += percent;
			loadedImg++;
			
			if (preloaderImage) {
				translateX = (window.innerWidth + preloaderImage.width()) * progress / 100;
				translateY = (window.innerHeight + preloaderImage.height()) * progress / 100 * (-1);

				preloaderImage.css({
					'-webkit-transform' : `translate(${translateX}px, ${translateY}px)`,
					'transform'         : `translate(${translateX}px, ${translateY}px)`
				  });
			}
			
			if (progress >= 100 || loadedImg === imagesCount) {
				preloader.removeClass('is-active');

                setTimeout(() => {
                    if (site.length) {
                        site.addClass('is-active');
                    }

					if (callback && typeof callback === 'function') {
						callback();
					}
                }, timeout);
			}
		}
	} else {
		preloader.removeClass('is-active');
	}
}

export default {
	init,
};

