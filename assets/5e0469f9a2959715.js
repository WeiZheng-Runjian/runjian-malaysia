wow = new WOW({
  animateClass: 'animated',
});
wow.init();

$(function () {
  if (isFrontEnv()) {
    var relatedown = $(".souBox");
    $(".nybanBox").find(".ssBox").html(relatedown);
  }
});





/*分类高亮*/
var href = location.pathname + location.search;
// if (!href) return;
$(".yjTitle").each(function (i, e) {
  var aa = $(e).attr("href");
  if (aa == href) {
    // 自身样式
    $(e).addClass('act')
      .end().siblings('.yjTitle').removeClass('act');
  }
});



/*头部导航*/
$(function () {

  var width = $(window).width();
  var height = $(window).height();

  $('.header').addClass('active');

  if (width > 768) {
    $('.header').removeClass('active');
    window.addEvent('scroll', function () {
      if (window.scrollY <= 10) {
        $('.header').removeClass('active');

      } else {
        $('.header').addClass('active');
      }
    });

    $('.header .topNav .nav-item').each(function () {
      $(this).hoverDelay({
        hoverDuring: 100,
        outDuring: 100,
        hoverEvent: function () {
          $(this).find('.slide-nav').addClass('active');
          $(this).find('.slide_nav_dj').slideDown();
        },
        outEvent: function () {
          $(this).find('.slide-nav').removeClass('active');
          $(this).find('.slide_nav_dj').slideUp();
        }
      });
    });

  } else {
    $('.header').addClass('active');

    $('.nav-button').click(function () {
      $('.header .topNav').addClass('active');
    });

    $('.header .nav .closes').click(function () {
      $('.header .nav').removeClass('active');
      $('.header .topNav .nav-item').removeClass('active');
      $('.header .topNav .nav-item .ul3').slideUp();
    });

    $(document).mouseup(function (e) {
      var con = $('.header .topNav .navList'); // 设置目标区域
      if (!con.is(e.target) && con.has(e.target).length === 0) {
        $('.header .topNav').removeClass('active');
        $('.header .topNav .nav-item').removeClass('active');
        //   $('.header .topNav .nav-item .ul3').slideUp();
      }
    });

    $('.header .topNav .nav-item').click(function () {
      if ($(this).find('ul').length > 0) {
        $(this).find('.slide-nav').slideToggle();
        $(this).siblings().find('.slide-nav').slideUp();
        $(this).toggleClass('active');
        $(this).siblings().removeClass('active');
      }
    });

  }
})

/*内页新闻动态*/
$require(['swiper'], function () {
  new Swiper('.ny_news', {
    slidesPerView: 1,
    spaceBetween: 0,
    watchSlidesVisibility: true,
    //loop: true,
    pagination: {
      el: '.ny_news_page',
      clickable: true,
    },
    observer: true,
    observeParents: true,
  });
});

/*业务布局*/
$(function () {
  /*锚点*/
  $(".md_box .ny_cate a").click(function () {
    $("html, body").animate({
      scrollTop: $($(this).attr("href")).offset().top - 180
    }, 1000);
    return false;
  });
  /*业务能力*/
  $(".nl_tt").eq(0).addClass('cur').siblings().removeClass('cur');
  $(".nl_con_box .nl_con").eq(0).show().siblings().hide();
  $(".nl_tt").hover(function () {
    var i_yw = $(this).index();
    $(this).addClass("cur").siblings().removeClass("cur");
    $(".nl_con_box .nl_con").eq(i_yw).show().siblings().hide();
  });
  /*业务优势*/
  $require(['swiper'], function () {
    new Swiper('.yw_ys', {
      slidesPerView: 1,
      spaceBetween: 0,
      watchSlidesVisibility: true,
      //loop: true,
      // 媒体查询
      breakpoints: {
        600: {
          slidesPerView: 3,
          spaceBetween: 10,
        },
        1024: {
          slidesPerView: 3,
          spaceBetween: 20,
        },
        1300: {
          slidesPerView: 3,
          spaceBetween: 40,
        },
      },
      pagination: {
        el: '.ys_page',
        clickable: true,
      },
      observer: true,
      observeParents: true,
    });
  });
  /*相关产品*/
  $(".xg_cp").eq(1).addClass('cur').siblings().removeClass('cur')
  $(".xg_cp").hover(function () {
    $(this).addClass('cur').siblings().removeClass('cur');
  })
  /*相关新闻*/
  $require(['swiper'], function () {
    new Swiper('.xg_news', {
      slidesPerView: 1,
      spaceBetween: 0,
      watchSlidesVisibility: true,
      //loop: true,
      // 媒体查询
      breakpoints: {
        600: {
          slidesPerView: 3,
          spaceBetween: 10,
        },
        1024: {
          slidesPerView: 3,
          spaceBetween: 20,
        },
        1300: {
          slidesPerView: 3,
          spaceBetween: 40,
        },
      },
      pagination: {
        el: '.xg_news_page',
        clickable: true,
      },
      observer: true,
      observeParents: true,
    });
  });
  /*标杆案例*/
  $require(['swiper'], function () {
    var case_right = new Swiper('.case_right', {
      spaceBetween: 10,
      loop: true,
      slidesPerView: 1.4,
      direction: 'horizontal',
      scrollbar: {
        el: '.case_page',
        draggable: true,
      },
      breakpoints: {
        768: {
          slidesPerView: 4,
          spaceBetween: 0,
          direction: 'vertical',
        }
      },
      watchSlidesVisibility: true,
    });
    var case_left = new Swiper('.case_left', {
      slidesPerView: 1,
      spaceBetween: 0,
      thumbs: {
        swiper: case_right
      }
    });
  });
});


