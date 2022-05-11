import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        redirect:'/index',
        component: () => import('@/views/layout/index')
    },
    {
       path: '/index',
       name:'Layout',
       meta:{
        requireAuth:true 
       },
       component: () => import('@/views/layout/index'),
       children:[
        //    {
        //        path:'/market/detail',
        //        name:'detail',
        //        component:() => import('@/views/market/detail')
        //    }
       ]
    },
    {
        path:'/login',
        name:'login',
        component: () => import('@/views/login/login')
    },
    {
        path:'/register',
        name:'register',
        component: () => import('@/views/login/register')
    },
    {
        path:'/404',
        name:'error',
        component: () => import('@/views/error/404')
    }
    // { path: '*', redirect: '/404', hidden: true }  
]



const createRouter = () => new VueRouter({
    // require service support
    // mode: 'history', 
    scrollBehavior: () => ({ y:0 }),
    routes
})

const router = createRouter();

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter(){
    const newRouter = createRouter()
    // reset router
    router.matcher = newRouter.matcher
}

// vue-router路由版本更新产生的问题,导致路由跳转失败抛出该错误，但并不影响程序功能
const routerPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error=> error)
}

export default router;