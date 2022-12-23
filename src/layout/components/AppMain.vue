<template>
    <section class="app-main">
        <router-view v-slot="{ Component, route }">
            <transition name="router-fade" mode="out-in">
                <keep-alive :include="tagsViewStore.cachedViews">
                    <component :is="Component" :key="route.fullPath"/>
                </keep-alive>
            </transition>
        </router-view>
    </section>
</template>

<script setup lang="ts">
import {useTagsViewStoreWithOut} from '@/store/modules/tagsView'

const tagsViewStore = useTagsViewStoreWithOut()
</script>
<style lang="less">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
    .fixed-header {
        padding-right: 15px;
    }
}
</style>
<style scoped lang="less">
.app-main {
    /* 50= navbar  50  */
    min-height: calc(100% - 50px);
    width: 100%;
    position: relative;
    overflow: hidden;
}

.fixed-header + .app-main {
    padding-top: 50px;
}

.hasTagsView {
    .app-main {
        /* 84 = navbar + tags-view = 50 + 36 */
        min-height: calc(100vh - 86px);
    }

    .fixed-header + .app-main {
        padding-top: 86px;
    }
}
</style>
