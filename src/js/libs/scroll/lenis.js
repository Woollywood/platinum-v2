import { gsap, ScrollTrigger } from 'gsap/all.js';
import SplitType from 'split-type';

gsap.registerPlugin(ScrollTrigger);

// const lenis = new Lenis();

// function raf(time) {
// 	lenis.raf(time);
// 	requestAnimationFrame(raf);
// }

// requestAnimationFrame(raf);

init();

function init() {
	splitTextInit();
	splitText();
	scrollScale();
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
				scrub: true,
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
				scrub: true,
			},
		});
	});
}
