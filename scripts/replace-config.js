/**
 * Note: configs in _data/melody.yml will replace configs in hexo.theme.config.
 */
hexo.on('generateBefore', function () {
  if (hexo.locals.get) {
    var data = hexo.locals.get('data')
    data && data.melody && (hexo.theme.config = data.melody)
  }
})
