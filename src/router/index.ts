import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router'
import {App} from 'vue'

import Layout from '@/layout/index.vue'
import {usePermissionStoreWithOut} from '@/store/modules/permission'

export const constantRoutes: RouteRecordRaw[] = [
    {
        path: '/redirect',
        component: Layout,
        meta: {hidden: true},
        children: [
            {
                path: '/redirect/:path(.*)',
                component: () => import(/* webpackChunkName: "redirect" */ '@/views/redirect/index.vue'),
            },
        ],
    },
    {
        path: '/login',
        component: () => import(/* webpackChunkName: "login" */ '@/views/login/index.vue'),
        meta: {
            title: 'login',
            hidden: true,
        },
    },
    {
        path: '/auth-redirect',
        component: () => import(/* webpackChunkName: "auth-redirect" */ '@/views/login/auth-redirect.vue'),
        meta: {hidden: true},
    },
    {
        path: '/404',
        component: () => import(/* webpackChunkName: "404" */ '@/views/error-page/404.vue'),
        meta: {hidden: true},
    },
    {
        path: '/401',
        component: () => import(/* webpackChunkName: "401" */ '@/views/error-page/401.vue'),
        meta: {hidden: true},
    },
    {
        path: '/',
        component: Layout,
        redirect: '/dashboard',
        children: [
            {
                path: 'dashboard',
                component: () => import(/* webpackChunkName: "dashboard" */ '@/views/dashboard/index.vue'),
                name: 'Dashboard',
                meta: {
                    title: 'dashboard',
                    icon: 'homepage',
                    affix: true,
                },
            },
        ],
    },
]

export const router = createRouter({
    history: createWebHistory(import.meta.env.VITE_APP_BASE_URL),
    routes: constantRoutes,
    strict: true,
    scrollBehavior: () => ({left: 0, top: 0}),
})

// 重置路由
export function resetRouter(){
    const permissionStore = usePermissionStoreWithOut()
    permissionStore.routes.forEach(route => {
        const name = route.name
        if(name && router.hasRoute(name)){
            router.removeRoute(name)
        }
    })
}

export function setupRouter(app: App<Element>){
    app.use(router)
}
