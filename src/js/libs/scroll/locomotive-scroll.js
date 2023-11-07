import { gsap, ScrollTrigger } from 'gsap/all.js';
import LocomotiveScroll from 'locomotive-scroll';
import SplitType from 'split-type';
import 'locomotive-scroll/dist/locomotive-scroll.css';

gsap.registerPlugin(ScrollTrigger);

export const smoothScrolling = new LocomotiveScroll({
	el: document.querySelector('[data-scroll-container]'),
	smooth: true,
	tablet: true,
	smartphone: true,
});

smoothScrolling.on('scroll', ScrollTrigger.update);

ScrollTrigger.scrollerProxy('[data-scroll-container]', {
	scrollTop(value) {
		return arguments.length ? smoothScrolling.scrollTo(value, 0, 0) : smoothScrolling.scroll.instance.scroll.y;
	},
	getBoundingClientRect() {
		return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
	},
	pinType: document.querySelector('[data-scroll-container]').style.transform ? 'transform' : 'fixed',
});

new ResizeObserver(() => smoothScrolling.update()).observe(document.querySelector('[data-scroll-container]'));

window.addEventListener('load', event => {

	init();
})

ScrollTrigger.addEventListener('refresh', () => smoothScrolling.update());
ScrollTrigger.refresh();

function init() {
	parallax();
	splitTextInit();
	splitText();
	scrollScale();
	gsapFromTimeline();
}

function splitTextInit() {
	const splitTypes = document.querySelectorAll('[data-reveal-init]');
	splitTypes.forEach((char, i) => {
		const text = new SplitType(char, {
			types: 'chars, words',
		});

		gsap.from(text.words, {
			y: 100,
			opacity: 0,
			stagger: 0.06,
			duration: 0.1,

			scrollTrigger: {
				trigger: char,
				start: 'top 80%',
				end: 'top 20%',
				scroller: '[data-scroll-container]',
			},
		});
	});
}

function splitText() {
	const splitTypes = document.querySelectorAll('[data-reveal-type]');
	splitTypes.forEach((char, i) => {
		const text = new SplitType(char, {
			types: 'chars, words',
		});

		gsap.from(text.words, {
			y: 100,
			opacity: 0,
			stagger: 0.1,

			scrollTrigger: {
				trigger: char,
				start: 'top 80%',
				end: 'top 20%',
				scroller: '[data-scroll-container]',
			},
		});
	});
}

function scrollScale() {
	const scaleBlocks = document.querySelectorAll('[data-gsap-scale]');
	scaleBlocks.forEach((scaleBlock) => {
		gsap.from(scaleBlock, {
			scale: 0.8,
			scrollTrigger: {
				trigger: scaleBlock,
				start: 'top 70%',
				end: 'top 50%',
				scroller: '[data-scroll-container]',
			},
		});
	});
}

function gsapFromTimeline() {
	const gsapTimelineItems = document.querySelectorAll('[data-timeline]');
	gsapTimelineItems.forEach((timelineItem) => {
		const gsapItems = timelineItem.querySelectorAll('[data-timeline-from]');
		if (gsapItems) {
			const timeline = gsap.timeline();
			gsapItems.forEach((item) => {
				const direction = item.dataset.timelineFrom;
				switch (direction) {
					case 'right':
						timeline.from(item, {
							opacity: 0,
							xPercent: 60,
						});
						break;
					case 'left':
						timeline.from(item, {
							opacity: 0,
							xPercent: -60,
						});
						break;
					default:
						throw new Error('unknown direction');
				}
			});

			ScrollTrigger.create({
				trigger: timelineItem,
				start: 'top 70%',
				end: 'top 50%',
				scroller: '[data-scroll-container]',
				animation: timeline,
			});
		}
	});
}

function gsapFrom() {
	const gsapItems = document.querySelectorAll('[data-from]');
	gsapItems.forEach((item) => {
		console.log(item);

		gsap.from(item, {
			opacity: 0,
			xPercent: 60,
			duration: 1,
			scrollTrigger: {
				trigger: item,
				start: 'top 70%',
				end: 'top 50%',
				scroller: '[data-scroll-container]',
			},
		});
	});
}


function parallaxsImages() {
	const items = document.querySelectorAll('[data-parallax-item]');
	items.forEach((item) => {
		const image = item.querySelector('[data-parallax-image]');
		image && parallaxImage(item, image);
	});
}

function parallaxImage(item, image) {
	gsap.from(image, {
		scale: 0.8,
		scrollTrigger: {
			trigger: item,
			start: 'top 50%',
			end: 'top 20%',
			scroller: '[data-scroll-container]',
			scrub: true,
		},
	});
}
