
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
		var index_banner = new Swiper('.syBanner', {
			slidesPerView: 1,
			loop: true,
			/*navigation: {
			nextEl: ".swiper_next",
			prevEl: ".swiper_prev",
			},*/
			effect: 'fade',
			fadeEffect: {
				crossFade: true
			},
			speed: 900,
			autoplay: {
				delay: 4000,
				stopOnLastSlide: false,
				disableOnInteraction: true,
			},
			speed: 1000,
			observer: true,
			observeParents: true,
			on: {
				init: function(swiper) {
					$('.syBanner .swiper-slide').each(function() {
						if ($(this).attr('data-swiper-slide-index') == '0') {
							$(this).addClass('hover')
						}
					})
					this.emit('transitionEnd');
				},
				transitionEnd: function(swiper) {
			
					if ($('.swiper-slide-active').find('video').length) {
						$('.swiper-slide-active').find('video').get(0).play();
						setTimeout(function() {
							index_banner.autoplay.stop();
						}, 3000);
						$('.swiper-slide-duplicate-active video').on('ended', function() {
							index_banner.slideNext(3500);
							index_banner.autoplay.start();
						});
					} else {
						index_banner.autoplay.start();
						$('.syBanner .swiper-slide').each(function(ind, ele) {
							if ($(ele).find('video').length) {
								$(ele).find('video').get(0).currentTime = 0;
								$(ele).find('video').get(0).pause();
							}
						})
					}
				},
			},
		})
	});


$(function () {
  $('.fwLI:nth-child(1)').addClass('cur');
  $('.fwItem:nth-child(1)').addClass('cur');
  $('.cnBj:nth-child(1)').addClass('cur');
  $('.fwItem').hover(function (event) {
    $(this).show().addClass('cur');
    $(this).siblings().removeClass('cur');

    $('.fwLI').eq($(this).index()).addClass('cur');
    $('.fwLI').eq($(this).index()).siblings().removeClass('cur');
  
    $('.cnBj').eq($(this).index()).addClass('cur');
    $('.cnBj').eq($(this).index()).siblings().removeClass('cur');
  })
});

	$(function() {
		$('.cpList_b:nth-child(1)').addClass('cur');
		$('.cpItem:nth-child(1)').addClass('cur');
		$('.cpList_b').hover(function(event) {
			$(this).show().addClass('cur');
			$(this).siblings().removeClass('cur');

			$('.cpItem').eq($(this).index()).addClass('cur');
			$('.cpItem').eq($(this).index()).siblings().removeClass('cur');
		})



		$('.cpItem').each(function() {
			var divE = $(this).children('.cpLeft').find(".cpsjList");
			
			if (divE.height() > 210) {
				divE.addClass('zdl_box'); // 添加新的类名
			}
		})
	});

	$(function() {
		$('.jjList_b:nth-child(1)').addClass('cur');
		$('.jjItem:nth-child(1)').addClass('cur');
		$('.jjList_b').hover(function(event) {
			// 移除所有子元素上的 active, pre, next 类名
			$(this).siblings().removeClass('cur pre next');
			$(this).removeClass('pre next');
			// 添加 active 类名到被点击的元素
			$(this).addClass('cur');

			$('.jjItem').eq($(this).index()).siblings().removeClass('cur pre next');
			$('.jjItem').eq($(this).index()).removeClass('pre next');
			$('.jjItem').eq($(this).index()).addClass('cur');
			$('.jjItem').eq($(this).index()).prevAll('.jjItem').addClass('pre');
			$('.jjItem').eq($(this).index()).nextAll('.jjItem').addClass('next');
		});
		
		$('.jjItem .jjliebiao_li:nth-child(1)').addClass('cur');
		$('.jjItem .jjliebiao_li').hover(function(event) {
			$(this).show().addClass('active');
			$(this).siblings().removeClass('active');
		})
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

/*首页动效*/
ScrollTrigger.create({
  trigger: '#c_static_001-1722408412961',
  start: 'top top',
  end: '+=800',
  scrub:true,
  animation:
  gsap.timeline()
  .fromTo('#c_static_001-1722408412961 .c_banner_020' ,{y:'0'}, {y:'260px'})
});

ScrollTrigger.create({
  trigger: '#c_static_001-1724132753152',
  start: 'top top',
  end: '+=500',
  scrub:true,
  animation:
  gsap.timeline()
  .fromTo('#c_static_001-1724132753152' ,{y:'0'}, {y:'150px'})
});

ScrollTrigger.create({
  trigger: '#c_static_001-1718259464551',
  start: 'top bottom',
  end: '+=800',
  scrub:true,
  animation:
  gsap.timeline()
  .fromTo('#c_static_001-1718259464551 .e_image-11 img' , 6 ,{scale: 1.3}, {scale: 1},'-=6')
});

ScrollTrigger.create({
  trigger: '#c_static_001-1718688038668',
  start: 'top bottom',
  end: '+=500',
  scrub:true,
  animation:
  gsap.timeline()
  .fromTo('#c_static_001-1718688038668 .e_image-1 img' , {scale: 1.5}, {scale: 1})
});

  
  
const lenis = new Lenis()
lenis.on('scroll', ScrollTrigger.update)
gsap.ticker.add((time)=>{
lenis.raf(time * 1000)
})
gsap.ticker.lagSmoothing(0)

$(function(){
  $(".zdl_box").mCustomScrollbar();
})

