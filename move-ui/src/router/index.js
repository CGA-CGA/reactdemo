import Vue from 'vue'
import Router from 'vue-router'
//引入仓库
import Store from '../store'


Vue.use(Router)

// 封装一个函数，用来检测是否存在该地址
//some 有一个真就返回真
function hasUrl(url){
  return Store.state.userInfo.menus_url.some(item=>item ==url)
}
export let routerlist = [
  {
    path:'/menu',
    component:()=> import('@/views/menu/menu'),
    name:'菜单管理',
    beforeEnter: (to, from, next) => {
      hasUrl('/menu') ? next() : next('/home')
    }
  },
  {
    path:'/admin',
    component:()=> import('@/views/admin/admin'),
    name:'管理员管理',
    beforeEnter: (to, from, next) => {
      hasUrl('/admin') ? next() : next('/home')
    }
  },
  {
    path:'/role',
    component:()=> import('@/views/role/role'),
    name:'角色管理',
    beforeEnter: (to, from, next) => {
      hasUrl('/role') ? next() : next('/home')
    }
  },
  {
    path:'/cate',
    component:()=> import('@/views/cate/cate'),
    name:'商品分类',
    beforeEnter: (to, from, next) => {
      hasUrl('/cate') ? next() : next('/home')
    }
  },
  {
    path:'/specs',
    component:()=> import('@/views/specs/specs'),
    name:'商品规格',
    beforeEnter: (to, from, next) => {
      hasUrl('/specs') ? next() : next('/home')
    }
  },
  {
    path:'/goods',
    component:()=> import('@/views/goods/goods'),
    name:'商品管理',
    beforeEnter: (to, from, next) => {
      hasUrl('/goods') ? next() : next('/home')
    }
  },
  {
    path:'/member',
    component:()=> import('@/views/member/member'),
    name:'会员管理',
    beforeEnter: (to, from, next) => {
      hasUrl('/member') ? next() : next('/home')
    }
  },
  {
    path:'/banner',
    component:()=> import('@/views/banner/banner'),
    name:'轮播图管理',
    beforeEnter: (to, from, next) => {
      hasUrl('/banner') ? next() : next('/home')
    }
  },
  {
    path:'/seck',
    component:()=> import('@/views/seck/seck'),
    name:'秒杀活动',
    beforeEnter: (to, from, next) => {
      hasUrl('/seck') ? next() : next('/home')
    }
  },
]
const router = new Router({
  routes: [
   
    {
      path: '/login',
      component: () => import('@/pages/login')
    },
    {
      path: '/index',
      component: () => import('@/pages/index'),
      children:[
        {
          path: '/home',
          component: () => import('@/views/home')
        },
        ...routerlist,
        {
          path: '',
          redirect: '/home'
        }
      ]
    },
    {
      path: '*',
      redirect: '/login'
    }
  ]
})
// 全局导航守卫
router.beforeEach((to,from,next)=>{
  if(to.path=='/login'){
    next()
    return
  }
  if(sessionStorage.getItem('userInfo')){
    next()
    return
  }else{
    next('/login');
  }


})

// 导出路由
export default router