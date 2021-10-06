<template>
    <div class="va-login">
        <div class="va-login-form">
            <div class="va-login-form-item">
                <h2>管理系统</h2>
            </div>
            <div class="va-login-form-item">
                <input v-model="submit.username" placeholder="账号" class="va-input" @input="onAccountChange">
                <transition name="va-zoom-in-top">
                    <div v-if="error.username" class="va-input-error">{{ error.username }}</div> }
                </transition>
            </div>
            <div class="va-login-form-item">
                <input v-model="submit.password" placeholder="密码" type="password" class="va-input" @keydown="onKeyDown" @input="onPassWordChange">
                <transition name="va-zoom-in-top">
                    <div v-if="error.password" class="va-input-error">{{ error.password }}</div> }
                </transition>
            </div>
            <div class="va-login-form-item">
                <div class="va-login-form-item-captcha">
                    <input v-model="submit.captchaCode" placeholder="验证码" style="flex: 1;margin-right: 20px;" class="va-input" @keydown="onKeyDown" @input="onPassWordChange">
                    <el-image @click="changeCaptcha" :src="captchaUrl"></el-image>
                </div>
                <transition name="va-zoom-in-top">
                    <div v-if="error.captchaCode" class="va-input-error">{{ error.captchaCode }}</div> }
                </transition>
            </div>
            <div class="va-login-form-item">
                <button class="va-button" @click="onSubmit">登录</button>
            </div>
        </div>
    </div>
</template>

<script>
import calcMD5 from '../utils/md5'
export default {
    name: 'va-login',
    data () {
        return {
            submit: {
                username: '',
                password: '',
                captchaCode: ''
            },
            captchaUrl: '/api/captcha',
            error: {
                username: undefined,
                password: undefined,
                captchaCode: undefined
            }
        }
    },
    mounted () { },
    methods: {
        onKeyDown (e) {
            if (e.keyCode === 13) {
                this.onSubmit();
            }
        },
        onSubmit () {
            if (!this.submit.username) {
                this.error.username = '请输入账号信息';
            }
            if (!this.submit.password) {
                this.error.password = '请输入密码';
            }
            if (!this.submit.captchaCode) {
                this.error.captchaCode = '请输入验证码';
                return
            }
            if (this.submit.username && this.submit.password) {
                this.$authApi.FormLogin(
                    'username=' + this.submit.username + '&password=' + calcMD5('vue-auth' + this.submit.password) + '&captchaCode=' + this.submit.captchaCode
                ).then((result) => {
                    this.$router.push({ path: this.$route.query.redirect || '/', replace: true }).catch(() => { })
                }).catch(() => {
                    this.changeCaptcha();
                })
            }
        },
        onAccountChange () {
            if (this.submit.username) {
                this.error.username = '';
            } else {
                this.error.username = '请输入账号信息';
            }
        },
        onPassWordChange () {
            if (this.submit.password) {
                this.error.password = '';
            } else {
                this.error.password = '请输入密码';
            }
        },
        changeCaptcha () {
            this.captchaUrl = '/api/captcha?' + Math.random()
        }
    }
}
</script>

<style>

</style>
