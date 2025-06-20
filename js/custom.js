var LOG = {
	pageLenisScroll : function() {
		lenisScrollController = new Lenis({
			duration: 1.2,
			easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
			smooth: true,
			smoothTouch: false,
		});
	},
	mainVisualInitialize : function() {
		const videoWrapper = document.querySelector('.video-wrapper');

		window.addEventListener('scroll', () => {
			const scrollY = window.scrollY;

			// 마스크 크기 확대
			const baseSize = 95.6667;
			const maxSize = 5000;
			const newSize = Math.min(baseSize + scrollY * 3, maxSize);
			videoWrapper.style.webkitMaskSize = `${newSize}vw`;
			videoWrapper.style.maskSize = `${newSize}vw`;

			// 마스크 위치 이동 (Y값 20% → 55%)
			const startScroll = 0; // 마스크 위치 변경 시작 스크롤값
			const endScroll = 500;   // 마스크 위치 변경 완료 스크롤값
			const startY = 50;
			const endY = 53;

			let newY = startY;
			if (scrollY > startScroll) {
				const progress = Math.min((scrollY - startScroll) / (endScroll - startScroll), 1);
				newY = startY + (endY - startY) * progress;
			}

			videoWrapper.style.webkitMaskPosition = `48.1% ${newY}%`;
			videoWrapper.style.maskPosition = `48.1% ${newY}%`;
		});
	},	
}

$(document).ready(function() {
	function referenceTimeMode(scrollerTime) {
		lenisScrollController.raf(scrollerTime);
		requestAnimationFrame(referenceTimeMode);
	}

	LOG.pageLenisScroll();
	LOG.mainVisualInitialize();
	requestAnimationFrame(referenceTimeMode);
});
