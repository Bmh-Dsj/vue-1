<template>
  <div>
      <div class="top">
        <p>当前外呼数据</p>
        <el-table
          size="mini"
          @cell-click="cell"
          :data="tableData"
          border
          style="width: 100%">
          <el-table-column
            prop="batchNum"
            label="批次号"
            header-align="center"
            align="center"
            min-width="180">
          </el-table-column>
          <el-table-column
            prop="depict"
            label="描述"
            header-align="center"
            align="center"
            min-width="150">
          </el-table-column>
          <el-table-column
            prop="total"
            label="数据总数量"
            header-align="center"
            align="center"
            min-width="120">
          </el-table-column>
          <el-table-column
            prop="amountCompleted"
            label="已完成数据量"
            header-align="center"
            align="center"
            min-width="120">
          </el-table-column>
          <el-table-column
            prop="calling"
            label="呼叫中数量"
            header-align="center"
            align="center"
            min-width="110">
          </el-table-column>
          <el-table-column
            prop="unfinished"
            header-align="center"
            align="center"
            label="未完成数量"
            min-width="110">
          </el-table-column>
          <el-table-column
            prop="waitNumber"
            header-align="center"
            align="center"
            label="排队数量"
            min-width="110">
          </el-table-column>
        </el-table>
      </div>
      <div class="down">
        <p>坐席状态</p>
        <div class="Seats">
          <div class="Seat" v-for="a in tableCS" :style="`background: ${a.background}`">
            <span>{{a.name}}</span><br>
            <span>{{a.status}}</span><br>
            <span>
                {{a.duration.hour}}:{{a.duration.minute}}:{{a.duration.second}}
              </span>
          </div>
        </div>
      </div>


    <div>
      <el-dialog custom-class="dialogbig" title="数据详情" :visible.sync="dialogTableVisible">
        <div class="gdt">
          <div class="table">
            <el-table
              size="mini"
              stripe
              height="70vh"
              border
              :data="dialogData">
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
            </el-table>
          </div>

        </div>
        <div class="fywDiv">
          <el-pagination
            background
            :pager-count="5"
            @current-change="numberOfPages"
            :current-page="popUps.current"
            layout="total, prev, pager, next, jumper"
            :page-size="50"
            :total="popUps.total">
          </el-pagination>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "index",
  data() {
    return {
      baseURL: this.$store.state.baseURL,
      calling:{},//正在呼叫
      cellTimer2: '',//
      tableCS:[],
      timer:'',//
      tableData: [],//表格数据
      //弹窗数据
      cellList: {
        label: '',
        status: '',
        batchNum: '',
      },
      dialogTableVisible: false,//弹框状态
      dialogData: [],//弹框表格数据
      popUps: {
        size: 50,
        current: 1,
        total: 0,
        pages: 1,
      },//弹窗分页
      cellTimer:'',//呼叫中表格定时器
    }
  },
  methods: {
    //当前外呼
    currentCall() {
      this.cellTimer2 = setTimeout(this.currentCall, 3000)
      axios({
        method: 'get',
        url: `${this.baseURL}/hetao/outboundlisthetao/getcurrenttheproportionofoutboundcalls`,
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          'token': localStorage.token,
        },
      }).then(res => {
        console.log(res)
        if(res.data !== ''){
          axios({
            method: 'get',
            url: `${this.baseURL}/hetao/outboundlisthetao/batchdetails/${50}/${1}?batchNum=${res.data}`,
            headers: {
              "Content-Type": "application/json;charset=UTF-8",
              'token': localStorage.token,
            },
          }).then(res => {
            // console.log(res.data.data.dataList)
            this.tableData = res.data.data.dataList
          }).catch(err => {
            console.log(err)
          })
        }
      }).catch(err => {
        console.log(err)
      })
    },
    //呼叫中数据刷新
    callBreak(){
      this.cellTimer = setTimeout(this.callBreak , 3000)
      if(this.cellList.status == "calling"){
        axios({
          method: 'get',
          url: `${this.baseURL}/hetao/outboundlisthetao/getdatadetails/${1}/${50}?batchNum=${this.cellList.batchNum}&status=${this.cellList.status}`,
          headers: {
            "Content-Type": "application/json;charset=UTF-8",
            'token': localStorage.token,
          },
        }).then(res => {
          console.log(res)
          this.dialogData = res.data.data.dataList
          this.popUps.current = res.data.data.current
          this.popUps.total = res.data.data.total
        }).catch(err => {
          console.log(err)
        })
      }else {
        console.log('NO呼叫中')
      }
    },
    //单元格弹出数据方法
    cell(row, column, cell, event) {
      console.log(row)
      console.log(column.label)
      //console.log(cell)
      //console.log(event)
      this.cellList.batchNum = row.batchNum
      this.cellList.label = column.label
      if (column.label == "已完成数据量") {
        this.cellList.status = 'amountCompleted'
        axios({
          method: 'get',
          url: `${this.baseURL}/hetao/outboundlisthetao/getdatadetails/${1}/${50}?batchNum=${this.cellList.batchNum}&status=${this.cellList.status}`,
          headers: {
            "Content-Type": "application/json;charset=UTF-8",
            'token': localStorage.token,
          },
        }).then(res => {
          console.log(res)
          this.dialogData = res.data.data.dataList
          this.dialogTableVisible = true
          this.popUps.current = res.data.data.current
          this.popUps.total = res.data.data.total
        }).catch(err => {
          console.log(err)
        })
      } else if (column.label == "呼叫中数量") {
        this.cellList.status = "calling"
        axios({
          method: 'get',
          url: `${this.baseURL}/hetao/outboundlisthetao/getdatadetails/${1}/${50}?batchNum=${this.cellList.batchNum}&status=${this.cellList.status}`,
          headers: {
            "Content-Type": "application/json;charset=UTF-8",
            'token': localStorage.token,
          },
        }).then(res => {
          console.log(res)
          this.dialogData = res.data.data.dataList
          this.dialogTableVisible = true
          this.popUps.current = res.data.data.current
          this.popUps.total = res.data.data.total
        }).catch(err => {
          console.log(err)
        })
      } else if (column.label == "未完成数量") {
        this.cellList.status = "unfinished"
        axios({
          method: 'get',
          url: `${this.baseURL}/hetao/outboundlisthetao/getdatadetails/${1}/${50}?batchNum=${this.cellList.batchNum}&status=${this.cellList.status}`,
          headers: {
            "Content-Type": "application/json;charset=UTF-8",
            'token': localStorage.token,
          },
        }).then(res => {
          console.log(res)
          this.dialogData = res.data.data.dataList
          this.dialogTableVisible = true
          this.popUps.current = res.data.data.current
          this.popUps.total = res.data.data.total
        }).catch(err => {
          console.log(err)
        })
      } else if (column.label == "数据总数量") {
        this.cellList.status = ""
        axios({
          method: 'get',
          url: `${this.baseURL}/hetao/outboundlisthetao/getdatadetails/${1}/${50}?batchNum=${this.cellList.batchNum}&status=${this.cellList.status}`,
          headers: {
            "Content-Type": "application/json;charset=UTF-8",
            'token': localStorage.token,
          },
        }).then(res => {
          console.log(res)
          this.dialogData = res.data.data.dataList
          this.dialogTableVisible = true
          this.popUps.current = res.data.data.current
          this.popUps.total = res.data.data.total
        }).catch(err => {
          console.log(err)
        })
      }
      // else if (column.label == "外呼状态"){
      //   this.batchNum = row.batchNum
      //   this.outBoundSpeed = row.outBoundSpeed
      // }
    },
    //弹窗数据刷新 (切换页)
    newCell() {
      axios({
        method: 'get',
        url: `${this.baseURL}/hetao/outboundlisthetao/getdatadetails/${this.popUps.current}/${this.popUps.size}?batchNum=${this.cellList.batchNum}&status=${this.cellList.status}`,
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          'token': localStorage.token,
        },
      }).then(res => {
        console.log(res)
        this.dialogData = res.data.data.dataList
        this.dialogTableVisible = true
        this.popUps.current = res.data.data.current
        this.popUps.total = res.data.data.total
      }).catch(err => {
        console.log(err)
      })
    },

    //坐席状态
    state() {
      this.timer = setTimeout(this.state, 3000)
      // this.loadingZy = true

      // this.gridData = []
      // this.columns = []
      axios({
        method: 'get',
        url: `${this.baseURL}/user/depart/getseatstatusbydepartguid`,
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          'token': localStorage.token,
        },
      }).then(res => {
        // console.log(res)
        this.tableCS = res.data.data.data
      }).catch(err => {
        console.log(err)
        // this.loadingZy = false
      })
    },
    //分页 弹框页数
    numberOfPages(val) {
      console.log(`当前页: ${val}`);
      this.popUps.current = val
      console.log(this.popUps);
      this.newCell()
    },
    //部门号
    branch(data) {
      axios({
        method: 'get',
        url: `${this.baseURL}/user/lockdepartment/${data}`,
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          'token': localStorage.token,
        },
      }).then(res => {
        console.log(res)
      }).catch(err => {
        console.log(err)
      })
    }
  },
  created() {
    // this.branch(5)
    this.$store.commit('branch',10)
    this.currentCall()
    this.state()
    this.callBreak()
  },
  destroyed() {
    clearInterval(this.cellTimer2);
    this.cellTimer2 = null;

    clearInterval(this.timer);
    this.timer = null;

    clearInterval(this.cellTimer);
    this.cellTimer = null;
  }
}
</script>

