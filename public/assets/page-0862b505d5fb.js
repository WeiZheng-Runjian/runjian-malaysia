
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
	

	$(function () {
	    var m = null;
	    m = setInterval(function () {
	        // 检查是否存在该 div，如果存在则添加内容
	        var $targetDiv = $('.p_nodata');
	        if ($targetDiv.length > 0) {
	            $targetDiv.html('<div class="none_con fnt_18">暂无内容</div>');
	            // 或者使用 text(), append() 等方法
	            // $targetDiv.append('<span>追加内容</span>');
	        }
	    });
	})

	$(".p_c_title2 a").click(function () {
		$(this).parents('.p_c_item2').addClass("act");
		$(this).parents('.p_c_item2').siblings().removeClass("act");
		$(this).parents(".p_c_item1").siblings(".p_c_item1").find(".p_c_item2").removeClass("act");
	});
	
	$(function () {
		//锚点跳转滑动效果
		$(".p_c_title2 a").click(function () {
			var href = $(this).attr("href");
			var hash = href.split('#')[1]; // 获取 # 后面的部分
	
			if (hash) { // 确保有 hash 值
				$("html, body").animate({
					scrollTop: $('#' + hash).offset().top - 100
				}, 1000);
			}
			return false;
		});
	
		//锚点跳转滑动效果
		$(".navContRel2:nth-child(3) .ul3 a").click(function () {
			var href = $(this).attr("href");
			var hash = href.split('#')[1]; // 获取 # 后面的部分
	
			if (hash) {
				// 1. 平滑滚动到目标元素
				var $target = $('#' + hash);
				if ($target.length) {
					$("html, body").animate({
						scrollTop: $target.offset().top - 100
					}, 1000);
				}
	
				// 2. 同步左侧菜单高亮并显示父级 .deep-2
				// 先移除所有 .p_c_item 的 act 类
				$('.p_c_item').removeClass('act');
	
				// 隐藏所有 .deep-2（可选：如果你有多个，先隐藏）
				$('.deep-2').hide(); // 或 .css('display', 'none')
	
				// 遍历 .p_c_title2 a，查找匹配 hash 的项
				$('.p_c_title2 a').each(function () {
					var itemHref = $(this).attr('href');
					var itemHash = itemHref.split('#')[1];
	
					if (itemHash === hash) {
						var $p_c_item = $(this).closest('.p_c_item');
						var $deep_2 = $p_c_item.closest('.deep-2'); // 或者 $(this).parents('.deep-2')
	
						// 添加 act 类
						$p_c_item.addClass('act');
	
						// 显示 .deep-2 父容器
						$deep_2.show(); // 或 .css('display', 'block') / 'flex' 等
	
						return false; // 找到即退出循环
					}
				});
			}
	
			return false; // 阻止默认跳转行为（适用于单页内导航）
		});
	});

$(function () {
    // 页面加载后，获取当前 URL 的 hash（如 #1948259109816889344）
    var hash = window.location.hash;

    if (hash) {
        // 延迟执行，确保 DOM 渲染完成
        setTimeout(function () {
            var $target = $(hash);
            if ($target.length) {
                // 1. 平滑滚动到目标位置
                $("html, body").animate({
                    scrollTop: $target.offset().top - 100
                }, 1000);
            }

            // 2. 同步左侧菜单状态
            // 先清除所有状态
            $('.p_c_item').removeClass('act');
            $('.deep-2').hide(); // 或 .css('display', 'none')

            // 遍历所有 .p_c_title2 a，找匹配 hash 的
            $('.p_c_title2 a').each(function () {
                var $link = $(this);
                var href = $link.attr('href');
                
                // 提取 href 中的 # 后面的部分（即使带路径）
                var linkHash = href.split('#')[1];

                // 比较：当前页面 hash 去掉 #，linkHash 直接比较
                if (linkHash === hash.substring(1)) { // hash 是 #xxx，所以 substring(1) 去掉 #
                    var $p_c_item = $link.closest('.p_c_item');
                    var $deep_2 = $p_c_item.closest('.deep-2'); // 找到 .deep-2 父容器

                    // 添加高亮
                    $p_c_item.addClass('act');

                    // 显示 .deep-2 容器
                    $deep_2.show(); // 或 .css('display', 'block') / 'flex'

                    return false; // 找到即退出循环
                }
            });
        }, 100);
    }
});

	$(function () {
		var m = null;
		m = setInterval(function () {
			$("#c_static_001-1752631403159 .e_container-7 a").each(function () {
				// 判断当前a标签的href属性是否为空或者未定义
				if (!$(this).attr("href") || $(this).attr("href") === "") {
					// 如果是，则隐藏其父级p标签
					$(this).parent("p").hide();
					$(this).parent("p").addClass("hide");
				}
			});
		}, 500);
	});
	

$(function(){
  $(".zdl_box").mCustomScrollbar();
})

