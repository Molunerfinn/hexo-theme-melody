本文收录大家在使用`hexo-theme-melody`中遇到的常见问题。其中很大一部分是没有阅读[文档](https://molunerfinn.com/hexo-theme-melody-doc/#/zh-Hans/)导致的。请养成先看文档再提问的习惯！

## 常见问题

### 1. `wordcount`相关。能看到的报错如：`wordcount is not a function`。

![](https://user-images.githubusercontent.com/12621342/39472068-845afe58-4d79-11e8-922c-6e2aab177f1f.png)

### 2. `keywords`相关。能看到的报错如：`(config.keywords || []).join is not a function`

参考[issue](https://github.com/Molunerfinn/hexo-theme-melody/issues/58)。

找到你hexo站点的`_config.yml`（不是主题的`_config.yml`！）然后修改你的`keywords`项，改成空或者数组形式：

```yaml
keywords:
  - item1
  - item2
```

### 3. `renderer`相关。能看到的报错如：`ERROR Process failed: layout/includes/slide/script.pug`

参考[issue](https://github.com/Molunerfinn/hexo-theme-melody/issues/67)。

![](https://user-images.githubusercontent.com/12621342/38991683-18ccf3a6-4411-11e8-8d8c-dc0ea8e5060a.png)

### 4. `localSeach`相关。能看到的报错如：`Cannot read property 'path' of undefined`

参考[issue](https://github.com/Molunerfinn/hexo-theme-melody/issues/54)。

![](https://user-images.githubusercontent.com/12621342/38242062-63ce5438-3766-11e8-9375-256d87d0adfc.png)

### 5. `renderer`相关。能看到的报错如：`Syntax Error: Unexpected charactor`

参考[issue](https://github.com/Molunerfinn/hexo-theme-melody/issues/5)。

注意你站点里的`package.json`里有没有同时存在`hexo-renderer-pug`和`hexo-renderer-jade`。请删掉`hexo-renderer-pug`。然后重新`npm install`。之后执行`hexo clean` 和 `hexo g` 即可。

------

If you have meet some problems using `hexo-theme-melody`, it's recommended to read [documentation](https://molunerfinn.com/hexo-theme-melody-doc/#/), most of your problems will be solved.

## FAQ

### 1. Problem with `wordcount`. Such as `wordcount is not a function`.

![](https://raw.githubusercontent.com/Molunerfinn/test/master/picgo/word_count_problem.png)

### 2. Problem with `keywords`. Such as `(config.keywords || []).join is not a function`

Check this [issue](https://github.com/Molunerfinn/hexo-theme-melody/issues/58).

Find your hexo site `_config.yml` （not the `_config.yml` in theme folder!), then modified your `keywords` option to an array or empty.

```yaml
keywords:
  - item1
  - item2
```

### 3. Problem with `renderer`. Such as `ERROR Process failed: layout/includes/slide/script.pug`

Check this [issue](https://github.com/Molunerfinn/hexo-theme-melody/issues/67).

![](https://user-images.githubusercontent.com/12621342/38991683-18ccf3a6-4411-11e8-8d8c-dc0ea8e5060a.png)

### 4. Problem with `localSeach`. Such as `Cannot read property 'path' of undefined`

Check this [issue](https://github.com/Molunerfinn/hexo-theme-melody/issues/54).

![](https://raw.githubusercontent.com/Molunerfinn/test/master/picgo/local_search_problem.png)

### 5. Problem with `renderer`. Such as `Syntax Error: Unexpected charactor`

Check this [issue](https://github.com/Molunerfinn/hexo-theme-melody/issues/5).

Notice that if both `hexo-renderer-pug` & `hexo-renderer-jade` are existing in your hexo site's `package.json`. Please remove `hexo-renderer-pug` and then `npm install`, `hexo clean` and `hexo g`.
