<template>
  <div>
    <div>
      <div>
        <el-collapse class="sstj" v-model="activeNames">
          <el-collapse-item>
          <span class="sstitle" slot="title">
            搜索条件
          </span>
            <el-form @keyup.enter.native="fromShow" ref="from" :inline="true" :model="from" class="demo-form-inline">
              <el-form-item  style="display: block">
                <div class="buttonDiv">
                  <el-button class="mrr" @click="exportFile"  size="small" type="success">导出数据</el-button>
                </div>
              </el-form-item><!-- 提交按钮 -->
              <el-form-item prop="day">
                <el-date-picker
                  @change="time"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  size="small"
                  class="shou"
                  :editable='false'
                  v-model="from.day"
                  type="datetimerange"
                  range-separator="~"
                  start-placeholder="呼叫开始时间"
                  end-placeholder="呼叫结束时间">
                </el-date-picker><!-- 开始结束时间 -->
              </el-form-item><!-- 操作开始结束时间 -->
              <el-form-item prop="day2">
                <el-date-picker
                  @change="time2"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  size="small"
                  class="shou"
                  :editable='false'
                  v-model="from.day2"
                  type="datetimerange"
                  range-separator="~"
                  start-placeholder="创建开始时间"
                  end-placeholder="创建结束时间">
                </el-date-picker><!-- 开始结束时间 -->
              </el-form-item><!-- 创建开始结束时间 -->
              <el-form-item prop="guid">
                <el-input
                  size="small"
                  placeholder="数据编号"
                  v-model="from.guid">
                  <i slot="prefix" class="el-input__icon el-icon-search"></i>
                </el-input>
              </el-form-item><!-- 数据编号 -->
              <el-form-item prop="jobNumber">
                <el-input
                  size="small"
                  placeholder="工号"
                  v-model="from.jobNumber">
                  <i slot="prefix" class="el-input__icon el-icon-search"></i>
                </el-input>
              </el-form-item><!-- 工号 -->
              <el-form-item prop="status">
                <el-input
                  size="small"
                  placeholder="工单状态"
                  v-model="from.status">
                  <i slot="prefix" class="el-input__icon el-icon-search"></i>
                </el-input>
<!--                <el-cascader-->
<!--                  size="mini"-->
<!--                  @change="stateSwitching2"-->
<!--                  placeholder="业务状态"-->
<!--                  v-model="from.status"-->
<!--                  :options="options4"-->
<!--                  :props="{ expandTrigger: 'click' ,checkStrictly: true }"-->
<!--                ></el-cascader>-->
              </el-form-item><!-- 工单状态 -->
              <el-form-item prop="batchNum">
                <el-input
                  size="small"
                  placeholder="批次号"
                  v-model="from.batchNum">
                  <i slot="prefix" class="el-input__icon el-icon-search"></i>
                </el-input>
              </el-form-item><!-- 批次号 -->
              <el-form-item prop="phone">
                <el-input
                  size="small"
                  placeholder="联系电话"
                  v-model="from.phone">
                  <i slot="prefix" class="el-input__icon el-icon-search"></i>
                </el-input>
              </el-form-item><!-- 联系电话 -->
              <el-form-item prop="handled">
