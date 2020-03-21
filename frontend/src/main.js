// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueResource from 'vue-resource'
// import VueRouter from 'vue-router'
import App from './App'
import router from './router'
import Navbar from './components/Navbar'
import Navbartwo from './components/Navbartwo'
import Addtext from './components/addtext'
import Findtext from './components/findtext'
import Mainnav from './components/Mainnav'
import navbarthree from './components/navbarthree'
import entityannoationcontent from './components/entityannoationcontent'
import navbarfour from './components/navbarfour'
import relationcontent from './components/relationcontent'


import BootstrapVue from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
// import { METHODS } from 'http';
// import { toUnicode } from 'punycode';

Vue.use(BootstrapVue)
Vue.use(VueResource)

Vue.config.productionTip = false

Vue.component("navbar",Navbar); 
Vue.component("navbartwo",Navbartwo); 
Vue.component("addtext",Addtext); 
Vue.component("findtext",Findtext); 
Vue.component("mainnav",Mainnav);
Vue.component("navbarthree",navbarthree);
Vue.component("entityannoationcontent",entityannoationcontent);
Vue.component('navbarfour',navbarfour);
Vue.component('relationcontent',relationcontent);



// import axios from 'axios' // 引入axios
 
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded' 
 
// /* 请求拦截器 */
 
// axios.interceptors.request.use(function (config) { // 每次请求时会从localStorage中获取token
 
//     let token = window.localStorage.getItem('token') 
//     if (token) {
//         console.log("you")
//         token = 'bearer' + ' ' + token.replace(/'|"/g, '') // 把token加入到默认请求参数中 
//         config.headers.common['Authorization'] = token
 
//     }else{
//       console.log("not")
//     }
 
//     return config
 
// }, function (error) { 
//     return Promise.reject(error) 
// })
 
/* 响应拦截器 */
 
// axios.interceptors.response.use(function (response) { // ①10010 token过期（30天） ②10011 token无效 
// if (response.data.code === 10010 || response.data.code === 10011) {

//   window.localStorage.removeItem('token') // 删除已经失效或过期的token（不删除也可以，因为登录后覆盖）
 
//     router.replace({
 
//         path: '/login' // 到登录页重新获取token
 
//     })
 
// } else if (response.data.token) { // 判断token是否存在，如果存在说明需要更新token
 
//   window.localStorage.setItem('token', response.data.token) // 覆盖原来的token(默认一天刷新一次)
 
// }
 
//     return response
 
// }, function (error) {
 
//     return Promise.reject(error)
 
// })

// Vue.http.headers.common['Authorization'] = ' Token 8bd439c622c3cc8f22a7f9d97fade29c869c0b44';

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

