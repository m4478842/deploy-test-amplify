<template>
  <div class="main">
    <div class="container">
      <div class="title">账号密码登录</div>
      <a-form :form="form" class="user-layout-login" ref="formLogin" id="formLogin">
        <a-form-item>
          <a-input
            size="large"
            v-decorator="['username',validatorRules.username,{ validator: this.handleUsernameOrEmail }]"
            type="text"
            placeholder="请输入账号">
            <a-icon slot="prefix" type="user" :style="{ color: 'rgba(0,0,0,.25)' }"/>
          </a-input>
        </a-form-item>
        <a-form-item>
          <a-input
            v-decorator="['password',validatorRules.password]"
            size="large"
            type="password"
            autocomplete="false"
            placeholder="请输入密码">
            <a-icon slot="prefix" type="lock" :style="{ color: 'rgba(0,0,0,.25)' }"/>
          </a-input>
        </a-form-item>
        <a-form-item style="margin-top:24px">
          <a-button
            size="large"
            type="primary"
            htmlType="submit"
            class="login-button"
            :loading="loginBtn"
            @click.stop.prevent="handleSubmit"
            :disabled="loginBtn">登录
          </a-button>
        </a-form-item>
      </a-form>
    </div>
    <footer class="footer">Copyright © 2021 成都拱卒科技有限公司版权所有</footer>
  </div>
</template>

<script>
  import { mapActions } from "vuex"
  import { timeFix } from "@/utils/util"
  import Vue from 'vue'
  import { ACCESS_TOKEN } from "@/store/mutation-types"

  export default {
    data () {
      return {
        loginBtn: false,
        loginType: 0,
        form: this.$form.createForm(this),
        validatorRules:{
          username:{rules: [{ required: true, message: '请输入账号!',validator: 'click'}]},
          password:{rules: [{ required: true, message: '请输入密码!',validator: 'click'}]},
        },
      }
    },
    created () {
      Vue.ls.remove(ACCESS_TOKEN)
    },
    methods: {
      ...mapActions([ "Login", "Logout" ]),
      // handler
      handleUsernameOrEmail (rule, value, callback) {
        const regex = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/;
        if (regex.test(value)) {
          this.loginType = 0
        } else {
          this.loginType = 1
        }
        callback()
      },
      handleSubmit () {
        let that = this
        let loginParams = {}
        that.loginBtn = true
        that.form.validateFields([ 'username', 'password','inputCode' ], { force: true }, (err, values) => {
          if (!err) {
            loginParams.email = values.username
            loginParams.password = values.password
            this.$router.push('/')
            // that.Login(loginParams).then((res) => {
            //   this.loginSuccess(res)
            //   this.$router.push('/')
            // }).catch((err) => {
            //   that.requestFailed(err)
            // });
          }else {
            that.loginBtn = false
          }
        })
      },
      loginSuccess () {
        this.$notification.success({
          message: '欢迎',
          description: `${timeFix()}，欢迎回来`,
        });
      },
      requestFailed (err) {
        this.$notification[ 'error' ]({
          message: '登录失败',
          description: ((err.response || {}).data || {}).message || err.message || "请求出现错误，请稍后再试",
          duration: 4,
        });
        this.loginBtn = false
      },
      validateMobile(rule,value,callback){
        if (!value || new RegExp(/^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/).test(value)){
          callback()
        }else{
          callback("您的手机号码格式不正确!")
        }
      },
    }
  }
</script>

<style lang="less" scoped>
.main {
  width: 100%;
  height: 100%;
  flex-direction: column;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f0f2f5 url(../../assets/login_bg.svg) no-repeat center;
  background-size: contain;
  .container{
    width: 500px;
    box-sizing: border-box;
    padding: 40px 70px;
    border-radius: 20px;
    background: #fff;
    transition: all 1s;
    &:hover{
      transition: all 1s;
      box-shadow: 0px 0px 10px 0px #cccccc;
    }
    .title{
      text-align: center;
      font-size: 18px;
      margin: 0 0 30px 0;
    }
  }
}
.footer{
  position: fixed;
  bottom: 10px;
  padding: 0 16px;
  margin: 48px 0 24px;
  text-align: center;
  color: rgba(0,0,0,.45);
  font-size: 14px;
}
  .user-layout-login {
    label {
      font-size: 14px;
    }

    .getCaptcha {
      display: block;
      width: 100%;
      height: 40px;
    }

    .forge-password {
      font-size: 14px;
    }

    button.login-button {
      padding: 0 15px;
      font-size: 16px;
      height: 40px;
      width: 100%;
    }

    .user-login-other {
      text-align: left;
      margin-top: 24px;
      line-height: 22px;

      .item-icon {
        font-size: 24px;
        color: rgba(0,0,0,.2);
        margin-left: 16px;
        vertical-align: middle;
        cursor: pointer;
        transition: color .3s;

        &:hover {
          color: #1890ff;
        }
      }

      .register {
        float: right;
      }
    }
  }

</style>
<style>
  .valid-error .ant-select-selection__placeholder{
    color: #f5222d;
  }
</style>