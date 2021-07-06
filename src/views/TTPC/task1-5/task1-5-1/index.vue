<template>
  <div>
    <div>
      <el-collapse class="sstj" v-model="activeNames">
        <el-collapse-item>
          <span class="sstitle" slot="title">
            搜索条件
          </span>
          <el-form @keyup.enter.native="fromShow" ref="from" :inline="true" :model="from" class="demo-form-inline">

            <el-form-item prop="day">
              <el-date-picker
                style="margin-right: 10px;"
                @change="time"
                value-format="yyyy-MM-dd HH:mm:ss"
                size="small"
                class="shou"
                :editable='false'
                v-model="from.day"
                type="datetimerange"
                range-separator="~"
                start-placeholder="操作开始时间"
                end-placeholder="操作结束时间">
              </el-date-picker><!-- 开始结束时间 -->
            </el-form-item><!-- 开始结束时间 -->
            <el-form-item style="width: 250px" prop="batchNums">
              <el-select  style="margin-right: 10px; width: 100%;" size="small" v-model="from.batchNums" collapse-tags multiple placeholder="请选择外呼批次">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item><!-- 选择外呼批次 -->

            <el-form-item>
              <div class="buttonDiv">
                <el-button style="margin-right: 10px;" size="small" @click="fromShow" type="primary" icon="el-icon-search">搜索</el-button>
                <el-button size="small" @click="fromClear('from')" type="info">清空<i class="el-icon-delete el-icon--right"></i></el-button>
              </div>
            </el-form-item><!-- 提交按钮 -->
          </el-form>
        </el-collapse-item>
      </el-collapse>
    </div>
    <!--   外呼批次   -->
    <div class="gdt">
      <div class="table" v-loading="loading">
        <!--         height="calc(100vh - 120px)"-->
        <el-table
          height="calc(100vh - 120px)"
          :data="tableData"
          border
          size="mini"
          style="width: 100%">
          <!--          <el-table-column-->
          <!--            header-align="center"-->
          <!--            align="center"-->
          <!--            type="selection"-->
          <!--            width="45">-->
          <!--          </el-table-column>-->
          <el-table-column
            prop="batchNum"
            label="批次号"
            header-align="center"
            align="center"
            min-width="150">
          </el-table-column>
          <el-table-column
            prop="depict"
            label="批次描述"
            header-align="center"
            align="center"
            min-width="150">
          </el-table-column>
          <el-table-column
            prop="total"
            label="数据总数量"
            header-align="center"
            align="center"
            min-width="100">
          </el-table-column>
          <el-table-column
            prop="hangUpNormally"
            header-align="center"
            align="center"
            label="应答"
            min-width="80">
          </el-table-column>
          <el-table-column
            prop="hangUpNormallyRate"
            header-align="center"
            align="center"
            label="应答率"
            min-width="80">
          </el-table-column>

          <el-table-column
            prop="connected"
            header-align="center"
            align="center"
            label="接通量"
            min-width="80">
          </el-table-column>
          <el-table-column
            prop="connectedRate"
            header-align="center"
            align="center"
            label="接通率"
            min-width="80">
          </el-table-column>

          <el-table-column
            prop="hangUpUnhandled"
            header-align="center"
            align="center"
            label="排队未接"
            min-width="80">
          </el-table-column>
          <el-table-column
            prop="hangUpUnhandledRate"
            header-align="center"
            align="center"
            label="排队未接率"
            min-width="100">
          </el-table-column>
          <el-table-column
            prop="missed"
            header-align="center"
            align="center"
            label="未接"
            min-width="80">
          </el-table-column>
          <el-table-column
            prop="missedRate"
            header-align="center"
            align="center"
            label="未接率"
            min-width="80">
          </el-table-column>
          <el-table-column
            prop="shutdownBusyShutdown"
            header-align="center"
            align="center"
            label="停机/占线/关机"
            min-width="110">
          </el-table-column>
          <el-table-column
            prop="shutdownBusyShutdownRate"
            header-align="center"
            align="center"
            label="停机/占线/关机率"
            min-width="120">
          </el-table-column>
          <el-table-column
            prop="emptyNumber"
            header-align="center"
            align="center"
            label="空号"
            min-width="80">
          </el-table-column>
          <el-table-column
            prop="emptyNumberRate"
            header-align="center"
            align="center"
            label="空号率"
            min-width="80">
          </el-table-column>
          <el-table-column
            prop="success"
            header-align="center"
            align="center"
            label="成功下单"
            min-width="80">
          </el-table-column>
          <el-table-column
            prop="successRate"
            header-align="center"
            align="center"
            label="成功下单率"
            min-width="100">
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
</template>

