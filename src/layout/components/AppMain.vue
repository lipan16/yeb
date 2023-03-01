<template>
    <section class="app-main">
        <router-view v-slot="{Component, route}">
            <transition name="router-fade" mode="out-in">
                <keep-alive :include="tagsViewStore.cachedViews">
                    <component :is="Component" :key="route.fullPath" />
                </keep-alive>
            </transition>
        </router-view>
    </section>
</template>

<script setup lang="ts">
import {useTagsViewStoreWithOut} from "@/store/modules/tagsView"

const tagsViewStore = useTagsViewStoreWithOut()
</script>
<style scoped lang="less">
.app-main {
    width: 100%;
    position: relative;
    overflow-y: auto;
    flex: 1 1 auto !important;
}
</style>
