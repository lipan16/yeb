<template>
    <div class="login flex-list">
        <div id="login-three-container"/>

        <div class="login-header flex-inline">
            <AppDarkModeToggle/>
            <AppLocalePicker/>
            <AppLogo/>
        </div>

        <div class="login-content flex-grow">
            <div class="head">
                <img src="@/assets/login_header.png" alt=""/>
            </div>
            <el-form ref="refLoginForm" @keyup.enter="handleLogin(refLoginForm)" :model="loginForm" :rules="rulesLoginForm"
                     class="login-form" auto-complete="on" label-position="left" size="large">

                <img class="avatar" src="@/assets/avatar.png" alt=""/>

                <div class="title">{{ $t('login.title') }}</div>

                <el-form-item prop="username">
                    <el-input
                        ref="username"
                        :prefix-icon="UserFilled"
                        v-model="loginForm.username"
                        :placeholder="$t('login.username')"
                        type="text"
                        tabindex="1"
                        auto-complete="on"
                        clearable
                    />
                </el-form-item>

                <el-form-item prop="password">
                    <el-input
                        ref="password"
                        :prefix-icon="Lock"
                        v-model="loginForm.password"
                        type="password"
                        :placeholder="$t('login.password')"
                        tabindex="2"
                        auto-complete="on"
                        show-password
                        clearable
                    />
                </el-form-item>

                <el-form-item class="login-captcha" prop="captcha">
                    <el-input
                        ref="captcha"
                        v-model="loginForm.captcha"
                        type="text"
                        :placeholder="$t('login.captcha')"
                        tabindex="3"
                        clearable
                        @keyup.enter.native="handleLogin(refLoginForm)"
                    />
                    <div class="captcha">
                        {{ loginForm.captcha_id }}
                        <!--                        <img @click="onChangeCaptcha" class="captcha-img" :src="'&id=' + loginForm.captcha_id" alt=""/>-->
                    </div>
                </el-form-item>

                <el-checkbox v-model="loginForm.keep" :label="$t('login.holdSession')"/>

                <el-button class="btn" :loading="loading" round type="primary" @click.native.prevent="handleLogin(refLoginForm)">
                    {{ $t('login.title') }}
                </el-button>
            </el-form>
        </div>
    </div>
</template>

<script lang="ts" setup>
import {useI18n} from 'vue-i18n'
import {clone} from 'lodash'
import {ElMessage, FormInstance, FormRules} from 'element-plus'
import {UserFilled, Lock} from '@element-plus/icons-vue'

import AppLocalePicker from '@/components/Application/AppLocalePicker.vue'
import AppDarkModeToggle from '@/components/Application/AppDarkModeToggle.vue'
import AppLogo from '@/components/Application/AppLogo.vue'
import {useUserStoreWithOut} from '@/store/modules/user'
import {router} from '@/router'
import {getUrlParam} from '@/utils'
import {useEncryption} from '@/utils/encrypt'

const userStore = useUserStoreWithOut()
const {t} = useI18n()

const refLoginForm = ref<FormInstance>()
const loginForm = reactive({
    username: '010287',
    password: 'cib@1234',
    captcha: 'xiaobing',
    captcha_id: 'xiaobing',
    keep: true,
})
const loading = ref(false)

// 校验规则
const validateUsername = (rule, value, callback) => {
    if(!value){
        callback(new Error(t('login.please enter an account')))
    }else{
        callback()
    }
}

const validatePassword = (rule, value, callback) => {
    if(value.length < 6){
        callback(new Error(t('login.password validate error')))
    }else{
        callback()
    }
}

const validateCaptcha = (rule, value, callback) => {
    if(value !== loginForm.captcha_id){
        callback(new Error(t('login.Please enter captcha')))
    }else{
        callback()
    }
}

const rulesLoginForm = reactive<FormRules>({
    username: [
        {required: true, trigger: 'blur', validator: validateUsername},
    ],
    password: [{required: true, trigger: 'blur', validator: validatePassword}],
    captcha: [{required: true, trigger: 'blur', validator: validateCaptcha}],
})

