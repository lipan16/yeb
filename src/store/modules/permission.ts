import {RouteRecordRaw} from 'vue-router'
import {defineStore} from 'pinia'
import {store} from '@/store'
import {constantRoutes} from '@/router'
import Api from '@/api'

const modules = import.meta.glob('../../views/**/**.vue')
export const Layout = () => import('@/layout/index.vue')

const hasPermission = (roles: string[], route: RouteRecordRaw) => {
    if(route.meta && route.meta.roles){
        if(roles.includes('ROOT')){
            return true
        }
        return roles.some(role => {
            if(route.meta?.roles !== undefined){
                return (route.meta.roles as string[]).includes(role)
            }
        })
    }
    return false
}

const filterAsyncRoutes = (routes: RouteRecordRaw[], roles: string[]) => {
    const res: RouteRecordRaw[] = []
    routes.forEach(route => {
        const tmp = {...route} as any
        if(hasPermission(roles, tmp)){
            if(tmp.component === 'Layout'){
                tmp.component = Layout
            }else{
                const component = modules[`../../views/${tmp.component}.vue`] as any
                tmp.component = component ? component : modules[`../../views/error-page/404.vue`]
            }
            if(tmp.children){
                tmp.children = filterAsyncRoutes(tmp.children, roles)
            }

            res.push(tmp)
        }
    })
    return res
}

const permissionStore = defineStore('permission', () => {
    // state
    const routes = ref<RouteRecordRaw[]>([])

    // actions
    function setRoutes(newRoutes: RouteRecordRaw[]){
        routes.value = constantRoutes.concat(newRoutes)
    }

    function generateRoutes(roles: string[]){
        return new Promise<RouteRecordRaw[]>((resolve, reject) => {
            Api.auth.getMenuList().then(response => {
                const asyncRoutes = response.data
                const accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
                setRoutes(accessedRoutes)
                resolve(accessedRoutes)
            }).catch(error => {
                reject(error)
            })
        })
    }

    return {routes, setRoutes, generateRoutes}
})

// 非setup
export function usePermissionStoreWithOut(){
    return permissionStore(store)
}
