<template>
    <div class="app-dark-mode" :class="getClass" @click="toggleDark()" :style="{'borderColor': appStore.projectConfig.theme}">
        <div class="inner"></div>
        <SvgIcon size="14" name="sun"/>
        <SvgIcon size="14" name="moon"/>
    </div>
</template>
<script lang="ts" setup>
import SvgIcon from '@/components/Icon/SvgIcon.vue'
import {useDark, useToggle} from '@vueuse/core'
import {computed} from 'vue'
import {useAppStoreWithOut} from '@/store/modules/app'

const isDark = useDark()
const toggleDark = useToggle(isDark)

const getClass = computed(() => {
    return isDark.value ? 'dark' : ''
})

const appStore = useAppStoreWithOut()
</script>
<style lang="less" scoped>
.app-dark-mode{
    position: relative;
    display: flex;
    width: 50px;
    height: 24px;
    padding: 0 4px;
    cursor: pointer;
    flex-shrink: 0;
    background-color: var(--box-bg);
    border-radius: 30px;
    justify-content: space-between;
    align-items: center;
    margin: 0 6px;

    .inner{
        position: absolute;
        z-index: 1;
        width: 16px;
        height: 16px;
        background-color: var(--btn-bg);
        border-radius: 50%;
        transition: transform 0.5s, background-color 0.5s;
        will-change: transform;
    }

    &.dark{
        .inner{
            transform: translateX(27px);
        }
    }
}
</style>
