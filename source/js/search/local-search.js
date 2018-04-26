$(function () {
  var loadFlag = false
  $('a.social-icon.search').on('click', function () {
    $('body').css('width', '100%')
    $('body').css('overflow-y', 'scroll')
    $('body').css('position', 'fixed')
    $('.search-dialog').velocity('stop')
      .velocity('transition.expandIn', {
        duration: 300,
        complete: function () {
          $('#local-search-input input').focus()
        }
      })
    $('.search-mask').velocity('stop')
      .velocity('transition.fadeIn', {
        duration: 300
      })
    if (!loadFlag) {
      search(GLOBAL_CONFIG.localSearch.path)
      loadFlag = true
    }
  })
  $('.search-mask, .search-close-button').on('click', function () {
    $('body').css('position', 'absolute')
    $('.search-dialog').velocity('stop')
      .velocity('transition.expandOut', {
        duration: 300
      })
    $('.search-mask').velocity('stop')
      .velocity('transition.fadeOut', {
        duration: 300
      })
  })

  function search (path) {
    $.ajax({
      url: '/' + path,
      dataType: 'xml',
      success: function (xmlResponse) {
        // get the contents from search data
        var datas = $('entry', xmlResponse).map(function () {
          return {
            title: $('title', this).text(),
            content: $('content', this).text(),
            url: $('url', this).text()
          }
        }).get()
        var $input = $('#local-search-input input')[0]
        var $resultContent = $('#local-hits')[0]
        $input.addEventListener('input', function () {
          var str = '<div class="search-result-list">'
          var keywords = this.value.trim().toLowerCase().split(/[\s]+/)
          $resultContent.innerHTML = ''
          if (this.value.trim().length <= 0) {
            $('.local-search-stats__hr').hide()
            return
          }
          var count = 0
          // perform local searching
          datas.forEach(function (data) {
            var isMatch = true
            var dataTitle = data.title.trim().toLowerCase()
            var dataContent = data.content.trim().replace(/<[^>]+>/g, '').toLowerCase()
            var dataUrl = data.url
            var indexTitle = -1
            var indexContent = -1
            // only match artiles with not empty titles and contents
            if (dataTitle !== '' && dataContent !== '') {
              keywords.forEach(function (keyword, i) {
                indexTitle = dataTitle.indexOf(keyword)
                indexContent = dataContent.indexOf(keyword)
                if (indexTitle < 0 && indexContent < 0) {
                  isMatch = false
                } else {
                  if (indexContent < 0) {
                    indexContent = 0
                  }
                }
              })
            }
            // show search results
            if (isMatch) {
              str += '<div class="local-search__hit-item"><a href="' + dataUrl + '" class="search-result-title" target="_blank">' + dataTitle + '</a>' + '</div>'
              count += 1
              $('.local-search-stats__hr').show()
            }
          })
          if (count === 0) {
            str += '<div id="local-search__hits-empty">' + GLOBAL_CONFIG.localSearch.labels.hits_empty.replace(/\$\{query}/, this.value.trim()) +
              '</div>'
          }
          $resultContent.innerHTML = str
        })
      }
    })
  }
})