// 获取验证码
const onChangeCaptcha = () => {
    loginForm.captcha = 'xiaobing'
}

async function handleLogin(form: FormInstance){
    const encryption = useEncryption()
    const redirectUrl = getUrlParam('redirect')
    // todo bug 使用toRaw方法后返回新对象，修改新对象会影响原reactive的对象
    const loginParams = clone(loginForm)
    loginParams.password = encryption.encryptByAES(loginParams.password)

    await form.validate(valid => {
        if(valid){
            loading.value = true
            userStore.login(loginParams).then(() => {
                ElMessage({type: 'success', message: t('login.success')})
                router.replace(redirectUrl || '/')
            }).catch((err) => {
                console.error('login error', err)
                ElMessage({type: 'error', message: err.message || t('login.error')})
                onChangeCaptcha()
            })
        }else{
            ElMessage({type: 'warning', message: t('login.warning')})
            console.error('error submit')
            onChangeCaptcha()
        }
        loading.value = false
    })
}
</script>

<style lang="less" scoped>
.login{
    height: 100%;
    width: 100%;
    position: relative;
}

.login-header{
    justify-content: flex-end;
    margin-right: 20px;
}

.login-content{
    height: 100%;
    width: 430px;
    margin: 0 auto;
    padding-top: 32px;

    .head{
        background: #ccccff;
        position: relative;
        overflow: hidden;
        outline: none;
        border: none;
        z-index: 1;

        &:before{
            content: '';
            position: absolute;
            background-color: red;
            z-index: -2;
            width: 100%;
            height: 100%;
            left: 50%;
            top: 50%;
            transform-origin: 0 0;
            animation: rotate 3s infinite linear;
        }

        &:after{
            position: absolute;
            content: '';
            width: calc(100% - 4px);
            height: calc(100% - 4px);
            left: 2px;
            top: 2px;
            z-index: -1;
        }

        img{
            display: block;
            width: 100%;
            user-select: none;
        }
    }

    .login-form{
        position: relative;
        border: 0 2px 12px 0 var(--border-shadow);
        background: var(--box-bg);
        border-radius: var(--border-radius);
        padding: 50px 32px;
        z-index: 2;

        .avatar{
            display: block;
            position: absolute;
            height: 100px;
            width: 100px;
            border-radius: 50%;
            top: -50px;
            right: calc(50% - 50px);
            user-select: none;
        }

        .title{
            position: relative;
            text-align: center;
            color: var(--text);
            letter-spacing: 1px;
            text-shadow: 0 0 10px var(--border-shadow);
            font-size: 32px;
            line-height: 40px;
            margin-top: 16px;
            margin-bottom: 22px;
            cursor: pointer;

            &:before, &:after{
                content: '';
                position: absolute;
                left: 0;
                right: 0;
                height: 2px;
                background-color: #fc2f70;
                transform: scaleX(0);
                transition: transform .5s ease;
            }

            &:before{
                top: 0;
                transform-origin: center right;
            }

            &:hover::before{
                transform-origin: center left;
                transform: scaleX(1);
            }

            &:after{
                bottom: 0;
                transform-origin: center left;
            }

            &:hover::after{
                transform-origin: center right;
                transform: scaleX(1);
            }
        }

        .login-captcha{
            .el-form-item__content{
                .el-input{
                    width: 60%;
                }

                .captcha{
                    width: 40%;
                    text-align: center;
                }
            }
        }

        .btn{
            width: 100%;
            text-align: center;
            margin-top: 16px;
            --el-button-bg-color: var(--el-color-primary);

            &:hover{

            }
        }
    }
}

@keyframes rotate{
    to{
        transform: rotate(1turn);
    }

}

@media screen and (max-width: 768px){
    .login-content{
        padding-top: 10px;
        width: 340px;
    }
}

</style>
