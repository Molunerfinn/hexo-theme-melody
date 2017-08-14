$(function () {
  $(window).scroll(throttle(function (event) {
    if ($(this).scrollTop() > 300) {
      anime({
        targets: '.go-up',
        translateX: -40,
        opacity: 1,
        easing: 'linear',
        duration: 150
      })
    } else {
      anime({
        targets: '.go-up',
        translateX: 10,
        opacity: 0,
        easing: 'linear',
        duration: 150
      })
    }
  }, 100, 250))
  $('.go-up').on('click', function () {
    anime({
      targets: [document.documentElement, document.body],
      scrollTop: 0,
      duration: 250,
      easing: 'linear'
    })
  })
})