<!--                <el-input-->
<!--                  size="small"-->
<!--                  placeholder="外呼结果"-->
<!--                  v-model="from.handled">-->
<!--                  <i slot="prefix" class="el-input__icon el-icon-search"></i>-->
<!--                </el-input>-->

                <el-select size="small" v-model="from.handled" placeholder="请选择">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item><!-- 外呼结果 -->
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
      <div class="gdt">
        <div class="table">
          <el-table
            size="mini"
            stripe
            height="calc(100vh - 120px)"
            border
            :data="tableData">
            <el-table-column
              prop="guid"
              label="数据编号"
              header-align="center"
              align="center"
              min-width="90">
            </el-table-column>
            <el-table-column
              prop="createTime"
              label="创建时间"
              header-align="center"
              align="center"
              min-width="180">
            </el-table-column>
            <el-table-column
              prop="operateTime"
              label="呼叫时间"
              header-align="center"
              align="center"
              min-width="180">
            </el-table-column>
            <el-table-column
              prop="batchNum"
              label="批次号"
              header-align="center"
              align="center"
              min-width="180">
            </el-table-column>
            <el-table-column
              prop="jobNumber"
              label="工号"
              header-align="center"
              align="center"
              min-width="130">
            </el-table-column>
            <el-table-column
              prop="phone"
              label="手机号"
              header-align="center"
              align="center"
              min-width="130">
            </el-table-column>
            <el-table-column
              prop="status"
              label="外呼状态"
              header-align="center"
              align="center"
              min-width="130">
            </el-table-column>
            <el-table-column
              prop="handled"
              label="外呼结果"
              header-align="center"
              align="center"
              min-width="130">
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
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "index",
  data(){
    return{
      baseURL:this.$store.state.baseURL,
      from:{
        current:1,//页
        size:50,//条数
        createTime:'',//创建时间
        createTime2:'',//创建时间
        operateTime:'',//呼叫时间
        operateTime2:'',//呼叫时间
        guid:'',//主键
        phone:'',//手机号
        status:'',//状态
        batchNum:'',//批次号
        jobNumber:'',//工号
        handled:'',//是否已呼叫
      },
      tableData:[],//表格数据
      activeNames: [],//是否显示搜索条件
      total:0,//分页总条数
      options:[
        {
          value: true,
          label: '已呼叫'
        },{
          value: false,
          label: '未呼叫'
        },
      ]
    }
  },
  methods:{
    dataList(){
      axios({
        method: 'post',
        url: `${this.baseURL}/hetao/outboundlisthetao/getdatabycondition`,
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          'token': localStorage.token,
        },
        data:this.from
      }).then(res => {
        console.log(res)
        for (let i = 0; i < res.data.data.dataList.length; i++) {
          if(res.data.data.dataList[i].handled){
            res.data.data.dataList[i].handled = '已呼叫'
          }else {
            res.data.data.dataList[i].handled = '未呼叫'
          }
        }
        this.tableData = res.data.data.dataList
        this.total = res.data.data.total
        // this.loading = false
      }).catch(err => {
        console.log(err)
        //this.loading = false
      })
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
    //创建开始结束时间
    time2(val){
      if(val == null){
        val = []
        this.from.createTime =""
        this.from.createTime2 = ""
      }else {
        this.from.createTime = val[0]
        this.from.createTime2 = val[1]
      }
      console.log(val)
      console.log(this.from)
    },
    //搜索按钮
    fromShow() {
      console.log(this.from)
      this.dataList(this.from)
    },
    //清空表单
    fromClear(from) {
      this.$refs[from].resetFields()
      this.from.operateTime = ''//操作开始时间
      this.from.operateTime2 = ''//操作结束时间
      this.from.createTime = ''//创建开始时间
      this.from.createTime2 = ''//创建结束时间
      this.from.status = ''
    },
    //分页 页数改变钩子
    handleCurrentChange(val){
      console.log(`当前页: ${val}`);
      this.from.current = val
      console.log(this.from);
      this.dataList(this.from)
    },
    //分页 条数改变钩子
    handleSizeChange(val){
      console.log(`每页 ${val} 条`);
      this.from.size = val
      this.dataList(this.from)
    },
    //导出数据
    exportFile(){
      console.log(this.from)
      this.loading = true;
      axios({
        method: 'post',
        url: this.baseURL + '/hetao/outboundlisthetao/exportdatabycondition',
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          'token': localStorage.token,
        },
        responseType: "blob",
        data:this.from
      })
        .then(res => {
          this.loading = false;
          console.log(res)
          if (res.data.type) {
            // 文件下载
            let contentDisposition = res.headers['content-disposition'];
            let fileName = window.decodeURI(contentDisposition.substring(contentDisposition.indexOf('=')+1));
            const blob = new Blob([res.data], {
              type: "application/vnd.ms-excel"
            });
            let link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.setAttribute('download', fileName);
            link.click();
            link = null;
            this.$message.success('导出成功');
          } else {
            // 返回json
            this.$message.warning(res.data.msg);
          }
        })
        .catch(err => {
          this.loading = false;
          this.$message.error("下载失败");
        });
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
    this.branch(4)
    this.dataList()
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
/*时间手*/
.shou {
  cursor: pointer;
  margin: 3px;
}

.gdt {
  width: 98%;
  /*height: 400px;*/
  /*border: 1px solid red;*/
  margin: 0 auto;
  white-space: nowrap;
}

.table {
  /*height: calc(80vh - 100px);*/
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
.fywDiv{
  width: 100%;
  display: flex;
  justify-content: flex-end;
}
</style>
