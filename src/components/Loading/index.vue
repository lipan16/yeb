<template>
    <section v-show="loading" class="full-loading"
             :class="{absolute, [theme]: !!theme}"
             :style="[background ? `background-color: ${background}` : '']"
    >
        <div class="loading">
            <div class="dot" v-for="dot in 36" :key="dot"/>
        </div>
    </section>
</template>

<script lang="ts">
import {PropType} from 'vue'

export default defineComponent({
    props: {
        absolute: {
            type: Boolean as PropType<boolean>,
            default: false,
        },
        loading: {
            type: Boolean as PropType<boolean>,
            default: true,
        },
        background: {
            type: String as PropType<string>,
        },
        theme: {
            type: String as PropType<'dark' | 'light'>,
        },
    },
})

</script>
<style lang="less">
@dots: 36; // 小球个数
@ballSize: 10px; // 小球尺寸
@containerSize: 100px; // 容器尺寸
@deg: 360deg / @dots;
@ani-duration: 2000ms; // 动画时间

.full-loading{
    height: 200px;
    width: 200px;
    position: relative;
}

.loading{
    width: @containerSize;
    height: @containerSize;
    margin: 50px auto;
    position: relative;
    border-radius: 50%;

    .dot{
        position: absolute;
        top: 50%;
        left: 50%;
        width: @ballSize;
        height: @ballSize;
        margin-left: (-@ballSize / 2);
        margin-top: (-@ballSize / 2);
        perspective: 70px;
        transform-style: preserve-3d;

        &::before, &::after{
            content: '';
            position: absolute;
            width: 100%;
            height: 100%;
            border-radius: 50%;
        }
        &::before{
            background-color: #000000;
            top: -100%;
            animation: blackMove @ani-duration infinite;
        }
        &::after{
            background-color: #fff;
            top: 100%;
            animation: whiteMove @ani-duration infinite;
        }
    }
}

each(range(@dots), {
    .dot:nth-child(@{value}){
        transform: rotate((@deg * @value)) translateY((-@containerSize / 2));
        &::before, &::after{
            animation-delay: (-@ani-duration / @dots * 6 * @value);
        }
    }
});

@keyframes blackMove{
    0%{
        animation-timing-function: ease-in;
    }
    25%{
        transform: translate3d(0, 100%, @ballSize);
        animation-timing-function: ease-out;
    }
    50%{
        transform: translate3d(0, 200%, 0);
        animation-timing-function: ease-in;
    }
    75%{
        transform: translate3d(0, 100%, -@ballSize);
        animation-timing-function: ease-out;
    }
}
@keyframes whiteMove{
    0%{
        animation-timing-function: ease-in;
    }
    25%{
        transform: translate3d(0, -100%, -@ballSize);
        animation-timing-function: ease-out;
    }
    50%{
        transform: translate3d(0, -200%, 0);
        animation-timing-function: ease-in;
    }
    75%{
        transform: translate3d(0, -100%, @ballSize);
        animation-timing-function: ease-out;
    }
}
</style>
