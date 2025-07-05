
//category change
/*
function filterByCategory(category) {
	$('.experience-list .inner').each(function () {
		const itemCat = $(this).data('category');
		if (category === 'all' || itemCat === category) {
			$(this).stop(true, true).fadeIn(300);
		} else {
			$(this).stop(true, true).fadeOut(300);
		}
	});
}
*/
function filterByCategory(category) {
	$('.experience-list .inner').each(function () {
		const itemCats = $(this).data('category').toString().split(' ');
		if (category === 'all' || itemCats.includes(category)) {
			$(this).stop(true, true).fadeIn(300);
		} else {
			$(this).stop(true, true).fadeOut(300);
		}
	});
}

//link test
function navigate(event, actualUrl) {
	event.preventDefault();
	window.location.href = actualUrl;
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

		if($('body').hasClass('main-page')) {
			window.onscroll = function() {
				let currentScrollPos = window.pageYOffset;
				if (lastScrollpos > currentScrollPos) {
					$('.top-nav').css('top', '0');
				} else {
					$('h1.logo').css('top', '30px');
				}
				lastScrollpos = currentScrollPos;
				menuButtonCheck.checked = false;
			} 
		}

		$('label.menu-icon').on('click', function (e) {
			$('.nav-films').toggleClass('active');
			if($('div.nav-films').hasClass('active')) {
				$('.nav-films').fadeIn();
			}
			else {
				$('.nav-films').fadeOut();
			}
		});
	},
	//use main only
	mainVisualInitialize : function() {
		const videoWrapper = document.querySelector('.video-wrapper');

		if($(window).width() > 1200) {
			baseSize = 70;
			minSize = 70; 
		}
		else {
			baseSize = 88;
			minSize = 88; 
		}
		window.addEventListener('resize', () => {
			if($(window).width() > 1200) {
				baseSize = 70;
				minSize = 70; 
			}
			else {
				baseSize = 88;
				minSize = 88; 
			}
		});
		window.addEventListener('scroll', () => {
			const scrollY = window.scrollY;

			// 마스크 크기 확대
			const maxSize = 4800;
			const newSize = Math.min(
				Math.max(baseSize + scrollY * 3, minSize), // 최소값 보장
				maxSize                                    // 최대값 제한
			);
			//const newSize = Math.min(baseSize + scrollY * 3, maxSize);
			videoWrapper.style.webkitMaskSize = `${newSize}vw`;
			videoWrapper.style.maskSize = `${newSize}vw`;

			// 마스크 위치 이동 (Y값 20% → 55%)
			const startScroll = 0; // 마스크 위치 변경 시작 스크롤값
			const endScroll = 500;   // 마스크 위치 변경 완료 스크롤값
			const startY = 42;
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
	mainSlideSwiperBrand: function () {
		let hotelSwiper, houseSwiper;

		function initSwiper() {
			const isDesktop = window.innerWidth > 1200;

			// 먼저 이미 생성된 Swiper가 있다면 destroy
			if (hotelSwiper) {
				hotelSwiper.destroy(true, true);
				hotelSwiper = null;
			}
			if (houseSwiper) {
				houseSwiper.destroy(true, true);
				houseSwiper = null;
			}

			// 공통 옵션 + 분기처리
			const hotelOptions = {
				navigation: {
					nextEl: ".drip-next",
					prevEl: ".drip-prev",
				},
				...(isDesktop && {
					slidesPerView: 'auto',
  					centeredSlides: true,
					spaceBetween: 30,
					loop: true,
				}),
			};

			const houseOptions = {
				navigation: {
					nextEl: ".water-next",
					prevEl: ".water-prev",
				},
				...(isDesktop && {
					slidesPerView: 'auto',
  					centeredSlides: true,
					spaceBetween: 30,
					loop: true,
				}),
			};

			hotelSwiper = new Swiper(".hotel-drip-drop", hotelOptions);
			houseSwiper = new Swiper(".the-water-house", houseOptions);
		}

		// 초기 실행
		initSwiper();

		// 리사이즈 시 재실행
		let resizeTimer;
		window.addEventListener('resize', function () {
			clearTimeout(resizeTimer);
			resizeTimer = setTimeout(() => {
				initSwiper();
			}, 300);
		});
	},
	/*
	mainSlideSwiperBrand : function() {
		//main DRIP & DROP slide object
		var BrandSwipersHotel = new Swiper(".hotel-drip-drop", {
			navigation: {
				nextEl: ".drip-next",
				prevEl: ".drip-prev",
			},
		});

		//main THE WATER HOUSE slide object
		var BrandSwipersHouse = new Swiper(".the-water-house", {
			navigation: {
				nextEl: ".water-next",
				prevEl: ".water-prev",
			},
		});
	},
	*/
	experienceCategorySelect : function() {
		$('.custom-select').on('click', function (e) {
			e.preventDefault();
			$(this).toggleClass('active');
			$('.custom-options').toggle();
		});
		$('.custom-options div').on('click', function () {
			const category = $(this).data('category');
			$('.custom-select').text($(this).text()).removeClass('active');
			$('.custom-options').hide();

			$('.category-filter div').removeClass('active');
			$('.category-filter div[data-category="' + category + '"]').addClass('active');

			filterByCategory(category);
		});

		//card detail click
		$('a.show-detail').on('click', function (e) {
			e.preventDefault();
			$(this).toggleClass('active');
			$(this).next('.image').find('.info-detail').toggleClass('show');
		});
	},
	globalLinkStart : function() {
		//var url = "https://ouksoo77.mycafe24.com/log/";    
		var url = "http://127.0.0.1:5500/";

		$('.link-logo').on('click', function() {
			$(location).attr('href',url + "index.html");
		});
		$('.link-our-brand').on('click', function() {
			$(location).attr('href',url + "dripanddrop.html");
		});
		$('.link-our-experience').on('click', function() {
			$(location).attr('href',url + "experience.html");
		});
		$('.link-company').on('click', function() {
			$(location).attr('href',url + "company.html");
		});
		$('.link-contact').on('click', function() {
			$(location).attr('href',url + "contact.html");
		});
		$('.link-privacy').on('click', function() {
			
		});
		$('.link-terms').on('click', function() {
			
		});
	},
}

$(document).ready(function() {
	function referenceTimeMode(scrollerTime) {
		lenisScrollController.raf(scrollerTime);
		requestAnimationFrame(referenceTimeMode);
	}

	LOG.pageLenisScroll();
	LOG.navigationInitialize();
	LOG.mainSlideSwiperBrand();
	LOG.experienceCategorySelect(); //custom select box
	LOG.globalLinkStart();
	requestAnimationFrame(referenceTimeMode);

	$(document).on('click', function (e) {
		if (!$(e.target).closest('.custom-select-wrapper').length) {
			$('.custom-options').hide();
			$('.custom-select').removeClass('active');
		}
	});
});


