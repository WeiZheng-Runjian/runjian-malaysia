
	$(function () {
		var wWidth = $(window).width(); //获取bai可du视zhi区域dao高zhuan度shu
		if (wWidth > 769) {
			$('.nav-item').each(function () {
				// 'this' 指向当前遍历的父元素
				if ($(this).find('.nav_dj_Cen_sj_li').length >= 1) {
					// 如果当前父元素下有子元素包含 'target-class'，则给该父元素添加 'new-parent-class'
					$(this).addClass('navContRel');
					$(this).find('.slide-nav').remove();
				} else {
					$(this).find('.slide_nav_dj').remove();
				};
				if ($(this).find('.slide-nav').length == 0) {
					// 如果当前父元素下有子元素包含 'target-class'，则给该父元素添加 'new-parent-class'
					$(this).addClass('navContRel1');
				}
				if ($(this).find('.slide-nav').length == 1) {
					// 如果当前父元素下有子元素包含 'target-class'，则给该父元素添加 'new-parent-class'
					$(this).addClass('navContRel2');
				}
			});
	
			$('.navContRel2').mouseenter(function (event) {
				//$('.header_bac').show();
				$(this).find(".slide-nav").addClass("new_act");
				$(this).find(".slide-bac").css({ "width": $(window).width(), "left": -$(this).offset().left }).addClass("active");
				$(this).find(".slide-bac").stop().slideDown();
				$(this).find(".slide-nav").stop().slideDown();
			})
	
			$('.navContRel2').mouseleave(function (event) {
				//$('.header_bac').hide();
				$(this).find(".slide-nav").removeClass("new_act");
				$(this).find(".slide-bac").removeClass("active");
				$(this).find(".slide-bac").stop().slideUp();
				$(this).find(".slide-nav").stop().slideUp();
			})
	
		}
		if (wWidth < 768) {
			$('.slide_nav_dj').remove();
		}
	
		$('.nav-item').each(function () {
			$(this).find('.nav_dj_left_t:nth-child(1)').addClass('cur');
			$(this).find('.nav_dj_Right_li:nth-child(1)').addClass('cur');
	
			$(this).find('.nav_dj_Ri_fl').children('.nav_dj_Cen_ej_li:nth-child(1)').addClass('cur');
			$(this).find('.nav_dj_Ri_ri').find('.nav_dj_Cen_sj:nth-child(1)').addClass('cur');
	
			$('.nav_dj_left_t').hover(function (event) {
				$(this).show().addClass('cur');
				$(this).siblings().removeClass('cur');
	
				$('.nav_dj_Right_li').eq($(this).index()).addClass('cur');
				$('.nav_dj_Right_li').eq($(this).index()).siblings().removeClass('cur');
			})
			$('.nav_dj_Cen_ej_li').hover(function (event) {
				$(this).show().addClass('cur');
				$(this).siblings().removeClass('cur');
	
				$(this).parent('.nav_dj_Ri_fl').siblings('.nav_dj_Ri_ri').find('.nav_dj_Cen_sj').eq($(this).index()).addClass('cur');
				$(this).parent('.nav_dj_Ri_fl').siblings('.nav_dj_Ri_ri').find('.nav_dj_Cen_sj').eq($(this).index()).siblings().removeClass('cur');
			})
		});
	
	})

	$(function () {
		var array = JSON.parse(localStorage.getItem('searchHistory')) || [];
		$('.p_btnCon').click(function () {
			var hisItem = $('.p_inputCon input').val();
			array.push(hisItem)
			if (array.length > 8) array = array.slice(-8);
			localStorage.setItem('searchHistory', JSON.stringify(array));
		});
		$(document).click(function (event) {
			if (!$(event.target).closest('.p_inputCon').length && !$(event.target).closest('.searchHistoryItem').length) {
				$('.p_inputCon input').removeClass('on');
				$('.searchHistoryItem').empty();
			}
		});
		$('.p_inputCon input').click(function () {
			array = JSON.parse(localStorage.getItem('searchHistory')) || [];
			var isArray = array.length;
			if (isArray !== 0) {
				$('.searchHistoryItem').empty();
				$(this).addClass('on');
				var l = $(this).parent().siblings('[name="searchUrl"]').val();
				var y = $('.p_selectCon .p_current .p_c_span').attr('data-v');
				$.each(array, function (index, value) {
					$('.searchHistoryItem').append('<p class="s_list"><a href="' + l + '?keywords=' + value + '&appIds=' + y + '">' + value + '</a><span><svg t="1688967686841" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1452" width="200" height="200"><path d="M952.311261 921.328619 542.892591 510.919389 950.154131 102.671381c8.53028-8.55177 8.53028-22.416546 0-30.967292-8.532327-8.55177-22.360264-8.55177-30.892591 0l-407.262564 408.248008L104.737436 71.704089c-8.53028-8.55177-22.36231-8.55177-30.892591 0-8.529257 8.55177-8.529257 22.416546 0 30.967292l407.262564 408.248008L71.687716 921.328619c-8.529257 8.55177-8.529257 22.416546 0 30.967292 4.26514 4.27435 9.856485 6.41306 15.446807 6.41306 5.590322 0 11.181667-2.13871 15.446807-6.41306l409.41867-410.409231 409.41867 410.409231c4.266164 4.27435 9.855462 6.41306 15.446807 6.41306 5.591345 0 11.17962-2.13871 15.446807-6.41306C960.841541 943.745165 960.841541 929.879366 952.311261 921.328619z" p-id="1453"></path></svg></span></p>');
				})
			}
			$('.s_list span').click(function () {
				var searchValue = $(this).siblings('a').text();
				var index = array.indexOf(searchValue);
				if (index !== -1) {
					array.splice(index, 1);
					localStorage.setItem('searchHistory', JSON.stringify(array));
				}
				$(this).closest('p').remove();
			});
		});
		$('.searchHistoryBox h5 span').click(function () {
			localStorage.removeItem('searchHistory');
			$('.searchHistoryItem').empty();
			$('.p_inputCon input').removeClass('on');
		});
		$('.p_inputCon input').blur(function () {
			if (!$('.searchHistory').is(":hover")) {
			}
		});
	});

	$(function () {
		var wWidth = $(window).width(); //获取bai可du视zhi区域dao高zhuan度shu
		if (wWidth > 768) {
			$('#c_static_001-17192952942610 .souso').click(function () {
				$(this).toggleClass('on');
				$('#c_effect_138-17580769568930').slideToggle();
			});
		}
	})
	
	$(function () {
		var wWidth = $(window).width(); //获取bai可du视zhi区域dao高zhuan度shu
		if (wWidth < 769) {
			$('#c_static_001-17192952942610 .souso').click(function () {
				event.preventDefault(); // 阻止默认行为（跳转到#）
	
				// 设置你要跳转的 URL
				var targetUrl = window.runjianURL("globalSearch.html");
	
				// 方法1: 使用 window.location.href (在当前窗口跳转)
				window.location.href = targetUrl;
	
				// 方法2: 使用 window.open() (打开新窗口/标签页)
				
			});
		}
	})
	

	// $require(['swiper'], function () {
	// 	var banner = new Swiper('.banner .swiper-container', {watchOverflow: false,
	// 		speed: 1000,
	// 		//loop: true,
	// 		/*autoplay: {
	// 		  delay: 3000,
	// 		  stopOnLastSlide: false,
	// 		  disableOnInteraction: false,
	// 		},*/
	// 		pagination: {
	// 			el: '.banner .swiper-pagination',
	// 			clickable: true,
	// 		},
	// 	})
	// })
	var swiperContainer = document.querySelector('.banner .swiper-container');

