hexo.extend.helper.register("stringify",function(t){
  //https://stackoverflow.com/questions/38998718/how-to-filter-posts-by-tag-in-hexo
  var getAllPostsOfTag = (tag) => {
    return t.findOne({name:tag}).posts
  }
  var date = hexo.extend.helper.get("date").bind(this)
  var url_for = hexo.extend.helper.get("url_for").bind(this)
  var postsFn = function(posts){
    var ps = []
    posts.forEach(p => {
      ps.push({
        title:p.title,
        path:url_for(p.path),
        date:date(p.date,"YYYY-MM-DD")
      })
    })
    return ps
  }
  
  var tags = {}
  t.forEach(tag => {
    tags[tag.name] = {
      path:url_for(tag.path),
      posts:postsFn(getAllPostsOfTag(tag.name)),
      length:tag.length
    }
  })
  return tags
})