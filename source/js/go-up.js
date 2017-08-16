$(function () {
  $(window).scroll(throttle(function (event) {
    if ($(this).scrollTop() > 300) {
      // anime({
      //   targets: '.go-up',
      //   translateX: -40,
      //   opacity: 1,
      //   easing: 'linear',
      //   duration: 150
      // })
      $('#go-up').velocity({
        translateX: -40,
        rotateZ: 360,
        opacity: 1
      }, {
        easing: 'easeOutBack',
        duration: 200
      })
    } else {
      // anime({
      //   targets: '.go-up',
      //   translateX: 10,
      //   opacity: 0,
      //   easing: 'linear',
      //   duration: 150
      // })
      $('#go-up').velocity({
        translateX: 10,
        rotateZ: 180,
        opacity: 0
      }, {
        easing: 'linear',
        duration: 200
      })
    }
  }, 100, 250))
  $('#go-up').on('click', function () {
    $('body').velocity('scroll', {
      duration: 500,
      easing: 'easeOutQuart'
    })
  })
})
