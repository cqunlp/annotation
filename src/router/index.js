import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/components/Login'
import Home from '@/components/Home'
import Wholeaddtext from '@/components/wholeaddtext'
import Wholefindtext from '@/components/wholefindtext'
import entityannoation from '@/components/entityannoation'
import relation from '@/components/relation'
import allocate from '@/components/allocate'

Vue.use(Router);

const router =  new Router({
  mode:'history',
  routes: [    
  {
      path:'/',
      name:'login',
      component:Login
    },
    {
      path:'/home',
      name:'home',
      component:Home     
    },
    {
          path:'/addtext',
           name:'wholeaddtext',
           component:Wholeaddtext
      },
      {
        path:'/findtext',
         name:'wholefindtext',
         component:Wholefindtext
    },
    {
      path:'/entityannoation',
       name:'entityannoation',
       component:entityannoation
  },
  {
    path:'/relation',
     name:'relation',
     component:relation
},
  {
    path:'/allocate',
     name:'allocate',
     component:allocate
}
    
  ]
});

router.beforeEach((to,from,next)=>{
  console.log(to);
  if(window.localStorage.getItem('Authorization')||to.name=="login"){
    next();
  }else{
    next({
      path:'/'
    })
  }
  next();
})

export default router
