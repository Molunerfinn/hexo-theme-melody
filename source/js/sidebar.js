$(function () {
  $('.toggle-sidebar-info > span').on('click', function () {
    var toggleText = $(this).attr('data-toggle')
    $(this).attr('data-toggle', $(this).text())
    $(this).text(toggleText)
    changeSideBarInfo()
  })
  $('#toggle-sidebar').on('click', function () {
    if (!isMobile() && $('#sidebar').is(':visible')) {
      var isOpen = $(this).hasClass('on')
      isOpen ? $(this).removeClass('on') : $(this).addClass('on')
      if (isOpen) {
        $('#page-header').removeClass('open-sidebar')
        $('body').velocity('stop').velocity({
          paddingLeft: '0px'
        }, {
          duration: 200
        })
        $('#sidebar').velocity('stop').velocity({
          translateX: '0px'
        }, {
          duration: 200
        })
        $('#toggle-sidebar').velocity('stop').velocity({
          rotateZ: '0deg',
          color: '#1F2D3D'
        }, {
          duration: 200
        })
      } else {
        $('#page-header').addClass('open-sidebar')
        $('body').velocity('stop').velocity({
          paddingLeft: '300px'
        }, {
          duration: 200
        })
        $('#sidebar').velocity('stop').velocity({
          translateX: '300px'
        }, {
          duration: 200
        })
        $('#toggle-sidebar').velocity('stop').velocity({
          rotateZ: '180deg',
          color: '#99a9bf'
        }, {
          duration: 200
        })
      }
    }
  })
  function changeSideBarInfo () {
    if ($('.author-info').is(':visible')) {
      $('.author-info').velocity('stop')
        .velocity('transition.slideLeftOut', {
          duration: 300,
          complete: function () {
            $('.sidebar-toc').velocity('stop')
              .velocity('transition.slideRightIn', { duration: 500 })
          }
        })
    } else {
      $('.sidebar-toc').velocity('stop')
        .velocity('transition.slideRightOut', {
          duration: 300,
          complete: function () {
            $('.author-info').velocity('stop')
              .velocity('transition.slideLeftIn', { duration: 500 })
          }
        })
    }
  }
})