// 取消pointer-events: none
swiperContainer.style.pointerEvents = 'auto';

$require(['swiper'], function () {
    // 获取轮播图片数量
    var hasMultipleSlides = $('.banner .swiper-container .swiper-slide').length > 1;
    
    // 初始化轮播，根据图片数量动态启用轮播功能
    var banner = new Swiper('.banner .swiper-container', {watchOverflow: false,
        speed: 1000,
        pagination: {
            el: '.banner .swiper-pagination',
            clickable: true
        },
        // 只有多张图片时才开启循环和自动播放
        loop: hasMultipleSlides,
        autoplay: hasMultipleSlides ? {
            delay: 3000,
            disableOnInteraction: false
        } : false
    });
});

	$require(['swiper'], function () {
		var isMobile = window.matchMedia('(max-width: 768px)').matches;
		var swiper_top = new Swiper(".swiper_top", {
			spaceBetween: 0,
			slidesPerView: 1,
			loop: true,
			loopAdditionalSlides: 3,
			effect: isMobile ? 'slide' : 'fade',
			direction: "vertical",
			speed: 1000,
			breakpoints: {
				320: {
					direction: 'horizontal',
				},
				769: { //当屏幕宽度大于等于768 
					direction: "vertical",
					mousewheel: true,
					effect: 'fade', // 使用淡入淡出效果
					fadeEffect: {
						crossFade: true,
					},
				}
			},
			observer: true,
			observeParents: true,
		});
	
		var swiper1 = new Swiper(".swiper_zw", {
			loop: true,
			loopAdditionalSlides: 3,
			speed: 1000,
			mousewheel: true,
			breakpoints: {
				320: {
					slidesPerView: 1,
					spaceBetween: 5,
					direction: 'horizontal',
					autoplay: true,
				},
				769: { //当屏幕宽度大于等于768 
					spaceBetween: 25,
					slidesPerView: 1.7,
					direction: "vertical",
	
				}
			},
			pagination: {
				el: ".swiper-pagination4",
				clickable: true,
			},
			observer: true,
			observeParents: true,
		});
		if(swiper_top.controller && swiper1.controller) swiper_top.controller.control = swiper1;
		if(swiper1.controller && swiper_top.controller) swiper1.controller.control = swiper_top;
	});

	$require(['swiper'], function () {
		// 检测设备类型
  		const isMobile = window.matchMedia('(max-width: 768px)').matches;
		var swiper_top = new Swiper(".swiper_top", {
			spaceBetween: 0,
			slidesPerView: 1,
			direction: "vertical",
			effect: isMobile ? 'slide' : 'fade', // 使用淡入淡出效果
			loop: true,
			loopAdditionalSlides: 3,
			speed: 1000,
			breakpoints: {
				320: {
					direction: 'horizontal',
				},
				769: { //当屏幕宽度大于等于768 
					direction: "vertical",
					mousewheel: true,
					effect: 'fade', // 使用淡入淡出效果
					fadeEffect: {
						crossFade: true,
					},
				}
			},
			observer: true,
			observeParents: true,
		});
	
		var swiper1 = new Swiper(".swiper_zw", {
			loop: true,
			loopAdditionalSlides: 3,
			speed: 1000,
			mousewheel: true,
			breakpoints: {
				320: {
					slidesPerView: 1,
					spaceBetween: 5,
					direction: 'horizontal',
					autoplay: true,
				},
				769: { //当屏幕宽度大于等于768 
					spaceBetween: 25,
					slidesPerView: 1.7,
					direction: "vertical",
	
				}
			},
			pagination: {
				el: ".swiper-pagination4",
				clickable: true,
			},
			observer: true,
			observeParents: true,
		});
		if(swiper_top.controller && swiper1.controller) swiper_top.controller.control = swiper1;
		if(swiper1.controller && swiper_top.controller) swiper1.controller.control = swiper_top;
	});

