<template>
    <div class="dashboard">
        <Loading />
        <AudioVbx />
        <HelloWorld msg="Vite + Vue" />
    </div>
</template>

<script lang="ts" setup>
import HelloWorld from '@/components/HelloWorld/HelloWorld.vue'
import Loading from '@/components/Loading/index.vue'
import AudioVbx from '@/components/AudioVbx/index.vue'
</script>
