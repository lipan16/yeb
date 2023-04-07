<template>
    <div v-if="type === 'iframe'">
        <iframe :title="title" :src="link" width="100%" height="100%" style="position: absolute"/>
    </div>
    <div class="iframe-err" v-else>不支持的格式</div>
</template>

<script lang="ts" setup>
const route = useRoute()
const {type, title, link} = route.meta
</script>

<style scoped lang="less">
.iframe-err{
    text-align: center;
    margin-top: 100px;
}
</style>
