## 重庆大学专业知识内容标注系统

由于业务需要，重构前后端代码，借鉴Doccano项目部分设计。

TODO:

1. 用户逻辑改为平行用户，不设置层级，所有用户拥有自建project权限，通过邀请加入其他用户协同标注

2. 由1.需求，需添加个人通知中心功能，用于接收邀请

3. 不设置预设用户，加入注册功能

4. Project自定标注规则，修改数据库表依赖。

5. 现拟实现三类标注：序列标注、分类标注、Seq2Seq标注。

6. 数据库重新设计，前后端源码统一放置此仓库，使用gh-papges展示前端。



<!-- > A Vue.js project -->

<!-- ## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader). -->
