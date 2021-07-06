<template>
  <div class="banx">
    <h1 class="title">修改个人资料{{this.$store.state.user.form}}</h1>
    <!--    :rules="rules" -->
    <div class="inputDiv">
      <el-form :rules="rules" :model="ruleForm" status-icon ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="姓名" prop="name">
          <el-input clearable placeholder="姓名" v-model="ruleForm.name"></el-input>
        </el-form-item>
<!--        <el-form-item label="年龄" prop="age">-->
<!--          <el-input clearable placeholder="年龄" v-model.number="ruleForm.age"></el-input>-->
<!--        </el-form-item>-->
        <el-form-item label="手机号" prop="phone">
          <el-input clearable placeholder="手机号" v-model="ruleForm.phone"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input  clearable placeholder="邮箱" v-model="ruleForm.email"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-radio-group v-model="ruleForm.sex">
            <el-radio label="男">男</el-radio>
            <el-radio label="女">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="出生日期">
          <el-col>
            <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.birthday"
                            style="width: 100%;"></el-date-picker>
          </el-col>
        </el-form-item>
<!--        <el-form-item label="是否婚配">-->
<!--          <el-radio-group v-model="ruleForm.marriage">-->
<!--            <el-radio :label="1">已婚</el-radio>-->
<!--            <el-radio :label="0">未婚</el-radio>-->
<!--          </el-radio-group>-->
<!--        </el-form-item>-->

<!--        <el-form-item label="旧密码" prop="usedPass">-->
<!--          <el-input show-password placeholder="旧密码" type="password" v-model="ruleForm.usedPass"-->
<!--                    autocomplete="off"></el-input>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="新密码" prop="pass">-->
<!--          <el-input show-password placeholder="新密码" type="password" v-model="ruleForm.pass"-->
<!--                    autocomplete="off"></el-input>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="再次输入密码" prop="checkPass">-->
<!--          <el-input show-password placeholder="再次输入密码" type="password" v-model="ruleForm.checkPass"-->
<!--                    autocomplete="off"></el-input>-->
<!--        </el-form-item>-->

        <el-form-item label="个人住址">
          <el-input :rows="4" resize="none" maxlength="50" show-word-limit type="textarea" v-model="ruleForm.address"></el-input>
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

  <!--    <input @keyup="xgmm" id="q" type="text">-->
  <!--    <button @click="mm()">确认修改</button>-->
  <!--    <input type="text" @click="mm(1)" v-model="xmm">-->


</template>

<script>

import $api from '../../api/api'
import {login, password} from "@/api/user";
import {Message} from "element-ui";
export default {
  name: "password",
  data() {
    // var checkAge = (rule, value, callback) => {
    //   if (!value) {
    //     return callback(new Error('年龄不能为空'));
    //   }
    //   setTimeout(() => {
    //     if (!Number.isInteger(value)) {
    //       callback(new Error('请输入数字值'));
    //     } else {
    //       if (value < 18) {
    //         callback(new Error('必须年满18岁'));
    //       } else {
    //         callback();
    //       }
    //     }
    //   }, 1000);
    // };
    // var validatePass = (rule, value, callback) => {
    //   if (value === '') {
    //     callback(new Error('请输入密码'));
    //   } else {
    //     if (this.ruleForm.checkPass !== '') {
    //       this.$refs.ruleForm.validateField('checkPass');
    //     }
    //     callback();
    //   }
    // };
    // var validatePass2 = (rule, value, callback) => {
    //   // if (value === '') {
    //   //   callback(new Error('请再次输入密码'));
    //   // } else
    //     if (value !== this.ruleForm.pass) {
    //     callback(new Error('两次输入密码不一致!'));
    //   } else {
    //     callback();
    //   }
    // };
    return {
      xmm: 0,
      content: 1,
      text: '',
      // from:this.$store.state.user.form,
      ruleForm: {
        guid:JSON.parse(localStorage.user).user.guid,
        // temp:111,
        name: JSON.parse(localStorage.user).user.name,//昵称
        // age: JSON.parse(localStorage.user).user.age,//年龄
        sex: JSON.parse(localStorage.user).user.sex,//性别
        phone: JSON.parse(localStorage.user).user.phone,//手机
        email: JSON.parse(localStorage.user).user.email,//邮箱
        birthday: JSON.parse(localStorage.user).user.birthday,//生日
        // marriage: JSON.parse(localStorage.user).user.marriage,//婚配
        // usedPass: '',//旧密码
        // pass: '',//新密码
        // checkPass: '',//确认密码
        address: JSON.parse(localStorage.user).user.address//住址
      },
      rules: {
        // pass: [
        //   {validator: validatePass, trigger: 'blur'}
        // ],
        name:[{ required: true, message: '请输入姓名', trigger: 'blur' }],
        phone:[
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { pattern: /^1[3-9]\d{9}$/,

            message: '手机号输入有误', trigger: 'blur'}
          ],
        // pass: [
        //   { pattern: '^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{6,12}$',
        //     message: '密码必须包含大小写字母和数字的组合，可以使用特殊字符，长度在6-12之间' }
        // ],
        // checkPass: [
        //   {validator: validatePass2, trigger: 'blur'}
        // ],
        // age: [
        //   {validator: checkAge, trigger: 'blur'}
        // ]
      }
    };
  },
  methods: {
    // xgmm(){
    //   console.log(q.value)
    //   this.content = q.value
    //   console.log(this.content)
    // },
    // mm(e) {
    //   this.xmm++
    //   console.log(this.ruleForm)
    //   console.log(this.text)
    // },
    // xiugaipass() {
    //   if (this.text.length >= 3) {
    //     console.log(1)
    //     alert('修改成功！！！')
    //     this.$router.push('/')
    //   } else {
    //     alert('密码必须是三位或三位以上')
    //   }
    //   console.log(this.ruleForm)
    // },
    // logout: async function () {
    //   await this.$store.dispatch('user/logout')
    //   this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    // },
    submitForm(formName) {
      // console.log(this.$store.state.name)//, JSON.parse(localStorage.user)
      // let then = this
        console.log(this.ruleForm)
      this.$refs[formName].validate((valid) => {//validate()表单验证检验表单是否符合规范
        if (valid) {

          this.$store.dispatch('user/password', this.ruleForm ).then( res => {
            console.log(this.ruleForm)
            // this.$router.go(0);
            console.log(res)
            this.$store.dispatch('user/getInfo')
            Message({
              message: `修改成功`,
              type: 'success',
              duration: 5 * 1000,
            })
          }).catch( err => {
            console.log(err)
          })
          // $api.request({
          //   url:'/user/updateuserinfobyguid',//https://www.apiopen.top/meituApi?page=1
          //   // url:'https://api.apiopen.top/musicDetails?id=604392760',
          //   data: this.ruleForm
          // }).then(res=>{
          //   console.log(res)
          // }).catch(err=>{
          //   console.log(err)
          // })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.$router.go(-1)
    }

  }

}
</script>

<style scoped>
/*>>>.el-input{*/
/*  width: 60%;*/
/*  margin-bottom: 30px;*/

/*}*/
.inputdiv {
  width: 480px;
  margin: 30px auto;
}
.inputDiv{
  width: 680px;
  margin: 30px auto;
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