<script>
import axios from "axios";
import {login} from "@/api/user";
import {Message} from "element-ui";

export default {
  name: "index",
  data(){
    return{
      tableData: [],//表格数据
      //value:true,
      baseURL:this.$store.state.baseURL,

      loading:false,//表格加载
      options:[],//多选数据
      activeNames: [],//是否显示搜索条件
      from:{
        day:[],//时间
        batchNums:[],//多选数组
        operateTime:'',
        operateTime2:'',
        current: 1,
        size: 50,
      },
      //guids:[],
      total: 0,//分页总条数
    }
  },
  methods:{
    //数据列表
    allList(){
      this.loading = true
      axios({
        method: 'post',
        url: `${this.baseURL}/hetao/outboundlisthetao/gettheproportionofoutboundcalls/${this.from.size}/${this.from.current}`,
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          'token': localStorage.token,
        },
        data : this.from
      }).then(res => {
        console.log(res.data.data.dataList)
        this.total = res.data.data.total
        this.current = res.data.data.currentPage
        this.size = res.data.data.pageSize

        for (let i = 0; i < res.data.data.dataList.length; i++) {
          //接通量
          res.data.data.dataList[i].connected =  res.data.data.dataList[i].hangUpNormally + res.data.data.dataList[i].hangUpUnhandled
          res.data.data.dataList[i].connectedRate =  (res.data.data.dataList[i].connected/res.data.data.dataList[i].total*100).toFixed(2)
          for (let a in res.data.data.dataList[i]) {
            //console.log(a.slice(-4))
            if(a.slice(-4) == 'Rate'){
              res.data.data.dataList[i][a] = res.data.data.dataList[i][a] + '%'
            }
          }
        }

        this.tableData = res.data.data.dataList
        this.loading = false
      }).catch(err => {
        console.log(err)
        this.loading = false
      })
    },
    //搜索按钮
    fromShow() {
      console.log(this.from)
      this.allList()
    },
    //清空表单
    fromClear(from) {
      this.$refs[from].resetFields()
      this.from.operateTime =""
      this.from.operateTime2 = ""
    },
    //当复选框状态改变时获取复选框的值
    // handleSelectionChange(val) {
    //   console.log(val)
    //   //this.multipleSelection = val;
    //   this.from.batchNums = []
    //   for (let a = 0; a < val.length; a++){
    //     this.from.batchNums.push(`${val[a].batchNum}`)
    //   }
    //   console.log(this.from.batchNums)
    // },
    //分页 页数改变钩子
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.from.current = val
      console.log(this.from);
      this.allList()
    },
    //分页 条数改变钩子
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.from.size = val
      this.allList()
    },
    //操作开始结束时间
    time(val){
      if(val == null){
        val = []
        this.from.operateTime =""
        this.from.operateTime2 = ""
      }else {
        this.from.operateTime = val[0]
        this.from.operateTime2 = val[1]
      }
      console.log(val)
      console.log(this.from)
    },
    //获取批次号
    batchNumber(){
      axios({
        method: 'post',
        url: `${this.baseURL}/hetao/outboundlisthetao/getallbatchnumbers`,
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          'token': localStorage.token,
        },
      }).then(res => {
        console.log(res.data.data.dataList)
        this.options = []
        for (let i = 0; i < res.data.data.dataList.length; i++) {
          let obj = {}
          obj.value = res.data.data.dataList[i]
          obj.label = res.data.data.dataList[i]
          this.options.push(obj)
        }

      }).catch(err => {
        console.log(err)
      })
    },
    //部门号
    branch(data){
      axios({
        method: 'get',
        url: `${this.baseURL}/user/lockdepartment/${data}`,
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          'token': localStorage.token,
        },
      }).then(res=>{
        console.log(res)
      }).catch(err=>{
        console.log(err)
      })
    },
  },
  created() {
    this.branch(1)
    this.allList()
    this.batchNumber()
  }
}
</script>

<style scoped>
/*搜索框下边距*/
>>>.el-collapse-item__content{
  padding-bottom: 5px;
}

/*搜索项*/
>>>.el-form-item{
  margin-bottom: 0;
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
/*>>>.el-input__inner{*/
/*  !*border: none;*!*/
/*  text-indent: 50%;*/
/*}*/
.gdt {
  width: 98%;
  /*height: 400px;*/
  /*border: 1px solid red;*/
  margin: 0 auto;
  white-space: nowrap;
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
/* dlg 外边距 */
>>>.dialogbig{
  margin-top:7vh !important;
  /*margin-left: 1vw;*/
  /*margin-right: 1vw;*/
  width: 80%;
  height: 80vh;
}
.fywDiv {
  width: 100%;
  display: flex;
  justify-content: flex-end;
}
</style>
