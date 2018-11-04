hexo.extend.helper.register("queryTag",function(tag){
  return "/archives/?tag=" + tag.slice(5,tag.length - 1)
})