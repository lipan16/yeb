<template>
    <div class="banner flex-inline">
        <div class="welcome suspension">
            <img class="welcome-img" :src="welcomeSvg" alt="" />
            <div class="welcome-title">{{ msg + userStore.nickname }}</div>
        </div>

        <div class="working">
            <img class="working-coffee" :src="coffeeSvg" alt="" />
            <div class="working-text">
                {{ $t('dashboard.You have worked today') }}<span class="time">{{ workingTime.showTime }}</span>
            </div>
            <div @click="onclickWorkState" class="working-opt working-rest">
                {{ workingTime.status ? $t('dashboard.have a bit of rest') : $t('dashboard.Continue to work') }}
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import {useIntervalFn} from '@vueuse/core'
import welcomeSvg from '@/assets/svg/welcome.svg'
import coffeeSvg from '@/assets/svg/coffee.svg'
import {useUserStoreWithOut} from '@/store/modules/user'
import {getAuthCache, setAuthCache} from '@/utils/auth'

defineProps<{msg: string}>()
const userStore = useUserStoreWithOut()

const workingTime = reactive({
    time: 0,
    showTime: '',
    status: true
})

const {pause, resume, isActive} = useIntervalFn(() => {
    workingTime.status && workingTime.time++
    const H = Math.floor(workingTime.time / 3600)
    const m = Math.floor((workingTime.time - 3600 * H) / 60)
    const s = workingTime.time % 60
    workingTime.showTime = H ? H + '时' : ''
    workingTime.showTime += m ? m + '分' : ''
    workingTime.showTime += s + '秒'
}, 1000)

const onclickWorkState = () => {
    workingTime.status = !workingTime.status
}
onMounted(() => {
    const timeCache = getAuthCache('workingTime')
    if(timeCache){
        workingTime.time = timeCache?.time
        workingTime.showTime = timeCache?.showTime
        workingTime.status = timeCache?.status
    }
})
onBeforeUnmount(() => {
    setAuthCache('workingTime', workingTime)
})
</script>

<style lang="less" scoped>
.banner {
    .welcome {
        background: #e1eaf9;
        border-radius: 6px;
        display: flex;
        align-items: center;
        padding: 15px 20px !important;
        box-shadow: 0 0 30px 0 rgba(82, 63, 105, 0.05);

        .welcome-img {
            height: 100px;
            margin-right: 10px;
            user-select: none;
        }

        .welcome-title {
            font-size: 1.5rem;
            line-height: 30px;
            color: var(--ba-color-primary-light);
        }
    }

    .working {
        height: 130px;
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        position: relative;

        &:hover {
            .working-coffee {
                transform: translateY(-4px) scale(1.02);
                z-index: 999;
            }
        }

        .working-coffee {
            transition: all 0.3s ease;
            width: 80px;
        }

        .working-text {
            display: block;
            width: 100%;
            font-size: 15px;
            text-align: center;
            color: var(--el-text-color-primary);

            .time {
                width: 6em;
                display: inline-block;
                text-align: left;
            }
        }

        .working-opt {
            position: absolute;
            top: -44px;
            right: 10px;
            background-color: rgba(#000000, 0.3);
            padding: 10px 20px;
            border-radius: 20px;
            color: var(--ba-bg-color-overlay);
            transition: all 0.3s ease;
            cursor: pointer;
            opacity: 0;
            z-index: 999;

            &:active {
                background-color: rgba(#000000, 0.6);
            }
        }

        &:hover {
            .working-opt {
                opacity: 1;
                top: 0;
            }

            .working-done {
                opacity: 1;
                top: 50px;
            }
        }
    }
}
</style>