/*生态合作-合作伙伴*/
$(function () {
  $(".hzList .cbox-3").mouseenter(function () {
    $(this).addClass("active1");
    $(this).siblings().addClass("active2");
  });
  $(".hzList .cbox-3").mouseleave(function () {
    $(this).removeClass("active1");
    $(this).siblings().removeClass("active2");
  });
});

/*生态合作-全球客户*/
$(function () {
  $('.topLi:nth-child(1)').addClass('cur');
  $('.qqlist:nth-child(1)').addClass('cur');
  $('.topLi').hover(function (event) {
    $(this).show().addClass('cur');
    $(this).siblings().removeClass('cur');

    $('.qqlist').eq($(this).index()).addClass('cur');
    $('.qqlist').eq($(this).index()).siblings().removeClass('cur');
  })
});
$require(['swiper'], function () {
  new Swiper('.qq_box0 .qq_swiper', {
    autoplay: {
      delay: 4000,
      stopOnLastSlide: false,
      disableOnInteraction: true,
    },
    slidesPerView: 7,
    spaceBetween: 30,
    breakpoints: {
      320: {
        slidesPerView: 2,
        spaceBetween: 10,
        slidesPerColumn: 2,
        slidesPerColumnFill: 'row',
      },
      769: { //当屏幕宽度大于等于768 
        slidesPerView: 4,
        spaceBetween: 20,
        slidesPerColumn: 4,
        slidesPerColumnFill: 'row',
      },
      1400: { //当屏幕宽度大于等于768
        slidesPerView: 7,
        spaceBetween: 30,
        slidesPerColumn: 4,
        slidesPerColumnFill: 'row',
      },
    },
    pagination: {
      el: '.qq_box0 .qq_page',
      clickable: true,
    },
    observer: true,
    observeParents: true,
  });
  new Swiper('.qq_box1 .qq_swiper', {
    autoplay: {
      delay: 4000,
      stopOnLastSlide: false,
      disableOnInteraction: true,
    },
    slidesPerView: 7,
    spaceBetween: 30,
    breakpoints: {
      320: {
        slidesPerView: 2,
        spaceBetween: 10,
        slidesPerColumn: 2,
        slidesPerColumnFill: 'row',
      },
      769: { //当屏幕宽度大于等于768 
        slidesPerView: 4,
        spaceBetween: 20,
        slidesPerColumn: 4,
        slidesPerColumnFill: 'row',
      },
      1400: { //当屏幕宽度大于等于768
        slidesPerView: 7,
        spaceBetween: 30,
        slidesPerColumn: 4,
        slidesPerColumnFill: 'row',
      },
    },
    pagination: {
      el: '.qq_box1 .qq_page',
      clickable: true,
    },
    observer: true,
    observeParents: true,
  });
  new Swiper('.qq_box2 .qq_swiper', {
    autoplay: {
      delay: 4000,
      stopOnLastSlide: false,
      disableOnInteraction: true,
    },
    slidesPerView: 7,
    spaceBetween: 30,
    breakpoints: {
      320: {
        slidesPerView: 2,
        spaceBetween: 10,
        slidesPerColumn: 2,
        slidesPerColumnFill: 'row',
      },
      769: { //当屏幕宽度大于等于768 
        slidesPerView: 4,
        spaceBetween: 20,
        slidesPerColumn: 4,
        slidesPerColumnFill: 'row',
      },
      1400: { //当屏幕宽度大于等于768
        slidesPerView: 7,
        spaceBetween: 30,
        slidesPerColumn: 4,
        slidesPerColumnFill: 'row',
      },
    },
    pagination: {
      el: '.qq_box2 .qq_page',
      clickable: true,
    },
    observer: true,
    observeParents: true,
  })
});

$(function () {
  $(".hz_link").click(function () {
    $('#c_static_001-1720405419597').addClass('active');
  })
  $("#c_static_001-1720405419597 .guanbi").click(function () {
    $('#c_static_001-1720405419597').removeClass('active');
  })
});


