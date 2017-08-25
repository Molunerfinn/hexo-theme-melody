$(function () {
  // page
  $('.layout').velocity('stop')
    .velocity('transition.slideUpIn', {
      delay: 500,
      duration: 1000,
      easing: 'easeInOutQuart'
    })
  $('#top-container').velocity('stop')
    .velocity('transition.fadeIn', {
      delay: 500,
      duration: 1000,
      easing: 'easeInOutQuart'
    })
})
