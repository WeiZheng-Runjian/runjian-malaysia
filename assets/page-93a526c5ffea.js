
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

	$("#c_static_001-1718787539752 .e_text-4").click(function() {
		$("#c_static_001-1718787539752 .e_video-5").addClass("active");
	})
	$("#c_static_001-1718787539752 .e_video-5 .p_video_colse").click(function() {
		$("#c_static_001-1718787539752 .e_video-5").removeClass("active");
		$("#c_static_001-1718787539752 .e_video-5").find("video")[0].pause();
	})

	$(function() {
		$("#c_static_001-1718787584238 .e_container-1").each(function(i, e) {
			var cid = $(this).find('.cbFen').attr("data-id");
			
			$(".mianRight").find(".right_li").each(function() {
				var id = $(this).attr("data-id");
				if (id == cid) {
					$(this).show();
				} else {
					$(this).hide();
				}
			})
		});
	})

	$require(['swiper'], function() {
		var mySwiper = new Swiper('.mySwiper_rw', {
			slidesPerView: 3,
			spaceBetween: 40,
            speed:1000,
  			loop:true,
			breakpoints: {
                300: {
					slidesPerView: 1,
					spaceBetween: 5
				},
				769: {
					slidesPerView: 3,
					spaceBetween: 20
				},
				1200: {
					slidesPerView: 3,
					spaceBetween: 40
				},
			}, 
  			autoplay: {
              delay: 3000,
              stopOnLastSlide: false,
              disableOnInteraction: true,
            },
  			pagination: {
     		   el: ".swiper-pagination1",
      		  clickable: true,
      		},
			observer: true,
			observeParents: true,
		})
	});

	$require(['swiper'], function() {
		var mySwiper = new Swiper('.mySwiper_case', {
			slidesPerView: 3,
			spaceBetween: 40,
            speed:1000,
  			//loop:true,
			breakpoints: {
                300: {
					slidesPerView: 1,
					spaceBetween: 5
				},
				769: {
					slidesPerView: 3,
					spaceBetween: 20
				},
				1200: {
					slidesPerView: 3,
					spaceBetween: 40
				},
			}, 
  			autoplay: {
              delay: 3000,
              stopOnLastSlide: false,
              disableOnInteraction: true,
            },
  			pagination: {
     		   el: ".swiper-pagination2",
      		  clickable: true,
      		},
			observer: true,
			observeParents: true,
		})
	});
  
  
    var $parent = $('#c_static_001-1718791777666 .e_loop_sub-6').find('.swiper');

// 获取父元素的所有子元素
var $children = $parent.find('.cbox-6');

// 判断子元素的数量是否为1
if ($children.length <= 3) {
    // 如果子元素数量为1，则删除父元素的某个类名
    $parent.removeClass('mySwiper_case').addClass('actyive');
}

	$('#c_static_001-1718787586561 .e_container-9').each(function () {
		if ($.trim($(this).find('.e_text-5').text()) == "") {
			$(this).hide();
			$(this).addClass("hide");
		}
	})
	
	$('#c_static_001-1718791775028').each(function () {
		if ($.trim($(this).find('.e_text-1').text()) == "") {
			$(this).hide();
			$(this).addClass("hide");
		}
	})
	
	$('#c_static_001-1718791777666').each(function () {
		if ($.trim($(this).find('.e_text-5').text()) == "") {
			$(this).hide();
			$(this).addClass("hide");
		}
	})

 $(document).ready(function() {
    $('.xiazai_but').each(function(index) {
        if ($('.xiazai_but').length > 1 && index === 1) {
            $(this).remove();
        }
    });
});

	$(function(){
  		var length=$('.swiper.xg_news .p_nodata').length;
       if(length){
  		$('#c_static_001-17188783707520').hide();
      }
   })
