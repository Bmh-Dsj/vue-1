<template>
  <div class="bgimg">
    <div class="ynklogo">
      <!--            <img src="../../icons/logo.png" width="390"/>-->
    </div>
    <div class="login-container">

      <el-form @keyup.enter.native="handleLogin" ref="loginForm" :model="loginForm" :rules="loginRules"
               class="login-form" auto-complete="on"
               label-position="left">

        <div class="title-container">
          <h3 class="title">呼叫中心管理系统</h3>
        </div>
        <el-form-item prop="username" id="yhm">
        <span class="svg-container">
          <svg-icon icon-class="user"/>
        </span>
          <el-input
            ref="username"
            v-model="loginForm.username"
            placeholder="用户名"
            name="jobNumber"
            type="text"
            tabindex="1"
            auto-complete="on"
          />
        </el-form-item>

        <el-form-item prop="password" id="mima">
        <span class="svg-container">
          <svg-icon icon-class="password"/>
        </span>
          <el-input
            :key="passwordType"
            ref="password"
            v-model="loginForm.password"
            :type="passwordType"
            placeholder="密码"
            name="password"
            tabindex="2"
            auto-complete="on"
            @keyup.enter.native="handleLogin"
          />
          <span class="show-pwd" @click="showPwd">
          <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'"/>
        </span>
        </el-form-item>
        <div class="yzmdiv">
          <div class="yzmimg">
            <!--            http://39.102.203.193:9090-->
            <!--            this.src = `http://192.168.3.103:9090/user/getImage/${this.loginForm.random}` @click="showyzm"-->
            <img :src="`http://106.14.41.132:9090/user/getImage/${this.loginForm.random}`" @click="showyzm"/>
            <!---->
<!--                        <img :src="`http://192.168.0.47:9090/user/getImage/${this.loginForm.random}`" @click="showyzm"/>-->
<!--                        <img :src="`http://39.102.203.193:9090/user/getImage/${this.loginForm.random}`" @click="showyzm"/>-->
          </div>
          <el-form-item id="sryzm" prop="username">
            <!--        <span class="svg-container">-->
            <!--          <svg-icon icon-class="user" />-->
            <!--        </span>-->
            <el-input
              ref="yanzm"
              v-model="loginForm.code"
              placeholder="验证码"
              name="username"
              type="text"
              tabindex="3"
              auto-complete="on"
            />
          </el-form-item>
        </div>
        <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;"
                   @click.native.prevent="handleLogin">登录
        </el-button>
        <!--        <div class="tips">-->
        <!--          <span style="margin-right:20px;">用户名: admin或editor</span>-->
        <!--          <span> 密码:六位数</span>-->
        <!--        </div>-->

      </el-form>
    </div>
  </div>
</template>

<script>
import {validUsername} from '@/utils/validate'
import {getToken, setToken} from "@/utils/auth";
import axios from "axios";
import store from "@/store";
import {getInfo, logout} from "@/api/user";

