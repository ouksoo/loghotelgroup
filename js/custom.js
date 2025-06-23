
//category change
function filterByCategory(category) {
	$('.card').each(function () {
		const itemCat = $(this).data('category');
		if (category === 'all' || itemCat === category) {
			$(this).stop(true, true).fadeIn(300);
		} else {
			$(this).stop(true, true).fadeOut(300);
		}
	});
}

var LOG = {
	pageLenisScroll : function() {
		lenisScrollController = new Lenis({
			duration: 1.2,
			easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
			smooth: true,
			smoothTouch: false,
		});
	},
	navigationInitialize : function() {
		let lastScrollpos = window.pageYOffset;
		let menuButtonCheck = document.querySelector(".menu-btn");
		window.onscroll = function() {
			let currentScrollPos = window.pageYOffset;
			if (lastScrollpos > currentScrollPos) {
				$('.top-nav').css('top', '0');
			} else {
				$('.top-nav').css('top', '-75px');
			}
			lastScrollpos = currentScrollPos;
			menuButtonCheck.checked = false;
		} 
	},
	mainVisualInitialize : function() {
		const videoWrapper = document.querySelector('.video-wrapper');

		window.addEventListener('scroll', () => {
			const scrollY = window.scrollY;

			// 마스크 크기 확대
			const baseSize = 88.6667;
			const maxSize = 4800;
			const newSize = Math.min(baseSize + scrollY * 3, maxSize);
			videoWrapper.style.webkitMaskSize = `${newSize}vw`;
			videoWrapper.style.maskSize = `${newSize}vw`;

			// 마스크 위치 이동 (Y값 20% → 55%)
			const startScroll = 0; // 마스크 위치 변경 시작 스크롤값
			const endScroll = 500;   // 마스크 위치 변경 완료 스크롤값
			const startY = 50;
			const endY = 52;

			let newY = startY;
			if (scrollY > startScroll) {
				const progress = Math.min((scrollY - startScroll) / (endScroll - startScroll), 1);
				newY = startY + (endY - startY) * progress;
			}

			videoWrapper.style.webkitMaskPosition = `48.1% ${newY}%`;
			videoWrapper.style.maskPosition = `48.1% ${newY}%`;
		});
	},
	mainSlideSwiperBrand : function() {
		var BrandSwipersHotel = new Swiper(".hotel-drip-drop", {
			navigation: {
				nextEl: ".drip-next",
				prevEl: ".drip-prev",
			},
		});

		var BrandSwipersHouse = new Swiper(".the-water-house", {
			navigation: {
				nextEl: ".water-next",
				prevEl: ".water-prev",
			},
		});
	},
	experienceCategorySelect : function() {
		$('.custom-select').on('click', function () {
			$('.custom-options').toggle();
		});
		$('.custom-options div').on('click', function () {
			const category = $(this).data('category');
			$('.custom-select').text($(this).text());
			$('.custom-options').hide();

			$('.category-filter div').removeClass('active');
			$('.category-filter div[data-category="' + category + '"]').addClass('active');

			filterByCategory(category);
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
	LOG.navigationInitialize();
	LOG.mainSlideSwiperBrand();
	LOG.experienceCategorySelect(); //custom select box
	requestAnimationFrame(referenceTimeMode);
});


