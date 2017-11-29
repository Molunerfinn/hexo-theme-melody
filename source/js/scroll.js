$(function () {
  var initTop = 0
  $('.toc-child').hide()

  // main of scroll
  $(window).scroll(throttle(function (event) {
    var currentTop = $(this).scrollTop()
    if (!isMobile()) {
      // percentage inspired by hexo-theme-next
      scrollPercent(currentTop)
      // head position
      findHeadPosition(currentTop)
    }
    var isUp = scrollDirection(currentTop)
    if (currentTop > 56) {
      if (isUp) {
        $('#page-header').hasClass('visible') ? $('#page-header').removeClass('visible') : console.log()
      } else {
        $('#page-header').hasClass('visible') ? console.log() : $('#page-header').addClass('visible')
      }
      $('#page-header').addClass('fixed')
      if ($('#go-up').css('opacity') === '0') {
        $('#go-up').velocity('stop').velocity({
          translateX: -30,
          rotateZ: 360,
          opacity: 1
        }, {
          easing: 'easeOutQuart',
          duration: 200
        })
      }
    } else {
      if (currentTop === 0) {
        $('#page-header').removeClass('fixed').removeClass('visible')
      }
      $('#go-up').velocity('stop').velocity({
        translateX: 0,
        rotateZ: 180,
        opacity: 0
      }, {
        easing: 'linear',
        duration: 200
      })
    }
  }, 50, 100))

  // go up smooth scroll
  $('#go-up').on('click', function () {
    $('body').velocity('stop').velocity('scroll', {
      duration: 500,
      easing: 'easeOutQuart'
    })
  })

  // head scroll
  $('h1,h2,h3,h4,h5,h6').on('click', function (e) {
    scrollToHead('#' + $(this).attr('id'))
  })

  // head scroll
  $('.toc-link').on('click', function (e) {
    e.preventDefault()
    scrollToHead($(this).attr('href'))
  })

  // find the scroll direction
  function scrollDirection (currentTop) {
    var result = currentTop > initTop // true is down & false is up
    initTop = currentTop
    return result
  }

  // scroll to a head(anchor)
  function scrollToHead (anchor) {
    $(anchor).velocity('stop').velocity('scroll', {
      duration: 500,
      easing: 'easeInOutQuart'
    })
  }

  // expand toc-item
  function expandToc ($item) {
    $item.velocity('stop').velocity('transition.fadeIn', {
      duration: 500,
      easing: 'easeInQuart'
    })
  }

  function scrollPercent (currentTop) {
    var docHeight = $('#content-outer').height()
    var winHeight = $(window).height()
    var contentMath = (docHeight > winHeight) ? (docHeight - winHeight) : ($(document).height() - winHeight)
    var scrollPercent = (currentTop) / (contentMath)
    var scrollPercentRounded = Math.round(scrollPercent * 100)
    var percentage = (scrollPercentRounded > 100) ? 100 : scrollPercentRounded
    $('.progress-num').text(percentage)
    $('.sidebar-toc__progress-bar').velocity('stop')
      .velocity({
        width: percentage + '%'
      }, {
        duration: 100,
        easing: 'easeInOutQuart'
      })
  }

  function updateAnchor (anchor) {
    if (window.history.replaceState && anchor !== window.location.hash) {
      window.history.replaceState(undefined, undefined, anchor)
    }
  }

  // find head position & add active class
  function findHeadPosition (top) {
    // assume that we are not in the post page if no TOC link be found,
    // thus no need to update the status
    if ($('.toc-link').length === 0) {
      return;
    }

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
      updateAnchor(currentId)

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
