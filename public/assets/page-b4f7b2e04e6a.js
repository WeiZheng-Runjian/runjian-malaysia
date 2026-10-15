
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

	$require(['swiper'], function() {
		var swiper3 = new Swiper(".gallery-thumbs", {
			observer: true,
			observeParents: true,
			centeredSlides: true,
			centeredSlidesBounds: true,
			direction: "vertical",
			slideToClickedSlide: true,
			watchSlidesProgress: true,
			breakpoints: {
				769: { //当屏幕宽度小于等于768
					slidesPerView: 2,
					spaceBetween: 0,
					direction: "vertical",
				},
				300: { //当屏幕宽度小于等于768
					slidesPerView: 1,
					spaceBetween: 0,
					direction: "horizontal",
				},
			},
		});
		var swiper4 = new Swiper(".gallery-top", {
			autoHeight: true,
			observer: true,
			observeParents: true,
			navigation: {
				nextEl: ".gallery-top1 .swiper-button-next",
				prevEl: ".gallery-top1 .swiper-button-prev",
			},
  			pagination: {
				el: ".swiper-pagination3",
				clickable: true,
			},
  			autoplay: {
				delay: 3900,
				stopOnLastSlide: false,
				disableOnInteraction: true,
			},
			thumbs: {
				swiper: swiper3,
			},
		});
	})

	$require(['swiper'], function () {
		var mySwiper = new Swiper('.mySwiper_duocai', {
			slidesPerView: 1.9,
			spaceBetween: 50,
			loop: true,
			autoplay: {
				delay: 3000,
				stopOnLastSlide: false,
				disableOnInteraction: true,
			},
			speed: 1000,
			centeredSlides: true,
			observer: true,
			observeParents: true,
  			pagination: {
				el: ".swiper-pagination1",
				clickable: true,
			},
			breakpoints: {
				300: {
					slidesPerView: 1,
					spaceBetween: 10,
				},
				768: {
					slidesPerView: 1.9,
					spaceBetween: 40,
				}
			}
		})
	})

	$require(['swiper'], function () {
		var mySwiper = new Swiper('.mySwiper_wl', {
			slidesPerView: 3,
			spaceBetween: 40,
			loop: true,
			autoplay: {
				delay: 3400,
				stopOnLastSlide: false,
				disableOnInteraction: true,
			},
			speed: 1000,
			centeredSlides: true,
			observer: true,
			observeParents: true,
  			pagination: {
				el: ".swiper-pagination2",
				clickable: true,
			},
			breakpoints: {
				300: {
					slidesPerView: 1,
					spaceBetween: 10,
				},
				768: {
					slidesPerView: 3,
					spaceBetween: 40,
				}
			}
		})
	})

	$(function(){
  		var length=$('.swiper.xg_news .p_nodata').length;
       if(length){
  		$('#c_static_001-17188783707520').hide();
      }
   })
