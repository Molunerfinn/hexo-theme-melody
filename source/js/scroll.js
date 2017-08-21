$(function () {
  $('.toc-child').hide()
  $(window).scroll(throttle(function (event) {
    findHeadPosition($(this).scrollTop())
    if ($(this).scrollTop() > 300) {
      $('#go-up').velocity({
        translateX: -30,
        rotateZ: 360,
        opacity: 1
      }, {
        easing: 'easeOutBack',
        duration: 200
      })
    } else {
      $('#go-up').velocity({
        translateX: 0,
        rotateZ: 180,
        opacity: 0
      }, {
        easing: 'linear',
        duration: 200
      })
    }
  }, 50, 100))
  $('#go-up').on('click', function () {
    $('body').velocity('scroll', {
      duration: 500,
      easing: 'easeOutQuart'
    })
  })

  // head scroll
  $('h1,h2,h3,h4,h5,h6').on('click', function (e) {
    scrollToHead('#' + $(this).attr('id'))
  })

  $('.toc-link').on('click', function (e) {
    e.preventDefault()
    scrollToHead($(this).attr('href'))
  })

  function scrollToHead (anchor) {
    $(anchor).velocity('scroll', {
      duration: 500,
      easing: 'easeInOutQuart'
    })
  }

  function expandToc ($item) {
    $item.velocity('stop').velocity('transition.fadeIn', {
      duration: 300,
      easing: 'easeInOutQuart'
    })
  }

  function findHeadPosition (top) {
    if (top < 200) {
      $('.toc-link').removeClass('active')
      $('.toc-child').hide()
    }
    var list = $('h1,h2,h3,h4,h5,h6')
    var currentId = ''
    list.each(function () {
      var head = $(this)
      if (top > head.offset().top - 25) {
        currentId = '#' + $(this).attr('id')
      }
    })
    var currentActive = $('.toc-link.active')
    if (currentId && currentActive.attr('href') !== currentId) {
      $('.toc-link').removeClass('active')
      var _this = $('.toc-link[href="' + currentId + '"]')
      _this.addClass('active')
      var parents = _this.parents('.toc-child')
      if (parents.length > 0) {
        var child
        parents.length > 1 ? child = parents.eq(parents.length - 1).find('.toc-child') : child = parents
        if (child.length > 0 && child.is(':hidden')) {
          expandToc(child)
        }
        parents.eq(parents.length - 1).closest('.toc-item').siblings('.toc-item').find('.toc-child').hide()
      } else {
        if (_this.closest('.toc-item').find('.toc-child').is(':hidden')) {
          expandToc(_this.closest('.toc-item').find('.toc-child'))
        }
        _this.closest('.toc-item').siblings('.toc-item').find('.toc-child').hide()
      }
    }
  }
})
