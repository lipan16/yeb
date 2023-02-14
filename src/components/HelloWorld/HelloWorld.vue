<template>
    <div class="banner flex-inline">
        <div class="welcome suspension">
            <img class="welcome-img" :src="welcomeSvg" alt=""/>
            <div class="welcome-title">{{ msg + userStore.nickname }}</div>
        </div>

        <div class="working">
            <img class="working-coffee" :src="coffeeSvg" alt=""/>
            <div class="working-text">
                {{ $t('dashboard.You have worked today') }}<span class="time">{{ workingTime.time }}</span>
            </div>
            <div @click="onclickWorkState" class="working-opt working-rest">
                {{ workingTime.status ? $t('dashboard.Continue to work') : $t('dashboard.have a bit of rest') }}
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import {useIntervalFn} from '@vueuse/core'
import moment from 'moment'
import welcomeSvg from '@/assets/svg/welcome.svg'
import coffeeSvg from '@/assets/svg/coffee.svg'
import {useUserStoreWithOut} from '@/store/modules/user'

defineProps<{msg: string}>()
const userStore = useUserStoreWithOut()

const workingTime = reactive({
    beginTime: new Date().getTime(),
    time: '0',
    status: true,
})

const {pause, resume, isActive} = useIntervalFn(() => {
    // const time = (new Date().getTime() - workingTime.beginTime)/1000
    // console.log(Math.floor(time))
    // console.log(moment(Math.floor(time), 's').format('HH时:mm分:ss秒'))
    // const time = moment.duration(moment().diff(moment(workingTime.beginTime)))
    //
    // console.log(time.asMilliseconds())
    // console.log(moment(time.asMilliseconds()).format('YYYY-MM-DD HH:mm:ss'))
    // const D = Math.floor(time.asDays())
    // const H = time.hours()
    // const m = time.minutes()
    // const s = time.seconds()
    // console.log(D, H, m, s)
    // const temp = moment(D, H, m, s)
    // console.log(temp)
    // console.log(temp.format('YYYY-MM-DD HH:mm:ss'))
    // pause()
}, 1000)


const onclickWorkState = () => {
    workingTime.status = !workingTime.status
}
</script>
<style lang="less" scoped>
.banner{
    .welcome{
        background: #e1eaf9;
        border-radius: 6px;
        display: flex;
        align-items: center;
        padding: 15px 20px !important;
        box-shadow: 0 0 30px 0 rgba(82, 63, 105, 0.05);

        .welcome-img{
            height: 100px;
            margin-right: 10px;
            user-select: none;
        }

        .welcome-title{
            font-size: 1.5rem;
            line-height: 30px;
            color: var(--ba-color-primary-light);
        }
    }

    .working{
        height: 130px;
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        position: relative;

        &:hover{
            .working-coffee{
                transform: translateY(-4px) scale(1.02);
                z-index: 999;
            }
        }

        .working-coffee{
            transition: all 0.3s ease;
            width: 80px;
        }

        .working-text{
            display: block;
            width: 100%;
            font-size: 15px;
            text-align: center;
            color: var(--el-text-color-primary);
        }

        .working-opt{
            position: absolute;
            top: -40px;
            right: 10px;
            //background-color: rgba($color: #000000, $alpha: 0.3);
            padding: 10px 20px;
            border-radius: 20px;
            color: var(--ba-bg-color-overlay);
            transition: all 0.3s ease;
            cursor: pointer;
            opacity: 0;
            z-index: 999;

            &:active{
                //background-color: rgba($color: #000000, $alpha: 0.6);
            }
        }

        &:hover{
            .working-opt{
                opacity: 1;
                top: 0;
            }

            .working-done{
                opacity: 1;
                top: 50px;
            }
        }
    }
}
</style>
