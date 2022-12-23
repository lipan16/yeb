import {defineStore} from 'pinia'
import {set} from 'lodash'

import {store} from '@/store'
import {APP_LOCAL_CACHE_KEY} from '@/setting/KEY'
import {SETTING} from '@/setting'
import {PayLoadObject} from '#/store'

export enum DeviceType{
    mobile,
    desktop
}


const useAppStore = defineStore({
    id: 'app',
    state: () => ({
        device: DeviceType.desktop,
        // 语言
        local: undefined,
        pageLoading: false,
        projectConfig: {
            theme: SETTING.theme,
            showSettings: SETTING.showSettings,
            tagsView: SETTING.tagsView,
            fixedHeader: SETTING.fixedHeader,
            sidebarLogo: SETTING.sidebarLogo,
        },
        // 侧边栏状态
        sidebar: {
            opened: true,
            withoutAnimation: false,
        },

        beforeMiniInfo: {},
        messageHrefParams: {},
    }),
    getters: {
        getLocal(): string{
            return this.local || localStorage.getItem(APP_LOCAL_CACHE_KEY) || SETTING.local
        },
    },
    actions: {
        setLocal(local: string){
            this.local = local
            localStorage.setItem(APP_LOCAL_CACHE_KEY, local)
        },
        setProjectConfig(payload: PayLoadObject){
            set(this.projectConfig, payload.key, payload.value)
        },
        setSidebar(payload: any){
            set(this.sidebar, payload.key, payload.value)
        },
        closeSideBar(withoutAnimation: boolean){
            this.sidebar.opened = false
            this.sidebar.withoutAnimation = withoutAnimation
        },
        openSideBar(withoutAnimation: boolean){
            this.sidebar.opened = true
            this.sidebar.withoutAnimation = withoutAnimation
        },
        toggleDevice(val: DeviceType){
            this.device = val
        },
    },
})

// Need to be used outside the setup
export function useAppStoreWithOut(){
    return useAppStore(store)
}
