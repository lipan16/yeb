<template>
    <div class="navbar flex-inline">
        <div style="padding: 0 15px" @click="changeMenuCollapse">
            <svg
                :class="{'is-active': appStore.sidebarOpened}"
                class="hamburger"
                viewBox="0 0 1024 1024"
                xmlns="http://www.w3.org/2000/svg"
                width="64"
                height="64"
            >
                <path
                    d="M408 442h480c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8H408c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8zm-8 204c0 4.4 3.6 8 8 8h480c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8H408c-4.4 0-8 3.6-8 8v56zm504-486H120c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm0 632H120c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zM142.4 642.1L298.7 519a8.84 8.84 0 0 0 0-13.9L142.4 381.9c-5.8-4.6-14.4-.5-14.4 6.9v246.3a8.9 8.9 0 0 0 14.4 7z"
                />
            </svg>
        </div>
        <Breadcrumb/>
        <BPITime/>
        <AppDarkModeToggle/>
        <SvgIcon :name="isFullscreen ? 'fullscreen-exit' : 'fullscreen'" @click="toggle" style="margin: 0 8px"/>
        <AppLocalePicker/>
        <AppLogo/>
        <!--背景滚动-->
        <div class="bg-scroll" :style="{transform: `translateX(${baseX}%)`}">
            <div class="scrolls">
                <div class="scroll-container-1"></div>
                <div class="scroll-container-2"></div>
            </div>
            <div class="scrolls">
                <div class="scroll-container-1"></div>
                <div class="scroll-container-2"></div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import {useFullscreen} from '@vueuse/core'

import AppLocalePicker from '@/components/Application/AppLocalePicker.vue'
import AppDarkModeToggle from '@/components/Application/AppDarkModeToggle.vue'
import AppLogo from '@/components/Application/AppLogo.vue'
import Breadcrumb from '@/layout/components/Navbar/Breadcrumb.vue'
import {useAppStoreWithOut} from '@/store/modules/app'

const appStore = useAppStoreWithOut()

const changeMenuCollapse = () => {
    appStore.setSidebarOpened( !appStore.sidebarOpened)
}
const {isFullscreen, toggle} = useFullscreen()

const baseX = ref(0)

window.requestAnimationFrame(() => {
    console.log(baseX.value)
    if(baseX.value >= 0){
        baseX.value = -100
    }
    baseX.value += 1
})

</script>

<style lang="less" scoped>
.hamburger{
    display: inline-block;
    vertical-align: middle;
    width: 20px;
    height: 20px;
}

.hamburger.is-active{
    transform: rotate(180deg);
}

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
</style>