export default {
  name: 'login',
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!validUsername(value)) {
        // if (value === '') {
        callback(new Error('请输入用户名editor或admin'))
        // document.getElementById('yhm').style.borderColor = 'red'
      } else {
        callback()
        // document.getElementById('yhm').style.borderColor = ''
      }
    }
    const validatePassword = (rule, value, callback) => {//判断密码格式方法
      if (value === '') {
        callback(new Error('请输入密码'))
        document.getElementById('mima').style.borderColor = 'red'
      } else if (value.length < 6) {
        callback(new Error('密码必须大于六位'))
        document.getElementById('mima').style.borderColor = 'red'
      } else {
        callback()
        document.getElementById('mima').style.borderColor = ''
      }
    }
    return {
      loginForm: {
        username: '',//用户名
        password: '',//密码
        code: '',//验证码
        random: Math.random(),//随机数
      },
      // src:`http://192.168.3.103:9090/user/getImage/${this.loginForm.random}`,
      loginRules: {
        // username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        // password: [{ required: true, trigger: 'blur', validator: validatePassword }],
        // password:[
        //   { pattern: '^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{6,12}$',
        //     message: '密码格式有误' }
        //   ],
      },
      loading: false,//登录按钮加载动画
      passwordType: 'password',//密码可见开关
      redirect: undefined,
      baseURL: this.$store.state.baseURL,
      timer: ''
    }
  },
  watch: {
    $route: {
      handler: function (route) {//记录上一个页面从哪个页面退出
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  methods: {
    showyzm() {
      let ran = Math.random()
      this.src = `http://192.168.3.103:9090/user/getImage/${ran}`
      this.loginForm.random = ran
    },
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('user/login', this.loginForm).then((res) => {
            // console.log(this.loginForm)
            //localStorage.automatic = ''
            console.log(res.headers.authorization)
            // res.token = res.headers['authorization']
            // commit('SET_TOKEN', response.token)
            setToken(res.headers.authorization)

            // Cookies.set('TokenKey', response.token)
            // console.log(getToken('TokenKey'))
            localStorage.token = res.headers.authorization
            this.$store.dispatch('user/getInfo')


            // localStorage.user = JSON.stringify(res.data.data.user)
            // console.log(JSON.parse(localStorage.user))

            this.$router.push({ path:'business' || this.redirect   })//判断是否从上个页面退出 没有就去首页
            // this.timer = setTimeout(this.chooseABusiness, 3000)
            // this.chooseABusiness()

            this.loading = false
          }).catch((err) => {
            this.loading = false
            console.log(err)
            console.log('登录错误')
          })

        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    //选择部门切换页面
    chooseABusiness() {
      axios({
        method: 'get',
        url: `${this.baseURL}/user/switchingservices?departGuid=${JSON.parse(localStorage.user).departs[0].guid}`,
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          'token': localStorage.token,
        },
      }).then(res => {
        console.log(res.data.data.roles[0].roleDescribe)
        let xmOne = []
        xmOne.push(res.data.data.roles[0].roleDescribe)
        console.log(store.getters.roles)

        let b = xmOne
        let ccc = []
        for (let i = 0; i < store.getters.roles.length; i++) {
          for (let j = 0; j < b.length; j++) {
            if (store.getters.roles[i] == b[j]) {
              ccc.push(store.getters.roles[i])
            }
          }
        }
        localStorage.xmOne = JSON.stringify(ccc)

        // let url = this.$router.resolve({
        //   name: `/`,
        //   // query: localStorage.xmOne,this.$route.query.
        //   query: {value: JSON.parse(localStorage.xmOne)[0]}
        // });
        this.$router.push({
          path: '/dashboard',
          name: 'Dashboard',
          // query: localStorage.xmOne,this.$route.query.
          query: {value: JSON.parse(localStorage.xmOne)[0]}
        })

        // window.opener=null;
        // window.close();

        // window.open(url.href, "_blank");

//   /XJ/task1-1
      }).catch(err => {
        console.log(err)
      })

    },
    aa() {

    }
  },
  created() {
    this.showyzm()
  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #283443;
$light_gray: #fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      //background: transparent;
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      //color: $light_gray;
      color: #2b2f3a;
      height: 47px;
      //caret-color: $cursor;
      caret-color: black;

      &:-webkit-autofill {
        //box-shadow: 0 0 0px 1000px $bg inset !important;
        //-webkit-text-fill-color: $cursor !important;
        box-shadow: 0 0 0px 1000px white inset !important;
        -webkit-text-fill-color: black !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    //background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    background: white;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
.yzmdiv {
  display: flex;
  justify-content: space-between;
}

.ynklogo {
  position: absolute;
}

.yzmimg {
  width: 48%;
  height: 47px;
  margin-bottom: 15px;
  border-radius: 5px;
  overflow: hidden;
}

.yzmimg img {
  width: 100%;
  height: 100%;
}

.bgimg {
  width: 100%;
  height: 100%;
  //background: #F5F5F5 url('../../icons/logo.png') no-repeat -40px 90px;
  background: #F5F5F5 url('../../icons/logo3.jpg') no-repeat;
  background-size: cover;
}

#sryzm {
  width: 48%;
  height: 47px;
  //margin-top: calc((100px - 47px)/2);
}

$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  min-height: 100%;
  width: 30%;
  margin: 0 auto;
  //float: right;
  //background-color: #F5F5F5;
  overflow: hidden;
  /*margin-bottom: calc();*/
  //background:url("../../icons/logo.png");
  .login-form {
    position: relative;
    width: 520px;
    //width: 100%;
    max-width: 100%;
    padding: calc(50vh - 200px) 10% 0;
    //padding-left:35px;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    //color: $dark_gray;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      //color: $light_gray;
      //color: #2b2f3a;
      color: white;

      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    //color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
