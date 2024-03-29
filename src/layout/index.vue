<template>
    <div :class="classObj" class="app-wrapper">
        <!-- 手机设备 && 侧边栏 → 显示遮罩层 -->
        <div class="drawer-bg" v-show="classObj.mobile && classObj.openSidebar" @click="handleOutsideClick"></div>
        <Sidebar />
        <div class="main-container flex-list">
            <Navbar />
            <TagsView v-if="showTagsView" />

            <!--主页面-->
            <AppMain />

            <!-- 设置面板 -->
            <RightPanel v-if="showSettings">
                <Settings />
            </RightPanel>
        </div>
    </div>
</template>

<script setup lang="ts">
import {useAppStoreWithOut} from '@/store/modules/app'

// 引入组件
import RightPanel from '@/components/RightPanel/index.vue'
import AppMain from '@/layout/components/AppMain.vue'
import Navbar from '@/layout/components/Navbar/index.vue'
import Settings from '@/layout/components/Settings/index.vue'
import Sidebar from '@/layout/components/Sidebar/index.vue'
import TagsView from '@/layout/components/TagsView/index.vue'
import {DeviceType} from '#/store'

// const AppMain = defineAsyncComponent(() => import('@/layout/components/AppMain.vue'))
// const Navbar = defineAsyncComponent(() => import('@/layout/components/Navbar/index.vue'))
// const Settings = defineAsyncComponent(() => import('@/layout/components/Settings/index.vue'))
// const Sidebar = defineAsyncComponent(() => import('@/layout/components/Sidebar/index.vue'))
// const TagsView = defineAsyncComponent(() => import('@/layout/components/TagsView/index.vue'))

const {width} = useWindowSize()
const appStore = useAppStoreWithOut()

const showTagsView = computed(() => appStore.projectConfig.showTagsView)
const showSettings = computed(() => appStore.projectConfig.showSettings)

const classObj = computed(() => ({
    closeSidebar: !appStore.sidebarOpened,
    openSidebar: appStore.sidebarOpened,
    mobile: appStore.device === DeviceType.mobile
}))

/**
 * 响应式布局容器固定宽度
 * xs: < 768px
 * sm: >= 768px
 * md: >= 992px
 * lg: >= 1200px
 * xl: >= 1920px
 *
 * 大屏（>=1200px）
 * 中屏（>=992px）
 * 小屏（>=768px）
 */
watchEffect(() => {
    if (width.value < 768) {
        appStore.toggleDevice(DeviceType.mobile)
        appStore.setSidebarOpened(false)
    } else {
        appStore.toggleDevice(DeviceType.desktop)

        if (width.value >= 1200) {
            appStore.setSidebarOpened(true)
        } else {
            appStore.setSidebarOpened(false)
        }
    }
})

function handleOutsideClick() {
    appStore.setSidebarOpened(false)
}
</script>

<style lang="less" scoped>
.app-wrapper {
    position: relative;
    display: flex;
    height: 100%;
    width: 100%;

    //&:after {
    //    content: '';
    //    display: table;
    //    clear: both;
    //}
}

.closeSidebar {
    .sidebar-container {
        width: var(--yeb-sidebar-collapse-width) !important;
    }
}

// mobile responsive
.mobile {
    .sidebar-container {
        width: var(--yeb-sidebar-width) !important;
        z-index: 900;
    }

    &.closeSidebar {
        .sidebar-container {
            pointer-events: none;
            display: none;
        }
    }
}

.drawer-bg {
    background: #000;
    opacity: 0.3;
    width: 100%;
    top: 0;
    height: 100%;
    position: absolute;
    z-index: 890;
}

.main-container {
    position: relative;
    width: 100%;
}
</style>
