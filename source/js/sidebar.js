$(function () {
  $('.toggle-sidebar').on('click', function () {
    anime({
      targets: 'body',
      paddingLeft: '300px'
    })
    anime({
      targets: this,
      left: '300px',
      rotate: '180deg'
    })
  })
})
