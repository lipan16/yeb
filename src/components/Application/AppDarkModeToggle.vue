<template>
    <div class="app-dark-mode" :class="getClass" @click="toggleDark()">
        <div class="inner"/>
        <SvgIcon size="14" name="sun"/>
        <SvgIcon size="14" name="moon"/>
    </div>
</template>
<script lang="ts" setup>
import SvgIcon from '@/components/Icon/SvgIcon.vue'
import {useDark, useToggle} from '@vueuse/core'
import {computed} from 'vue'

const isDark = useDark()
const toggleDark = useToggle(isDark)

const getClass = computed(() => {
    return isDark.value ? 'dark' : ''
})
</script>
<style lang="less" scoped>
.app-dark-mode{
    position: relative;
    display: flex;
    width: 50px;
    height: 26px;
    padding: 0 6px;
    cursor: pointer;
    background-color: #45eeda;
    border-radius: 30px;
    justify-content: space-between;
    align-items: center;

    .inner{
        position: absolute;
        z-index: 1;
        width: 18px;
        height: 18px;
        background-color: #fff;
        border-radius: 50%;
        transition: transform 0.5s, background-color 0.5s;
        will-change: transform;
    }

    &.dark{
        .inner{
            transform: translateX(21px);
        }
    }
}
</style>
