<template>
    <div ref="rightPanel" :class="{show: show}">
        <div class="right-panel-background"></div>
        <div class="right-panel">
            <div class="right-panel__button" :style="{top: buttonTop + 'px', 'background-color': appStore.projectConfig.theme}" @click="show = !show">
                <SvgIcon :name="show ? 'close' : 'iconfont icon-systemset'" size="24" />
            </div>
            <div class="right-panel__items">
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import {onBeforeUnmount, onMounted, ref, watch} from 'vue'
import {toggleClassName} from '@/utils'

import {ElColorPicker} from 'element-plus'
import {useAppStoreWithOut} from '@/store/modules/app'
import SvgIcon from '@/components/Icon/SvgIcon.vue'

defineProps({
    buttonTop: {default: 250, type: Number}
})

const appStore = useAppStoreWithOut()

const show = ref(false)

watch(show, value => {
    toggleClassName(value, 'showRightPanel', document.getElementById('app'))

    if (value) {
        // 展开的时候给蒙层添加点击事件
        window.addEventListener('click', closeMasks, {passive: true})
    }
})

// RightPanel点击蒙层不关闭
function closeMasks(evt: any) {
    let parent = evt.target.closest('.theme-picker-dropdown')
    if (parent) {
        return
    }

    parent = evt.target.closest('.right-panel')
    if (!parent) {
        show.value = false
        window.removeEventListener('click', closeMasks)
    }
}

const rightPanel = ref(ElColorPicker)

function insertToApp() {
    const elx = rightPanel.value as any
    const app = document.getElementById('app') as any
    app.insertBefore(elx, app.firstChild)
}

onMounted(() => {
    insertToApp()
})

onBeforeUnmount(() => {
    const elx = rightPanel.value as any
    elx.remove()
})
</script>

<style>
.showRightPanel {
    overflow: hidden;
    position: relative;
}
</style>

<style lang="less" scoped>
.show {
    transition: all 0.3s cubic-bezier(0.7, 0.3, 0.1, 1);

    .right-panel-background {
        z-index: 980;
        opacity: 1;
        width: 100%;
        height: 100%;
    }

    .right-panel {
        transform: translate(0);
    }
}

.right-panel-background {
    position: fixed;
    top: 0;
    left: 0;
    opacity: 0;
    transition: opacity 0.3s cubic-bezier(0.7, 0.3, 0.1, 1);
    background: rgba(0, 0, 0, 0.2);
    z-index: -1;
}

.right-panel {
    width: 100%;
    max-width: 300px;
    height: 100%;
    position: fixed;
    top: 0;
    right: 0;
    box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.05);
    transition: all 0.25s cubic-bezier(0.7, 0.3, 0.1, 1);
    transform: translate(100%);
    background: #fff;
    z-index: 990;

    .right-panel__button {
        width: 48px;
        height: 48px;
        position: absolute;
        left: -48px;
        text-align: center;
        font-size: 24px;
        border-radius: 6px 0 0 6px !important;
        z-index: 0;
        pointer-events: auto;
        cursor: pointer;
        color: #fff;
        line-height: 48px;

        i {
            font-size: 24px;
            line-height: 48px;
            vertical-align: middle;
        }
    }

    .right-panel__items {
        width: 100%;
        height: 100%;
        overflow: hidden;
    }

    .icon {
        width: 1em;
        height: 1em;
        vertical-align: middle;
    }
}
</style>
