<template>
  <div class="dashboard-container">
<!--    <div class="dashboard-text">用户名 : {{name}}</div>-->
<!--    权限：{{dd}}-->
<!--    <div>-->
<!--      <el-select filterable v-model="value" @change="xmm" placeholder="请选择项目">-->
<!--        <el-option-->
<!--          v-for="item in options"-->
<!--          :label="item.label"-->
<!--          :value="item.value">-->
<!--        </el-option>-->
<!--      </el-select>-->
<!--    </div>-->
<!--    <img width="100%" src="../../icons/logo.png" alt="">-->
<!--    <div class="dashboard-text title">首页</div>-->
<!--    <div>{{this.$store.state.form}}</div>-->
<!--    <div>{{this.$store.state.user.form}}</div>-->
<!--    this.$store.state.user.token:{{this.$store.state.user.token}}<br>roles-->
<!--    aa:{{aa}}<br>-->
<!--    bb:{{bb}}<br>-->

<!--    {{this.$store.state.roles}}-->

<!--    {{state.token}}<br>-->
    <div v-show="this.user" class="home">
      <div class="top">
        <span class="title">外呼批次率</span>
        <div class="gdt">
          <div class="table">
            <!--         height="calc(100vh - 120px)"-->
            <el-table
              height="calc(31vh - 30px)"
              :data="batchTable"
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
                min-width="130">
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
        </div>
      </div>
      <div class="during">
        <div>
          <span class="title">
            <span style="margin-right: 10px;">当前外呼批次</span>
            <el-select @change="openCall" style="margin-right: 10px;" size="mini" v-model="batchNum" placeholder="请选择外呼批次">
              <el-option
                v-for="(item,index) in options"
                :key="index"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <el-select size="mini" @change="cellRate" style="margin-right: 10px;"
                       v-model="outBoundSpeed"
                       placeholder="外呼速率">
                <el-option
                  v-for="item in options2"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            <el-button size="mini" @click="closeOutbound" type="danger">关闭外呼</el-button>
          </span>

          <el-table
            size="mini"
            @cell-click="cell"
            :data="breatheTable"
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
        <div>
          <div class="Seats">
            <div class="Seat" v-for="a in agentStatus" :style="`background: ${a.background}`">
              <span>{{a.name}}</span><br>
              <span>{{a.status}}</span><br>
              <span>
                {{a.duration.hour}}:{{a.duration.minute}}:{{a.duration.second}}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div class="down">
        <span  class="title">当前外呼详情</span>
        <div class="gdt">
          <div class="table">
            <el-table
              size="mini"
              stripe
              height="calc(31vh - 60px)"
              border
              :data="detailTable">
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
      </div>
    </div>


  </div>
</template>

<script>
// import { mapGetters } from 'vuex'

import Cookies from "js-cookie";
import { getToken, setToken, removeToken } from '@/utils/auth'
import store from "@/store";
import axios from "axios";
import {Message} from "element-ui";

