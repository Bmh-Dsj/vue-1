<template>
  <div>
    <div>
      <div>
        <el-collapse class="sstj" v-model="activeNames">
          <el-collapse-item>
          <span class="sstitle" slot="title">
            搜索条件
            <!--            <i class="header-icon el-icon-info"></i>-->
          </span>
            <el-button style="margin-bottom: 10px;" size="mini" type="primary" @click="dialogFormVisible = true">添加</el-button>

            <el-button style="margin-bottom: 10px;" size="mini" type="danger" @click="strikeOut">删除数据</el-button>
            <el-form ref="from" :model="from" :inline="true" size="small" class="demo-form-inline">
              <el-form-item label="任务号" prop="taskId">
                <el-input v-model="from.taskId"></el-input>
              </el-form-item>
              <el-form-item label="来源渠道" prop="sourceChannel">
                <el-input v-model="from.sourceChannel"></el-input>
              </el-form-item>
              <el-form-item label="部门号" prop="departGuid">
                <el-select v-model="from.departGuid" placeholder="请选择">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="grabble">搜索</el-button>
                <el-button @click="empty">清空</el-button>
              </el-form-item>
            </el-form>


          </el-collapse-item>
        </el-collapse>
      </div>
      <div class="gdt">
        <div class="table" v-loading="loading">
          <el-table
            stripe
            height="calc(100vh - 120px)"
            size="mini"
            border
            ref="multipleTable"
            :data="tableData"
            tooltip-effect="dark"
            style="width: 100%"
            @selection-change="handleSelectionChange">
            <el-table-column
              header-align="center"
              align="center"
              type="selection"
              width="40">
            </el-table-column>
            <el-table-column
              :show-overflow-tooltip="true"
              header-align="center"
              align="center"
              prop="departGuid"
              label="部门号"
              min-width="50">
            </el-table-column>
            <el-table-column
              :show-overflow-tooltip="true"
              header-align="center"
              align="center"
              prop="departName"
              label="部门名"
              min-width="50">
            </el-table-column>
            <el-table-column
              :show-overflow-tooltip="true"
              header-align="center"
              align="center"
              prop="taskId"
              label="任务号"
              min-width="60">
            </el-table-column>

            <el-table-column
              :show-overflow-tooltip="true"
              header-align="center"
              align="center"
              prop="sourceChannel"
              label="来源渠道"
              min-width="80">
            </el-table-column>
          </el-table>
        </div>
        <div class="fywDiv">
          <div class="block">
            <!--        <span class="demonstration">显示总数</span>-->
            <!--         分页   -->
            <el-pagination
              background
              :pager-count="5"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="from.current"
              :page-sizes="[50,100, 200, 300, 400]"
              layout="sizes,total, prev, pager, next, jumper"
              :total="total">
            </el-pagination>
          </div>
        </div>
      </div>
    </div>


<!--   imei弹窗     -->
    <el-dialog title="imei" :visible.sync="dialogFormVisible">
      <div>
        <!--    imei码数据转入-->
        <div class="formDiv">
          <el-form ref="form" :rules="rules" :model="form" label-width="auto">
            <el-form-item style="margin-bottom: 20px;" label="任务号" prop="taskId"  class="item">
              <el-input v-model="form.taskId"></el-input>
            </el-form-item>
            <el-form-item style="margin-bottom: 20px;" label="来源渠道" prop="sourceChannel">
              <el-input v-model="form.sourceChannel"></el-input>
            </el-form-item>
            <el-form-item style="margin-bottom: 20px;" label="部门号" prop="departGuid">
              <el-select @change="Dname" v-model="form.departGuid" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">提交</el-button>
              <el-button @click="remove">取消</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
<!--      <div slot="footer" class="dialog-footer">-->
<!--        <el-button @click="dialogFormVisible = false">取 消</el-button>-->
<!--        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>-->
<!--      </div>-->
    </el-dialog>
  </div>

</template>

<script>
import axios from "axios";
import {Message} from "element-ui";