$(function () {
  // 默认第一个元素激活
  $('.hyf_li:nth-child(1)').addClass('cur');
  $('.hyLi:nth-child(1)').addClass('cur');

  $('.hyf_li').click(function () {
    // 移除所有类
    $('.hyf_li').removeClass('cur pre next pre1 pre2 next1 next2');
    $('.hyLi').removeClass('cur pre1 pre2 next1 next2');

    // 获取当前 hover 的 .hyf_li 的索引
    var index = $(this).index();

    // 设置当前项
    $(this).addClass('cur');
    var $curLi = $('.hyLi').eq(index).addClass('cur');

    // 上一个、上两个
    if (index - 1 >= 0) $('.hyLi').eq(index - 1).addClass('pre1');
    if (index - 2 >= 0) $('.hyLi').eq(index - 2).addClass('pre2');

    // 下一个、下两个
    if (index + 1 < $('.hyLi').length) $('.hyLi').eq(index + 1).addClass('next1');
    if (index + 2 < $('.hyLi').length) $('.hyLi').eq(index + 2).addClass('next2');
  });
});

	$(function () {
		$('.topLi:nth-child(1)').addClass('cur');
		$('.hzList:nth-child(1)').addClass('cur');
		$('.topLi').hover(function (event) {
			$(this).show().addClass('cur');
			$(this).siblings().removeClass('cur');
	
			$('.hzList').eq($(this).index()).addClass('cur');
			$('.hzList').eq($(this).index()).siblings().removeClass('cur');
		})
	});
	
	
	
	$require(['swiper'], function () {
		new Swiper('.syCp_swiper0', {
			autoplay: {
				delay: 4000,
				stopOnLastSlide: false,
				disableOnInteraction: true,
			},
			slidesPerView: 3.5,
			spaceBetween: 30,
			breakpoints: {
				320: {
					slidesPerView: 1,
					spaceBetween: 5,
				},
				769: { //当屏幕宽度大于等于768 
					slidesPerView: 2.8,
					spaceBetween: 20,
				},
				1440: { //当屏幕宽度大于等于768 
					slidesPerView: 3.5,
					spaceBetween: 30,
				}
			},
			pagination: {
				el: ".hzList0 .swiper-pagination",
				clickable: true,
			},
			observer: true,
			observeParents: true,
		});
		new Swiper('.syCp_swiper1', {
			autoplay: {
				delay: 4000,
				stopOnLastSlide: false,
				disableOnInteraction: true,
			},
			slidesPerView: 3.5,
			spaceBetween: 30,
			breakpoints: {
				320: {
					slidesPerView: 1,
					spaceBetween: 5,
				},
				769: { //当屏幕宽度大于等于768 
					slidesPerView: 2.8,
					spaceBetween: 20,
				},
				1440: { //当屏幕宽度大于等于768 
					slidesPerView: 3.5,
					spaceBetween: 30,
				}
			},
			pagination: {
				el: ".hzList1 .swiper-pagination",
				clickable: true,
			},
			observer: true,
			observeParents: true,
		})
		new Swiper('.syCp_swiper2', {
			autoplay: {
				delay: 4000,
				stopOnLastSlide: false,
				disableOnInteraction: true,
			},
			slidesPerView: 3.5,
			spaceBetween: 30,
			breakpoints: {
				320: {
					slidesPerView: 1,
					spaceBetween: 5,
				},
				769: { //当屏幕宽度大于等于768 
					slidesPerView: 2.8,
					spaceBetween: 20,
				},
				1440: { //当屏幕宽度大于等于768 
					slidesPerView: 3.5,
					spaceBetween: 30,
				}
			},
			pagination: {
				el: ".hzList2 .swiper-pagination",
				clickable: true,
			},
			observer: true,
			observeParents: true,
		})
	});

	$(function () {
		$('.lr_zc .lr_zc_li:nth-child(1)').addClass('cur');
		$('.lr_zc .lr_zc_li:nth-child(2)').addClass('active');
		$('.lr_yc .lr_zc_li:nth-child(1)').addClass('active');
		$('.lr_yc .lr_zc_li:nth-child(2)').addClass('cur');

		$('.lr_zc .lr_zc_li').hover(function (event) {
			$(this).addClass('cur').removeClass('active');
			$(this).siblings().removeClass('cur').addClass('active');
		})

		$('.lr_yc .lr_zc_li').hover(function (event) {
			$(this).addClass('cur').removeClass('active');
			$(this).siblings().removeClass('cur').addClass('active');
		})
	});

$(function(){
  $(".zdl_box").mCustomScrollbar();
})

