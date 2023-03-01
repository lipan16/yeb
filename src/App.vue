<template>
    <el-config-provider :locale="APP_LOCALE_MESSAGES[useAppStoreWithOut().getLocal]">
        <RouterView />
    </el-config-provider>
</template>
<script lang="ts" setup>
import {useAppStoreWithOut} from "@/store/modules/app"
import {APP_LOCALE_MESSAGES} from "@/lang"
</script>