export default {
name: "index",
  data(){
    return{
      dialogFormVisible:false,
      activeNames: [],//是否显示搜索条件
      loading:false,//页面加载
      baseURL: this.$store.state.baseURL,
      form:{
        taskId:'',  // 任务号
        sourceChannel:'',  // 来源渠道
        departGuid:'',  // 部门号
        departName:'',//部门名
      },//表单
      options:[],//部门数组
      rules: {
        taskId: [
          { required: true, message: '请输入任务号', trigger: 'blur' },
        ],
        sourceChannel: [
          { required: true, message: '请输入来源渠道', trigger: 'blur' },
        ],
        departGuid: [
          { required: true, message: '请选择部门', trigger: 'blur' },
        ],
        depict: [
          { required: true, message: '请输入批次描述', trigger: 'blur' },
        ],
      },//表单验证
      tableData:[],//
      from:{
        sourceChannel:'',  // 来源渠道
        taskId:'',  // 任务号
        departGuid:'',//部门号
        size: 50,//个数
        current:1,//页数
      },//搜索表单
      total:0,//分页总条数
      guids:[],//

      // mappingData:[],//映射表格数据
      // mappingFrom:{
      //   taskId:'', //任务号
      //   departGuid:'', //部门号
      //   departName:'', //部门名
      //   sourceChannel:'',//来源渠道
      //   size:50,//
      //   current: 1,//
      // },//映射表格 搜索表单
      // total2:0,//分页总条数
    }
  },
  methods:{
    //查询所有数据
    tableList(data){
      this.loading = true
      //   /imeitask/business/getalldatabyconditition
      axios({
        method: 'post',
        url: `${this.baseURL}/imeitask/business/getalldatabyconditition`,
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          'token': localStorage.token,
        },
        data:data
      }).then(res => {
        console.log(res.data.data.dataList)
        this.tableData = res.data.data.dataList
        this.total = res.data.data.total
        this.loading = false
      }).catch(err=>{
        this.loading = false
        console.log(err)
      })
    },
    //搜索表单
    grabble(){
      this.tableList(this.from)
    },
    //清除表单
    empty(){
      this.$refs['from'].resetFields();
    },
    //部门号
    Dname(val){
      console.log(val)
      for (let i = 0; i < this.options.length; i++) {
        if(this.options[i].value === val){
          this.form.departName = this.options[i].label
        }
      }
      console.log(this.form)
    },

    //所有部门 数据
    list(){
      axios({
        method: 'get',
        url: `${this.baseURL}/user/depart/getallbusinessdeparts`,
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          'token': localStorage.token,
        },
      }).then(res => {
        console.log(res)
        // res.data.data.data

        for (let i = 0; i < res.data.data.data.length; i++) {
          let a = {}
          a.label = res.data.data.data[i].name
          a.value = res.data.data.data[i].guid
          this.options.push(a)
        }
        console.log(this.options)
      }).catch(err=>{
        console.log(err)
      })
    },
    //开始结束时间 选择
    time(val){
      if(val == null){
        val = []
        this.form.beginTime =""
        this.form.overTime = ""
        this.form.timeValue = []
      }else {
        this.form.beginTime = val[0]
        this.form.overTime = val[1]
      }
      console.log(val)
      console.log(this.form)
    },
    //提交表单 添加 验证
    onSubmit(){
      this.$refs['form'].validate((valid) => {
        if (valid) {
          console.log(this.form)
          axios({
            method: 'post',
            // url:`${this.baseURL}/record/handle/getdetailbydepartguidanddatedesignatdepartment`,
            url: `${this.baseURL}/imeitask/business/adddata`,
            headers: {
              "Content-Type": "application/json;charset=UTF-8",
              'token': localStorage.token,
            },
            data:this.form
          }).then(res => {
            console.log(res)
            this.tableList(this.from)
            this.remove()
            Message({
              message:res.data.message,
              type:"success",
              duration:5*1000
            })
          }).catch(err=>{
            console.log(err)
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    //清空表单
    remove(){
      this.$refs['form'].resetFields();
      this.form.departName = ''
      this.time(null)
      this.dialogFormVisible = false
    },
    //当复选框状态改变时获取复选框的值
    handleSelectionChange(val) {
      console.log(val)
      this.multipleSelection = val;
      this.guids = []
      for (let a = 0; a < val.length; a++){
        this.guids.push(`${val[a].guid}`)
      }
      console.log(this.guids)
    },
    //删除
    strikeOut(){
      axios({
        method: 'post',
        url: `${this.baseURL}/imeitask/business/deletedata`,
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          'token': localStorage.token,
        },
        data:this.guids
      }).then(res => {
        console.log(res)
        this.tableList(this.from)
        Message({
          message:res.data.message,
          type:"success",
          duration:5*1000
        })
      }).catch(err=>{
        console.log(err)
      })
    },

    //get请求数据拼接转换
    query(data) {
      if (data) {
        let str = '?'
        for (let x in data) {
          str += `${x}=${data[x]}&`
        }
        return str.slice(0, -1)
      } else return
    },
    //分页 页数改变钩子
    handleCurrentChange(val){
      console.log(`当前页: ${val}`);
      this.from.current = val
      console.log(this.from);
      this.tableList(this.from)
    },

    //分页 条数改变钩子
    handleSizeChange(val){
      console.log(`每页 ${val} 条`);
      this.from.size = val
      this.tableList(this.from)
    },

    // //映射表格数据
    // mappingTable(data){
    //   //
    //   axios({
    //     method: 'post',
    //     url: `${this.baseURL}/imeitask/business/getalldatabyconditition`,
    //     headers: {
    //       "Content-Type": "application/json;charset=UTF-8",
    //       'token': localStorage.token,
    //     },
    //     data:data
    //   }).then(res => {
    //     console.log(res)
    //     this.mappingData = res.data.data.dataList
    //     // this.tableList(this.from)
    //   }).catch(err=>{
    //     console.log(err)
    //   })
    // },
  },
  created() {
    this.list()
    this.tableList(this.from)
  }
}
</script>

<style scoped>
.formDiv{
  width: 100%;
  padding: 20px;

}
>>>.el-dialog__body{
  padding:0;
}

.item .el-form-item__label{
  color: red;
}
>>>.el-form-item{
  margin-bottom: 0;
}
/*搜索框下边距*/
>>>.el-collapse-item__content{
  padding-bottom: 5px;
}
/*搜索框高度*/
>>>.el-collapse-item__header{
  height: 40px;
}
/*搜索框标题*/
.sstitle {
  font-size: 16px;
  font-weight: 900;
}
/*搜索框左边距*/
.sstj {
  padding-left: 30px;
}
.fywDiv{
  width: 100%;
  display: flex;
  justify-content: flex-end;
}
.gdt {
  width: 98%;
  /*height: 400px;*/
  /*border: 1px solid red;*/
  margin: 0 auto;
  white-space: nowrap;
}
.table {
  height: 100%;
}
.gdt ::-webkit-scrollbar {
  /* 设置竖向滚动条的宽度 */
  width: 7px;
  /* 设置横向滚动条的高度 */
  height: 7px;
}
.gdt ::-webkit-scrollbar-thumb {
  /*滚动条的背景色*/
  background-color: rgba(144, 147, 153, .3);
  border-radius: 35px;
  position: relative;
}
</style>
