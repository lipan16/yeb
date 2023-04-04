<template>
    <div class="app-logo">
        <SvgIcon name="yeb" :size="props.size"/>
    </div>
</template>

<script lang="ts" setup>
import SvgIcon from '@/components/Icon/SvgIcon.vue'
const props = defineProps({
    size: {type: [Number, String], default: 16},
})
</script>

<style lang="less" scoped>
.app-logo {
    margin: 8px;
}
</style>
