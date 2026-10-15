
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


    $(function () {

 
  
        var width=$(window).width();
       if(width>768){
  	       $('.scroll_1').mCustomScrollbar();
           }else{
  			var swiper5 = new Swiper('.t-right.mobile .swiper-container', {
            watchOverflow: true,
            autoplay: {
                delay: 6000,
                stopOnLastSlide: false,
                disableOnInteraction: false,
            },
            speed:1000,
            spaceBetween : 10,
            pagination: {
                el: '.t-right.mobile .swiper-pagination',
                clickable: true,
            },
        });
          }


        function addEvent(eve, callback) {
            if (window.attachEvent) {
                window.attachEvent("on" + eve, callback);
            } else if (window.addEventListener) {
                window.addEventListener(eve, callback, false);
            }
        }

        var sub = new Swiper('.sub-nav .swiper-container', {
            watchOverflow: true,
            autoplay:false,
            slidesPerView:'auto',
        });

        var sub_h = $('.header').height();


        var temArr=[];
        $('.sub-nav .swiper-slide').each(function () {
            temArr.push($(this).data('name'));
        });



        var navDesktop = function() {
            $('.sub-nav').on('click', '.swiper-slide', function() {
                var scrollTarget = '#' + $(this).attr('data-name');
                var index=$(this).index();
                sub.slideTo(index);
                $("html,body").animate({ scrollTop: $(scrollTarget).offset().top - sub_h - $('.sub-nav').height() }, 500);

            });

            addEvent('scroll', function() {
                var scrollHeight = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
                var windowHeight = $(window).height();
                var state = false;
                for (var i = 0; i <= temArr.length - 1; i++) {
                    (function(i) {
                        var selScroll = $('#' + temArr[i]).offset().top;
                        if (i == 0 && selScroll - scrollHeight > windowHeight / 2) {
                            state = true;
                        } else if (selScroll - scrollHeight > 0 && selScroll - scrollHeight < windowHeight / 2) {
                            $('.sub-nav  .swiper-slide').each(function(index, value) {
                                if ($(value).attr('data-name') == temArr[i]) {
                                    $(value).addClass('active').siblings().removeClass('active');
                                    sub.slideTo(index);
                                }
                            });
                            state = true;
                        }
                    })(i);
                    if (state) {
                        break;
                    }

                }
            });
        };
        navDesktop();

        var navHeight = $(".sub-nav").offset().top - sub_h;

        $(window).scroll(function() {
            if ($(this).scrollTop() > navHeight) {
                $(".sub-box").addClass("active");
            } else {
                $(".sub-box").removeClass("active");

            }
        })




        if(width>=1024){
            $('.box_c').mouseenter(function () {
                var title=$('.box_c h3').text();
                var des=$('.box_c h3').attr('data-des');
                var img=$('.box_c h3').attr('data-img');
                // 
                $('.t-right.pc h2').text(title);
                $('.t-right.pc p').text(des);
                $('.t-right.pc img').attr('src',img);
            });
        }else{
            $('.box_c').click(function () {
                var title=$('.box_c h3').text();
                var des=$('.box_c h3').attr('data-des');
                var img=$('.box_c h3').attr('data-img');
                // 
                $('.t-right.pc h2').text(title);
                $('.t-right.pc p').text(des);
                $('.t-right.pc img').attr('src',img);
            });
        }



        var swiper3 = new Swiper('.ctn3 .swiper-container', {
            watchOverflow: true,
            autoplay: {
                delay: 6000,
                stopOnLastSlide: false,
                disableOnInteraction: false,
            },
            slidesPerView: 3,
            speed:1000,
            spaceBetween : 40,
            breakpoints: {
                1024:{
                    spaceBetween : 30,
                    slidesPerView: 2,
                },
                768: {  //当屏幕宽度大于等于768
                    spaceBetween : 10,
                    slidesPerView: 1,
                }
            }
        });

        $('.ctn3 .swiper-container').mouseenter(function () {
           swiper3.autoplay.stop();
        });

        $('.ctn3 .swiper-container').mouseleave(function () {
            swiper3.autoplay.start();
        });

        $('.ctn4 ul li').mouseenter(function () {
           $(this).addClass('active').siblings().removeClass('active');
        });


        var swiper5 = new Swiper('.ctn5 .swiper-container', {
            watchOverflow: true,
            autoplay: {
                delay: 6000,
                stopOnLastSlide: false,
                disableOnInteraction: false,
            },
            slidesPerView: 3,
            speed:1000,
            spaceBetween : 30,
            pagination: {
                el: '.ctn5 .swiper-pagination',
                clickable: true,
            },
            breakpoints: {
                1024:{
                    slidesPerView: 2,
                },
                768: {  //当屏幕宽度大于等于768
                    spaceBetween : 10,
                    slidesPerView: 1,
                }
            }
        });




    })

	$(function(){
  		var length=$('.swiper.xg_news .p_nodata').length;
       if(length){
  		$('#c_static_001-17188783707520').hide();
      }
   })
