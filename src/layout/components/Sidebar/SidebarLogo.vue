<template>
    <div class="sidebar-logo-container">
        <router-link key="collapse" class="sidebar-logo-link flex-inline" to="/">
            <SvgIcon class="sidebar-logo" name="yeb" size="32"/>
            <span v-show="!collapse" class="sidebar-title" :style="{color: appStore.projectConfig.theme}">{{ $t('title') }}</span>
        </router-link>
        <!--<transition name="sidebarLogoFade">-->
        <!--    <router-link v-if="collapse" key="collapse" class="sidebar-logo-link flex-inline" to="/">-->
        <!--        <SvgIcon class="sidebar-logo" name="yeb" size="32"/>-->
        <!--        <span v-show="!collapse" class="sidebar-title" :style="{color: appStore.projectConfig.theme}">{{ $t('title') }}</span>-->
        <!--    </router-link>-->
        <!--    <router-link v-else key="expand" class="sidebar-logo-link flex-inline" to="/">-->
        <!--        <SvgIcon class="sidebar-logo" name="yeb" size="32"/>-->
        <!--        <span class="sidebar-title" :style="{color: appStore.projectConfig.theme}">{{ $t('title') }}</span>-->
        <!--    </router-link>-->
        <!--</transition>-->
    </div>
</template>

<script lang="ts" setup>
import {useAppStoreWithOut} from '@/store/modules/app'

defineProps({
    collapse: {type: Boolean, required: true},
})
const appStore = useAppStoreWithOut()

</script>

<style lang="less" scoped>
.sidebarLogoFade-enter-active{
    transition: opacity .1s;
}

.sidebarLogoFade-enter, .sidebarLogoFade-leave-to{
    //opacity: 0;
}

.sidebar-logo-container{
    padding: 10px;
    background-color: v-bind('appStore.projectConfig.sidebarTheme');
    position: relative;
    width: 100%;
    height: 50px;
    line-height: 50px;
    text-align: center;
    overflow: hidden;

    .sidebar-logo-link{
        height: 100%;
        width: 100%;
        //padding-left: 12px;

        .sidebar-logo{
            vertical-align: middle;
        }

        .sidebar-title{
            margin-left: 12px;
            font-weight: 600;
            font-size: 16px;
            font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
            line-height: normal;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
    }
}
</style>