/*首页-立即咨询*/
$(function () {
  $(".tc_but").click(function () {
    $('#c_static_001-1722249202617').addClass('active');
    $('#c_static_001-17243178769204').addClass('active');
    $('#c_static_001-17243175391330').addClass('active');
  })
  $(".guanbi").click(function () {
    $('#c_static_001-1722249202617').removeClass('active');
    $('#c_static_001-17243178769204').removeClass('active');
    $('#c_static_001-17243175391330').removeClass('active');
  })
});


/*企业文化-社会责任*/
$(function () {
  $('.fenLi:nth-child(1)').addClass('cur');
  $('.shli:nth-child(1)').addClass('cur');
  $('.fenLi').hover(function (event) {
    $(this).show().addClass('cur');
    $(this).siblings().removeClass('cur');

    $('.shli').eq($(this).index()).addClass('cur');
    $('.shli').eq($(this).index()).siblings().removeClass('cur');
  })
});
$require(['swiper'], function () {
  new Swiper('.sh_box0 .sh_swiper', {
    autoplay: {
      delay: 4000,
      stopOnLastSlide: false,
      disableOnInteraction: true,
    },
    slidesPerView: 3,
    spaceBetween: 40,
    breakpoints: {
      320: {
        slidesPerView: 2,
        spaceBetween: 10,
        slidesPerColumn: 2,
        slidesPerColumnFill: 'row',
      },
      769: { //当屏幕宽度大于等于768 
        slidesPerView: 3,
        spaceBetween: 20,
        slidesPerColumn: 2,
        slidesPerColumnFill: 'row',
      },
      1400: { //当屏幕宽度大于等于768
        slidesPerView: 3,
        spaceBetween: 40,
        slidesPerColumn: 2,
        slidesPerColumnFill: 'row',
      },
    },
    pagination: {
      el: '.sh_box0 .sh_page',
      clickable: true,
    },
    observer: true,
    observeParents: true,
  });
  new Swiper('.sh_box1 .sh_swiper', {
    autoplay: {
      delay: 4000,
      stopOnLastSlide: false,
      disableOnInteraction: true,
    },
    slidesPerView: 3,
    spaceBetween: 40,
    breakpoints: {
      320: {
        slidesPerView: 2,
        spaceBetween: 10,
        slidesPerColumn: 2,
        slidesPerColumnFill: 'row',
      },
      769: { //当屏幕宽度大于等于768 
        slidesPerView: 3,
        spaceBetween: 20,
        slidesPerColumn: 2,
        slidesPerColumnFill: 'row',
      },
      1400: { //当屏幕宽度大于等于768
        slidesPerView: 3,
        spaceBetween: 40,
        slidesPerColumn: 2,
        slidesPerColumnFill: 'row',
      },
    },
    pagination: {
      el: '.sh_box1 .sh_page',
      clickable: true,
    },
    observer: true,
    observeParents: true,
  });
  new Swiper('.sh_box2 .sh_swiper', {
    autoplay: {
      delay: 4000,
      stopOnLastSlide: false,
      disableOnInteraction: true,
    },
    slidesPerView: 3,
    spaceBetween: 40,
    breakpoints: {
      320: {
        slidesPerView: 2,
        spaceBetween: 10,
        slidesPerColumn: 2,
        slidesPerColumnFill: 'row',
      },
      769: { //当屏幕宽度大于等于768 
        slidesPerView: 3,
        spaceBetween: 20,
        slidesPerColumn: 2,
        slidesPerColumnFill: 'row',
      },
      1400: { //当屏幕宽度大于等于768
        slidesPerView: 3,
        spaceBetween: 40,
        slidesPerColumn: 2,
        slidesPerColumnFill: 'row',
      },
    },
    pagination: {
      el: '.sh_box2 .sh_page',
      clickable: true,
    },
    observer: true,
    observeParents: true,
  })
  new Swiper('.sh_box3 .sh_swiper', {
    autoplay: {
      delay: 4000,
      stopOnLastSlide: false,
      disableOnInteraction: true,
    },
    slidesPerView: 3,
    spaceBetween: 40,
    breakpoints: {
      320: {
        slidesPerView: 2,
        spaceBetween: 10,
        slidesPerColumn: 2,
        slidesPerColumnFill: 'row',
      },
      769: { //当屏幕宽度大于等于768 
        slidesPerView: 3,
        spaceBetween: 20,
        slidesPerColumn: 2,
        slidesPerColumnFill: 'row',
      },
      1400: { //当屏幕宽度大于等于768
        slidesPerView: 3,
        spaceBetween: 40,
        slidesPerColumn: 2,
        slidesPerColumnFill: 'row',
      },
    },
    pagination: {
      el: '.sh_box3 .sh_page',
      clickable: true,
    },
    observer: true,
    observeParents: true,
  })
  new Swiper('.sh_box4 .sh_swiper', {
    autoplay: {
      delay: 4000,
      stopOnLastSlide: false,
      disableOnInteraction: true,
    },
    slidesPerView: 3,
    spaceBetween: 40,
    breakpoints: {
      320: {
        slidesPerView: 2,
        spaceBetween: 10,
        slidesPerColumn: 2,
        slidesPerColumnFill: 'row',
      },
      769: { //当屏幕宽度大于等于768 
        slidesPerView: 3,
        spaceBetween: 20,
        slidesPerColumn: 2,
        slidesPerColumnFill: 'row',
      },
      1400: { //当屏幕宽度大于等于768
        slidesPerView: 3,
        spaceBetween: 40,
        slidesPerColumn: 2,
        slidesPerColumnFill: 'row',
      },
    },
    pagination: {
      el: '.sh_box4 .sh_page',
      clickable: true,
    },
    observer: true,
    observeParents: true,
  })
});
/*end*/

