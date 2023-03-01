<template>
    <div class="audio flex-list">
        <canvas ref="cvsEle"></canvas>
        <audio ref="audioEle" src="/src/components/AudioVbx/bing.mp3" preload="metadata"></audio>
        <div class="controls flex-inline">
            <SvgIcon size="32" :name="audioObj.status ? 'pause' : 'play'" :color="audioObj.status ? '#ed6f6f' : '#007ffc'" @click="onPlayAudio" />
            <div class="wrapper flex-grow">
                <div>{{ audioObj.title }}</div>
                <div class="progress-bar">progress-bar</div>
                <div class="time flex-inline">
                    <div>{{ audioObj.currentTime }}</div>
                    <div>{{ audioObj.totalTime }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
let cvsEle, cvsCtx, audioEle, audCtx
let analyser, source, dataArray
let timer // 动画帧id

const audioObj = reactive({
    status: false,
    title: "星月神话",
    currentTime: "0:00",
    totalTime: ""
})

const instance = getCurrentInstance()
onMounted(() => {
    cvsEle = instance?.refs.cvsEle
    audioEle = instance?.refs.audioEle

    cvsCtx = cvsEle.getContext("2d")

    audioEle.oncanplay = () => {
        if (!audioObj.totalTime) {
            audioObj.totalTime = transTime(audioEle.duration) // 获取音频时长
        }
    }

    // 开始播放
    audioEle.onplay = () => {
        // 音频源 ---> 分析器 ---> 输出设备
        //             |
        //          canvas画布
        if (!audCtx) {
            audCtx = new AudioContext() // 创建音频上下文
        }
        if (!source) {
            source = audCtx.createMediaElementSource(audioEle) // 创建音频源节点
        }

        analyser = audCtx.createAnalyser() // 创建分析器节点
        analyser.fftSize = 1024
        // 创建数组，用于接受分析器节点的分析数据
        dataArray = new Uint8Array(analyser.frequencyBinCount)
        source.connect(analyser) // 音频连接到分析器节点
        source.connect(audCtx.destination) // 音频连接到输出设备
        draw()
    }
    // 暂停
    audioEle.onpause = () => {
        cancelAnimationFrame(timer)
    }
})

// 把分析出的波形画到canvas中
function draw() {
    audioObj.currentTime = transTime(audioEle.currentTime) //获取当前播放时长

    // 清空canvas
    const {width, height} = cvsEle
    cvsCtx.clearRect(0, 0, width, height)

    analyser.getByteFrequencyData(dataArray)
    const len = dataArray.length / 2 // 过滤高频
    const barWidth = width / len / 2
    cvsCtx.fillStyle = "#ea43f6"

    for (let i = 0; i < len; i++) {
        const data = dataArray[i]
        const barHeight = (data / 255) * height
        const x1 = i * barWidth + width / 2
        const x2 = width / 2 - (i + 1) * barWidth
        const y = height - barHeight
        cvsCtx.fillRect(x1, y, barWidth - 2, barHeight)
        cvsCtx.fillRect(x2, y, barWidth - 2, barHeight)
    }

    timer = requestAnimationFrame(draw)
}

const onPlayAudio = () => {
    if (audioObj.status) {
        audioEle.pause()
    } else {
        audioEle.play()
    }
    audioObj.status = !audioObj.status
}
const transTime = value => {
    let time
    const h = Math.floor(value / 3600)
    value %= 3600
    const m = Math.floor(value / 60)
    const s = Math.floor(value % 60)

    time = h === 0 ? "" : h + ":"
    time += m + ":" + s.toString().padStart(2, "0")
    return time
}
</script>

<style scoped lang="less">
.audio {
    canvas {
        height: 100px;
        border: 1px dashed #ed6f6f;
    }

    .controls {
        border: 1px solid #55d187;
        padding: 4px 8px;

        svg {
            &:hover {
                background-color: #fcc;
                border-radius: 50%;
            }
        }

        .wrapper {
            margin-left: 16px;

            .time {
                justify-content: space-between;
            }
        }
    }
}
</style>
