<template>

  <div style="width: 50%;">
    <!--    添加角色-->
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="用户名">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
<!--      <el-form-item label="密码">-->
<!--        <el-input v-model="form.password"></el-input>-->
<!--      </el-form-item>-->
      <el-form-item label="部门-角色">
        <el-select @change="branch" v-model="branchValue" placeholder="请选择部门">
          <el-option
            v-for="item in options1"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
         -
        <el-select multiple collapse-tags @change="partVal" v-model="partValue" placeholder="请选择角色">
          <el-option
            v-for="item in options2"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="权限">
        <el-select style="width: 70%;" @change="purview" multiple collapse-tags v-model="purviewValue" placeholder="请选择权限">
          <el-option
            v-for="item in options3"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "index",
  data() {
    return {
      baseURL:this.$store.state.baseURL,
      form: {
        name: '',
        //password:'',
        branchGuid:'',//部门号
        roleGuids:[],//角色编号
        permissions:[],//权限编号
      },
      options1:[],
      branchValue:'',//部门

      options2:[],
      partValue:[],//角色
      options3:[],
      purviewValue:'',//权限
    }
  },
  methods: {
    onSubmit() {

      if(this.form.name !== '' && this.form.branchGuid !=='' && this.form.roleGuids.length >0){
        console.log('submit!',this.form);
        axios({
          method: 'post',
          url: `${this.baseURL}/user/register`,
          headers: {
            "Content-Type": "application/json;charset=UTF-8",
            'token': localStorage.token,
          },
          data:this.form
        }).then(res => {
          console.log(res)
        }).catch(err => {
          console.log(err)
        })
      }else {
        console.log('未填写完整')
      }
    },
    //获取部门
    departmentList(){
      axios({
        method: 'get',
        url: `${this.baseURL}/user/depart/getalldeparts`,
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          'token': localStorage.token,
        },
      }).then(res => {
        console.log(res.data.data.data)
        this.options1 = []
        for (let i = 0; i < res.data.data.data.length; i++) {
          let a = {}
          a.value = res.data.data.data[i].guid
          a.label = res.data.data.data[i].name
          this.options1.push(a)
        }
      }).catch(err => {
        console.log(err)
      })
    },
    //获取角色
    part(){
      axios({
        method: 'get',
        url: `${this.baseURL}/user/depart/getallrolesbydepartguid/${this.form.branchGuid}`,
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          'token': localStorage.token,
        },
      }).then(res => {
        console.log(res)
        this.options2 = []
        for (let i = 0; i < res.data.data.data.length; i++) {
          let a = {}
          a.value = res.data.data.data[i].guid
          a.label = res.data.data.data[i].roleDescribe
          this.options2.push(a)
        }
      }).catch(err => {
        console.log(err)
      })
    },
    //获取权限
    competence(){
      axios({
        method: 'get',
        url: `${this.baseURL}/user/permission/getallpermission`,
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          'token': localStorage.token,
        },
      }).then(res => {
        console.log(res)
        this.options3 = []
        for (let i = 0; i < res.data.data.data.length; i++) {
          let a = {}
          a.value = res.data.data.data[i].guid
          a.label = res.data.data.data[i].perDescribe
          this.options3.push(a)
        }
      }).catch(err => {
        console.log(err)
      })
    },

    //选择部门
    branch(val){
      this.form.branchGuid = val
      this.part()
    },
    partVal(val){
      console.log(val)
      this.form.roleGuids = val
    },
    purview(val){
      this.form. permissions = val
    }
  },
  created() {
    this.departmentList()
    //this.part()
    this.competence()
  }
}
</script>

<style scoped>

</style>
