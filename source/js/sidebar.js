$(function () {
  $('#toggle-sidebar').on('click', function () {
    var isOpen = $(this).hasClass('on')
    isOpen ? $(this).removeClass('on') : $(this).addClass('on')
    if (isOpen) {
      anime({
        targets: '#sidebar',
        translateX: '0px',
        easing: 'easeInSine',
        duration: 250
      })
      anime({
        targets: '#content-outer',
        paddingLeft: '0px',
        easing: 'easeInOutQuad',
        duration: 250
      })
      anime({
        targets: this,
        color: '#1F2D3D',
        rotate: '0deg',
        easing: 'easeInQuad',
        duration: 250
      })
    } else {
      anime({
        targets: '#content-outer',
        paddingLeft: '300px',
        easing: 'easeInOutQuad',
        duration: 250
      })
      anime({
        targets: this,
        color: '#99a9bf',
        rotate: '180deg',
        duration: 250
      })
      anime({
        targets: '#sidebar',
        translateX: '300px',
        easing: 'easeInSine',
        duration: 250
      })
    }
  })
})
