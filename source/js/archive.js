/* eslint-disable */
/* 
* Hexojs will change single quote to "-" in tag.
* So if tag contains single quote, router will miss and throw
* exception
* For example, in .md file, we have "let'sEncrypt" tag
* tag path is "tags/let-sEncrypt" instead of "tags/let'sEncrypt"
*
* Don't use single quote in tag, use words instead symbol
*/

const app = `
  <div class="archive">
    <tag_cloud_links :tags="tags" :all="all"></tag_cloud_links>
    <router-view></router-view>
  </div>
  `;

const tag_cloud_links = {
    template:
        `
  <div class="tag-cloud-links">
    <router-link :to="{path:'/',query:{}}" class="tag-link">
      Show all
      <sup>
        {{all.length}}
      </sup>
    </router-link>
    <router-link v-for="(value,key) in tags"
      :key="value.date"
      :to="{path:'/',query:{tag:getBase(value)}}"
      class="tag-link">
      {{ key }}
      <sup>
        {{value.length}}
      </sup>
    </router-link>
  </div>
   `
    ,
    methods: {
        getBase(value) {
            return value.path.slice(6, value.path.length - 1);
        }
    },
    props: {
        tags: Object,
        all: Array
    }
};

const tag_cloud_view = {
    template:
        `
    <transition-group 
        tag="div" 
        class="tag-cloud-view article-sort"
        @before-enter="beforeEnter"
        @enter="enter"
        @leave="leave">
            <div v-for="item in toRender"
                class="article-sort-item"
                :key="window.id">
                <time class="post-date">
                    {{item.date}}
                </time>
                <a :href="item.path"
                    class="article-sort-item__title">
                    {{item.title}}
                </a>
            </div>
    </transition-group>
  `
    , data() {
        return {
            tags: window.global,
            all: [],
            toRender: []
        };
    },
    watch: {
        "$route"(to, from) {
            if (Object.keys(to.query).length === 0) {
                this.toRender = this.changePostsId(this.filteredPosts);
                return;
            }
            if (to.query.tag !== from.query.tag) {
                let changeId = this.tags[to.query.tag].posts;
                this.toRender = this.changePostsId(changeId);
            }
        }
    },
    methods: {
        mergeArray(src) {
            return [].concat.apply([], src);
        },
        changePostsId(to){
            // 因为vue会复用元素，所以为了使每次切换query都触发过渡动画，每次更新数据之前都更新一个id
            for (var i = 0 ; i < to.length ; ++i){
                to[i].id = ++ window.id
            }
            return to
        },
        beforeEnter(el) {
            $(el).css({
                opacity:0
            })
        },
        enter(el, done) {
            $(el).velocity("stop").velocity("transition.slideUpIn",{
                duration: 1000,
                easing: "easeIn",
                display:"flex"
            },{complete:done})
        },
        leave(el, done) {
            done()
        }
    },
    computed: {
        sortedAndMergeAllPosts() {
            return this.mergeArray(this.all).sort(function (a, b) {
                return new Date(b.date) - new Date(a.date);
            });
        },

        filteredPosts() {
            // remove duplicate posts
            let noDuplicate = [];
            let util = {};
            for (var i = 0; i < this.sortedAndMergeAllPosts.length; ++i) {
                var path = this.sortedAndMergeAllPosts[i].path;
                if (!util[path]) {
                    util[path] = true;
                    noDuplicate.push(this.sortedAndMergeAllPosts[i]);
                }
            }
            return noDuplicate;
        }
    },
    created() {
        Object.keys(this.tags).forEach(t => {
            this.all.push(this.tags[t].posts);
        });
    },
    mounted() {
        this.toRender = this.filteredPosts;
        this.$router.onReady(() => {
            if (typeof this.$route.query.tag !== "undefined") {
                let tag = this.$route.query.tag;
                if (typeof this.tags[tag].posts === "undefined") {
                    this.toRender = [];
                    return;
                }
                this.toRender = this.tags[tag].posts;
            }
        });
    }
};

var routes = [{
    path: "/",
    component: tag_cloud_view,
    props: (routes) => ({ tag: routes.query.tag })
}];

const Router = new VueRouter({
    base: "/archives/",
    mode: "history",
    linkActiveClass: "",
    linkExactActiveClass: "active-tag",
    routes
});

Vue.component("app", app);
Vue.component("tag_cloud_links", tag_cloud_links);
Vue.component("tag_cloud_view", tag_cloud_view);

window.id = 0

Vue.config.devtools = true
new Vue({
    el: "#tags_cloud",
    router: Router,
    template: app,
    data() {
        return {
            tags: window.global,
            all: []
        };
    },
    computed: {
        sortedAllPosts() {
            return this.all.sort(function (a, b) {
                return new Date(b.date) - new Date(a.data);
            });
        }
    },
    mounted() {
        Object.keys(this.tags).forEach(t => {
            this.all.push(this.tags[t].posts);
        });
    }
});
