// "use strict";

$(function () {

  // background
  var bgNum = getRandombg(1, 6);
  $('.container, .admin-container').css('background-image','url("./images/bg' + bgNum + '.jpg")');
  function getRandombg(bgMin, bgMax) {
    return(bgMin + Math.round((bgMax - bgMin) * Math.random()));
  }

  // resize
  var elemArr = [
    ['.container', 9/16],
    ['.admin-container', 9/20],
    ['.top-panel', 1/5],
    ['.black-main', 3/4],
    ['.bottom-panel', 1/5],
    ['.wraper', 3/16],
    ['.box', 3/4]
  ];
  var $topPanel = $('.top-panel');
  var $asidePanel = $('.aside-panel');
  var $bottomPanel = $('.bottom-panel');
  var $topBtn = $('.top-slide-button');
  var $asideBtn = $('.aside-slide-button');
  var $bottomBtn = $('.bottom-slide-button');
  var $videoMinor = $('.video-minor');
  var topPanelHeight;
  var bottomPanelHeight;

  // resize
  var resizeFunc = function () {
    for(var item in elemArr) {
      var elemItem = elemArr[item];
      $(elemItem[0]).height($(elemItem[0]).width() * elemItem[1]);
    }

    topPanelHeight = $topPanel.width() * 1/4;
    bottomPanelHeight = $bottomPanel.width() * 1/4;

    slidePanel();

    $videoMinor.css({
      'top': '0',
      'left': '0'
    });
  };
  resizeFunc();
  $(window).resize(resizeFunc);

  // slide panel
  $topBtn.on('mouseenter', function() {
    slideBtnEvent($(this), $topPanel, 'top');
  })
  $asideBtn.on('mouseenter', function() {
    slideBtnEvent($(this), $asidePanel, 'left');
  })
  $bottomBtn.on('mouseenter', function() {
    slideBtnEvent($(this), $bottomPanel, 'bottom');
  })
  $topPanel.on('mouseleave', function() {
    slidePanelEvent($(this), $topBtn, 'top');
  })
  $asidePanel.on('mouseleave', function() {
    slidePanelEvent($(this), $asideBtn, 'left');
  })
  $bottomPanel.on('mouseleave', function() {
    slidePanelEvent($(this), $bottomBtn, 'bottom');
  })
  function slideBtnEvent(that, panelElem, pos) {
    if(pos != 'left') {
      that.stop().css(pos, -(that.height()));
    }
    else {
      that.stop().css(pos, -(that.width()));
    }
    $(panelElem).stop().css(pos, 0);
  }
  function slidePanelEvent(that, btnElem, pos) {
    if(pos != 'left') {
      that.stop().css(pos, -(that.height()));
    }
    else {
      that.stop().css(pos, -(that.width()));
    }
    var t = setTimeout(function() {
      $(btnElem).stop().css(pos, 0);
    }, 500);
  }
  function slidePanel() {
    $topPanel.css('top', -(topPanelHeight));
    $bottomPanel.css('bottom', -(bottomPanelHeight));
  }

  // material preview
  var $box = $('.box');
  var $pre = $('.pre');
  var $next = $('.next');
  var animation = 800;
  var lenInt = parseInt($box.length / 4);
  var lenExcess = $box.length % 4;
  var lenCurr = 1;
  var left = 0;
  for(var i = 0; i < $box.length; i++) {
    var spanHtml = '<span>' + (i + 1) + '</span>';
    $($box[i]).append(spanHtml);
  }
  $next.on('click', function() {
    if(lenExcess) {
      if(lenCurr == lenInt) {
        left = ((lenCurr - 1) * (-100) + lenExcess * (-25)) + '%';
        leftAni(left);
      }
    }
    if(lenCurr < lenInt) {
      left = parseInt(left) - 100 + '%';
      leftAni(left);
      lenCurr++;
    }
  })
  $pre.on('click', function() {
    if(lenExcess) {
      if(lenCurr == 1) {
        left = '0%';
        leftAni(left);
      }
    }
    if(lenCurr > 1) {
      left = parseInt(left) + 100 + '%';
      leftAni(left);
      lenCurr--;
    }
  })
  function leftAni(left) {
    $box.stop().animate({
      left: left
    }, animation);
  }
  $bottomPanel.hover(
    function() {
      $(this).css('will-change', 'bottom');
      $box.css('will-change', 'left');
    },
    function() {
      $(this).css('will-change', '');
      $box.css('will-change', '');
    }
  )

  // chat video
  $videoMinor.draggabilly({
    containment: '.video-main'
  })

  // more item
  var $moreItem = $('.more-item');
  $('.more-slide').on({
    click: function() {
      $moreItem.stop().slideToggle('fast');
    },
    mouseleave: function() {
      $moreItem.slideUp('fast');
    }
  })

  // chat content
  var $chatStudent = $('.chat-title-student');
  var $chatAdmin = $('.chat-title-admin');
  $chatStudent.on('click', function() {
    $this = $(this);
    $this.hasClass('active') ? $chatAdmin.addClass('active') : $chatAdmin.removeClass('active')
    $this.toggleClass('active').next().stop().slideToggle();
    return false;
  })
  $chatAdmin.on('click', function() {
    $this = $(this);
    $this.addClass('active').prev().stop().slideUp();
    $chatStudent.removeClass('active');
    return false;
  })

  // other
  $('.ui.checkbox').checkbox();
})