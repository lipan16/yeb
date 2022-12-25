<template>
    <div class="drawer-container">
        <h3 class="drawer-title">系统布局配置</h3>
        <div class="drawer-item">
            <span>主题颜色</span>
            <div style="float: right; height: 26px; margin: -3px 8px 0 0">
                <el-color-picker
                    @change="themeChange"
                    v-model="appStore.projectConfig.theme"
                    :predefine="['#409eff','#1890ff','#304156','#212121','#11a983','#13c2c2','#6959cd','#f5222d']"
                    class="theme-picker"
                    popper-class="theme-picker-dropdown"
                />
            </div>
        </div>

        <div class="drawer-item">
            <span>开启 Tags-View</span>
            <el-switch v-model="appStore.projectConfig.tagsView" class="drawer-switch"/>
        </div>

        <div class="drawer-item">
            <span>侧边栏 Logo</span>
            <el-switch v-model="appStore.projectConfig.sidebarLogo" class="drawer-switch"/>
        </div>
    </div>
</template>

<script setup lang="ts">
import {useAppStoreWithOut} from '@/store/modules/app'

const appStore = useAppStoreWithOut()

function themeChange(val: string){
    console.log(val)
    appStore.setProjectConfig({key: 'theme', value: val})
}

</script>

<style lang="less" scoped>
.drawer-container{
    padding: 24px;
    font-size: 14px;
    line-height: 1.5;
    word-wrap: break-word;

    .drawer-title{
        margin-bottom: 12px;
        color: rgba(0, 0, 0, 0.85);
        font-size: 14px;
        line-height: 22px;
    }

    .drawer-item{
        color: rgba(0, 0, 0, 0.65);
        font-size: 14px;
        padding: 12px 0;
    }

    .drawer-switch{
        float: right;
    }

    .job-link{
        display: block;
        position: absolute;
        width: 100%;
        left: 0;
        bottom: 0;
    }
}

.navbar{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    width: 100%;
    height: 50px;
    padding: 0;

    &__item{
        width: 18%;
        height: 45px;
        background: #f0f2f5;
        position: relative;
        overflow: hidden;
        cursor: pointer;
        border-radius: 4px;
        box-shadow: 0 1px 2.5px 0 rgb(0 0 0 / 18%);

        &--left{
            div{
                &:nth-child(1){
                    width: 30%;
                    height: 100%;
                    background: #1b2a47;
                }

                &:nth-child(2){
                    width: 70%;
                    height: 30%;
                    top: 0;
                    right: 0;
                    background: #fff;
                    box-shadow: 0 0 1px #888;
                    position: absolute;
                }
            }
        }

        &--top{
            div{
                &:nth-child(1){
                    width: 100%;
                    height: 30%;
                    background: #1b2a47;
                    box-shadow: 0 0 1px #888;
                }
            }
        }

        &--mix{
            div{
                &:nth-child(1){
                    width: 100%;
                    height: 30%;
                    background: #1b2a47;
                    box-shadow: 0 0 1px #888;
                }

                &:nth-child(2){
                    width: 30%;
                    height: 70%;
                    bottom: 0;
                    left: 0;
                    background: #fff;
                    box-shadow: 0 0 1px #888;
                    position: absolute;
                }
            }
        }
    }
}
</style>
