<template>
    <div class="bpi-time">
        <div @click="onChangeTimeShowType">{{ bpi.value }}</div>
    </div>
</template>

<script setup lang="ts">
import {useIntervalFn} from "@vueuse/core"
import {SETTING} from "@/setting"
import moment, {Moment} from "moment"

const bpi = reactive({
    realTime: "",
    breakTime: "",
    longTime: "",
    value: ""
})
const timeShowType = ref(true)
const clickCount = ref(0)
const dateTime = moment(SETTING.BPI_TIME_1)

const {pause, resume, isActive} = useIntervalFn(() => {
    intervalCb()
}, 1000)

const onChangeTimeShowType = () => {
    clickCount.value = clickCount.value > 5 ? 0 : ++clickCount.value
    timeShowType.value = !timeShowType.value
    intervalCb()
    resume()
}

const intervalCb = () => {
    bpi.longTime = showTime(timeShowType.value, moment(SETTING.BPI_TIME_1))
    bpi.realTime = showTime(timeShowType.value, moment(SETTING.BPI_TIME_1), moment(SETTING.BPI_TIME_2), moment(SETTING.BPI_TIME_3))
    bpi.value = clickCount.value > 4 ? bpi.longTime : bpi.realTime
}

const showTime = (type: boolean, begin1: Moment = dateTime, end1: Moment = moment(), begin2: Moment = moment(), end2: Moment = moment()) => {
    const time = moment.duration(end1.diff(begin1))
    const time2 = moment.duration(end2.diff(begin2))
    time.add(time2)

    const y = time.years()
    const M = time.months()
    const D = Math.floor(time.asDays())
    const d = time.days()
    const H = time.hours()
    const m = time.minutes()
    const s = time.seconds()
    return (type ? D : y + "年" + M + "个月" + d) + "天" + H + "时" + m + "分" + s + "秒"
}

onMounted(() => {
    bpi.breakTime = showTime(timeShowType.value, moment(SETTING.BPI_TIME_2), moment(SETTING.BPI_TIME_3))
})
</script>

<style lang="less" scoped>
.bpi-time {
    margin-left: auto;
    padding: 0 4px;
    flex-shrink: 0;
    user-select: none;
}
</style>
