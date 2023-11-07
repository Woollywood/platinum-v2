// Подключение функционала "Чертоги Фрилансера"
import { isMobile } from './functions.js';

// Подключение списка активных модулей
import { flsModules } from './modules.js';

import { gsap, TimelineLite } from 'gsap/all.js';

class Slider {
	constructor(element, options) {
		this._slider = element;
		this._sliderWrapper = element.querySelector('[data-slider-wrapper]');
		this._slides = element.querySelectorAll('[data-slide]');
		this._options = options;

		this._init();
		this._initPlugins();
	}

	_init() {
		this._spaceBetween = this._options.spaceBetween;

		this._breakpointsInit();

		this._readBreakpoints();
		window.addEventListener('resize', this._readBreakpoints.bind(this));
	}

	_initPlugins() {
		if (!this._options.plugins) {
			return;
		}

		this._plugins = new Map();
		for (const plugin of this._options.plugins) {
			this._plugins.set(plugin.name, new plugin(this));
		}
	}

	_breakpointsInit() {
		if (this._options.breakpoints) {
			this._breakpointsOption = new Map(Object.entries(this._options.breakpoints));
		}
	}

	_readBreakpoints() {
		for (const [breakpoint, option] of Object.entries(this._options.breakpoints).reverse()) {
			if (window.innerWidth >= breakpoint) {
				this._slidesPerView = option.slidesPerView;
				break;
			}
		}

		this._getSlidesWidth();
	}

	_getSlidesWidth() {
		const sliderWidth = this._slider.getBoundingClientRect().width;
		const sliderWidthWithNoGap = sliderWidth - (this._slidesPerView - 1) * this._spaceBetween;

		const slideWidth = sliderWidthWithNoGap / this._slidesPerView;
		this._slideWidth = slideWidth;

		this._slides.forEach((slide, index) => {
			slide.style.width = `${slideWidth}px`;

			if (index < this._slides.length - 1) {
				slide.style.marginRight = `${this._spaceBetween}px`;
			}
		});
	}
}

class SliderAnimation {
	constructor(sliderInstance) {
		this._sliderInstance = sliderInstance;
		this._init();
	}

	_init() {
		this._animationTimeline = gsap.timeline({ repeat: -1, repeatDelay: 2, yoyo: true });

		const slides = this._sliderInstance._slides;
		const fullWidth = Array.from(slides).reduce(
			(result, slide, index) =>
				(result +=
					slide.getBoundingClientRect().width +
					(index < slides.length - 1 ? this._sliderInstance._spaceBetween : 0)),
			0
		);
		const amountTranslate = fullWidth - window.innerWidth;

		const animation = {
			x: -amountTranslate,
			duration: 3 * this._sliderInstance._slides.length,
			ease: 'none',
		};

		this._animationTimeline.to(this._sliderInstance._sliderWrapper, animation);
	}
}

window.addEventListener('load', (event) => {
	const slider = new Slider(document.querySelector('.main-block__slider'), {
		spaceBetween: 20,
		breakpoints: {
			320: {
				slidesPerView: 2,
			},
			479: {
				slidesPerView: 4,
			},
			789: {
				slidesPerView: 4,
			},
			1280: {
				slidesPerView: 6,
			},
		},
		plugins: [SliderAnimation],
	});

	headerMenuItemHover();

	headerHeight();
	window.addEventListener('resize', headerHeight);

	floatingBallsInitStyle();
	window.addEventListener('resize', floatingBallsInitStyle);
});

function headerHeight() {
	const header = document.querySelector('.header');
	const headerBox = header.getBoundingClientRect();
	document.documentElement.style.cssText += `--header-height: ${headerBox.height}px`;
}

function floatingBallsInitStyle() {
	document.documentElement.style.cssText += `--window-height: ${window.innerWidth}px`;
}

function headerMenuItemHover() {
	const headerItems = document.querySelectorAll('[data-header-link]');
	headerItems.forEach((item) => {
		const hoverItemLeft = document.createElement('div');
		const hoverItemRight = document.createElement('div');

		hoverItemLeft.classList.add('menu__hover-item', 'menu__hover-item--left');
		hoverItemRight.classList.add('menu__hover-item', 'menu__hover-item--right');

		hoverItemLeft.innerHTML = '-';
		hoverItemRight.innerHTML = '-';

		item.append(hoverItemLeft);
		item.append(hoverItemRight);

		item.addEventListener('mouseenter', (e) => {
			e.target.classList.remove('_mouse-leave');
			e.target.classList.add('_mouse-enter');
		});

		item.addEventListener('mouseleave', (e) => {
			e.target.classList.remove('_mouse-enter');
			e.target.classList.add('_mouse-leave');
		});
	});
}