<template>
    <div class="dashboard">
        <HelloWorld msg="Vite + Vue"/>
        <HelloWorld msg="Vite + Vue"/>
        <HelloWorld msg="Vite + Vue"/>
        <HelloWorld msg="Vite + Vue"/>
        <HelloWorld msg="Vite + Vue"/>
        <HelloWorld msg="Vite + Vue"/>
        <HelloWorld msg="Vite + Vue"/>
        <HelloWorld msg="Vite + Vue"/>
        <HelloWorld msg="Vite + Vue"/>
        <HelloWorld msg="Vite + Vue"/>
        <SvgIcon name="yeb" size="16"/>
        <!--        <component :is="currentRole" />-->
    </div>
</template>

<script lang="ts" setup>
// import adminDashboard from './admin'
// import editorDashboard from './editor'
import HelloWorld from '@/components/HelloWorld/HelloWorld.vue'
import SvgIcon from '@/components/Icon/SvgIcon.vue'

const currentRole = ref('adminDashboard')

</script>
