import router from ".";
import store from '../store'
import {getToken} from '../utils/token'
import {addDynamicRoutes} from './modules/permission'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css' 

// 白名单中的重定向
const whiteList = ['/login','/register','/404']

router.beforeEach(async(to, from, next) => {
    // 进度条开始
    NProgress.start()
    const hasToken = getToken();
    if(hasToken){
        
        if(to.path === '/login'){  
            next({path: '/'});
            // 关闭进度条
            NProgress.done();      
        }else{
            const hasRoles = store.getters.roles && store.getters.roles.length > 0 ;
            if(hasRoles){
                next();
            }else{
                try{  
                    const { routes } = await store.dispatch('user/getInfo');
                    const dynamicRoutes = addDynamicRoutes(routes.menu);
                    dynamicRoutes.forEach(route => {
                        router.addRoute('Layout',route);
                    })
                    // 防止动态添加路由刷新页面404
                    router.addRoute({ path: '*', redirect: '/404', hidden: true })
                    // 设置replace:true，这样导航将不会留下历史记录
                    next({ ...to, replace: true })
                }catch(error){
                    await store.dispatch('user/resetToken')
                    Message.error(error || 'Error')
                    next(`/login?redirect=${to.to.path}`)
                    NProgress.done()
                }
            }
        }
    }else{
        // 不登录的情况下 
        if(whiteList.indexOf(to.path) !== -1){
            // 在免登录白名单中，直接进入
            next()
        }else{
            // 没有访问权限的其他页面将重定向到登录页面
            next(`/login?redirect=${to.path}`)
            NProgress.done()
        }
    }
})

router.afterEach(() => {
    // finish progress bar
    NProgress.done()
  })