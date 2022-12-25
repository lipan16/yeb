<template>
    <div class="sidebar-logo-container">
        <transition name="sidebarLogoFade">
            <router-link key="collapse" class="sidebar-logo-link flex-inline" to="/">
                <SvgIcon class="sidebar-logo" name="yeb" size="32"/>
                <span v-if="!collapse" class="sidebar-title">{{ $t('title') }}</span>
            </router-link>
        </transition>
    </div>
</template>

<script lang="ts" setup>
defineProps({
    collapse: {
        type: Boolean,
        required: true,
    },
})
</script>

<style lang="less" scoped>
.sidebarLogoFade-enter-active{
    transition: opacity 1.5s;
}

.sidebarLogoFade-enter, .sidebarLogoFade-leave-to{
    opacity: 0;
}

.sidebar-logo-container{
    position: relative;
    width: 100%;
    height: 50px;
    line-height: 50px;
    background: var(--sidebar-menu-bg);
    text-align: center;
    overflow: hidden;

    .sidebar-logo-link{
        height: 100%;
        width: 100%;
        padding-left: 12px;
        transition: all 0.2s ease 0s;

        .sidebar-logo{
            vertical-align: middle;
        }

        .sidebar-title{
            margin-left: 12px;
            color: var(--sidebar-menu-active-text);
            font-weight: 600;
            font-size: 16px;
            font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
            transition: all .2s;
            line-height: normal;
        }
    }
}
</style>
