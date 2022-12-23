<template>
    <div :class="classObj" class="app-wrapper">
        <!-- 手机设备 && 侧边栏 → 显示遮罩层 -->
        <div class="drawer-bg" v-show="classObj.mobile && classObj.openSidebar" @click="handleOutsideClick"></div>
        <Sidebar/>
        <div :class="{hasTagsView: showTagsView}" class="main-container">
            <div :class="{'fixed-header': fixedHeader}">
                <Navbar/>
                <TagsView v-if="showTagsView"/>
            </div>

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
const WIDTH = 375

const fixedHeader = computed(() => appStore.projectConfig.fixedHeader)
const showTagsView = computed(() => appStore.projectConfig.tagsView)
const showSettings = computed(() => appStore.projectConfig.showSettings)

const classObj = computed(() => ({
    hideSidebar: !appStore.sidebar.opened,
    openSidebar: appStore.sidebar.opened,
    withoutAnimation: appStore.sidebar.withoutAnimation,
    mobile: appStore.device === DeviceType.mobile,
}))

watchEffect(() => {
    if(width.value < WIDTH){
        appStore.toggleDevice(DeviceType.mobile)
        appStore.closeSideBar(true)
    }else{
        appStore.toggleDevice(DeviceType.desktop)

        if(width.value >= 1200){
            //大屏
            appStore.openSideBar(true)
        }else{
            appStore.closeSideBar(true)
        }
    }
})

function handleOutsideClick(){
    appStore.closeSideBar(false)
}
</script>

<style lang="less" scoped>
.app-wrapper{
    position: relative;
    height: 100%;
    width: 100%;

    &:after{
        content: '';
        display: table;
        clear: both;
    }

    &.mobile.openSidebar{
        position: fixed;
        top: 0;
    }
}

.hideSidebar{
    .main-container{
        margin-left: var(--sidebar-collapse-width);
    }

    .fixed-header{
        width: calc(100% - var(--sidebar-collapse-width));
    }

    .sidebar-container{
        width: var(--sidebar-collapse-width) !important;
    }
}

// mobile responsive
.mobile{
    .main-container{
        margin-left: 0;
    }

    .sidebar-container{
        transition: transform 0.28s;
        width: var(--sidebar-width) !important;
    }

    .fixed-header{
        width: 100%;
    }

    &.hideSidebar{
        .sidebar-container{
            pointer-events: none;
            transition-duration: 0.3s;
            transform: translate3d(calc(0px - var(--sidebar-width)), 0, 0);
        }
    }
}

.withoutAnimation{
    .main-container, .sidebar-container{
        transition: none;
    }
}

.drawer-bg{
    background: #000;
    opacity: 0.3;
    width: 100%;
    top: 0;
    height: 100%;
    position: absolute;
    z-index: 999;
}

.main-container{
    min-height: 100%;
    transition: margin-left 0.28s;
    margin-left: var(--sidebar-width);
    position: relative;
}

.fixed-header{
    position: fixed;
    top: 0;
    right: 0;
    z-index: 9;
    width: calc(100% - var(--sidebar-width));
    transition: width 0.28s;
}
</style>
