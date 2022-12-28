import './vendor';
import './helpers';
import './components/social';
import {ieFix} from './vendor/ie-fix';
import {vhFix} from './vendor/vh-fix';
// import {actualYear} from './modules/actualYear';
import menu from './components/menu';
// import header from './components/header';
import lazyLoading from './modules/lazyLoading';
import scrollToAnchor from './modules/scrollToAnchor';
import backToTop from './modules/backToTop';

import './components/locomotiveScroll';

ieFix();
vhFix();
// actualYear();
scrollToAnchor.init();
backToTop.init();

menu.init(400, 1024);
// header.init();
lazyLoading.init();
