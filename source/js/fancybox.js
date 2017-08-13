$(function () {
  var imgList = $('#content-inner img')
  console.log(imgList)
  for (var i = 0; i < imgList.length; i++) {
    var $a = $('<a href="' + imgList[i].src + '" data-fancybox="group" data-caption="' + imgList[i].alt + '"></a>')
    $(imgList[i]).wrap($a)
  }

  $().fancybox({
    selector: '[data-fancybox]',
    loop: true,
    transitionEffect: 'slide'
  })
})
