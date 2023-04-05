import NProgress from 'nprogress'
import {Router, RouteRecordRaw} from 'vue-router'
import {ElMessage} from 'element-plus'
import 'nprogress/nprogress.css'

import {getPageTitle} from '@/lang'
import {useUserStoreWithOut} from '@/store/modules/user'
import {usePermissionStoreWithOut} from '@/store/modules/permission'

NProgress.configure({showSpinner: false})

const whiteList = ['/login']

export function createPermissionGuard(router: Router){
    router.beforeEach(async(to, from, next) => {
        // Start progress bar
        NProgress.start()

        const userStore = useUserStoreWithOut()
        const permissionStore = usePermissionStoreWithOut()

        if(userStore.token){
            if(to.path === '/login'){
                // 登录成功，跳转到首页
                next({path: '/'})
                NProgress.done()
            }else{
                // Check whether the user has obtained his permission roles
                if(userStore.roles.length === 0){
                    try{
                        const {roles} = await userStore.getUserInfo()
                        // 获取菜单
                        const accessRoutes: RouteRecordRaw[] = await permissionStore.generateRoutes(roles)
                        accessRoutes.forEach((route: any) => {
                            router.addRoute(route)
                        })
                        next({...to, replace: true})
                    }catch(err){
                        // 移除 token 并跳转登录页
                        userStore.resetToken()
                        ElMessage.error(err || 'Has Error')
                        next(`/login?redirect=${to.path}`)
                        NProgress.done()
                    }
                }else if(to.matched.length === 0){
                    from.name ? next({name: from.name as any}) : next('/401')
                }else{
                    next()
                }
            }
        }else{
            // 未登录可以访问白名单页面
            if(whiteList.includes(to.path)){
                // In the free login whitelist, go directly
                next()
            }else{
                // Other pages that do not have permission to access are redirected to the login page.
                next(`/login?redirect=${to.path}`)
                NProgress.done()
            }
        }
    })

    router.afterEach(to => {
        NProgress.done()
        // set page title
        document.title = getPageTitle(to.meta.title)
    })
}
