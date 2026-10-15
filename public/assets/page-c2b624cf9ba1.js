
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
	

	document.addEventListener('DOMContentLoaded', function () {
		$require(['swiper'], function () {
			var mySwiper_bot = new Swiper(".mySwiper_bot", {
				slidesPerView: 5,
				spaceBetween: 0,
				centeredSlides: true,
				slideToClickedSlide: true,
				initialSlide: 0,
				loop: true,
				pagination: {
					el: ".swiper-pagination",
					clickable: true,
				},
				loopAdditionalSlides: 5,
				breakpoints: {
					300: {
						slidesPerView: 1.8,
						spaceBetween: 0
					},
					769: {
						slidesPerView: 3,
						spaceBetween: 0
					},
					1200: {
						slidesPerView: 5,
						spaceBetween: 0
					},
				},
			});
	
			var mySwiper_top = new Swiper(".mySwiper_top", {
				slidesPerView: 1,
				spaceBetween: 0,
				initialSlide: 0,
				loop: true,
				loopAdditionalSlides: 5,
			});
			//mySwiper_top.controller.control = mySwiper_bot;
			//mySwiper_bot.controller.control = mySwiper_top;
	
			// 获取所有视频
			const videoElements = document.querySelectorAll('.mySwiper_top .swiper-slide video');
	
			// 页面加载时自动播放第一个视频
			const activeIndex = mySwiper_top.activeIndex;// 获取当前激活的 Slide 索引
			const slides = document.querySelectorAll('.mySwiper_top .swiper-slide');
			// 遍历 Slide，找到具有 swiper-slide-active 类的元素
			slides.forEach((slide) => {
				if (slide.classList.contains('swiper-slide-active')) {
					const video = slide.querySelector('video'); // 获取视频元素
					if (video) {
						
						video.play();
					}
				}
			});
	
			// 点击缩略图时切换并播放对应视频
			mySwiper_bot.on('click', function (event) {
				const index = this.clickedIndex;
	
				// 暂停所有视频
				videoElements.forEach(video => {
					video.pause();
				});
	
				// 播放当前点击的视频
				const targetVideo = videoElements[index];
				if (targetVideo) {
					targetVideo.play().then(_ => {
						
					}).catch(error => {
						console.error(`播放索引为 ${index} 的视频失败:`, error);
					});
				}
			});
		});
	});

	$(function () {
		$('#c_static_001-1753150988125 .e_loop_sub-6 .qcLi').not(':eq(3), :eq(4), :eq(5)').each(function () {
			$(this).find('.jian2').remove();
		});
	
		/*$('.mapLi:nth-child(1)').addClass('cur');
		$('.fenLi:nth-child(1)').addClass('cur');*/
		$('.qcLi').click(function (event) {
			$('.tcBox').addClass('cur');
	
			$(this).show().addClass('cur');
			$(this).siblings().removeClass('cur');
	
			$('.tcBoxli').eq($(this).index()).addClass('cur');
			$('.tcBoxli').eq($(this).index()).siblings().removeClass('cur');
		})
		$('.tcColse').click(function (event) {
			$('.tcBox').removeClass('cur');
		})
	
	});

	$require(['swiper'], function () {
		var mySwiper = new Swiper('.mySwiper_yy', {
			autoplay: {
				delay: 2500,
				stopOnLastSlide: false,
				disableOnInteraction: true,
			},
			//  loop:true,
	
			slidesPerView: 5,
			spaceBetween: 20,
	
			speed: 500,
			freeMode: true,
			loop: true,
			/*autoplay: {
				delay: 1,
				stopOnLastSlide: false,
				disableOnInteraction: false,
				pauseOnMouseEnter: true,
			},*/
			pagination: {
				el: ".swiper-pagination2",
				clickable: true,
			},
			breakpoints: {
				300: {
					slidesPerView: 2,
					spaceBetween: 10,
				},
				769: { //当屏幕宽度大于等于768 
					slidesPerView: 4,
					spaceBetween: 20,
				},
				1440: { //当屏幕宽度大于等于768 
					slidesPerView: 5,
					spaceBetween: 20,
				}
			},
			observer: true,
			observeParents: true,
		})
		/*
			let nextTransForm = "";
			let nextTime = 0;
			// 鼠标悬浮暂停轮播
			mySwiper.el.onmouseenter = function () {
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
			mySwiper.el.onmouseleave = function () {
				
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
		
			};*/
	});
	

	$(document).ready(function () {
		$(window).on('scroll', function () {
			var sections = $('div[id^="c_static_001"]'); // 获取所有目标板块
			var navLinks = $('#c_static_001-1752631389458 .e_loop_sub-5 .p_loopItem a'); // 获取所有导航链接
	
			var scrollPosition = $(window).scrollTop() + ($(window).height() / 2); // 使用窗口高度的一半作为参考点
	
			sections.each(function () {
				var currentSectionTop = $(this).offset().top;
				var currentSectionBottom = currentSectionTop + $(this).outerHeight();
	
				if (scrollPosition >= currentSectionTop && scrollPosition < currentSectionBottom) {
					var currentId = $(this).attr('id');
					navLinks.parent().removeClass('highlight'); // 移除所有链接的高亮
					navLinks.filter(`[href="#${currentId}"]`).parent().addClass('highlight'); // 高亮当前链接
				}
			});
		});
	});

	$(function () {
		//锚点跳转滑动效果
		$("#c_static_001-1752631389458 .e_text-6 a").click(function () {
			
			$("html, body").animate({
				scrollTop: $($(this).attr("href")).offset().top - 100
			}, 500);
			$(this).parents('#c_static_001-1752631389458 .e_loop_sub-5 .p_loopItem').addClass('cur');
			$(this).parents('#c_static_001-1752631389458 .e_loop_sub-5 .p_loopItem').siblings('#c_static_001-1752631389458 .e_loop_sub-5 .p_loopItem').removeClass('cur');
			return false;
		});
	})
	
	
	$(window).scroll(function () {
		// 获取窗口的滚动距离
		var windowScrollTop = $(this).scrollTop();
	
		// 获取目标元素距离文档顶部的距离
		var elementOffsetTop = $(".rgtop").offset().top;
	
		// 设置一个阈值，用于判断何时添加类名
		// 例如，当页面滚动到元素顶部200px以内时添加类名
		var threshold = 86;
	
		if (windowScrollTop > (elementOffsetTop - threshold)) {
			$("#c_static_001-1752631389458 .e_loop_sub-5").addClass("fa_Headeron");
		} else {
			$("#c_static_001-1752631389458 .e_loop_sub-5").removeClass("fa_Headeron");
		}
	});
	
	
	
	$(document).ready(function () {
		var $targetSection = $('#c_static_001-17530815717040');
		var $navContainer = $('#c_static_001-1752631389458 .e_loop_sub-5');
	
		$(window).on('scroll', function () {
			var targetTop = $targetSection.offset().top;
	
			if ($(window).scrollTop() >= targetTop) {
				// 当目标模块滚动到顶部或以上时
				$navContainer.hide(); // 隐藏指定的导航容器
			} else {
				// 当未达到目标模块顶部时
				$navContainer.show(); // 显示指定的导航容器
			}
		});
	
		// 初始化检查，防止刷新页面时状态不正确
		if ($(window).scrollTop() >= $targetSection.offset().top) {
			$navContainer.hide();
		} else {
			$navContainer.show();
		}
	});

$(function(){
  $(".zdl_box").mCustomScrollbar();
})

