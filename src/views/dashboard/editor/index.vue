<template>
    <div class="dashboard-editor-container">
        <div class=" clearfix">
            <pan-thumb :image="avatar" style="float: left">
                Your roles:
                <span v-for="item in roles" :key="item" class="pan-info-roles">{{ item }}</span>
            </pan-thumb>
            <github-corner style="position: absolute; top: 0px; border: 0; right: 0;" />
            <div class="info-container">
                <span class="display_name">{{ name }}</span>
                <span style="font-size:20px;padding-top:20px;display:inline-block;">Editor's Dashboard</span>
            </div>
        </div>
        <div>
            <img :src="emptyGif" class="emptyGif" alt="">
        </div>
    </div>
</template>

<script>
import PanThumb from '@/components/PanThumb'
import GithubCorner from '@/components/GithubCorner'

export default {
    name: 'DashboardEditor',
    components: { PanThumb, GithubCorner },
    data() {
        return {
            emptyGif: 'https://wpimg.wallstcn.com/0e03b7da-db9e-4819-ba10-9016ddfdaed3'
        }
    },
}
</script>
