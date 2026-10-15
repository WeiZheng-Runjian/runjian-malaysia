
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
		var swiper = new Swiper('.swiper_fzlc', {
		//	loop: true,
			slidesPerView: 5,
			spaceBetween: 45,
			watchSlidesProgress: true,
			slidesOffsetBefore: 0,
  			autoplay: {
              delay: 100000,
              stopOnLastSlide: false,
              disableOnInteraction: true,
            },
			breakpoints: {
				300: {
					slidesPerView: 2,
					spaceBetween: 10,
					slidesOffsetBefore: 0,
				},
				769: {
					slidesPerView: 5,
					spaceBetween: 45,
					slidesOffsetBefore: 10,
				}
			},
			on: {
				setTranslate: function() {
					slides = this.slides
					for (i = 0; i < slides.length; i++) {
						slide = slides.eq(i);
						progress = slides[i].progress;

						slide.css({
							'background': ''
						});
						slide.transform(''); //清除样式
						if ($(window).width() >= 1440) {
							slide.transform('translate3d(0,' + Math.sin(progress + 5.2) * -200 + 'px, 0)');
						} else if ($(window).width() >= 769) {
							slide.transform('translate3d(0,' + Math.sin(progress + 5) * -180 + 'px, 0)');
						} else {
							slide.transform('translate3d(0,' + Math.sin(progress) + 'px, 0)');
						}

					}
				},
			}
		});
	})

	$(function() {
		$('.fBiao:nth-child(1)').addClass('cur');
		$('.honItem:nth-child(1)').addClass('cur');

		$('.fBiao').click(function(event) {
			$(this).show().addClass('cur');
			$(this).siblings().removeClass('cur');

			$('.honItem').eq($(this).index()).addClass('cur');
			$('.honItem').eq($(this).index()).siblings().removeClass('cur');
		})
	});

	$require(['swiper'], function() {
		var mySwiper = new Swiper('.mySwiper_fl', {
            navigation: {
				nextEl: ".swiper_next1",
				prevEl: ".swiper_prev1",
			},
			breakpoints: {
				300: {
					slidesPerView: 3,
					spaceBetween: 10,
				},
				768: { //当屏幕宽度大于等于768 
					slidesPerView: 6,
					spaceBetween: 15,
				}
			},
			observer: true,
			observeParents: true,
		})
	});

$(function () {
  $('.Honor:nth-child(1)').addClass('cur');
  $('.Honor').hover(function (event) {
    $(this).show().addClass('cur');
    $(this).siblings().removeClass('cur');
  })
});


	$(function(){
  		var length=$('.swiper.xg_news .p_nodata').length;
       if(length){
  		$('#c_static_001-17188783707520').hide();
      }
   })
