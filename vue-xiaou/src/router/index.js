import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/index',
      component:()=>import('@/views/index'),
      children:[
        {
          path:'/home',
          component:()=>import('@/pages/home')
        },
        {
          path:'/cart',
          component:()=>import('@/pages/cart')
        },
        {
          path:'/mine',
          component:()=>import('@/pages/mine')
        },
        {
          path:'',
          redirect:'/home'
        }
      ]
    },
    {
      path:'/login',
      component:()=>import('@/views/login')
    },
    {
      path:'/register',
      component:()=>import('@/views/register')
    },
    {
      path:'/sort',
      component:()=>import('@/views/sort')
    },
    {
      path:'/detail',
      component:()=>import('@/views/detail'),
    },
    {
      path:'/list',
      component:()=>import('@/views/list')
    },
    {
      path:'/confirmOrder',
      component:()=>import('@/views/confirmOrder')
    },
    {
      path:'*',
      redirect:'/index'
    }
  ]
})
