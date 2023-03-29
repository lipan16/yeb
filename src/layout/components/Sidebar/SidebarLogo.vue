<template>
    <div class="sidebar-logo-container">
        <router-link key="collapse" class="sidebar-logo-link flex-inline" to="/">
            <SvgIcon class="sidebar-logo" name="yeb" size="32" />
            <span v-if="!collapse" class="sidebar-title">{{ $t('title') }}</span>
        </router-link>
    </div>
</template>

<script lang="ts" setup>
defineProps({
    collapse: {type: Boolean, required: true}
})
// background-color: v-bind('appStore.projectConfig.sidebarTheme');
</script>
<style lang="less" scoped>
.sidebar-logo-container {
    padding: 10px;
    background-color: var(--yeb-sidebar-bg-color);
    position: relative;
    width: 100%;
    height: 50px;
    line-height: 50px;
    text-align: center;
    overflow: hidden;

    .sidebar-logo-link {
        height: 100%;
        width: 100%;

        .sidebar-logo {
            vertical-align: middle;
            flex-shrink: 0;
            color: var(--theme);
        }

        .sidebar-title {
            color: var(--theme);
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
