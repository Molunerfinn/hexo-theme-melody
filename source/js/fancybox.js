$(function () {
  var imgList = $('.recent-post-item img')
  if (imgList.length === 0) {
    imgList = $('#post-content img')
  }
  for (var i = 0; i < imgList.length; i++) {
    var $a = $(
      '<a href="' +
      imgList[i].src +
      '" data-fancybox="group" data-caption="' +
      imgList[i].alt +
      '" class="fancybox"></a>'
    )
    var alt = imgList[i].alt
    var $wrap = $(imgList[i]).wrap($a)
    if (alt) {
      $wrap.after('<div class="img-alt">' + alt + '</div>')
    }
  }

  $().fancybox({
    selector: '[data-fancybox]',
    loop: true,
    transitionEffect: 'slide',
    buttons: [
      "share",
      "slideShow",
      "fullScreen",
      "download",
      "thumbs",
      "close"
    ],
  })

  var galleryItem = $('.gallery-item')
  var galleryList = []
  galleryItem.each(function (idx, elem) {
    galleryList.push({
      src: $(elem).data('url'),
      opts: {
        caption: $(elem).data('title')
      }
    })
  })
  galleryItem.on('click', function () {
    $.fancybox.open(
      galleryList,
      {
        loop: true,
        transitionEffect: 'slide'
      },
      galleryItem.index(this)
    )
    return false
  })
})
