
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
	

	$require(['swiper'], function () {
	    var swiper1 = new Swiper(".swiper_zw", {
	        spaceBetween: 25,
	        slidesPerView: 2,
	        loop: true,
            mousewheel: true,
            speed:1000,
	        direction: "vertical",
	        slideToClickedSlide: true,
	        watchSlidesProgress: true,
	        observer: true,
	        observeParents: true,
	    });
	});

	$(function () {
		var wWidth = $(window).width(); // 获取可视区域宽度
		var controller = new ScrollMagic.Controller();
	
		if (wWidth > 769) {
			$(".zl_trigger").each(function (index, item) {
				var _tl = gsap.timeline()
	
				for (var i = 0; i <= index; i++) {
					_tl.to($(".hyLi")[i], { y: "-=3vw", scale: "-=.1", duration: .6 }, 0);
					_tl.to($(".hyLi")[i], { opacity: "-=.2", duration: .3 });
				}
				
				new ScrollMagic.Scene({
					duration: "30%",
					triggerHook: .4,
					triggerElement: $(this)[0]
				}).setTween(_tl).addTo(controller);
			})
		}
	})

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
	    navigation: {
	      nextEl: ".syCpli0 .swiper_next",
	      prevEl: ".syCpli0 .swiper_prev",
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
	    navigation: {
	      nextEl: ".syCpli1 .swiper_next",
	      prevEl: ".syCpli1 .swiper_prev",
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
	    navigation: {
	      nextEl: ".syCpli2 .swiper_next",
	      prevEl: ".syCpli2 .swiper_prev",
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

