
	$(function() {
		var wWidth = $(window).width(); //获取bai可du视zhi区域dao高zhuan度shu
		if (wWidth > 769) {
			$('.nav-item').each(function() {
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
			
			$('.navContRel2').mouseenter(function(event) {
				//$('.header_bac').show();
                $(this).find(".slide-nav").addClass("new_act");
                $(this).find(".slide-bac").css({"width":$(window).width(),"left":-$(this).offset().left}).addClass("active");  
                $(this).find(".slide-bac").stop().slideDown();
                $(this).find(".slide-nav").stop().slideDown();
			})
			
			$('.navContRel2').mouseleave(function(event) {
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

		$('.nav-item').each(function() {
			$(this).find('.nav_dj_left_t:nth-child(1)').addClass('cur');
			$(this).find('.nav_dj_Right_li:nth-child(1)').addClass('cur');

			$(this).find('.nav_dj_Ri_fl').children('.nav_dj_Cen_ej_li:nth-child(1)').addClass('cur');
			$(this).find('.nav_dj_Ri_ri').find('.nav_dj_Cen_sj:nth-child(1)').addClass('cur');

			$('.nav_dj_left_t').hover(function(event) {
				$(this).show().addClass('cur');
				$(this).siblings().removeClass('cur');

				$('.nav_dj_Right_li').eq($(this).index()).addClass('cur');
				$('.nav_dj_Right_li').eq($(this).index()).siblings().removeClass('cur');
			})
			$('.nav_dj_Cen_ej_li').hover(function(event) {
				$(this).show().addClass('cur');
				$(this).siblings().removeClass('cur');

				$(this).parent('.nav_dj_Ri_fl').siblings('.nav_dj_Ri_ri').find('.nav_dj_Cen_sj').eq($(this).index()).addClass('cur');
				$(this).parent('.nav_dj_Ri_fl').siblings('.nav_dj_Ri_ri').find('.nav_dj_Cen_sj').eq($(this).index()).siblings().removeClass('cur');
			})
		});

	})

$(document).ready(function() {
    // 移除播放控件
    $('.e_bannerA-2 video').prop('controls', false);
});
 	/*导航加类名*/
	$(function() {
		$('.header').addClass('active1');
	})

	$require(['swiper'], function() {
		var mySwiper = new Swiper('.mySwiper_yy', {
			//autoplay: {
			//delay: 2500,
			//stopOnLastSlide: false,
			//disableOnInteraction: true,
			//},
			//  loop:true,

			slidesPerView: 4.5,
			spaceBetween: 20,

			speed: 5000,
			freeMode: true,
			loop: true,
			autoplay: {
				delay: 1,
				stopOnLastSlide: false,
				disableOnInteraction: false,
				pauseOnMouseEnter: true,
			},
			breakpoints: {
				300: {
					slidesPerView: 2,
					spaceBetween: 10,
				},
				769: { //当屏幕宽度大于等于768 
					slidesPerView: 4.8,
					spaceBetween: 20,
				},
				1440: { //当屏幕宽度大于等于768 
					slidesPerView: 4.5,
					spaceBetween: 20,
				}
			},
			observer: true,
			observeParents: true,
		})

		let nextTransForm = "";
		let nextTime = 0;
		// 鼠标悬浮暂停轮播
		mySwiper.el.onmouseenter = function() {
			nextTransForm = document
				.getElementsByClassName("mySwiper_yy")[0]
				.getElementsByClassName("swiper-wrapper")[0].style.transform;
			// 轮播图原本应移动到的位置
			let nextTransPosition = -1 *
				parseInt(
					document
					.getElementsByClassName("mySwiper_yy")[0]
					.getElementsByClassName("swiper-wrapper")[0]
					.style.transform.split("translate3d(")[1]
					.split("px")[0]
				);

			// 鼠标悬浮时时轮播图位置
			let nowTransPosition = -1 *
				parseInt(
					window
					.getComputedStyle(
						document
						.getElementsByClassName("mySwiper_yy")[0]
						.getElementsByClassName("swiper-wrapper")[0],
						false
					)["transform"].split("1, ")[2]
					.split(",")[0]
				);
			// 存放鼠标悬浮时轮播图的真实transform属性（非行内属性）
			let nowTransForm = window.getComputedStyle(
				document
				.getElementsByClassName("mySwiper_yy")[0]
				.getElementsByClassName("swiper-wrapper")[0],
				false
			)["transform"];
			// 计算轮播图从暂停位置移动到原本应到的位置所用的时间（370是我自定义的每个slide的宽度）
			nextTime = 5500 * ((nextTransPosition - nowTransPosition) / 370);
			// 改变行内transform属性
			document
				.getElementsByClassName("mySwiper_yy")[0]
				.getElementsByClassName(
					"swiper-wrapper"
				)[0].style.transform = nowTransForm;
			// 不写也没关系
			document
				.getElementsByClassName("mySwiper_yy")[0]
				.getElementsByClassName(
					"swiper-wrapper"
				)[0].style.transitionDuration = "0ms";
			mySwiper.autoplay.stop();
		};
		// 鼠标离开轮播图开始轮播
		mySwiper.el.onmouseleave = function() {
			
			// 恢复原样
			document
				.getElementsByClassName("mySwiper_yy")[0]
				.getElementsByClassName(
					"swiper-wrapper"
				)[0].style.transform = nextTransForm;
			document
				.getElementsByClassName("mySwiper_yy")[0]
				.getElementsByClassName("swiper-wrapper")[0]
				.style.transitionDuration = nextTime + "ms";
			mySwiper.autoplay.start();

		};
	});



$(function(){
  $(".zdl_box").mCustomScrollbar();
})

