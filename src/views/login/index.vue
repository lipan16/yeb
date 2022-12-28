<template>
    <div class="login flex-list">
        <div class="login-header flex-inline">
            <AppDarkModeToggle/>
            <AppLocalePicker/>
            <AppLogo/>
        </div>

        <div class="login-content flex-grow">
            <el-form ref="refLoginForm" :model="loginForm" :rules="rulesLoginForm" class="login-form "
                     auto-complete="on" label-position="left">
                <div class="title-container">{{ $t('login.title') }}</div>

                <el-form-item class="login-input" :label="$t('login.username')">
                    <el-input
                        ref="username"
                        :prefix-icon="UserFilled"
                        v-model="loginForm.username"
                        placeholder="Username"
                        name="username"
                        type="text"
                        tabindex="1"
                        auto-complete="on"
                    />
                </el-form-item>

                <el-form-item class="login-input" :label="$t('login.password')">
                    <el-input
                        ref="password"
                        :prefix-icon="Lock"
                        v-model="loginForm.password"
                        type="password"
                        show-password
                        placeholder="Password"
                        name="password"
                        tabindex="2"
                        auto-complete="on"
                        @keyup.enter.native="handleLogin(refLoginForm)"
                    />
                </el-form-item>

                <el-button class="btn" :loading="loading" type="primary" color="#1890FF" @click.native.prevent="handleLogin(refLoginForm)" :dark="true">
                    {{ $t('login.title') }}
                </el-button>
            </el-form>
        </div>
    </div>
</template>

<script lang="ts" setup>
import {FormInstance, FormRules} from 'element-plus'
import {reactive, ref, toRaw} from 'vue'
import {useUserStoreWithOut} from '@/store/modules/user'
import AppLocalePicker from '@/components/Application/AppLocalePicker.vue'
import AppDarkModeToggle from '@/components/Application/AppDarkModeToggle.vue'
import AppLogo from '@/components/Application/AppLogo.vue'
import {UserFilled, Lock} from '@element-plus/icons-vue'
import {router} from '@/router'

const userStore = useUserStoreWithOut()

const refLoginForm = ref<FormInstance>()
const loginForm = reactive({
    username: '010287',
    password: 'cib@1234',
    captcha: 'xiaobing',
})

// 校验规则
const validateUsername = (rule, value, callback) => {
    console.log('rule', rule)
    if(!value){
        callback(new Error('Please enter the correct user name'))
    }else{
        callback()
    }
}

const validatePassword = (rule, value, callback) => {
    console.log('rule', rule)
    if(value.length > 6){
        callback(new Error('The password can not be less than 6 digits'))
    }else{
        callback()
    }
}

const rulesLoginForm = reactive<FormRules>({
    username: [
        {required: true, trigger: 'blur', validator: validateUsername},
    ],
    password: [{required: true, trigger: 'blur', validator: validatePassword}],
})

const loading = ref(false)

async function handleLogin(form: FormInstance){
    await form.validate(valid => {
        if(valid){
            loading.value = true
            userStore.login(toRaw(loginForm)).then(() => {
                router.replace('/')
            })
            // this.$store.dispatch('user/login', this.loginForm).then(() => {
            //     this.$router.push({path: this.redirect || '/'})
            // }).catch(() => {
            // })
        }else{
            console.log('error submit!!')
        }
        loading.value = false
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
    animation: enter-x-animation 0.4s ease-in-out 0.3s;
    animation-fill-mode: forwards;
    animation-delay: 0.1s;
}

@media (min-width: 576px){
    .login-form{
        width: 50%;
    }
}

.login-form{
    margin: 32px auto;
    border: 0 2px 12px 0 var(--border-shadow);
    background: var(--box-bg);
    text-align: center;
    border-radius: var(--border-radius);
    padding: 32px;

    .title-container{
        color: var(--text);
        letter-spacing: 1px;
        text-shadow: 0 0 10px var(--border-shadow);
        font-size: 32px;
        line-height: 40px;
        margin-top: 16px;
        margin-bottom: 32px;
    }

    .btn{
        width: 100%;
        text-align: center;
        margin-top: 16px;
    }
}
</style>
