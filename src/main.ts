import {createApp} from 'vue'
import * as ElIcons from '@element-plus/icons-vue'

import './main.less'
import App from './App.vue'
import {setupI18n} from '@/lang'
import {setupStore} from '@/store'
import {router, setupRouter} from '@/router'
import {useSso} from '@/hooks/web/useSso'
import {registerGlobalComponent} from '@/components/registerGlobalComponent'
import {setupRouterGuard} from '@/router/guard'
import {setupGlobDirectives} from '@/directive'
import {registerThirdComp} from '@/utils/registerThirdComp'

// 可伸缩布局
// import "amfe-flexible"

// 注册svg图片
import 'virtual:svg-icons-register'

// 生产环境 当服务端首页有更新时，自动更新html
import '@/utils/autoUpdateHtml'

async function booting() {
    // 创建应用实例
    const app = createApp(App)

    setupI18n(app)

    // 配置存储
    setupStore(app)

    // 注册全局组件
    registerGlobalComponent(app)

    // 注册全局指令
    setupGlobDirectives(app)

    // 注册element plus所有图标
    for (const [key, component] of Object.entries(ElIcons)) {
        app.component(key, component)
    }

    // 路由保护
    setupRouterGuard(router)

    //CAS单点登录
    await useSso().ssoLogin()

    // 配置路由
    setupRouter(app)

    // 注册第三方组件
    registerThirdComp(app)

    // 当路由准备好时再执行挂载( https://next.router.vuejs.org/api/#isready)
    await router.isReady()

    app.mount('#app', true)
}

booting().then()
