import type {App} from 'vue'
import {createI18n} from 'vue-i18n'

import {APP_LOCAL_CACHE_KEY} from '@/setting/KEY'
import {SETTING} from '@/setting'

// element-ui built-in lang
import elementEnLocale from 'element-plus/dist/locale/en.mjs'
import elementZhLocale from 'element-plus/dist/locale/zh-cn.mjs'

// User defined lang
import enLocale from './en'
import zhLocale from './zh'
import {unref} from 'vue'

export const APP_LOCALE_MESSAGES = {
    en: {
        ...enLocale,
        ...elementEnLocale
    },
    zh: {
        ...zhLocale,
        ...elementZhLocale
    }
}

const getLocale = () => {
    return localStorage.getItem(APP_LOCAL_CACHE_KEY) || SETTING.local
}

const i18n = createI18n({
    legacy: false,
    globalInjection: true, // 全局模式 可以直接使用$t
    locale: getLocale(),
    sync: true, // 是否将根级别语言环境与组件本地化语言环境同步。
    silentTranslationWarn: true, // 是否取消本地化失败时输出的警告。
    missingWarn: false,
    silentFallbackWarn: true,
    messages: APP_LOCALE_MESSAGES // 本地化的语言环境信息
})

// 修改本地语言
export async function changeLocale(locale: string) {
    const globalI18n = i18n.global
    const currentLocale = unref(globalI18n.locale)
    if (currentLocale !== locale) {
        // 设置语言环境的 locale 信息
        globalI18n.setLocaleMessage(locale, APP_LOCALE_MESSAGES[locale])
        if (i18n.mode === 'legacy') {
            // @ts-ignore
            i18n.global.locale = locale
        } else {
            ;(i18n.global.locale as any).value = locale
        }
        document.querySelector('html')?.setAttribute('lang', locale)
    }
}

// 获取页面title
export const getPageTitle = (key: any) => {
    const globalI18n = i18n.global
    // @ts-ignore
    const hasKey: boolean = globalI18n.te(`route.${key}`)
    if (hasKey) {
        const pageName: string = globalI18n.t(`route.${key}`)
        return `${pageName} - ${SETTING.title}`
    }
    return `${SETTING.title}`
}

export const setupI18n = (app: App<Element>) => {
    app.use(i18n)
}
