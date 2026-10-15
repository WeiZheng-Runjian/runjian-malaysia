
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

	/*$(".cpfyj").eq(0).addClass("act");
	$(".cplie_yj").eq(0).addClass("act");
	$(".p_slide").eq(0).addClass("act");
	$(".cpfyj").click(function () {
	  $(this).addClass("act");
	  $(this).siblings().removeClass("act");
	  //$(this).parents(".cpFLi").siblings(".cpFLi").find(".cpfej").removeClass("act");
	
	  $('.cplie_yj').eq($(this).index()).addClass('act');
	  $('.cplie_yj').eq($(this).index()).siblings().removeClass('act');

	  $('.p_slide').eq($(this).index()).addClass('act');
	  $('.p_slide').eq($(this).index()).siblings().removeClass('act');
	});*/
	
	
	
	$(".p_c_mbtn").click(function () {
	  $(".moList").addClass("p_leftani");
	  $(".p_c_mput").addClass("p_bg_show");
	});
	$(".p_c_mput").click(function () {
	  $(".moList").removeClass("p_leftani");
	  $(this).removeClass("p_bg_show");
	});
	
	$(".mofyj").click(function () {
	  $(this).find(".p_arrow").toggleClass("act");
	  $(this).siblings(".mo_slide").toggleClass("act");
	  $(this).parents(".moFLi").siblings(".moFLi").find(".mo_slide").removeClass("act");
	  $(this).parents(".moFLi").siblings(".moFLi").find(".p_arrow").removeClass("act");
	});
	
	
	
	$('.moFLi').each(function () {
	  var divE = $(this).find(".mo_slide");
	  
	  if (divE.height() > 300) {
	    divE.css({ 'overflow': 'auto', 'height': '300px' });
	  }
	})

	$(function(){
  		var length=$('.swiper.xg_news .p_nodata').length;
       if(length){
  		$('#c_static_001-17188783707520').hide();
      }
   })
