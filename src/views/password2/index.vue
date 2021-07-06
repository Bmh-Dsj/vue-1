<template>
  <div class="banx">
    <h1 class="title">修改密码</h1>
    <!--    :rules="rules" -->
    <div class="inputDiv">
      <el-form :rules="rules" :model="ruleForm" status-icon ref="ruleForm" label-width="120px" class="demo-ruleForm">
        <el-form-item label="旧密码" prop="oldPassword">
          <el-input show-password placeholder="旧密码" type="password" v-model="ruleForm.oldPassword"
                    autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="password">
          <el-input show-password placeholder="新密码" type="password" v-model="ruleForm.password"
                    autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="再次输入密码" prop="checkPass">
          <el-input show-password placeholder="再次输入密码" type="password" v-model="ruleForm.checkPass"
                         autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <div class="buttonDiv">
            <el-button class="button" type="primary" @click="submitForm('ruleForm')">提交</el-button>
            <el-button class="button" @click="resetForm('ruleForm')">取消</el-button>
          </div>
        </el-form-item>
      </el-form>
    </div>
    <div>
      <!--      <div class="inputdiv">-->
      <!--        <el-input-->
      <!--          type="text"-->
      <!--          placeholder="旧密码"-->
      <!--          v-model="text"-->
      <!--          maxlength="10"-->
      <!--          show-password-->
      <!--          clearable-->
      <!--          autofocus-->
      <!--        >-->
      <!--        </el-input>-->
      <!--      </div>-->
      <!--      <div class="inputdiv">-->
      <!--        <el-input-->
      <!--          type="text"-->
      <!--          placeholder="新密码"-->
      <!--          v-model="text"-->
      <!--          maxlength="10"-->
      <!--          show-password-->
      <!--          clearable-->
      <!--        >-->
      <!--        </el-input>-->
      <!--      </div>-->
      <!--      <div class="inputdiv">-->
      <!--        <el-input-->
      <!--          type="text"-->
      <!--          placeholder="再次输入新密码"-->
      <!--          v-model="text"-->
      <!--          maxlength="10"-->
      <!--          show-password-->
      <!--          clearable-->
      <!--        >-->
      <!--        </el-input>-->
      <!--      </div>-->
      <!--      <div class="buttondiv">-->
      <!--        <el-button @click.native="xiugaipass" class="button" size="medium" type="primary">确定</el-button>-->
      <!--        <el-button @click.native="logout" class="button" size="medium" type="info">取消</el-button>-->
      <!--      </div>-->
    </div>
  </div>
</template>

<script>
import $api from "@/api/api";
import axios from "axios";
import {Message} from "element-ui";

export default {
name: "index",
  data() {
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else
      if (value !== this.ruleForm.password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    var Pass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入新密码'));
      } else {
        const reg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,12}$/;
        if (!reg.test(value)) {
          callback(new Error('密码必须包含大小写字母和数字的组合，可以使用特殊字符，长度在6-12之间'));
        }else {
          if (value == this.ruleForm.usedPass) {
            callback(new Error('新密码不能和旧密码相同!'));
          } else {
            callback();
          }
        }

      }
    };
    return {
      xmm: 0,
      content: 1,
      text: '',
      ruleForm: {
        guid:JSON.parse(localStorage.user).user.guid,
        oldPassword: '',//旧密码
        password: '',//新密码
        //checkPass: '',//确认密码
      },
      rules: {
        // pass: [
        //   {validator: validatePass, trigger: 'blur'}
        // ],
        // name:[{ required: true, message: '请输入姓名', trigger: 'blur' }],
        oldPassword:[{ required: true, message: '请输入旧密码', trigger: 'blur' },
          // { pattern: '^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{6,12}$',
          //   message: '密码必须包含大小写字母和数字的组合，可以使用特殊字符，长度在6-12之间' }
            ],
        password: [{ required: true, message: '请输入新密码', trigger: 'blur' },
          // {validator: Pass, trigger: 'blur'},
          // { pattern: '^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{6,12}$',
          //   message: '密码必须包含大小写字母和数字的组合，可以使用特殊字符，长度在6-12之间' }
        ],
        checkPass: [{ required: true, message: '请再次输入密码', trigger: 'blur' },
          {validator: validatePass2, trigger: 'blur'}
        ],
      },
      baseURL:this.$store.state.baseURL,
    };
  },
  methods: {
    // logout: async function () {
    //   await this.$store.dispatch('user/logout')
    //   this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    // },
    submitForm(formName) {
      console.log(this.ruleForm)
      this.$refs[formName].validate((valid) => {
        if (valid) {
          axios({
            method: 'put',
            url: `${this.baseURL}/user/updateuserinfobyguid`,
            headers: {
              "Content-Type": "application/json;charset=UTF-8",
              'token': localStorage.token,
            },
            data: this.ruleForm
          }).then(res => {
            console.log(res)
            Message({
              message:res.data.message,
              type:'success',
              duration:3*1000
            })
            this.logout()
          })
        } else {
          console.log('error submit!!');
          //alert('请将表单填写完整')
          return false;
        }
      });
    },
    logout: async function () {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
      this.$router.go(0);
      // this.$router.push(`/login`)
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped>
.inputDiv{
  width: 700px;
  margin: 30px auto;
  box-sizing: border-box;
}
.banx {
  width: 70%;
  margin: 0 auto;
  /*border: 1px saddlebrown solid;*/
  box-sizing: border-box;
  padding: 50px;
}

.button {
  width: 45%;
  height: 40px;
}

.buttondiv {
  width: 480px;
  margin: 30px auto;
  text-align: center;
  display: flex;
  justify-content: space-between;
}

.buttonDiv {
  width: 580px;
  margin: 30px auto;
  text-align: center;
  display: flex;
  justify-content: space-between;
}

.title {
  text-align: center;
}
</style>