<style scoped>
>>> .el-dialog__body {
  padding: 0;
}
.fywDiv {
  width: 100%;
  display: flex;
  justify-content: flex-end;
}
/* dlg 外边距 */
>>> .dialogbig {
  margin-top: 7vh !important;
  /*margin-left: 1vw;*/
  /*margin-right: 1vw;*/
  width: 80%;
  /*height: 80vh;*/
}

.top {
  width: 100%;
  /*height: 25vh;*/
  border-bottom: #8a8f97 solid 1px;
  padding-bottom: 100px;
}
.left div{
  width: 100%;
  height: 26px;
  line-height:20px;
  padding: 3px;
  margin: 5px 5%;
  cursor:pointer;
}
.left div span{
  cursor:pointer;
}

p {
  text-align: center;
  font-weight: 900;
}

.down {
  width: 100%;
  /*height: 65vh;*/
}

.Seat{
  font-size: 14px;
  width: 10%;
  /*height: 50px;*/
  padding: 5px;
  border-right: #cccccc 1px solid;
  border-bottom: #cccccc 1px solid;
  text-align: center;
  line-height: 20px;
  /* 超出省略号 */
  /*white-space:nowrap;*/
  /*overflow:hidden;*/
  /*text-overflow:ellipsis;*/
}
.Seats{
  margin: 10px 0;
  border:#cccccc solid 1px;
  display: flex;
  flex-wrap: wrap;
}
</style>
