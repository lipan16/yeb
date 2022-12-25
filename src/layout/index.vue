<template>
    <div :class="classObj" class="app-wrapper">
        <!-- 手机设备 && 侧边栏 → 显示遮罩层 -->
        <div class="drawer-bg" v-show="classObj.mobile && classObj.openSidebar" @click="handleOutsideClick"></div>
        <Sidebar/>
        <div class="main-container flex-list">
            <Navbar/>
            <TagsView v-if="showTagsView"/>

            <!--主页面-->
            <AppMain/>

            <!-- 设置面板 -->
            <RightPanel v-if="showSettings">
                <Settings/>
            </RightPanel>
        </div>
    </div>
</template>

<script setup lang="ts">
import {computed, watchEffect} from 'vue'
import {useWindowSize} from '@vueuse/core'

import RightPanel from '@/components/RightPanel/index.vue'
import {AppMain, Navbar, Settings, Sidebar, TagsView} from './components'
import {DeviceType, useAppStoreWithOut} from '@/store/modules/app'

const {width} = useWindowSize()
const appStore = useAppStoreWithOut()

/**
 * 响应式布局容器固定宽度
 *
 * 大屏（>=1200px）
 * 中屏（>=992px）
 * 小屏（>=768px）
 */
const WIDTH = 768

const showTagsView = computed(() => appStore.projectConfig.tagsView)
const showSettings = computed(() => appStore.projectConfig.showSettings)

const classObj = computed(() => ({
    closeSidebar: !appStore.sidebarOpened,
    openSidebar: appStore.sidebarOpened,
    mobile: appStore.device === DeviceType.mobile,
}))

watchEffect(() => {
    console.log('watchEffect', width.value)
    if(width.value < WIDTH){
        appStore.toggleDevice(DeviceType.mobile)
        appStore.setSidebarOpened(false)
    }else{
        appStore.toggleDevice(DeviceType.desktop)

        if(width.value >= 1200){
            //大屏
            appStore.setSidebarOpened(true)
        }else{
            appStore.setSidebarOpened(false)
        }
    }
})

function handleOutsideClick(){
    appStore.setSidebarOpened(false)
}
</script>

<style lang="less" scoped>
.app-wrapper{
    position: relative;
    display: flex;
    height: 100%;
    width: 100%;

    &:after{
        content: '';
        display: table;
        clear: both;
    }
}

.closeSidebar{
    .sidebar-container{
        width: var(--sidebar-collapse-width) !important;
    }
}

// mobile responsive
.mobile{
    .sidebar-container{
        transition: all 0.2s ease 0s;
        width: var(--sidebar-width) !important;
    }

    &.closeSidebar{
        .sidebar-container{
            pointer-events: none;
            display: none;
        }
    }
}

.drawer-bg{
    background: #000;
    opacity: 0.3;
    width: 100%;
    top: 0;
    height: 100%;
    position: absolute;
    z-index: 900;
}

.main-container{
    transition: all 0.2s ease 0s;
    position: relative;
    width: 100%;

    .test{
        height: 50px;
        position: relative;

        .bg-scroll{
            position: absolute;
            width: 100%;
            height: 50px;
            z-index: -1;
            left: 0;
            right: 0;
            display: flex;
            max-width: 100%;
            max-height: 100%;

            .scrolls{
                width: 100%;
                height: 100%;
                display: flex;
                flex-shrink: 0;

                .scroll-container-1{
                    width: 100%;
                    height: 100%;
                    border-radius: 0;
                    background-image: linear-gradient(90deg, rgb(255, 145, 0) 0%, rgb(255, 128, 82) 22.496%, rgb(255, 66, 145) 41.248%, rgb(214, 0, 193) 58.752%, rgb(157, 0, 224) 77.504%, rgb(111, 0, 255) 100%);
                }

                .scroll-container-2{
                    width: 100%;
                    height: 100%;
                    border-radius: 0;
                    background-image: linear-gradient(270deg, rgb(255, 145, 0) 0%, rgb(255, 128, 82) 22.496%, rgb(255, 66, 145) 41.248%, rgb(214, 0, 193) 58.752%, rgb(157, 0, 224) 77.504%, rgb(111, 0, 255) 100%);
                }

            }
        }
    }
}
</style>
