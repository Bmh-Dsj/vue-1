<template>
  <div>
    <div>
      <el-collapse class="sstj" v-model="activeNames">
        <el-collapse-item>
          <span class="sstitle" slot="title">
            搜索条件
          </span>
          <el-form ref="from" :inline="true" :model="from" class="demo-form-inline">
                          <el-form-item  style="display: block">
                            <div class="buttonDiv">
                              <el-button size="small" @click="exportFile" type="success">导出数据</el-button>
                            </div>
                          </el-form-item><!-- 提交按钮 -->
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
                start-placeholder="通话开始时间"
                end-placeholder="通话结束时间">
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

            <el-form-item prop="recordingDuration">
              <!--                <el-time-select-->
              <!--                  size="small"-->
              <!--                  @change="timeConversion"-->
              <!--                  placeholder="录音时长开始"-->
              <!--                  v-model="from.startTime"-->
              <!--                  :picker-options="{-->
              <!--                    start: '00:00',-->
              <!--                    step: '00:02',-->
              <!--                    end: '05:00'-->
              <!--                  }">-->
              <!--                </el-time-select>-->
              <el-input
                size="small"
                placeholder="录音最小时长"
                @change="timeConversion"
                v-model.number="from.recordingDuration">
                <i slot="prefix" class="el-input__icon el-icon-search"></i>
              </el-input>
            </el-form-item><!-- 录音时间搜索 开始-->
            <el-form-item prop="recordingDuration2">
              <!--                <el-time-select-->
              <!--                  size="small"-->
              <!--                  @change="timeConversion"-->
              <!--                  placeholder="录音时长结束"-->
              <!--                  v-model="from.endTime"-->
              <!--                  :picker-options="{-->
              <!--                    start: from.startTime,-->
              <!--                    step: '00:02',-->
              <!--                    end: '05:00',-->
              <!--                    minTime: from.startTime-->
              <!--                  }">-->
              <!--                </el-time-select>-->
              <el-input
                size="small"
                placeholder="录音最大时长"
                @change="timeConversion2"
                v-model.number="from.recordingDuration2">
                <i slot="prefix" class="el-input__icon el-icon-search"></i>
              </el-input>
            </el-form-item><!-- 录音时间搜索 结束-->

            <el-form-item prop="phone">
              <el-input
                size="small"
                placeholder="手机号码"
                v-model="from.phone">
                <i slot="prefix" class="el-input__icon el-icon-search"></i>
              </el-input>
            </el-form-item><!-- 手机号码 -->
            <el-form-item prop="statusxj">
              <el-cascader
                size="small"
                @change="stateSwitching2"
                placeholder="业务状态"
                v-model="from.statusxj"
                :options="options2"
                :props="{ expandTrigger: 'click' ,checkStrictly: true }"
              ></el-cascader>
            </el-form-item><!-- 工单状态 -->
            <el-form-item prop="call">
              <el-cascader
                size="small"
                @change="stateSwitching1"
                placeholder="接通状态"
                v-model="from.call"
                :options="options"
                :props="{ expandTrigger: 'hover',checkStrictly: true }"
              ></el-cascader>
            </el-form-item><!-- 接通状态 -->

            <el-form-item>
              <div class="buttonDiv">
                <el-button size="small" @click="fromShow" type="primary" icon="el-icon-search">搜索</el-button>
                <el-button size="small" @click="fromClear('from')" type="info">清空<i class="el-icon-delete el-icon--right"></i></el-button>
                <el-button size="small" @click="searchExport" type="success">搜索条件导出</el-button>
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
          @selection-change="handleSelectionChange">
          <el-table-column
            header-align="center"
            align="center"
            type="selection"
            width="38">
          </el-table-column>
          <el-table-column
            class="ycbt"
            :show-overflow-tooltip="true"
            header-align="center"
            align="center"
            prop="guid"
            label="数据编号"
            width="70">
          </el-table-column>
          <el-table-column
            :show-overflow-tooltip="true"
            header-align="center"
            label="通话时间"
            width="140">
            <template slot-scope="scope">{{ scope.row.createTime }}</template>
          </el-table-column>
          <el-table-column
            :show-overflow-tooltip="true"
            header-align="center"
            align="center"
            prop="jobNumber"
            label="工号"
            width="100">
          </el-table-column>
          <el-table-column
            :show-overflow-tooltip="true"
            header-align="center"
            align="center"
            prop="phone"
            label="联系电话"
            width="120">
          </el-table-column>
          <el-table-column
            :show-overflow-tooltip="true"
            header-align="center"
            align="center"
            prop="duration"
            label="录音时长"
            width="80">
          </el-table-column>
          <el-table-column
            :show-overflow-tooltip="true"
            header-align="center"
            align="center"
            prop="status"
            label="接通状态"
            width="80">
          </el-table-column>
          <el-table-column
            :show-overflow-tooltip="true"
            header-align="center"
            align="center"
            prop="businessStatus"
            label="业务状态"
            width="80">
          </el-table-column>

          <el-table-column
            header-align="center"
            align="center"
            prop="seatNote"
            label="播放录音"
            width="120">
            <template  slot-scope="scope">
              <!--                <audio style="outline: none;height: 25px;" controls="controls" :src="scope.row.url">-->
              <!--                </audio>-->
              <el-button @click="editor(scope.row)" type="primary"
                         size="mini">播放录音
              </el-button>
            </template>
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

    <el-dialog title="播放录音" @close="cc" :visible.sync="dialogTableVisible">
      <audio style="outline: none;" controls="controls" :src="url">
      </audio>
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
      baseURL:this.$store.state.baseURL,
      activeNames:[],//是否显示搜索条件
      loading:false,//列表表格加载
      from:{
        guid: '',//数据编号
        jobNumber:'',//工号
        phone: '',//手机号码
        day2: [],//创建时间数组
        size: 50,//个数
        current:1,//页数
        createTime:'',//创建开始时间
        createTime2:'',//创建结束时间

        //录音时长
        // startTime: '',//开始
        // endTime: '',//结束
        recordingDuration:'',//录音最小
        recordingDuration2:'',//录音最小
        call:[],//接通状态
        statusId:'',//接通状态ID
        statusxj:[],//业务状态
        businessId:'',//业务状态ID
      },//搜索表单
      total:0,//分页总条数
      tableData:[],//表格数据
      multipleSelection: [],//复选框值
      guids:[],

      url:'',//录音链接
      dialogTableVisible:false,//录音弹窗

      options:[],//接通状态
      options2:[],//业务状态
    }
  },
  methods:{
    //搜索导出
    searchExport(){
      axios({
        method: 'put',
        url: this.baseURL + '/sound/exportsoundbyscreen',
        headers: {
          // Accept: 'application/json',
          "Content-Type": "application/json;charset=UTF-8",
          'token': localStorage.token,
        },
        data:this.from,
        responseType: "blob",
      }).then(res => { //resource
        console.log('这个是请求参数',res)
        if (res.data.type) {
          // 文件下载
          let contentDisposition = res.headers['content-disposition'];
          let fileName = window.decodeURI(contentDisposition.substring(contentDisposition.indexOf('=')+1));
          // let fileName = '录音文件';
          const blob = new Blob([res.data], {
            type: "application/zip"
            // type: "application/vnd.ms-excel"
          });
          let link = document.createElement('a');
          link.href = URL.createObjectURL(blob);
          link.setAttribute('download', fileName);
          link.click();
          link = null;
          this.$message.success('导出成功');
        } else {
          // 返回json
          this.$message.warning(res.data.message);
        }
      }).catch(err => {
        console.log(err)
      })
    },

    //接通状态转换
    stateSwitching1(val){
      console.log(val)
      if(val.length>0){
        this.from.statusId = val[val.length-1]
      }
      // console.log(val[val.length-1])
      // console.log(this.$store.state.baseURL)

      // this.form.status = val[1]
    },
    //任务状态切换
    stateSwitching2(val){
      console.log(val)
      if(val.length>0){
        this.from.businessId = val[val.length-1]
      }
    },
    //获取业务(2) 接通(1)状态
    dropDownBox(data){
      return new Promise((resolve, reject) => {
        axios({
          method: 'get',
          url: this.baseURL + '/status/ynkStatus/getStatusTree/' + data,
          headers: {
            "Content-Type": "application/json;charset=UTF-8",
            'token': localStorage.token,
          },
        }).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },

    //导出录音
    exportFile(){
      if(this.guids.length > 0){
        axios({
          method: 'put',
          url: this.baseURL + '/sound/exportsound',
          headers: {
            // Accept: 'application/json',
            "Content-Type": "application/json;charset=UTF-8",
            'token': localStorage.token,
          },
          data:this.guids,
          responseType: "blob",
        }).then(res => { //resource
          console.log('这个是请求参数',res)
          if (res.data.type) {
            // 文件下载
            let contentDisposition = res.headers['content-disposition'];
            let fileName = window.decodeURI(contentDisposition.substring(contentDisposition.indexOf('=')+1));
            // let fileName = '录音文件';
            const blob = new Blob([res.data], {
              type: "application/zip"
              // type: "application/vnd.ms-excel"
            });
            let link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.setAttribute('download', fileName);
            link.click();
            link = null;
            this.$message.success('导出成功');
          } else {
            // 返回json
            this.$message.warning(res.data.message);
          }
        }).catch(err => {
          console.log(err)
        })
      }else {
        Message({
          message:'请勾选数据',
          type:'info',
          duration:3*1000,
        })
      }

    },
    //搜索录音表单
    fromShow(){
      console.log(this.from)
      this.soundList(this.from)
    },
    //清除录音表单
    fromClear(from){
      this.$refs[from].resetFields()
      this.from.createTime = ''//创建开始时间
      this.from.createTime2 = ''//创建结束时间
      this.from.recordingDuration = ''//录音开始时间
      this.from.recordingDuration2 = ''//录音开始时间
      this.from.businessId = '' //任务状态
      this.from.statusId = '' //接通状态
    },
    //录音创建时间
    time2(val){
      if(val == null){
        this.from.day2 = []
        this.from.createTime = ''
        this.from.createTime2 = ''
      }else {
        this.from.createTime = val[0]
        this.from.createTime2 = val[1]
      }
      console.log(val)
    },
    //获取所有录音
    soundList(data){
      this.loading = true
      axios({
        method: 'post',
        url: this.baseURL + '/sound/findsoundbydepart',
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          'token': localStorage.token,
        },
        data:data
      }).then(res => { //resource
        this.loading = false
        console.log('这个是请求参数',res)
        for (let i = 0 ; i <res.data.data.dataList.length; i++){
          res.data.data.dataList[i].url = this.baseURL  +  res.data.data.dataList[i].url
        }
        this.tableData = res.data.data.dataList
        this.total = res.data.data.total
        console.log(this.tableData)
      }).catch(err => {
        console.log(err)
        this.loading = false
      })
    },
    //分页 条数改变钩子
    handleSizeChange(val){
      console.log(`每页 ${val} 条`);
      this.from.size = val
      this.soundList(this.from)
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
    //分页 页数改变钩子
    handleCurrentChange(val){
      console.log(`当前页: ${val}`);
      this.from.current = val
      console.log(this.from);
      this.soundList(this.from)
    },
    //timeConversion 时间转换
    timeConversion(){
      if(typeof this.from.recordingDuration == "number"){
        if(this.from.recordingDuration2 !== ''){
          if(this.from.recordingDuration > this.from.recordingDuration2){
            this.from.recordingDuration2 = ''
            //alert('前大于后')
            Message({
              message:'最小时长不可大于最大时长',
              type: 'error',
              duration: 5 * 1000,
            })
          }
        }
      }else {
        console.log(typeof this.from.recordingDuration)
        this.from.recordingDuration = ''
        Message({
          message:'请输入正确数字',
          type: 'error',
          duration: 5 * 1000,
        })
      }

    },//最小时间
    timeConversion2(){
      //秒
      //console.log(Number(this.startTime.substring(3)),Number(this.endTime.substring(3)))
      //分
      //console.log(Number(this.startTime.substring(0,2)),Number(this.endTime.substring(0,2)))

      if(typeof this.from.recordingDuration2 == "number"){
        if(this.from.recordingDuration == ''){
          this.from.recordingDuration = 0
        }
        if(this.from.recordingDuration > this.from.recordingDuration2){
          //alert('后小于前')
          Message({
            message: `最大时长不可小于最小时长`,
            type: 'error',
            duration: 5 * 1000,
          })
          this.from.recordingDuration2 = ''
          console.log(this.from.recordingDuration,this.from.recordingDuration2)
        }else {
          console.log(this.from.recordingDuration,this.from.recordingDuration2)
        }
      }else {
        this.from.recordingDuration2 = ''
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
    },//最大时间
    // 递归判断列表，把最后的children设为undefined
    getTreeData(data){
      for(let i=0;i<data.length;i++){
        if(data[i].children.length<1){
          // children若为空数组，则将children设为undefined
          data[i].children=undefined;
        }else {
          // children若不为空数组，则继续 递归调用 本方法
          this.getTreeData(data[i].children);
        }
      }
      return data;
    },

    //弹出录音
    editor(val){
      this.dialogTableVisible = true
      console.log(val.url)
      this.url = val.url
    },
    cc(){
      // console.log(1)
      this.url = ''
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
  mounted() {
    this.branch(5)
    //业务状态下拉
    this.dropDownBox(2).then(res=>{
      console.log(res)
      this.options2 = this.getTreeData(res.data)
    }).catch(err=>{
      console.log(err)
    })
    //接通状态下拉
    this.dropDownBox(1).then(res=>{
      console.log(res)
      this.options = this.getTreeData(res.data)
    }).catch(err=>{
      console.log(err)
    })
    this.soundList(this.from)
  }
}
</script>

<style scoped>
/*搜索框复选框边距*/
>>>.el-table-column--selection .cell{
  padding-right: 10px;
}
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
>>>.el-table .cell{
  line-height: 16px;
}
>>>.el-table--mini td, .el-table--mini th{
  padding: 0;
}
>>>.el-table td, .el-table th{
  padding: 0;
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
