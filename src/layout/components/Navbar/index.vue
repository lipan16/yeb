<template>
    <div class="navbar flex-inline" :style="{backgroundColor: appStore.projectConfig.headerTheme}">
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
    </div>
</template>

<script lang="ts" setup>
import AppLocalePicker from '@/components/Application/AppLocalePicker.vue'
import AppDarkModeToggle from '@/components/Application/AppDarkModeToggle.vue'
import AppLogo from '@/components/Application/AppLogo.vue'
import Breadcrumb from '@/layout/components/Navbar/Breadcrumb.vue'
import {useAppStoreWithOut} from '@/store/modules/app'

const appStore = useAppStoreWithOut()

const changeMenuCollapse = () => {
    appStore.setSidebarOpened(!appStore.sidebarOpened)
}
const {isFullscreen, toggle} = useFullscreen()
</script>

<style lang="less" scoped>
.navbar{
    color: var(--text);
    position: relative;
    //-webkit-box-reflect: below 0 linear-gradient(transparent, #0005);
    //background-image: linear-gradient(90deg,#fb0094,#0000ff,#00ff00,#ffff00,#fb0094,#0000ff,#00ff00,#ffff00,#fb0094);
    //background-size: 500%;
    //animation: colorGradient 20s linear infinite;

    &::before{
        content: '';
        position: absolute;
        //inset: 0;
        background: linear-gradient(90deg, #fb0094, #0000ff, #00ff00, #ffff00, #fb0094, #0000ff, #00ff00, #ffff00, #fb0094);
        opacity: .3;
        animation: colorGradient 20s linear infinite;
        background-size: 500%;
    }

    &::after{
        content: '';
        position: absolute;
        inset: 0;
        background: linear-gradient(90deg, #fb0094, #0000ff, #00ff00, #ffff00, #fb0094, #0000ff, #00ff00, #ffff00, #fb0094);
        animation: colorGradient 20s linear infinite;
        background-size: 500%;
        filter: blur(48px);
    }
}

@keyframes colorGradient{
    0%{
        background-position: 0 0;
    }
    0%{
        background-position: 500% 0;
    }
}

.hamburger{
    display: inline-block;
    vertical-align: middle;
    width: 20px;
    height: 20px;
}

.hamburger.is-active{
    transform: rotate(180deg);
}
</style>