/*业务布局-业务能力*/
$require(['swiper'], function () {
  var mySwiper = new Swiper('.mySwiper_nl', {
    autoplay: {
      delay: 3800,
      stopOnLastSlide: false,
      disableOnInteraction: true,
    },
    slidesPerView: 2.5,
    spaceBetween: 30,
    scrollbar: {
      el: ".swiper-scrollbar",
      draggable: true,
      hide: true,
    },
    breakpoints: {
      300: {
        slidesPerView: 1,
        spaceBetween: 0,
      },
      769: { //当屏幕宽度大于等于768 
        slidesPerView: 2,
        spaceBetween: 15,
      },
      1440: { //当屏幕宽度大于等于768 
        slidesPerView: 2.5,
        spaceBetween: 30,
      }
    },
    observer: true,
    observeParents: true,
  })
});
/*end*/


/*首页-合作伙伴1*/
$require(['swiper'], function (s) {
  var mySwiper1 = new Swiper('.magnify6', {
    slidesPerView: 6,
    spaceBetween: 20,
    grid: {
      rows: 2,
    },
    speed: 5000,
    //freeMode: true,
    loop: true,
    autoplay: {
      delay: 1,
      stopOnLastSlide: false,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    },
    breakpoints: {
      320: { //当屏幕宽度大于等于320
        slidesPerView: 3,
        spaceBetween: 10,
      },
      769: { //当屏幕宽度大于等于320
        slidesPerView: 6,
        spaceBetween: 10,
      },
      1440: { //当屏幕宽度大于等于320
        slidesPerView: 6,
        spaceBetween: 20,
      },
    },

  });

  let nextTransForm = "";
  let nextTime = 0;
  // 鼠标悬浮暂停轮播
  if ($('.magnify6').length) {
    mySwiper1.el.onmouseenter = function () {
      nextTransForm = document
        .getElementsByClassName("magnify6")[0]
        .getElementsByClassName("swiper-wrapper")[0].style.transform;
      // 轮播图原本应移动到的位置
      let nextTransPosition = -1 *
        parseInt(
          document
            .getElementsByClassName("magnify6")[0]
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
                .getElementsByClassName("magnify6")[0]
                .getElementsByClassName("swiper-wrapper")[0],
              false
            )["transform"].split("1, ")[2]
            .split(",")[0]
        );
      // 存放鼠标悬浮时轮播图的真实transform属性（非行内属性）
      let nowTransForm = window.getComputedStyle(
        document
          .getElementsByClassName("magnify6")[0]
          .getElementsByClassName("swiper-wrapper")[0],
        false
      )["transform"];
      // 计算轮播图从暂停位置移动到原本应到的位置所用的时间（370是我自定义的每个slide的宽度）
      nextTime = 5500 * ((nextTransPosition - nowTransPosition) / 370);
      // 改变行内transform属性
      document
        .getElementsByClassName("magnify6")[0]
        .getElementsByClassName(
          "swiper-wrapper"
        )[0].style.transform = nowTransForm;
      // 不写也没关系
      document
        .getElementsByClassName("magnify6")[0]
        .getElementsByClassName(
          "swiper-wrapper"
        )[0].style.transitionDuration = "0ms";
      mySwiper1.autoplay.stop();
    };
    // 鼠标离开轮播图开始轮播
    mySwiper1.el.onmouseleave = function () {
      console.log('leave' + nextTransForm)
      // 恢复原样
      document
        .getElementsByClassName("magnify6")[0]
        .getElementsByClassName(
          "swiper-wrapper"
        )[0].style.transform = nextTransForm;
      document
        .getElementsByClassName("magnify6")[0]
        .getElementsByClassName("swiper-wrapper")[0]
        .style.transitionDuration = nextTime + "ms";
      mySwiper1.autoplay.start();

    };
  }

});
/*end*/








