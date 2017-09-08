$(function () {
  // Add copy icon
  var $copyIcon = $('<i class="fa fa-clipboard" aria-hidden="true"></i>')
  var $notice = $('<div class="copy-notice"></div>')
  $('figure.highlight').prepend($copyIcon)
  $('figure.highlight').prepend($notice)
  // copy function
  function copy (text, ctx) {
    if (document.queryCommandSupported && document.queryCommandSupported('copy')) {
      var textarea = document.createElement('textarea')
      textarea.style.position = 'fixed' // Prevent scrolling to bottom of page in MS Edge.
      document.body.appendChild(textarea)
      textarea.textContent = text
      textarea.focus()
      textarea.setSelectionRange(0, textarea.value.length)
      try {
        document.execCommand('copy') // Security exception may be thrown by some browsers.
        $(ctx).prev('.copy-notice')
          .text(GLOBAL.copy.success)
          .velocity({
            translateX: -30,
            opacity: 1
          }, {
            loop: 1,
            duration: 750,
            easing: 'easeOutQuint'
          })
      } catch (ex) {
        $(ctx).prev('.copy-notice')
          .text(GLOBAL.copy.error)
          .velocity({
            translateX: -30,
            opacity: 1
          }, {
            loop: 1,
            duration: 750,
            easing: 'easeOutQuint'
          })
        return false
      } finally {
        document.body.removeChild(textarea)
      }
    } else {
      $(ctx).prev('.copy-notice').text(GLOBAL.copy.noSupport)
    }
  }
  // click events
  $('.highlight .fa-clipboard').on('click', function () {
    var selection = window.getSelection()
    var range = document.createRange()
    range.selectNodeContents($(this).next('table').find('.code pre')[0])
    selection.removeAllRanges()
    selection.addRange(range)
    var text = selection.toString()
    copy(text, this)
    text = ''
  })
})
