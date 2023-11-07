document.addEventListener('DOMContentLoaded', (event) => {
	intro();
});

async function intro() {
	const gsapScript = await loadScript('https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js');

	const wrapper = document.querySelector('.wrapper');
	const intro = document.querySelector('.intro');
	const logo = document.querySelector('.intro__logo');
	const mask = document.querySelector('.intro__mask');
	const maskImg = document.querySelector('.intro__mask-img');

	if (!document.documentElement.classList.contains('has-scroll-smooth')) {
		bodyLockToggle();
	}

	const timeline = gsap.timeline();
	gsap.set(wrapper, { opacity: 1 });
	setTimeout(() => {
		timeline
			.fromTo(
				logo,
				{
					y: 100,
				},
				{
					y: 0,
					opacity: 1,
					duration: 2,
				}
			)
			.fromTo(
				mask,
				{
					y: 100,
					scaleY: 0,
				},
				{
					scaleY: 1,
					y: 0,
					opacity: 1,
					duration: 1,
				}
			)
			.fromTo(
				maskImg,
				{
					yPercent: 100,
				},
				{
					yPercent: 0,
					opacity: 1,
					duration: 1,
					onComplete: () => {
						setTimeout(() => {
							destroy();
						}, 1000);
					},
				}
			);
	}, 1000);

	function destroy() {
		gsap.to([logo, mask], {
			opacity: 0,

			onComplete: () => {
				intro.remove();

				if (!document.documentElement.classList.contains('has-scroll-smooth')) {
					bodyLockToggle();
				}

				gsapScript.remove();
			},
		});
	}
}

function loadScript(src) {
	return new Promise((resolve, reject) => {
		const script = document.createElement('script');
		script.src = src;
		script.onload = () => resolve(script);
		script.onerror = () => reject(new Error('cannot load script'));
		document.querySelector('head').append(script);
	});
}

let bodyLockStatus = true;
let bodyLockToggle = (delay = 500) => {
	if (document.documentElement.classList.contains('lock')) {
		bodyUnlock(delay);
	} else {
		bodyLock(delay);
	}
};

let bodyUnlock = (delay = 500) => {
	let body = document.querySelector('body');
	if (bodyLockStatus) {
		let lock_padding = document.querySelectorAll('[data-lp]');
		setTimeout(() => {
			for (let index = 0; index < lock_padding.length; index++) {
				const el = lock_padding[index];
				el.style.paddingRight = '0px';
			}
			body.style.paddingRight = '0px';
			document.documentElement.classList.remove('lock');
		}, delay);
		bodyLockStatus = false;
		setTimeout(function () {
			bodyLockStatus = true;
		}, delay);
	}
};

let bodyLock = (delay = 500) => {
	let body = document.querySelector('body');
	if (bodyLockStatus) {
		let lock_padding = document.querySelectorAll('[data-lp]');
		for (let index = 0; index < lock_padding.length; index++) {
			const el = lock_padding[index];
			el.style.paddingRight = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
		}
		body.style.paddingRight = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
		document.documentElement.classList.add('lock');

		bodyLockStatus = false;
		setTimeout(function () {
			bodyLockStatus = true;
		}, delay);
	}
};