export default {
  name: 'Dashboard',
  data(){
    return{
      user:JSON.parse(localStorage.user).roles[0].roleDescribe.indexOf('管理员') !== -1,//判断用户角色
      // from:this.$store.state.user.form,
      name:JSON.parse(localStorage.user).user.name,
      // aa:getToken('TokenKey'),
      // bb:localStorage.token,
      // cc:this.$store.state.user.token,
      dd:this.$store.state.user.avatar,
      // baseURL:'http://39.102.203.193:9090',
      baseURL:this.$store.state.baseURL,

      // qx:JSON.parse(localStorage.user).data.roles[0].roleDescribe
      options: [],
      value: this.$route.query.value || '',

      batchFrom:{
        size:50,
        current:1,
        operateTime:this.ShowDate(0) + ' 00:00:00',
        operateTime2:this.ShowDate(0) + ' 23:59:59',
      },//批次率表单
      batchTable:[],//批次率表格
      batchRateTime:'',//批次率定时器

      breatheTable:[],//当前外呼批次表格
      agentStatus:[],//坐席状态
      timer:'',//坐席状态定时器

      cellTimer2:'',//当前外呼定时器
      cellList: {
        label: '',
        status: 'calling',
        batchNum: '',
      },//点击表格
      popUps: {
        size: 50,
        current: 1,
        total: 0,
        pages: 1,
      },//点击表格分页
      detailTable:[],//呼叫中详情数据

      batchNum:'',//批次号
      outBoundSpeed: 1 ,//外呼速率
      options2: [
        {
          value: '1',
          label: '1'
        },
        {
          value: '1.5',
          label: '1.5'
        },
        {
          value: '2',
          label: '2'
        },
        {
          value: '2.5',
          label: '2.5'
        },
        {
          value: '3',
          label: '3'
        },
        {
          value: '3.5',
          label: '3.5'
        },
        {
          value: '4',
          label: '4'
        },
        {
          value: '4.5',
          label: '4.5'
        },
        {
          value: '5',
          label: '5'
        },
        {
          value: '5.5',
          label: '5.5'
        },
        {
          value: '6',
          label: '6'
        },
        {
          value: '6.5',
          label: '6.5'
        },
        {
          value: '7',
          label: '7'
        },
        {
          value: '7.5',
          label: '7.5'
        },
        {
          value: '8',
          label: '8'
        },
        {
          value: '8.5',
          label: '8.5'
        },
        {
          value: '9',
          label: '9'
        },
        {
          value: '9.5',
          label: '9.5'
        },
        {
          value: '10',
          label: '10'
        }
      ],//外呼速率
    }
  },
  // computed: {
  //   ...mapGetters([
  //     'name'
  //   ])
  // }
  methods:{
    aa(){
      let aa = document.visibilityState
      console.log(aa)
      document.addEventListener('visibilitychange', function () {
        // 用户离开了当前页面
        if (document.visibilityState === 'hidden') {
          document.title = '页面不可见';
        }

        // 用户打开或回到页面
        if (document.visibilityState === 'visible') {
          document.title = '页面可见';
        }
        // axios({
        //   method: 'get',
        //   url: 'http://39.102.203.193:9090/user/test?test=' + aa,
        //   headers: {
        //     "Content-Type": "application/json;charset=UTF-8",
        //     'token': localStorage.token,
        //   },
        //   // data:this.from
        // }).then(res=>{
        //   console.log(res)
        // }).catch(err=>{
        //   console.log(err)
        // })
      });

      // alert(aa)
    },
    ccc(){
      console.log(this.$store.state.user.roles)
    },
    //获取批次号
    batchNumber(){
      axios({
        method: 'post',
        url: `${this.baseURL}/hetao/outboundlisthetao/getallbatchnumbers1`,
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          'token': localStorage.token,
        },
      }).then(res => {
        console.log(res.data.data.dataList)
        this.options = []
        for (let i = 0; i < res.data.data.dataList.length; i++) {
          let obj = {}
          obj.value = res.data.data.dataList[i].batchNum
          obj.label = res.data.data.dataList[i].depict
          this.options.push(obj)
        }

      }).catch(err => {
        console.log(err)
      })
    },
    //打开外呼
    openCall(val){
      console.log(val)
      if(this.outBoundSpeed === ''){
        axios({
          method: 'post',
          url: `${this.baseURL}/freeswitch/outboundopen/startautomaticoutboundcall/${1}/${val}`,
          headers: {
            "Content-Type": "application/json;charset=UTF-8",
            'token': localStorage.token,
          },
        }).then(res => {
          console.log(res)
          Message({
            message: `${res.data.message}`,
            type: 'success',
            duration: 5 * 1000,
          })
        }).catch(err => {
          console.log(err)
        })
      }else {
        axios({
          method: 'post',
          url: `${this.baseURL}/freeswitch/outboundopen/stopautomaticoutboundcall`,
          headers: {
            "Content-Type": "application/json;charset=UTF-8",
            'token': localStorage.token,
          },
        }).then(res => {
          console.log(res)
          Message({
            message: `${res.data.message}`,
            type: 'success',
            duration: 5 * 1000,
          })
          this.breatheTable = []
          axios({
            method: 'post',
            url: `${this.baseURL}/freeswitch/outboundopen/startautomaticoutboundcall/${this.outBoundSpeed}/${this.batchNum}`,
            headers: {
              "Content-Type": "application/json;charset=UTF-8",
              'token': localStorage.token,
            },
          }).then(res => {
            console.log(res)
            Message({
              message: `${res.data.message}`,
              type: 'success',
              duration: 5 * 1000,
            })
          }).catch(err => {
            console.log(err)
          })
        }).catch(err => {
          console.log(err)
        })
      }
    },
    //修改速率
    cellRate() {
      if(this.batchNum === ''){
        Message({
          message:'当前无开启的外呼',
          type:'info',
          duration:3*1000
        })
      }else {
        axios({
          method: 'get',
          url: `${this.baseURL}/freeswitch/outboundopen/updatespeedbybatchnum?batchNum=${this.batchNum}&speed=${this.outBoundSpeed}`,
          headers: {
            "Content-Type": "application/json;charset=UTF-8",
            'token': localStorage.token,
          },
          // data: {
          //   batchNum:row.batchNum,
          //   speed:row.outBoundSpeed
          // }
        }).then(res => {
          console.log(res)
          Message({
            message: res.data.message,
            type: 'success',
            duration: 5 * 1000,
          })
        }).catch(err => {
          console.log(err)
        })
      }
    },
    //关闭外呼
    closeOutbound(){
      if (this.batchNum === ''){
        Message({
          message:'当前无开启外呼',
          type:'info',
          duration:3*1000,
        })
        this.breatheTable = []
        this.batchNum = ''
        this.outBoundSpeed = ''
      }else {
        axios({
          method: 'post',
          url: `${this.baseURL}/freeswitch/outboundopen/stopautomaticoutboundcall`,
          headers: {
            "Content-Type": "application/json;charset=UTF-8",
            'token': localStorage.token,
          },
        }).then(res => {
          console.log(res)
          Message({
            message: `${res.data.message}`,
            type: 'success',
            duration: 5 * 1000,
          })
          this.breatheTable = []
          this.batchNum = ''
          this.outBoundSpeed = ''
        }).catch(err => {
          console.log(err)
        })
      }

    },

    //切换业务
    xmm(){
      console.log(this.value)
      console.log(store.getters.roles)
      axios({
        method: 'get',
        url: this.baseURL + '/user/switchingservices?departGuid='+this.value,
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
        for (let i = 0; i < store.getters.roles.length; i++){
          for (let j = 0; j < b.length; j++){
            if(store.getters.roles[i]==b[j]){
              ccc.push(store.getters.roles[i])
            }
          }
        }
        localStorage.xmOne = JSON.stringify(ccc)
        let url = this.$router.resolve({
          name: `/`,
          // query: localStorage.xmOne,this.$route.query.
          query:{value:JSON.parse(localStorage.xmOne)[0]}
        });
        window.open(url.href, "_blank");

        window.opener=null;
        window.open('','_self');
        window.close();
      }).catch(err => {
        console.log(err)
      })


    },
    //操作 时间 转换 0当天
    ShowDate(date) {
      var num = date
      let n = num;
      let d = new Date();
      let year = d.getFullYear();
      let mon = d.getMonth() + 1;
      let day = d.getDate();
      if (day <= n) {
        if (mon > 1) {
          mon = mon - 1;
        } else {
          year = year - 1;
          mon = 12;
        }
      }
      d.setDate(d.getDate() - n);
      year = d.getFullYear();
      mon = d.getMonth() + 1;
      day = d.getDate();
      let s = year + "-" + (mon < 10 ? ('0' + mon) : mon) + "-" + (day < 10 ? ('0' + day) : day);
      return s;
    },
    //批次率
    batchRate(){
      this.batchRateTime = setTimeout(this.batchRate,30000)
      axios({
        method: 'post',
        url: `${this.baseURL}/hetao/outboundlisthetao/gettheproportionofoutboundcalls/${this.batchFrom.size}/${this.batchFrom.current}`,
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          'token': localStorage.token,
        },
        data : this.batchFrom
      }).then(res => {
        console.log(this.batchFrom,res.data.data.dataList)
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
        this.batchTable = res.data.data.dataList
      }).catch(err => {
        console.log(err)
      })
    },

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
          this.batchNum = res.data
          this.cellList.batchNum = res.data
          axios({
            method: 'get',
            url: `${this.baseURL}/hetao/outboundlisthetao/batchdetails/${50}/${1}?batchNum=${res.data}`,
            headers: {
              "Content-Type": "application/json;charset=UTF-8",
              'token': localStorage.token,
            },
          }).then(res => {
            // console.log(res.data.data.dataList)
            console.log(res)
            this.breatheTable = res.data.data.dataList
            this.outBoundSpeed = res.data.data.dataList[0].outBoundSpeed
            this.callingF()
          }).catch(err => {
            console.log(err)
          })
        }else {
          this.batchNum = ''
          this.outBoundSpeed = ''
        }
      }).catch(err => {
        console.log(err)
      })
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
          this.detailTable = res.data.data.dataList
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
          this.detailTable = res.data.data.dataList
          this.popUps.current = res.data.data.current
          this.popUps.total = res.data.data.total
        }).catch(err => {
          console.log(err)
        })
      }
      else if (column.label == "未完成数量") {
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
          this.detailTable = res.data.data.dataList
          this.popUps.current = res.data.data.current
          this.popUps.total = res.data.data.total
        }).catch(err => {
          console.log(err)
        })
      } else if (column.label == "排队数量") {
        this.cellList.status = "waitNumber"
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
      }
      else if (column.label == "数据总数量") {
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
          this.detailTable = res.data.data.dataList
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
    //坐席状态
    state() {
      this.timer = setTimeout(this.state, 3000)
      axios({
        method: 'get',
        url: `${this.baseURL}/user/depart/getseatstatusbydepartguid`,
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          'token': localStorage.token,
        },
      }).then(res => {
        // console.log(res)
        this.agentStatus = res.data.data.data
      }).catch(err => {
        console.log(err)
        // this.loadingZy = false
      })
    },

    //详情呼叫中
    callingF(){
      axios({
        method: 'get',
        url: `${this.baseURL}/hetao/outboundlisthetao/getdatadetails/${this.popUps.current}/${50}?batchNum=${this.cellList.batchNum}&status=${this.cellList.status}`,
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          'token': localStorage.token,
        },
      }).then(res => {
        console.log(res,1111)
        this.detailTable = res.data.data.dataList
        this.popUps.current = res.data.data.current
        this.popUps.total = res.data.data.total
      }).catch(err => {
        console.log(err)
      })
    },
    //分页 详情页数
    numberOfPages(val) {
      console.log(`当前页: ${val}`);
      this.popUps.current = val
      console.log(this.popUps);
      this.callingF()
    },
    //判断用户
    judgeTheUser(){
      if(this.user){
        this.batchRate()//批次率
        this.currentCall()//当前外呼
        this.state()//坐席状态
      }else {
        console.log('zuoxi')
      }
    },
  },
  beforeMount() {
    //this.ccc()
  },
  created() {
    // this.batchRate()//批次率
    // this.currentCall()//当前外呼
    // this.state()//坐席状态
    this.batchNumber()
    this.judgeTheUser()
  },
  mounted() {
    //this.aa()
    //this.closeWin()
  },
  destroyed() {
    clearInterval(this.cellTimer2);
    this.cellTimer2 = null;

    clearInterval(this.timer);
    this.timer = null;

    clearInterval(this.batchRateTime);
    this.batchRateTime = null;
  }
}
</script>

