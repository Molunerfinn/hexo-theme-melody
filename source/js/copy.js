$(function () {
  // Add copy icon
  $('figure.highlight').wrap('<div class="code-area-wrap"></div>')
  var $copyIcon = $('<i class="fa fa-clipboard" aria-hidden="true"></i>')
  var $notice = $('<div class="copy-notice"></div>')
  var $codeLanguage = $('<span class="codeblock-language"></span>')
  $('.code-area-wrap').prepend($copyIcon)
  $('.code-area-wrap').prepend($notice)
  $('.code-area-wrap').prepend($codeLanguage)
  $('.code-area-wrap').each(function (index, element) {
    var codeLanguage = $(element)
      .find('figure.highlight')
      .attr('class')
      .replace('highlight', '')
      .trim()
    $(element)
      .find('.codeblock-language')
      .text(codeLanguage)
  })
  // copy function
  function copy (text, ctx) {
    if (
      document.queryCommandSupported &&
      document.queryCommandSupported('copy')
    ) {
      try {
        document.execCommand('copy') // Security exception may be thrown by some browsers.
        $(ctx)
          .prev('.copy-notice')
          .text(GLOBAL_CONFIG.copy.success)
          .velocity(
            {
              translateX: -30,
              opacity: 1
            },
            {
              loop: 1,
              duration: 750,
              easing: 'easeOutQuint'
            }
          )
      } catch (ex) {
        $(ctx)
          .prev('.copy-notice')
          .text(GLOBAL_CONFIG.copy.error)
          .velocity(
            {
              translateX: -30,
              opacity: 1
            },
            {
              loop: 1,
              duration: 750,
              easing: 'easeOutQuint'
            }
          )
        return false
      }
    } else {
      $(ctx)
        .prev('.copy-notice')
        .text(GLOBAL_CONFIG.copy.noSupport)
    }
  }
  // click events
  $('.code-area-wrap .fa-clipboard').on('click', function () {
    var selection = window.getSelection()
    var range = document.createRange()
    range.selectNodeContents(
      $(this)
        .siblings('figure')
        .find('.code pre')[0]
    )
    selection.removeAllRanges()
    selection.addRange(range)
    var text = selection.toString()
    copy(text, this)
    selection.removeAllRanges()
  })
})
