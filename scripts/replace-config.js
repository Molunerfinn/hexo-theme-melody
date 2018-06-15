/**
 * Note: configs in _data/melody.yml will replace configs in hexo.theme.config.
 */

const version = require('../package.json').version

hexo.extend.helper.register('version', function () {
  return version
})

hexo.on('generateBefore', function () {
  const rootConfig = hexo.config
  if (hexo.locals.get) {
    const data = hexo.locals.get('data')
    data && data.melody && (hexo.theme.config = data.melody)
  }
  hexo.theme.config.rootConfig = rootConfig
})