<style lang="scss" scoped>

@font-face {
  font-family: 'Emoji';
  //src: url('../../fonts/seguiemj.eot');
  //src: url('../../fonts/seguiemj.eot?#iefix') format('embedded-opentype'),
  src: url('../../fonts/seguiemj.ttf') format('truetype');
}

div {
  font-family: 'Segoe UI Emoji', 'Emoji', Tahoma, Geneva, 'Simsun';
}

//body {
//  font-family: 'Segoe UI Emoji', 'Emoji', Tahoma, Geneva, 'Simsun';
//}

//input, button, textatea, select {
//  font-family: 'Segoe UI Emoji', 'Emoji', Tahoma, Geneva, 'Simsun';
//}


//.dashboard {
//  &-container {
//    margin: 30px;
//  }
//  &-text {
//    font-size: 30px;
//    line-height: 46px;
//  }
//}
.title{
  padding-left: 20px;
  font-weight: 900;
  padding-bottom: 5px ;
  //display: inline-block;
  display: flex;
  justify-content: start;
  align-items: center;
}
  //.title{
  //  text-align: center;
  //  font-size: 50px;
  //  padding-top: 10%;
  //}
  .home{
    width: 100%;
    margin: 0;
    padding: 0;
  }
  //上
  .top{
    width: 100%;
    height: 31vh;
    //border-bottom: #00ff80 solid 1px;
    margin-top: 5px;
    margin-bottom: 5px;
  }
  //中
  .during{
    width: 100%;
    height: 31vh;
    margin-bottom: 5px;
    //border-bottom: #00ff80 solid 1px;
    overflow: auto;
    padding: 0  1%;
  }
  //下
  .down{
    width: 100%;
    height: 31vh;
    //border-bottom: #00ff80 solid 1px;
  }
.Seat{
  color: #656262;
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
  margin: 5px 0;
  border:#cccccc solid 1px;
  display: flex;
  flex-wrap: wrap;
}

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
.fywDiv {
  width: 100%;
  display: flex;
  justify-content: flex-end;
}
</style>
