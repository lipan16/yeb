<template>
    <el-dropdown class="lang-select" trigger="click" @command="handleLocale">
        <div>
            <SvgIcon name="language" />
        </div>
        <template #dropdown>
            <el-dropdown-menu>
                <el-dropdown-item :disabled="appStore.getLocal === 'zh'" command="zh">中文</el-dropdown-item>
                <el-dropdown-item :disabled="appStore.getLocal === 'en'" command="en">English</el-dropdown-item>
            </el-dropdown-menu>
        </template>
    </el-dropdown>
</template>
<script lang="ts" setup>
import {ref} from "vue"
import {useAppStoreWithOut} from "@/store/modules/app"
import {changeLocale} from "@/lang"
import SvgIcon from "@/components/Icon/SvgIcon.vue"

const selectedKeys = ref<string>("")

const appStore = useAppStoreWithOut()

async function handleLocale(lang: string) {
    selectedKeys.value = lang
    appStore.setLocal(lang)
    await changeLocale(lang)
}
</script>

<style lang="less" scoped>
.lang-select {
    margin: 8px;
    .svg-icon {
        fill: var(--text);
    }
}
</style>
