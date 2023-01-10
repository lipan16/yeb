<template>
    <div class="login flex-list">
        <div class="login-header flex-inline">
            <AppDarkModeToggle/>
            <AppLocalePicker/>
            <AppLogo/>
        </div>

        <div class="login-content flex-grow">
            <div class="head">
                <img src="@/assets/login_header.png" alt=""/>
            </div>
            <el-form @keyup.enter="handleLogin(refLoginForm)" ref="refLoginForm" :model="loginForm" :rules="rulesLoginForm"
                     class="login-form" auto-complete="on" label-position="left" size="large">

                <img class="avatar" src="@/assets/avatar.png" alt=""/>

                <div class="title-container">{{ $t('login.title') }}</div>

                <el-form-item :label="$t('login.username')" prop="username">
                    <el-input
                        ref="username"
                        :prefix-icon="UserFilled"
                        v-model="loginForm.username"
                        placeholder="username"
                        type="text"
                        tabindex="1"
                        auto-complete="on"
                        clearable
                    />
                </el-form-item>

                <el-form-item :label="$t('login.password')" prop="password">
                    <el-input
                        ref="password"
                        :prefix-icon="Lock"
                        v-model="loginForm.password"
                        type="password"
                        placeholder="password"
                        tabindex="2"
                        auto-complete="on"
                        show-password
                        clearable
                    />
                </el-form-item>

                <el-form-item class="login-captcha" :label="$t('login.captcha')" prop="captcha">
                    <el-input
                        ref="captcha"
                        v-model="loginForm.captcha"
                        type="text"
                        placeholder="captcha"
                        tabindex="3"
                        clearable
                        @keyup.enter.native="handleLogin(refLoginForm)"
                    />
                    <div class="captcha">1</div>
                </el-form-item>

                <el-checkbox v-model="loginForm.keep" :label="$t('login.holdSession')"/>

                <el-button class="btn" :loading="loginForm.loading" round type="primary" @click.native.prevent="handleLogin(refLoginForm)">
                    {{ $t('login.title') }}
                </el-button>
            </el-form>
        </div>
    </div>
</template>

<script lang="ts" setup>
import {FormInstance, FormRules} from 'element-plus'
import {reactive, ref, toRaw} from 'vue'
import {UserFilled, Lock} from '@element-plus/icons-vue'

import {useUserStoreWithOut} from '@/store/modules/user'
import AppLocalePicker from '@/components/Application/AppLocalePicker.vue'
import AppDarkModeToggle from '@/components/Application/AppDarkModeToggle.vue'
import AppLogo from '@/components/Application/AppLogo.vue'
import {router} from '@/router'

const userStore = useUserStoreWithOut()

const refLoginForm = ref<FormInstance>()
const loginForm = reactive({
    username: '010287',
    password: 'cib@1234',
    captcha: 'xiaobing',
    keep: false,
    loading: false,
    captcha_id: '',
})

// 校验规则
const validateUsername = (rule, value, callback) => {
    if(!value){
        callback(new Error('Please enter the correct user name'))
    }else{
        callback()
    }
}

const validatePassword = (rule, value, callback) => {
    if(value.length < 6){
        callback(new Error('The password can not be less than 6 digits'))
    }else{
        callback()
    }
}

const validateCaptcha = (rule, value, callback) => {
    if(value.length < 6){
        callback(new Error('captcha error'))
    }else{
        callback()
    }
}

const rulesLoginForm = reactive<FormRules>({
    username: [
        {required: true, trigger: 'blur', validator: validateUsername, message: '请输入用户名'}
    ],
    password: [{required: true, trigger: 'blur', validator: validatePassword}],
    captcha: [{required: true, trigger: 'blur', validator: validateCaptcha}],
})

// 获取验证码
const onChangeCaptcha = () => {
    loginForm.captcha = ''
}

async function handleLogin(form: FormInstance){
    const redirectUrl = '/'
    await form.validate(valid => {
        if(valid){
            loginForm.loading = true
            userStore.login(toRaw(loginForm)).then(() => {
                router.replace(redirectUrl || '/')
            }).catch(() => {
                console.error('login error')
                onChangeCaptcha()
            })
        }else{
            console.error('error submit')
            onChangeCaptcha()
        }
        loginForm.loading = false
    })
}
</script>

<style lang="less" scoped>
.login{
    height: 100%;
    width: 100%;
}

.login-header{
    justify-content: flex-end;
}

.login-content{
    height: 100%;
    width: 430px;
    margin: 0 auto;

    .head{
        background: #ccccff;

        img{
            display: block;
            width: 100%;
            user-select: none;
        }
    }
}

@media (min-width: 576px){
    .login-form{
        width: 100%;
    }
}

.login-form{
    position: relative;
    border: 0 2px 12px 0 var(--border-shadow);
    background: var(--box-bg);
    border-radius: var(--border-radius);
    padding: 50px 32px;

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

    .title-container{
        text-align: center;
        color: var(--text);
        letter-spacing: 1px;
        text-shadow: 0 0 10px var(--border-shadow);
        font-size: 32px;
        line-height: 40px;
        margin-top: 16px;
        margin-bottom: 22px;
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
    }
}
</style>
