<template>
    <i v-if="isShowEleSvg" class="el-icon" :style="setIconSvgStyle">
        <component :is="getIconName"/>
    </i>
    <i v-else-if="isShowAliSvg" :class="getIconName" :style="setIconSvgStyle" />
    <svg v-else-if="isShowLocalSvg" aria-hidden="true" class="svg-icon" :style="setIconImgOutStyle">
        <use :href="'#' + getIconName" :fill="color"/>
    </svg>
    <img v-else src="../../assets/svg/yeb.svg" alt="" :style="setIconImgOutStyle"/>
</template>

<script lang="ts" setup>
import {computed} from 'vue'
// 获取本地挂载的所有svg symbol
import localSvgId from 'virtual:svg-icons-names'

const props = defineProps({
    name: {type: String, require: true},
    size: {type: [Number, String], default: 16},
    color: {type: String}
})

const getIconName = computed(() => {
    return props?.name
})

// 用于判断 element plus 自带 svg 图标的显示、隐藏
const isShowEleSvg = computed(() => {
    return props?.name?.startsWith('ele-')
})

// 用于判断是否显示阿里的图标
const isShowAliSvg = computed(() => {
    return props?.name?.startsWith('iconfont')
})
// 用于判断是否显示本地的图标
const isShowLocalSvg = computed(() => {
    return localSvgId.includes(props?.name)
})

// 设置图标样式
const setIconSvgStyle = computed(() => {
    return `font-size: ${props.size}px;color: ${props.color};`
})

// 设置图片样式
const setIconImgOutStyle = computed(() => {
    return `width: ${props.size}px;height: ${props.size}px;display: inline-block;overflow: hidden;`
})
</script>
<style scoped>
.svg-icon{
    vertical-align: middle;
    position: relative;
    overflow: hidden;
    fill: currentColor;
}
</style>
