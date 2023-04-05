import {defineStore} from 'pinia'
import {set} from 'lodash'

import {store} from '@/store'
import {LOCAL__KEY} from '@/setting/cacheKey'
import {SETTING} from '@/setting'
import {PayLoadObject} from '#/store'

export enum DeviceType {
    mobile,
    desktop
}

const appStore = defineStore({
    id: 'app',
    state: () => ({
        title: SETTING.title,
        device: DeviceType.desktop,
        // 语言
        local: '',
        pageLoading: false,
        projectConfig: {
            permissionCacheType: SETTING.permissionCacheType,

            theme: SETTING.theme,
            grayMode: SETTING.grayMode,
            colorWeak: SETTING.colorWeak,

            headerTheme: SETTING.headerTheme,
            sidebarTheme: SETTING.sidebarTheme,

            showSettings: SETTING.showSettings,
            showBreadcrumb: SETTING.showBreadcrumb,
            showTagsView: SETTING.showTagsView,
            showTagsViewIcon: SETTING.showTagsViewIcon,
            showSidebarLogo: SETTING.showSidebarLogo,

            animation: 'slide-right', // 主界面切换动画

            openSso: SETTING.openSso,
            ssoUrl: SETTING.ssoUrl
        },
        // 侧边栏状态
        sidebarOpened: true,

        beforeMiniInfo: {},
        messageHrefParams: {}
    }),
    getters: {
        getLocal(): string {
            return this.local || localStorage.getItem(LOCAL__KEY) || SETTING.local
        }
    },
    actions: {
        setLocal(local: string) {
            this.local = local
            localStorage.setItem(LOCAL__KEY, local)
        },
        setProjectConfig(payload: PayLoadObject) {
            set(this.projectConfig, payload.key, payload.value)
        },
        setSidebarOpened(opened: boolean) {
            this.sidebarOpened = opened
        },
        toggleDevice(val: DeviceType) {
            this.device = val
        }
    }
})

// Need to be used outside the setup
export function useAppStoreWithOut() {
    return appStore(store)
}
