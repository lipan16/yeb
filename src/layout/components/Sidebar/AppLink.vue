<template>
    <a v-if="isExternal(to)" :href="to" target="_blank" rel="noopener">
        <slot></slot>
    </a>
    <div v-else @click="push">
        <slot></slot>
    </div>
</template>

<script lang="ts" setup>
import {computed} from 'vue'
import {isExternal} from '@/utils/validate'
import {useRouter} from 'vue-router'

import {DeviceType, useAppStoreWithOut} from '@/store/modules/app'

const appStore = useAppStoreWithOut()

const sidebar = computed(() => appStore.sidebarOpened)
const device = computed(() => appStore.device)

const props = defineProps({
    to: {
        type: String,
        required: true
    }
})

const router = useRouter()

function push() {
    if (device.value === DeviceType.mobile && sidebar.value) {
        appStore.setSidebarOpened(false)
    }
    router.push(props.to).catch(err => {
        console.error(err)
    })
}
</script>
