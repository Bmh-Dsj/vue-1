<template>
  <div>
    <div class="seat">
      <div>
        <div style="padding: 10px;">
          <el-button style="margin-right:10px;" size="mini" @click="exportTab1" type="primary">导出</el-button>
          <el-date-picker
            size="mini"
            value-format="yyyy-MM-dd"
            @change="timeHisFive"
            v-model="timeValue1"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>

          <el-input size="mini" style="display: inline-block; width: auto;margin-left: 10px;" v-model="timeDate.jobNumber" placeholder="坐席号"></el-input>
          <el-button style="margin-left: 10px;" size="mini" @click="search" type="success">搜索</el-button>
          <el-button style="margin-left: 10px;" size="mini" @click="remove" type="info">清除</el-button>
        </div>
      </div>
      <el-table
        v-loading="table1"
        :data="tableData1"
        size="mini"
        border
        header-align="center"
        height="calc(45vh - 50px)"
        style="width: 100%">
        <el-table-column
          align="center"
          prop="jobNumber"
          label="工号"
          width="90">
        </el-table-column>
        <el-table-column
          align="center"
          prop="name"
          label="姓名"
          width="90">
        </el-table-column>
        <!--        <el-table-column-->
        <!--          align="center"-->
        <!--          prop="distribution"-->
        <!--          label="分配量"-->
        <!--          width="60">-->
        <!--        </el-table-column>-->
        <el-table-column
          align="center"
          prop="total"
          label="总量"
          width="60">
        </el-table-column>
        <el-table-column
          align="center"
          prop="handleVolume"
          label="处理量"
          width="60">
        </el-table-column>
        <el-table-column
          align="center"
          prop="callOutVolume"
          label="呼出量"
          width="60">
        </el-table-column>
        <el-table-column
          align="center"
          prop="connectionVolume"
          label="接通量"
          width="60">
        </el-table-column>
        <el-table-column
          align="center"
          prop="connectionRate"
          width="70"
          label="接通率">
        </el-table-column>
        <el-table-column
          align="center"
          prop="seatCall60Rate"
          width="80"
          label="60s接通率">
        </el-table-column>
        <el-table-column
          align="center"
          prop="amountOfSuccess"
          label="成功量"
          width="60">
        </el-table-column>
        <el-table-column
          align="center"
          prop="successRate"
          label="成功率"
          width="70">
        </el-table-column>

        <el-table-column
          align="center"
          prop="dataFlow"
          label="流转数据量"
          width="90">
        </el-table-column>
        <el-table-column
          align="center"
          prop="dataFlowSuccess"
          label="流转数据成功量"
          width="110">
        </el-table-column>
        <el-table-column
          align="center"
          prop="dataFlowSuccessRate"
          label="流转数据成功率"
          width="120">
        </el-table-column>

        <el-table-column
          header-align="center"
          align="center"
          prop="averageTalkTime"
          label="平均通话时长"
          width="140">
        </el-table-column>
        <el-table-column
          header-align="center"
          align="center"
          prop="maximumTalkTime"
          label="最大通话时长"
          width="140">
        </el-table-column>
        <el-table-column
          header-align="center"
          align="center"
          prop="totalTalkTime"
          label="总通话时长"
          width="140">
        </el-table-column>
        <!--        <el-table-column-->
        <!--          align="center"-->
        <!--          prop="amountOfFail"-->
        <!--          label="失败量"-->
        <!--          width="60">-->
        <!--        </el-table-column>-->

        <el-table-column
          header-align="center"
          align="center"
          prop="totalPostProcessingTime"
          label="总后处理时长"
          width="150">
        </el-table-column>
        <el-table-column
          header-align="center"
          align="center"
          prop="maximumPostProcessingTime"
          label="最大后处理时长"
          width="140">
        </el-table-column>
        <el-table-column
          header-align="center"
          align="center"
          prop="avgPostProcessingTime"
          label="平均后处理时长"
          width="140">
        </el-table-column>
        <el-table-column
          header-align="center"
          align="center"
          prop="averageWorkTime"
          label="平均工作时长"
          width="140">
        </el-table-column>
        <el-table-column
          header-align="center"
          align="center"
          prop="maximumWorkTime"
          label="最大工作时长"
          width="140">
        </el-table-column>
        <el-table-column
          header-align="center"
          align="center"
          prop="totalWorkTime"
          label="总工作时长"
          width="140">
        </el-table-column>
      </el-table>
    </div>
    <!--      <div>-->
    <!--&lt;!&ndash;        <div>&ndash;&gt;-->
    <!--&lt;!&ndash;          <el-switch&ndash;&gt;-->
    <!--&lt;!&ndash;            v-model="value"&ndash;&gt;-->
    <!--&lt;!&ndash;            @change="automatic"&ndash;&gt;-->
    <!--&lt;!&ndash;            active-text="开启自动外呼"&ndash;&gt;-->
    <!--&lt;!&ndash;            active-color="#13ce66"&ndash;&gt;-->
    <!--&lt;!&ndash;            inactive-color="#F1F3F4">&ndash;&gt;-->
    <!--&lt;!&ndash;          </el-switch>&ndash;&gt;-->
    <!--&lt;!&ndash;        </div>&ndash;&gt;-->

    <!--        <el-select  style="margin-right: 10px;" v-model="outBoundSpeed" placeholder="外呼数量">-->
    <!--          <el-option-->
    <!--            v-for="item in options"-->
    <!--            :key="item.value"-->
    <!--            :label="item.label"-->
    <!--            :value="item.value">-->
    <!--          </el-option>-->
    <!--        </el-select>-->

    <!--        <el-select  style="margin-right: 10px;" v-model="batchNum" placeholder="批次号">-->
    <!--          <el-option-->
    <!--            v-for="item in options2"-->
    <!--            :key="item.value"-->
    <!--            :label="item.label"-->
    <!--            :value="item.value">-->
    <!--          </el-option>-->
    <!--        </el-select>-->
    <!--        <el-button :loading="open" :disabled="this.outboundOpen" type="primary" @click="openOutboundCall">开启外呼</el-button>-->
    <!--        <el-button :loading="close" :disabled="!this.outboundOpen" type="danger" @click="closeOutbound">关闭外呼</el-button>-->
    <!--      </div>-->


    <!--      <div>-->
    <!--        <el-input-->
    <!--          @input="sjgb"-->
    <!--          size="small"-->
    <!--          placeholder="数据编号"-->
    <!--          v-model="guid">-->
    <!--          <i slot="prefix" class="el-input__icon el-icon-search"></i>-->
    <!--        </el-input>-->
    <!--        <el-button type="danger" @click="ccc">ccc</el-button>-->
    <!--      </div>-->

    <div class="seatCount">
      <div class="left">
        <div style="padding: 10px;">
          <el-date-picker
            size="mini"
            value-format="yyyy-MM-dd HH:mm:ss"
            @change="timeHisTwo"
            v-model="timeValue2"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </div>
        <el-table
          :data="oneHisData"
          border
          style="width: 100%">
          <el-table-column
            prop="ranking"
            label="名次"
            width="60"
            align="center"
            title-align="center"
          >
          </el-table-column>
          <el-table-column
            align="center"
            title-align="center"
            prop="jobNumber"
            label="工号"
            width="120">
          </el-table-column>
          <el-table-column
            align="center"
            title-align="center"
            prop="seatName"
            label="姓名"
            width="120">
          </el-table-column>
          <el-table-column
            prop="successAmount"
            label="成功量"
            align="center"
            title-align="center"
            width="80">
          </el-table-column>

        </el-table>
      </div>

      <div class="right">
        <div style="padding: 10px;">
          <el-date-picker
            @change="time"
            value-format="yyyy-MM-dd HH:mm:ss"
            size="mini"
            class="shou"
            :editable='false'
            v-model="callTime1"
            type="datetimerange"
            range-separator="~"
            start-placeholder="操作开始时间"
            end-placeholder="操作结束时间">
          </el-date-picker><!-- 开始结束时间 -->
        </div>

        <div id="myChart" class="time"></div>

        <div id="towChart" class="time"></div>
      </div>


      <!--      <div style="margin-top:50px;margin-left: 20px; width: auto;" >-->
      <!--        &lt;!&ndash;      v-loading="loadingZy"&ndash;&gt;-->
      <!--          <el-table size="mini" header-align="center" border style="padding-top: 10px;" ref="multipleTable"-->
      <!--                    tooltip-effect="dark" :data="gridData">-->
      <!--            <el-table-column align="center" width="100" v-for="col in columns" :prop="col.prop" :label="col.label">-->
      <!--            </el-table-column>-->
      <!--          </el-table>-->
      <!--      </div>-->
    </div>


  </div>
