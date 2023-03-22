import {defineStore} from 'pinia'
import {set} from 'lodash'

import {store} from '@/store'
import {APP_LOCAL_CACHE_KEY} from '@/setting/KEY'
import {SETTING} from '@/setting'
import {PayLoadObject} from '#/store'

export enum DeviceType {
    // eslint-disable-next-line no-unused-vars
    mobile,
    desktop
}

const useAppStore = defineStore({
    id: 'app',
    state: () => ({
        device: DeviceType.desktop,
        // 语言
        local: '',
        pageLoading: false,
        projectConfig: {
            theme: SETTING.theme,
            headerTheme: SETTING.headerTheme,
            showSettings: SETTING.showSettings,
            tagsView: SETTING.tagsView,
            sidebarLogo: SETTING.sidebarLogo,
            sidebarTheme: SETTING.sidebarTheme,
            grayMode: SETTING.grayMode,
            colorWeak: SETTING.colorWeak
        },
        // 侧边栏状态
        sidebarOpened: true,

        beforeMiniInfo: {},
        messageHrefParams: {}
    }),
    getters: {
        getLocal(): string {
            return this.local || localStorage.getItem(APP_LOCAL_CACHE_KEY) || SETTING.local
        }
    },
    actions: {
        setLocal(local: string) {
            this.local = local
            localStorage.setItem(APP_LOCAL_CACHE_KEY, local)
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
    return useAppStore(store)
}
