$(function () {
  $('#toggle-sidebar').on('click', function () {
    var isOpen = $(this).hasClass('on')
    isOpen ? $(this).removeClass('on') : $(this).addClass('on')
    if (isOpen) {
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
  })
})