</template>

<script>
import axios from "axios";
import {Message} from "element-ui";

export default {
  name: "index",
  data() {
    let aaa = this
    return {
      option:{
        //标题配置
        legend: {
          width:10,
          height:10,
          left:'center',
        },
        tooltip: {
          data: '通话时长',//标题名称
          show: true,
          formatter: function (params) {
            return aaa.fomartTime(params.data)
          }
        },

        xAxis: {
          type: 'category',
          axisLabel: {
            interval:0,      //坐标轴刻度标签的显示间隔(在类目轴中有效) 0:显示所有  1：隔一个显示一个 :3：隔三个显示一个...
            rotate:-10,    //标签倾斜的角度，显示不全时可以通过旋转防止标签重叠（-90到90）
            align: 'center',//横向对齐方式
            verticalAlign: 'top',//纵向对齐方式
            margin:15 ,//标签和x轴距离
            padding:[0, 0, 0, 20],//内边距
          },
          data: [],

        },
        // grid:{//直角坐标系内绘图网格
        //   show:true,//是否显示直角坐标系网格。[ default: false ]
        //   //left:"20%",//grid 组件离容器左侧的距离。
        //   right:"30px",
        //   borderColor:"#c45455",//网格的边框颜色
        //   bottom:"20%" //
        // },


        yAxis: {
          type: 'value',

          // interval :2,
          axisLabel: {
            textStyle: {
              //color: '#B03A5B'
            },
            // formatter:function (value, index) {
            //   return aaa.fomartTime(value)
            // }
            formatter:function (value, index) {
              return aaa.fomartTime(value)
            }
          },
        },
        series: [{
          name:'通话时长',//标题名称
          data: [],//这个数组我的单位是分钟
          type: 'bar',
          itemStyle: {    // 图形的形状
            color: '#19D4AE',//#5AB1EF
          },
          label: {
            normal: {
              show: true,
              position: 'top',
              formatter:function (a) {
                return aaa.fomartTime(a.data)
              }
            }
          }
        }],

      },//图表1数据
      option2:{
        //标题配置
        legend: {
          width:10,
          height:10,
          left:'center',
        },
        tooltip: {
          data: '通话次数',//标题名称
          show: true,
          formatter: function (params) {
            return aaa.frequency(params.data)
          }
        },
        xAxis: {
          type: 'category',
          axisLabel: {
            interval:0,      //坐标轴刻度标签的显示间隔(在类目轴中有效) 0:显示所有  1：隔一个显示一个 :3：隔三个显示一个...
            rotate:-10,    //标签倾斜的角度，显示不全时可以通过旋转防止标签重叠（-90到90）
            align: 'center',//横向对齐方式
            verticalAlign: 'top',//纵向对齐方式
            margin:15 ,//标签和x轴距离
            padding:[0, 0, 0, 20],//内边距
          },
          data: []
        },
        yAxis: {
          type: 'value',

          // interval :2,
          axisLabel: {
            textStyle: {
              //color: '#B03A5B'
            },
            // formatter:function (value, index) {
            //   return aaa.fomartTime(value)
            // }
            formatter:function (value, index) {
              return aaa.frequency(value)
            }
          },
        },
        series: [{
          name:'通话次数',//标题名称
          data: [],//这个数组我的单位是分钟
          type: 'bar',
          itemStyle: {    // 图形的形状
            color: '#5AB1EF',//
          },
          label: {
            normal: {
              show: true,
              position: 'top',
              formatter:function (a) {
                return a.data + '次'
              }
            }
          }
        }]
      },//图表2数据
      table1: false,//表一加载--坐席业务状态统计
      tableData1: [],//表一数据--坐席业务状态统计
      baseURL: this.$store.state.baseURL,
      // baseURL:'http://39.102.203.193:9090',
      timeValue1: [ this.month() , this.ShowDate(-1) + ' 00:00:00' ],
      timeDate: {
        beginDate: this.month(),
        overDate: this.ShowDate(-1) + ' 00:00:00',
        jobNumber:'',
      },
      seatNumber:'',//坐席号

      guid: 111,
      //排名数据
      oneHisData: [],
      timeValue2: [this.month(), this.ShowDate(-1) + ' 00:00:00'],

      // loadingZy: false,//坐席状态加载
      columns: [],//坐席状态列表
      gridData: [],//坐席状态数据
      tableCS:[],
      callTime1:[this.ShowDate(0) + ' 00:00:00',this.ShowDate(0) + ' 23:59:59'],
      callTime:{
        startTime:this.ShowDate(0) + ' 00:00:00',
        startTime2:this.ShowDate(0) + ' 23:59:59',
      },
    }
  },

  watch: {
    //guid: 'abc' ,// 值可以为methods的方法名
    // option(val,old){
    //   console.log(val,old)
    //   this.drawLine()
    // },
    option: 'abc' ,
  },
  methods: {
    //生成图表
    drawLine() {
      console.log(this.option)
      // 基于准备好的dom，初始化echarts实例
      //let myChart = this.$echarts.init(document.getElementById('myChart'))
      // 绘制图表
      this.$nextTick(()=>{
        this.$echarts.init(document.getElementById('myChart')).setOption(this.option,true);
        this.$echarts.init(document.getElementById('towChart')).setOption(this.option2,true);
        //this.$echarts.init(document.getElementById('towChart')).setOption(this.option,true);
      })

    },
    //数据转换成时间
    fomartTime(value) {
      let unit = ['分钟', '小时', '天'],
        day = 0, hour = 0, min = 0, second = 0, returnStr = 0,
        arrVal = value.toString().split(".");
      if (arrVal.length > 1) {
        second = parseFloat("0." + arrVal[1]);
        second *= 60;
        value = parseInt(arrVal[0]);
      }
      returnStr = value + unit[0];
      if (value >= 60) {
        hour = parseInt(value / 60);
        min = value % 60;
      }
      if (hour) {
        returnStr = hour + unit[1];
        if (min) {
          returnStr += min + unit[0]
        }
      }
      if (second) {
        returnStr += second.toFixed(0) + '秒'
      }
      return returnStr
    },
    //数据转换成次数
    frequency(value){
      return value + '次'
    },
    abc() {
      console.log(123)
    },
    ccc() {
      this.guid = 222
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
    //坐席状态搜索
    search(){
      console.log(this.timeDate)
      this.allDetails()
    },
    //清除搜索
    remove(){
      this.timeDate.jobNumber = ''
    },
    //坐席业务状态统计
    allDetails() {
      this.table1 = true
      axios({
        method: 'get',
        // url:`${this.baseURL}/record/handle/getdetailbydepartguidanddatedesignatdepartment`,
        url: `${this.baseURL}/record/handle/getdetailbydepartguidanddatedesignatdepartment${this.query(this.timeDate)}`,
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          'token': localStorage.token,
        },
      }).then(res => {
        // console.log(res)
        this.table1 = false
        this.tableData1 = res.data.data.dataList
        //this.timeConversion(1000)
        for (let a = 0; a < res.data.data.dataList.length; a++) {
          res.data.data.dataList[a].totalPostProcessingTime = this.timeConversion(parseInt(res.data.data.dataList[a].totalPostProcessingTime / 1000))
          res.data.data.dataList[a].maximumPostProcessingTime = this.timeConversion(parseInt(res.data.data.dataList[a].maximumPostProcessingTime / 1000))
          res.data.data.dataList[a].avgPostProcessingTime = this.timeConversion(parseInt(res.data.data.dataList[a].avgPostProcessingTime / 1000))

          res.data.data.dataList[a].averageWorkTime = this.timeConversion(parseInt(res.data.data.dataList[a].averageWorkTime / 1000))
          res.data.data.dataList[a].maximumWorkTime = this.timeConversion(parseInt(res.data.data.dataList[a].maximumWorkTime / 1000))
          res.data.data.dataList[a].totalWorkTime = this.timeConversion(parseInt(res.data.data.dataList[a].totalWorkTime / 1000))

          res.data.data.dataList[a].averageTalkTime = this.timeConversion(res.data.data.dataList[a].averageTalkTime)
          res.data.data.dataList[a].maximumTalkTime = this.timeConversion(res.data.data.dataList[a].maximumTalkTime)
          res.data.data.dataList[a].totalTalkTime = this.timeConversion(res.data.data.dataList[a].totalTalkTime)

          if (res.data.data.dataList[a].connectionRate !== '') {
            //toFixed(2) 保留几位小数
            res.data.data.dataList[a].connectionRate = (Number(res.data.data.dataList[a].connectionRate) * 100).toFixed(2) + '%'
          }
        }
        console.log(res)
      }).catch(err => {
        this.table1 = false
        console.log(err)
      })
    },
    //表一时间转换--坐席业务状态统计
    timeHisFive() {
      console.log(this.timeValue1)
      if (this.timeValue1 == null) {
        this.timeValue1 = []
      } else if (this.timeValue1.length !== 0) {
        this.timeDate.beginDate = this.timeValue1[0]
        this.timeDate.overDate = this.timeValue1[1]
        this.allDetails()
      }
    },
    //表一坐席状态数据导出--坐席业务状态统计
    exportTab1() {
      axios({
        method: 'get',
        url:`${this.baseURL}/record/handle/exportdetailbydepartguidanddatedesignatdepartment${this.query(this.timeDate)}`,
        // url: '${this.baseURL}/record/handle/exportdetailbydepartguidanddatedesignatdepartment',
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          'token': localStorage.token,
        },
        responseType: "blob",
        // data:this.from
      })
        .then(res => {
          console.log(res)
          if (res.data.type) {
            // // 文件下载
            const blob = new Blob([res.data], {
              type: "application/vnd.ms-excel"
            });
            let contentDisposition = res.headers['content-disposition'];
            let fileName = window.decodeURI(contentDisposition.substring(contentDisposition.indexOf('=') + 1));
            let link = document.createElement('a');
            link.href = URL.createObjectURL(blob); //Content-Disposition
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
          console.log(err)
          this.loading = false;
          this.$message.error("下载失败");
        });
    },
    //需要转换的时间秒
    timeConversion(value) {
      let theTime = parseInt(value); // 需要转换的时间秒
      let theTime1 = 0; // 分
      let theTime2 = 0; // 小时
      let theTime3 = 0; // 天
      if (theTime > 60) {
        theTime1 = parseInt(theTime / 60);
        theTime = parseInt(theTime % 60);
        if (theTime1 > 60) {
          theTime2 = parseInt(theTime1 / 60);
          theTime1 = parseInt(theTime1 % 60);
          if (theTime2 > 24) {
            // 大于24小时
            theTime3 = parseInt(theTime2 / 24);
            theTime2 = parseInt(theTime2 % 24);
          }
        }
      }
      let result = '';
      if (theTime > 0) {
        result = "" + parseInt(theTime) + "秒";
      }
      if (theTime1 > 0) {
        result = "" + parseInt(theTime1) + "分" + result;
      }
      if (theTime2 > 0) {
        result = "" + parseInt(theTime2) + "小时" + result;
      }
      if (theTime3 > 0) {
        result = "" + parseInt(theTime3) + "天" + result;
      }
      return result;
    },

    //当前月
    //new Date().getFullYear()+(new Date().getMonth() + 1).toString().padStart(2,'0')+"01 00:00:00"
    month() {
      // return new Date().getFullYear()+(new Date().getMonth() + 1).toString().padStart(2,'0')+"01 00:00:00"
      return new Date().getFullYear() + '-' + (new Date().getMonth() + 1).toString().padStart(2, '0') + "-01 00:00:00"
    },
    //时间转换
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

    //排名
    hisProcessed(data) {
      return new Promise((resolve, reject) => {
        axios({
          method: 'put',
          url: this.baseURL + '/demo/demo/getseatperformancemonitor',
          headers: {
            "Content-Type": "application/json;charset=UTF-8",
            'token': localStorage.token,
          },
          data: data
        }).then(res => {
          console.log('这个是请求参数', res)
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    //排名
    hisOne() {
      this.hisProcessed({allocateTime: this.timeValue2[0], allocateTime2: this.timeValue2[1]}).then(res => {
        for (let a = 0; a < res.data.data.rankList.length; a++) {
          res.data.data.rankList[a].ranking = a + 1
        }
        console.log(res)
        this.oneHisData = res.data.data.rankList
      }).catch(err => {
        console.log(err)
      })
    },
    // 排名数据时间切换
    timeHisTwo() {
      console.log(this.timeValue2)
      if (this.timeValue2 == null) {
        this.timeValue2 = []
      } else {
        console.log(this.timeValue2)
        this.hisOne()
      }
      // axios({
      //   method: 'get',
      //   url: `${this.baseURL}/zyb/monitor/getallcreate/${this.valuesj[0]}/${this.valuesj[1]}`,
      //   headers: {
      //     "Content-Type": "application/json;charset=UTF-8",
      //     'token': localStorage.token,
      //   },
      // }).then(res => {
      //   console.log(res)
      //   for (var a = 0; a < res.data.x.length ; a++){
      //       this.twoHisData.rows[a].状态 = res.data.x[a+1]
      //       this.twoHisData.rows[a].数量 = res.data.y[a+1]
      //     }
      // }).catch(err => {
      //   console.log(err)
      // })
    },
    //坐席状态
    state() {
      clearInterval(this.timer)
      this.timer = setInterval(this.state, 10000)
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
        console.log(res)
        this.tableCS = res.data.data.data
        let arr = []
        for (let a = 0; a < res.data.data.data.length; a++) {
          let obj = {}
          obj.label = res.data.data.data[a].name
          obj.prop = res.data.data.data[a].name
          // arr.push(res.data.data.data[a].name)
          // this.columns.push(obj)
          arr.push(obj)
          //console.log(obj)
        }
        console.log(arr)
        console.log(this.columns)
        let arr2 = []
        let aa = {}
        for (let i = 0; i < res.data.data.data.length; i++) {
          if (res.data.data.data[i].status == '休息') {
            res.data.data.data[i].status = "☕休息中"
          } else if (res.data.data.data[i].status == '离线') {
            res.data.data.data[i].status = "❌离线"
          } else if (res.data.data.data[i].status == '工作中') {
            res.data.data.data[i].status = "✅工作中"
          } else if (res.data.data.data[i].status == '振铃中') {
            res.data.data.data[i].status = "🔔振铃中"
          } else if (res.data.data.data[i].status == '通话中') {
            res.data.data.data[i].status = "📱通话中"
          } else if (res.data.data.data[i].status == '后处理中') {
            res.data.data.data[i].status = "🔄后处理中"
          }
          this.$set(aa, res.data.data.data[i].name, res.data.data.data[i].status)
        }
        arr2.push(aa)
        //this.gridData.push(aa)
        // this.loadingZy = false
        this.gridData = arr2
        this.columns = arr
        console.log(this.gridData)
        console.log(this.columns)
      }).catch(err => {
        console.log(err)
        // this.loadingZy = false
      })
    },
    // 坐席通话时长监控
    callDuration(){
      console.log(this.callTime)
      axios({
        method: 'put',
        url: this.baseURL + '/phonebills/calllog/getseatcalltimemonitor',
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          'token': localStorage.token,
        },
        data: this.callTime
      }).then(res => {
        console.log(res)
        let x = []
        let y = []
        for (let i = 0; i < res.data.data.list.length; i++) {
          x.push(res.data.data.list[i].jobNumber)
          y.push(res.data.data.list[i].billsMin)
        }
        this.option.series[0].data = y
        this.option.xAxis.data = x
        console.log(x)
        console.log(y)
        console.log(this.option)
        this.drawLine()
      }).catch(err => {
        console.log(err)
      })
    },
    //坐席通话次数
    numberOfCalls(){
      axios({
        method: 'put',
        url: this.baseURL + '/phonebills/calllog/getseatcallnummonitor',
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          'token': localStorage.token,
        },
        data: this.callTime
      }).then(res => {
        console.log(res)
        let x = []
        let y = []
        for (let i = 0; i < res.data.data.list.length; i++) {
          x.push(res.data.data.list[i].jobNumber)
          y.push(res.data.data.list[i].callNum)
        }
        this.option2.series[0].data = y
        this.option2.xAxis.data = x
        console.log(x)
        console.log(y)
        console.log(this.option)
        this.drawLine()
      }).catch(err => {
        console.log(err)
      })
    },
    //操作开始结束时间
    time(val){
      if(val == null){
        val = []
        this.callTime.startTime =this.ShowDate(0) + ' 00:00:00'
        this.callTime.startTime2 = this.ShowDate(0) + ' 23:59:59'
      }else {
        this.callTime.startTime = val[0]
        this.callTime.startTime2 = val[1]
      }
      console.log(val)
      this.callDuration()
      this.numberOfCalls()
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
    this.drawLine();//加载图表
  },
  created() {
    this.branch(11)
    this.callDuration()//生成图表数据
    this.allDetails()
    this.hisOne()
    this.state()
    this.numberOfCalls()
    // console.log(this.query(this.aa))
  },
  //页面销毁
  destroyed() {
    clearInterval(this.timer);
    this.timer = null;
  },

}
</script>

<style scoped>
.Seat{
  width: 12.5%;
  height: 50px;
  padding: 5px;
  border-right: #cccccc 1px solid;
  border-bottom: #cccccc 1px solid;
  text-align: center;
  line-height: 40px;
  /* 超出省略号 */
  white-space:nowrap;
  overflow:hidden;
  text-overflow:ellipsis;
}
.Seats{
  margin: 10px 0;
  border:#cccccc solid 1px;
  display: flex;
  flex-wrap: wrap;
}
.seatCount{
  display: flex;
  width: 100%;
}
.left{
  margin-top: 10px;
}
.right{
  width: 100%;
  margin-top: 10px;
}
.time{
  width: 100%;
  height: 500px;
  overflow: auto;
}
.seat{
  width: 100%;
  height: 45vh;
  overflow: auto;
}
</style>
