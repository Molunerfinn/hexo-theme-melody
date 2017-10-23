$(function () {
  $('a.social-icon.search').on('click', function () {
    $('.search-dialog').velocity('stop')
      .velocity('transition.expandIn', { duration: 300 })
    $('.search-mask').velocity('stop')
      .velocity('transition.fadeIn', { duration: 300 })
  })
  $('.search-mask, .search-close-button').on('click', function () {
    $('.search-dialog').velocity('stop')
      .velocity('transition.expandOut', { duration: 300 })
    $('.search-mask').velocity('stop')
      .velocity('transition.fadeOut', { duration: 300 })
  })
  $('#local-search input').on('input', function () {
    search()
  })

  function search (path) {
    $.ajax({
      url: path,
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
        var $input = document.getElementById('#local-search input')
        var $resultContent = document.getElementById('#local-hits')
        $input.addEventListener('input', function () {
          var str = '<ul class="search-result-list">'
          var keywords = this.value.trim().toLowerCase().split(/[\s]+/)
          $resultContent.innerHTML = ''
          if (this.value.trim().length <= 0) {
            return
          }
          // perform local searching
          datas.forEach(function (data) {
            var isMatch = true
            var dataTitle = data.title.trim().toLowerCase()
            var dataContent = data.content.trim().replace(/<[^>]+>/g, '').toLowerCase()
            var dataUrl = data.url
            var indexTitle = -1
            var indexContent = -1
            var firstOccur = -1
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
                  if (i === 0) {
                    firstOccur = indexContent
                  }
                }
              })
            }
            // show search results
            if (isMatch) {
              str += "<li><a href='" + dataUrl + "' class='search-result-title' target='_blank'>" + '> ' + dataTitle + '</a>'
              var content = data.content.trim().replace(/<[^>]+>/g, '')
              if (firstOccur >= 0) {
                // cut out characters
                var start = firstOccur - 6
                var end = firstOccur + 6
                if (start < 0) {
                  start = 0
                }
                if (start === 0) {
                  end = 10
                }
                if (end > content.length) {
                  end = content.length
                }
                var matchContent = content.substr(start, end)
                // highlight all keywords
                keywords.forEach(function (keyword) {
                  var regS = new RegExp(keyword, 'gi')
                  matchContent = matchContent.replace(regS, '<em class="search-keyword">' + keyword + '</em>')
                })
                str += '<p class="search-result">' + matchContent + '...</p>'
              }
            }
          })
          $resultContent.innerHTML = str
        })
      }
    })
  }
})
