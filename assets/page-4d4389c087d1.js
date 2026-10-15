
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

$(function() {
  $('.alLi:nth-child(1)').addClass('cur');
  $('.allist:nth-child(1)').addClass('cur');
  $('.alLi').hover(function(event) {
    $(this).show().addClass('cur');
    $(this).siblings().removeClass('cur');

    $('.allist').eq($(this).index()).addClass('cur');
    $('.allist').eq($(this).index()).siblings().removeClass('cur');
  })
});

$(function() {
  /*小图展示*/
  for (var i = 0; i < $(".allist").length; i++) {
    window[`mySwiper${i}`] = new Swiper('.al_box' + i + ' .al_swiper', {
      spaceBetween: 5,
      slidesPerView: 1,
      autoplay: {
         delay: 3000,
         stopOnLastSlide: false,
         disableOnInteraction: true,
      },
      pagination: {
        el: '.al_box' + i + ' .al_page',
        clickable: true,
      },
      observer: true,
	  observeParents: true,
      watchSlidesVisibility: true,
    });
  }
});
     
$(document).ready(function(){
       $('.fenTitle').click(function(event){
           event.preventDefault(); // 阻止默认行为，避免直接跳转
           var target = $(this).attr('href'); // 获取锚点目标
           $('html, body').animate({
               scrollTop: $(target).offset().top -100 // 平滑滚动到目标位置
           }, 1000); // 动画持续时间，单位毫秒
       });
   });
                        
	$(".p_c_mbtn").click(function() {
		$(".fenList").addClass("p_leftani");
		$(".p_c_mput").addClass("p_bg_show");
	});
	$(".p_c_mput").click(function() {
		$(".fenList").removeClass("p_leftani");
		$(this).removeClass("p_bg_show");
	});

	$(function(){
  		var length=$('.swiper.xg_news .p_nodata').length;
       if(length){
  		$('#c_static_001-17188783707520').hide();
      }
   })
