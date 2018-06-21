$(function () {
  $('a.social-icon.search').on('click', function () {
    $('body').css('width', '100%')
    $('body').css('overflow', 'hidden')
    $('.search-dialog').velocity('stop')
      .velocity('transition.expandIn', {
        duration: 300,
        complete: function () {
          $('.ais-search-box--input').focus()
        }
      })
    $('.search-mask').velocity('stop')
      .velocity('transition.fadeIn', {
        duration: 300
      })

    // shortcut: ESC
    document.addEventListener('keydown', function f(event) {
      if (event.code == "Escape") {
        closeSearch();
        document.removeEventListener('keydown', f);
      }
    })
  })

  var closeSearch = function () {
    $('body').css('overflow', 'auto')
    $('.search-dialog').velocity('stop')
      .velocity('transition.expandOut', {
        duration: 300
      })
    $('.search-mask').velocity('stop')
      .velocity('transition.fadeOut', {
        duration: 300
      })
  }
  $('.search-mask, .search-close-button').on('click', closeSearch)



  var algolia = GLOBAL_CONFIG.algolia
  var isAlgoliaValid = algolia.appId && algolia.apiKey && algolia.indexName
  if (!isAlgoliaValid) {
    return console.error('Algolia setting is invalid!')
  }

  var search = instantsearch({
    appId: algolia.appId,
    apiKey: algolia.apiKey,
    indexName: algolia.indexName,
    searchParameters: {
      hitsPerPage: algolia.hits.per_page || 10
    },
    searchFunction: function (helper) {
      var searchInput = $('#algolia-search-input').find('input')

      if (searchInput.val()) {
        helper.search()
      }
    }
  })

  search.addWidget(
    instantsearch.widgets.searchBox({
      container: '#algolia-search-input',
      reset: false,
      magnifier: false,
      placeholder: GLOBAL_CONFIG.algolia.languages.input_placeholder
    })
  )
  search.addWidget(
    instantsearch.widgets.hits({
      container: '#algolia-hits',
      templates: {
        item: function (data) {
          var link = data.permalink ? data.permalink : (GLOBAL_CONFIG.root + data.path)
          return (
            '<a href="' + link + '" class="algolia-hit-item-link">' +
            data._highlightResult.title.value +
            '</a>'
          )
        },
        empty: function (data) {
          return (
            '<div id="algolia-hits-empty">' +
            GLOBAL_CONFIG.algolia.languages.hits_empty.replace(/\$\{query}/, data.query) +
            '</div>'
          )
        }
      },
      cssClasses: {
        item: 'algolia-hit-item'
      }
    })
  )

  search.addWidget(
    instantsearch.widgets.stats({
      container: '#algolia-stats',
      templates: {
        body: function (data) {
          var stats = GLOBAL_CONFIG.algolia.languages.hits_stats
            .replace(/\$\{hits}/, data.nbHits)
            .replace(/\$\{time}/, data.processingTimeMS)
          return (
            '<hr>' +
            stats +
            '<span class="algolia-logo pull-right">' +
            '  <img src="' + GLOBAL_CONFIG.root + 'img/algolia.svg" alt="Algolia" />' +
            '</span>'
          )
        }
      }
    })
  )

  search.addWidget(
    instantsearch.widgets.pagination({
      container: '#algolia-pagination',
      scrollTo: false,
      showFirstLast: false,
      labels: {
        first: '<i class="fa fa-angle-double-left"></i>',
        last: '<i class="fa fa-angle-double-right"></i>',
        previous: '<i class="fa fa-angle-left"></i>',
        next: '<i class="fa fa-angle-right"></i>'
      },
      cssClasses: {
        root: 'pagination',
        item: 'pagination-item',
        link: 'page-number',
        active: 'current',
        disabled: 'disabled-item'
      }
    })
  )

  search.start()
})
