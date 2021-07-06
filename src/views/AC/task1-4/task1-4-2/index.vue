<template>
  <div>
    <div>
      <el-collapse class="sstj" v-model="activeNames">
        <el-collapse-item>
          <span class="sstitle" slot="title">
            搜索条件
            <!--            <i class="header-icon el-icon-info"></i>-->
          </span>
          <el-form ref="from" :inline="true" :model="from" class="demo-form-inline">
            <div>
              <el-button size="small" @click="exportTab1" type="primary">导出通话记录</el-button>
            </div>
            <el-form-item prop="callTime">
              <el-date-picker
                @change="time"
                value-format="yyyy-MM-dd HH:mm:ss"
                size="small"
                class="shou"
                :editable='false'
                v-model="from.callTime"
                type="datetimerange"
                range-separator="~"
                start-placeholder="呼叫开始时间"
                end-placeholder="呼叫结束时间">
              </el-date-picker><!-- 开始结束时间 -->
            </el-form-item><!-- 呼叫开始结束时间 -->
            <el-form-item prop="jobNumber">
              <el-input
                size="small"
                placeholder="主叫号码"
                v-model="from.jobNumber">
                <i slot="prefix" class="el-input__icon el-icon-search"></i>
              </el-input>
            </el-form-item><!-- 主叫号码 -->
            <el-form-item prop="phoneNumber">
              <el-input
                size="small"
                placeholder="被叫号码"
                v-model="from.phoneNumber">
                <i slot="prefix" class="el-input__icon el-icon-search"></i>
              </el-input>
            </el-form-item><!-- 被叫号码 -->

            <el-form-item prop="hangupCause">
              <el-input
                size="small"
                placeholder="挂断原因"
                v-model="from.hangupCause">
                <i slot="prefix" class="el-input__icon el-icon-search"></i>
              </el-input>
            </el-form-item><!-- 挂断原因 -->
            <!--            <el-form-item prop="billsec1">-->
            <!--              <el-input-->
            <!--                size="small"-->
            <!--                placeholder="通话最小时长"-->
            <!--                @change="timeConversion"-->
            <!--                v-model.number="from.billsec1">-->
            <!--                <i slot="prefix" class="el-input__icon el-icon-search"></i>-->
            <!--              </el-input>-->
            <!--            </el-form-item>&lt;!&ndash; 通话最小时长&ndash;&gt;-->
            <!--            <el-form-item prop="billsec2">-->
            <!--              <el-input-->
            <!--                size="small"-->
            <!--                placeholder="通话最大时长"-->
            <!--                @change="timeConversion2"-->
            <!--                v-model.number="from.billsec2">-->
            <!--                <i slot="prefix" class="el-input__icon el-icon-search"></i>-->
            <!--              </el-input>-->
            <!--            </el-form-item>&lt;!&ndash; 通话最大时长&ndash;&gt;-->
            <el-form-item>
              <div class="buttonDiv">
                <el-button size="small" @click="fromShow" type="primary" icon="el-icon-search">搜索</el-button>
                <el-button size="small" @click="fromClear('from')" type="info">清空<i class="el-icon-delete el-icon--right"></i></el-button>
              </div>
            </el-form-item><!-- 提交按钮 -->
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
        >
          <el-table-column
            :show-overflow-tooltip="true"
            header-align="center"
            align="center"
            prop="jobNumber"
            label="工号"
            min-width="50">
          </el-table-column>
          <el-table-column
            :show-overflow-tooltip="true"
            header-align="center"
            align="center"
            prop="phoneNumber"
            label="手机号"
            min-width="60">
          </el-table-column>

          <el-table-column
            :show-overflow-tooltip="true"
            header-align="center"
            align="center"
            prop="startTime"
            label="开始时间"
            min-width="80">
          </el-table-column>
          <el-table-column
            :show-overflow-tooltip="true"
            header-align="center"
            align="center"
            prop="costomerAnswerTime"
            label="客户应答时间"
            min-width="80">
          </el-table-column>
          <el-table-column
            :show-overflow-tooltip="true"
            header-align="center"
            align="center"
            prop="seatAnswerTime"
            label="坐席应答时间"
            min-width="80">
          </el-table-column>
          <el-table-column
            :show-overflow-tooltip="true"
            header-align="center"
            align="center"
            prop="bridgeTime"
            label="桥接时间"
            min-width="80">
          </el-table-column>
          <el-table-column
            :show-overflow-tooltip="true"
            header-align="center"
            align="center"
            prop="endTime"
            label="挂断时间"
            min-width="80">
          </el-table-column>
          <el-table-column
            :show-overflow-tooltip="true"
            header-align="center"
            align="center"
            prop="uduration"
            label="呼叫持续时长(秒)"
            min-width="60">
          </el-table-column>
          <el-table-column
            :show-overflow-tooltip="true"
            header-align="center"
            align="center"
            prop="billsec"
            label="通话时长(秒)"
            min-width="60">
          </el-table-column>
          <!--          <el-table-column-->
          <!--            :show-overflow-tooltip="true"-->
          <!--            header-align="center"-->
          <!--            align="center"-->
          <!--            prop="gateWay"-->
          <!--            label="网关"-->
          <!--            min-width="40">-->
          <!--          </el-table-column>-->
          <!--          <el-table-column-->
          <!--            :show-overflow-tooltip="true"-->
          <!--            header-align="center"-->
          <!--            align="center"-->
          <!--            prop="phoneBill"-->
          <!--            label="话费(元)"-->
          <!--            min-width="40">-->
          <!--          </el-table-column>-->
          <el-table-column
            :show-overflow-tooltip="true"
            header-align="center"
            align="center"
            prop="hangupCause"
            label="挂断原因"
            min-width="95">
          </el-table-column>
          <el-table-column
            :show-overflow-tooltip="true"
            header-align="center"
            align="center"
            prop="callType"
            label="拨号方式"
            min-width="60">
          </el-table-column>


          <!--          <el-table-column-->
          <!--            :show-overflow-tooltip="true"-->
          <!--            header-align="center"-->
          <!--            prop="seatNote"-->
          <!--            label="备注"-->
          <!--            min-width="100">-->
          <!--          </el-table-column>-->
          <!--          <el-table-column :show-overflow-tooltip="true" header-align="center" prop="queryResultInvite" min-width="120">-->
          <!--            <template slot="header" slot-scope="scope">-->
          <!--              &lt;!&ndash;                <el-tooltip class="item" effect="dark" content="天天拍车邀约结果" placement="left">&ndash;&gt;-->
          <!--              <span class="spot">天天拍车邀约结果</span>-->
          <!--              &lt;!&ndash;                </el-tooltip>&ndash;&gt;-->
          <!--            </template>-->
          <!--          </el-table-column>-->
          <!--          <el-table-column-->
          <!--            header-align="center"-->
          <!--            align="center"-->
          <!--            prop="address"-->
          <!--            label="操作记录"-->
          <!--            show-overflow-tooltip>-->
          <!--            <template slot-scope="scope">-->
          <!--              <el-button @click="record(scope.row)" type="primary"-->
          <!--                         size="mini">查看-->
          <!--              </el-button>-->
          <!--            </template>-->
          <!--          </el-table-column>-->
          <!--          <el-table-column-->
          <!--            header-align="center"-->
          <!--            align="center"-->
          <!--            prop="address"-->
          <!--            label="查看报名结果"-->
          <!--            current-row-key="31313513"-->
          <!--            min-width="100"-->
          <!--            show-overflow-tooltip>-->
          <!--            <template slot-scope="scope">-->
          <!--              <el-button type="primary" @click="handleEdit(scope.row)"-->
          <!--                         size="mini">查看-->
          <!--              </el-button>-->
          <!--            </template>-->
          <!--          </el-table-column>-->
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
import {Message} from "element-ui";
export default {
  name: "index",
  data() {
    return {
      recordDialog:false,
      dlgLoading:false,
      dialog:false,
      baseURL:this.$store.state.baseURL,
      loading:false,//表格加载
      activeNames: [],//是否显示搜索条件
      from:{
        // guid: '',//数据编号
        callTime:[],//呼叫开始结束时间
        // startStamp:'',//呼叫开始时间
        // startStamp2:'',//呼叫结束时间
        startTime:'',////呼叫开始时间
        startTime2:'',//呼叫结束时间
        jobNumber:'',//工号
        phoneNumber:'',//手机号
        hangupCause:'',//挂断原因
        callType:'',//拨号方式

        callerIdNumber:'',//主叫号码
        destinationNumber:'',//被叫号码
        //startStamp:'',//呼叫开始时间
        answerStamp:'',//接听时间
        endStamp:'',//呼叫结束时间
        uduration:'',//总呼叫时长
        billsec: '',//接通时长
        //hangupCause:'',//挂断原因
        billsec1:'',//通话时长小
        billsec2:'',//通话时长大

        size: 50,//个数
        current:1,//页数
      },//搜索表单
      headers:{
        // "Content-Type": "multipart/form-data",
        'token': localStorage.token
      },//请求头
      fileList:[],//上传的文件列表
      total:0,//分页总条数
      tableData:[],//表格数据
      multipleSelection: [],//复选框值
      recordLog:{},//操作记录
    }
  },
  methods: {
    //搜索按钮
    fromShow() {
      console.log(this.from)
      this.dataList(this.from)
    },

    //清空表单
    fromClear(from) {
      this.$refs[from].resetFields()
      this.from.startTime = ''
      this.from.startTime2 = ''
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

    //获取所有数据
    dataList(data){
      this.loading = true
      // this.$store.dispatch('user/htgongdlist',data).then(res=>{
      //   this.tableData = res.data.data.dataList
      //   this.total = res.data.data.total
      //   console.log(res)
      //   this.loading = false
      // }).catch(err=>{
      //   console.log(err)
      //   this.loading = false
      // })

      axios({
        method: 'put',
        url: this.baseURL + '/phonebills/calllog/findcalllogbydepartguid',
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          'token': localStorage.token,
        },
        data:data
      }).then(res=>{
        //Math.ceil()  向上取整  Math.round() 四舍五入 Math.floor() 向下取整
        // for(let i = 0 ; i < res.data.data.dataList.length; i++){
        //   res.data.data.dataList[i].uduration = Math.round(Math.round(res.data.data.dataList[i].uduration)/(1000000)) + ' s'
        //   res.data.data.dataList[i].billsec = res.data.data.dataList[i].billsec + ' s'
        //   res.data.data.dataList[i].ringingTime = res.data.data.dataList[i].ringingTime + ' s'
        // }
        for (let i = 0; i < res.data.data.dataList.length; i++) {
          if(res.data.data.dataList[i].callType == 'auto'){
            res.data.data.dataList[i].callType = '自动'
          }else if(res.data.data.dataList[i].callType == 'manual'){
            res.data.data.dataList[i].callType = '手拨'
          }
        }
        this.tableData = res.data.data.dataList
        this.total = res.data.data.total
        console.log(res)
        this.loading = false
      }).catch(err=>{
        console.log(err)
        this.loading = false
      })
    },

    //time 呼叫时间转换
    time(val){
      // if(this.from.callTime.length > 0){
      //   this.from.startStamp = this.from.callTime[0]
      //   this.from.startStamp2 = this.from.callTime[1]
      // }else {
      //   this.from.callTime = []
      // }
      if(val == null){
        val = []
        this.from.startTime =""
        this.from.startTime2 = ""
      }else {
        this.from.startTime = val[0]
        this.from.startTime2 = val[1]
      }
    },

    //导出方法
    exportTab1(){
      axios({
        method: 'post',
        url:`${this.baseURL}/freeswitch/callrecords/exportAllDateByCondition`,
        // url: '${this.baseURL}/record/handle/exportdetailbydepartguidanddatedesignatdepartment',
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          'token': localStorage.token,
        },
        responseType: "blob",
        data:this.from
      })
        .then(res => {
          console.log(res)
          if (res.data.type) {
            // // 文件下载
            const blob = new Blob([res.data], {
              type: "application/vnd.ms-excel"
            });
            let contentDisposition = res.headers['content-disposition'];
            let fileName = window.decodeURI(contentDisposition.substring(contentDisposition.indexOf('=')+1));
            let link = document.createElement('a');
            link.href = URL.createObjectURL(blob); //Content-Disposition
            link.setAttribute('download',fileName);
            link.click();
            link = null;
            this.$message.success('导出成功');
          } else {
            // 返回json
            this.$message.warning(res.data.msg);
          }
        })
        .catch(err => {
          console.log(err)
          this.loading = false;
          this.$message.error("下载失败");
        });
    },

    //通话时长范围
    timeConversion(){
      if(typeof this.from.billsec1 == "number"){
        if(this.from.billsec2 !== ''){
          if(this.from.billsec1 > this.from.billsec2){
            this.from.billsec2 = ''
            //alert('前大于后')
            Message({
              message:'最小时长不可大于最大时长',
              type: 'error',
              duration: 5 * 1000,
            })
          }
        }
      }else {
        console.log(typeof this.from.billsec1)
        this.from.billsec1 = ''
        Message({
          message:'请输入正确数字',
          type: 'error',
          duration: 5 * 1000,
        })
      }

    },
    timeConversion2(){
      //秒
      //console.log(Number(this.startTime.substring(3)),Number(this.endTime.substring(3)))
      //分
      //console.log(Number(this.startTime.substring(0,2)),Number(this.endTime.substring(0,2)))

      if(typeof this.from.billsec2 == "number"){
        if(this.from.billsec1 == ''){
          this.from.billsec1 = 0
        }
        if(this.from.billsec1 > this.from.billsec2){
          //alert('后小于前')
          Message({
            message: `最大时长不可小于最小时长`,
            type: 'error',
            duration: 5 * 1000,
          })
          this.from.billsec2 = ''
          console.log(this.from.billsec1,this.from.billsec2)
        }else {
          console.log(this.from.billsec1,this.from.billsec2)
        }
      }else {
        this.from.billsec2 = ''
        Message({
          message:'请输入正确数字',
          type: 'error',
          duration: 5 * 1000,
        })
      }
      // console.log('开始'+this.from.startTime)
      // let minute1 = Number(this.from.startTime.substring(0,2))
      // this.from.recordingDuration = minute1*60 + Number(this.from.startTime.substring(3))
      // console.log(this.from.recordingDuration)
      //
      // //结束
      // console.log('结束'+this.from.endTime)
      // if(this.from.endTime !== ''){
      //   let minute2 = Number(this.from.endTime.substring(0,2))
      //   this.from.recordingDuration2 = minute2*60 + Number(this.from.endTime.substring(3))
      //   console.log(this.from.recordingDuration2)
      // }
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
    this.branch(9)
    this.dataList(this.from)
  }
}
</script>

<style scoped>
>>>.el-table--mini td, .el-table--mini th{
  padding: 0;
}
>>>.el-table td, .el-table th{
  padding: 0;
}
/*搜索框下边距*/
>>>.el-collapse-item__content{
  padding-bottom: 5px;
}
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
