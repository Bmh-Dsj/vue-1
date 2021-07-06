<template>
  <div>
    <!--    <p>实时监控</p>-->
    <!--      :extend="chartExtend"-->
    <!--      <ve-histogram :data="chartData" :settings="chartSettings"></ve-histogram>-->
    <!--    <div style="margin: 30px;">-->
    <!--    </div>-->
    <!--    当天分配 未处理-已处理     第一个柱状图-->
    <div class="chartDiv" @click="dialog1 = true">
      <p>当天分配 未处理-已处理</p>
      <ve-histogram
        height="50vh"
        class="myve"
        :data="oneHisData"
        :extend="oneHisExtend"
      ></ve-histogram>
    </div>

    <!--    当天分配已处理详情        第一个饼状图-->
    <div class="chartDiv" @click="dialog2 = true">
      <p>当天分配已处理详情</p>
      <ve-pie
        height="50vh"
        class="myve"
        :data="onePieData"
        :legend-visible="false"
        :extend="onePieExtend">
      </ve-pie>
    </div>

    <!--    总分配 未处理-已处理       第二个柱状图-->
    <div class="chartDiv" @click="dialog3 = true">
      <!--      <div style="box-sizing: border-box">-->
      <p>总分配 未处理-已处理</p>
      <!--        <el-date-picker-->
      <!--          size="mini"-->
      <!--          value-format="yyyy-MM-dd HH:mm:ss"-->
      <!--          @change="timeHisTwo"-->
      <!--          v-model="timeValue1"-->
      <!--          type="datetimerange"-->
      <!--          range-separator="至"-->
      <!--          start-placeholder="开始日期"-->
      <!--          end-placeholder="结束日期">-->
      <!--        </el-date-picker>-->
      <!--      </div>-->
      <ve-histogram
        height="50vh"
        class="myve"
        :data="twoHisData"
        :extend="oneHisExtend"
      ></ve-histogram>
    </div>

    <!--    总分配 已处理详情         第二个饼状图-->
    <div class="chartDiv" @click="dialog4 = true">
      <!--      <div style="box-sizing: border-box">-->
      <p>总分配 已处理详情</p>
      <!--        <el-date-picker-->
      <!--          value-format="yyyy-MM-dd HH:mm:ss"-->
      <!--          size="mini"-->
      <!--          @change="timePieTwo"-->
      <!--          v-model="timeValue2"-->
      <!--          type="datetimerange"-->
      <!--          range-separator="至"-->
      <!--          start-placeholder="开始日期"-->
      <!--          end-placeholder="结束日期">-->
      <!--        </el-date-picker>-->
      <!--      </div>-->
      <ve-pie
        height="50vh"
        :legend-visible="false"
        class="myve"
        :data="twoPieData"
        :extend="onePieExtend"
      ></ve-pie>
    </div>

    <!--    批次统计 未处理-已处理     第三个柱状图-->
    <div class="chartDiv" @click="dialog5 = true">
      <p>批次统计 未处理-已处理</p>
      <!--      <el-select v-model="value1" placeholder="请选择">-->
      <!--        <el-option-->
      <!--          v-for="item in options1"-->
      <!--          :key="item.value"-->
      <!--          :label="item.label"-->
      <!--          :value="item.value">-->
      <!--        </el-option>-->
      <!--      </el-select>-->
      <ve-histogram
        height="50vh"
        class="myve"
        :data="threeHisData"
        :extend="oneHisExtend"
      ></ve-histogram>
    </div>

    <!--    批次统计 已处理详情       第三个饼状图-->
    <div class="chartDiv" @click="dialog6 = true">
      <p>批次统计 已处理详情</p>
      <!--      <el-select v-model="value2" placeholder="请选择">-->
      <!--        <el-option-->
      <!--          v-for="item in options2"-->
      <!--          :key="item.value"-->
      <!--          :label="item.label"-->
      <!--          :value="item.value">-->
      <!--        </el-option>-->
      <!--      </el-select>-->
      <ve-pie
        height="50vh"
        class="myve"
        :legend-visible="false"
        :data="threePieData"
        :extend="onePieExtend"
      ></ve-pie>
    </div>

    <!--    当天分配 坐席已处理-未处理   第四个柱状图-->
    <!--    <div class="chartDiv" @click="dialog7 = true">-->
    <!--      <p>当天分配 坐席已处理-未处理</p>-->
    <!--&lt;!&ndash;      <div style="box-sizing: border-box">&ndash;&gt;-->
    <!--&lt;!&ndash;        <p>批次统计 已处理详情</p>&ndash;&gt;-->
    <!--&lt;!&ndash;        <el-date-picker&ndash;&gt;-->
    <!--&lt;!&ndash;          size="mini"&ndash;&gt;-->
    <!--&lt;!&ndash;          v-model="value1"&ndash;&gt;-->
    <!--&lt;!&ndash;          type="datetimerange"&ndash;&gt;-->
    <!--&lt;!&ndash;          range-separator="至"&ndash;&gt;-->
    <!--&lt;!&ndash;          start-placeholder="开始日期"&ndash;&gt;-->
    <!--&lt;!&ndash;          end-placeholder="结束日期">&ndash;&gt;-->
    <!--&lt;!&ndash;        </el-date-picker>&ndash;&gt;-->
    <!--&lt;!&ndash;      </div>&ndash;&gt;-->
    <!--      <ve-histogram-->
    <!--        height="50vh"-->
    <!--        class="myve"-->
    <!--        :data="fourHisData"-->
    <!--      ></ve-histogram>-->
    <!--    </div>-->

    <!--    总分配 坐席已处理-未处理    第五个柱状图-->
    <div class="chartDiv" @click="dialog8 = true">
      <!--      <div style="box-sizing: border-box">-->
      <p>总分配 未处理-已处理</p>
      <!--        <el-date-picker-->
      <!--          size="mini"-->
      <!--          value-format="yyyy-MM-dd HH:mm:ss"-->
      <!--          @change="timeHisFive"-->
      <!--          v-model="timeValue3"-->
      <!--          type="datetimerange"-->
      <!--          range-separator="至"-->
      <!--          start-placeholder="开始日期"-->
      <!--          end-placeholder="结束日期">-->
      <!--        </el-date-picker>-->
      <!--      </div>-->
      <ve-histogram
        height="50vh"
        class="myve"
        :data="fiveHisData"
      ></ve-histogram>
    </div>

    <!--    批次统计 已处理详情       第四个饼状图-->
    <div class="chartDiv" @click="dialog9 = true">
      <p>批次统计 呼叫状态统计</p>
      <!--      <el-select v-model="value3" placeholder="请选择">-->
      <!--        <el-option-->
      <!--          v-for="item in options3"-->
      <!--          :key="item.value"-->
      <!--          :label="item.label"-->
      <!--          :value="item.value">-->
      <!--        </el-option>-->
      <!--      </el-select>-->
      <ve-pie
        height="50vh"
        class="myve"
        :legend-visible="false"
        :data="fourPieData"
        :extend="onePieExtend"
      ></ve-pie>
    </div>

    <el-dialog width="40%" title="当天分配 未处理-已处理" :visible.sync="dialog1">
      <ve-histogram
        :events="this.hisProcessedExport1"
        :data="oneHisData"
        :extend="oneHisExtend"
      ></ve-histogram>
    </el-dialog>

    <el-dialog width="40%" title="当天分配已处理详情" :visible.sync="dialog2">
      <ve-pie
        :events="this.pieDetailExport1"
        :data="onePieData"
        :legend-visible="false"
        :extend="onePieExtend"></ve-pie>
    </el-dialog>

    <el-dialog width="40%" title="总分配 未处理-已处理" :visible.sync="dialog3">
      <el-date-picker
        size="mini"
        value-format="yyyy-MM-dd HH:mm:ss"
        @change="timeHisTwo"
        v-model="timeValue1"
        type="datetimerange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期">
      </el-date-picker>
      <ve-histogram
        :events="this.hisProcessedExport2"
        :data="twoHisData"
        :extend="oneHisExtend"
      ></ve-histogram>
    </el-dialog>

    <el-dialog width="40%" title="总分配 已处理详情" :visible.sync="dialog4">
      <el-date-picker
        value-format="yyyy-MM-dd HH:mm:ss"
        size="mini"
        @change="timePieTwo"
        v-model="timeValue2"
        type="datetimerange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期">
      </el-date-picker>
      <ve-pie
        :events="this.pieDetailExport2"
        :legend-visible="false"
        class="myve"
        :data="twoPieData"
        :extend="onePieExtend"
      ></ve-pie>
    </el-dialog>

    <el-dialog width="40%" title="批次统计 未处理-已处理" :visible.sync="dialog5">
      <el-select v-model="value1" placeholder="请选择">
        <el-option
          v-for="item in options1"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <el-date-picker
        value-format="yyyy-MM-dd HH:mm:ss"
        size="mini"
        @change="timeHisThree"
        v-model="timeValue4"
        type="datetimerange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期">
      </el-date-picker>
      <ve-histogram
        :events="this.hisProcessedExport3"
        class="myve"
        :data="threeHisData"
        :extend="oneHisExtend"
      ></ve-histogram>
    </el-dialog>

    <el-dialog width="40%" title="批次统计 已处理详情" :visible.sync="dialog6">
      <el-select v-model="value2" placeholder="请选择">
        <el-option
          v-for="item in options2"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <el-date-picker
        value-format="yyyy-MM-dd HH:mm:ss"
        size="mini"
        @change="timePisThree"
        v-model="timeValue5"
        type="datetimerange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期">
      </el-date-picker>
      <ve-pie
        :events="this.pieDetailExport3"
        :legend-visible="false"
        :data="threePieData"
        :extend="onePieExtend"
      ></ve-pie>
    </el-dialog>

    <el-dialog width="40%" title="当天分配 坐席已处理-未处理" :visible.sync="dialog7">
      <ve-histogram
        :events="this.hisSeatsExport1"
        class="myve"
        :data="fourHisData"
      ></ve-histogram>
    </el-dialog>

    <el-dialog width="40%" title="总分配 未处理-已处理" :visible.sync="dialog8">
      <el-date-picker
        size="mini"
        value-format="yyyy-MM-dd HH:mm:ss"
        @change="timeHisFive"
        v-model="timeValue3"
        type="datetimerange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期">
      </el-date-picker>
      <ve-histogram
        class="myve"
        :data="fiveHisData"
        :events="this.hisSeatsExport2"
      ></ve-histogram>
    </el-dialog>

    <el-dialog width="40%" title="批次统计 呼叫状态统计" :visible.sync="dialog9">
      <el-select v-model="value3" placeholder="请选择">
        <el-option
          v-for="item in options3"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <el-date-picker
        value-format="yyyy-MM-dd HH:mm:ss"
        size="mini"
        @change="timePisFour"
        v-model="timeValue6"
        type="datetimerange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期">
      </el-date-picker>
      <ve-pie
        :events="this.pieFourExport1"
        :data="fourPieData"
        :extend="onePieExtend"
      ></ve-pie>
    </el-dialog>
  </div>
</template>

<script>
import axios from "axios";
import {unworklist} from "@/api/user";

export default {
  name: "index",

  data() {
    //第一个柱状图配置
    this.oneHisExtend = {

      itemStyle: {
        color: (params) => { //设置每个柱子的颜色
          return ["#00FF7F", '#FF4500',][params.dataIndex]
          //       颜色                  // 配置在每根柱子上
        }
      },
      // barWidth: 10,// 宽度
      color: {},

    }
    //第一个饼图颜色配置
    this.onePieExtend = {
      series: {
        center: ['50%', '50%'],
        radius: '40%',
      },

      // orient: 'vertical',
      // left: '70%',  //图例距离左的距离
      // y: 'center',  //图例上下居中
      // textStyle: { //图例文字的样式
      //   fontSize: 10
      // },
      avoidLabelOverlap: true,
      color: ['#DC143C', '#bbe2e8', "#FF6347", "#FFD700", '#800080', "#FF69B4", "#7CFC00", '#19D4AE', "#FF1493", "#4169E1", "#61a0a8", "#FF4500", "#d48265", "#9932CC", "#00BFFF", "#00FF7F"],
    }
    ////导出方法
    let now = this
    //柱一
    this.hisProcessedExport1 = {
      click: function (e) {
        now.hisProcessedExport({
          allocateTime: now.timeOfDay[0],
          allocateTime2: now.timeOfDay[1],
          sourceChannel: "",
          flag: e.name,
          jobNumber: Number,
        }).then(res => {
          console.log(res)
          now.download(res)
        }).catch(err => {
          console.log(err)
        })
        console.log(e.seriesName)
        console.log(e.name)
      }
    }
    //柱二
    this.hisProcessedExport2 = {
      click: function (e) {
        now.hisProcessedExport({
          allocateTime: now.timeValue1[0],
          allocateTime2: now.timeValue1[1],
          sourceChannel: "",
          flag: e.name,
          jobNumber: Number,
        }).then(res => {
          console.log(res)
          now.download(res)
        }).catch(err => {
          console.log(err)
        })
        console.log(e.seriesName)
        console.log(e.name)
      }
    }
    //柱三
    this.hisProcessedExport3 = {
      click: function (e) {
        now.hisProcessedExport({
          allocateTime: now.timeValue4[0],
          allocateTime2: now.timeValue4[1],
          sourceChannel: now.value1,
          flag: e.name,
          jobNumber: Number,
        }).then(res => {
          console.log(res)
          now.download(res)
        }).catch(err => {
          console.log(err)
        })
        console.log(e.seriesName)
        console.log(e.name)
      }
    }
    //饼一
    this.pieDetailExport1 = {
      click: function (e) {
        now.pieDetailExport({
          allocateTime: now.timeOfDay[0],
          allocateTime2: now.timeOfDay[1],
          sourceChannel: "",
          flag: e.name,
          jobNumber: Number,
        }).then(res => {
          console.log(res)
          now.download(res)
        }).catch(err => {
          console.log(err)
        })
        console.log(e.name)
      }
    }
    //饼二
    this.pieDetailExport2 = {
      click: function (e) {
        now.pieDetailExport({
          allocateTime: now.timeValue2[0],
          allocateTime2: now.timeValue2[1],
          sourceChannel: "",
          flag: e.name,
          jobNumber: Number,
        }).then(res => {
          console.log(res)
          now.download(res)
        }).catch(err => {
          console.log(err)
        })
        console.log(e.name)
      }
    }
    //饼三
    this.pieDetailExport3 = {
      click: function (e) {
        now.pieDetailExport({
          allocateTime: now.timeValue5[0],
          allocateTime2: now.timeValue5[1],
          sourceChannel: now.value2,
          flag: e.name,
          jobNumber: Number,
        }).then(res => {
          console.log(res)
          now.download(res)
        }).catch(err => {
          console.log(err)
        })
        console.log(e.name)
      }
    }
    //比较柱一
    this.hisSeatsExport1 = {
      click: function (e) {
        now.hisSeatsExport({
          allocateTime: now.timeOfDay[0],
          allocateTime2: now.timeOfDay[1],
          sourceChannel: "",
          flag: e.seriesName,
          jobNumber: e.name,
        }).then(res => {
          console.log(res)
          now.download(res)
        }).catch(err => {
          console.log(err)
        })
        console.log(e.seriesName)
        console.log(e.name)
      }
    }
    //比较柱二
    this.hisSeatsExport2 = {
      click: function (e) {
        // now.jobNumber = e.name
        // now.flag = e.seriesName
        now.hisSeatsExport({
          allocateTime: now.timeValue3[0],
          allocateTime2: now.timeValue3[1],
          sourceChannel: "",
          flag: e.seriesName,
          jobNumber: e.name,
        }).then(res => {
          console.log(res)
          now.download(res)
        }).catch(err => {
          console.log(err)
        })
        console.log(e.seriesName)
        console.log(e.name)
      }
    }
    //状态饼
    this.pieFourExport1 = {
      click: function (e) {
        now.pieFourExport({
          allocateTime: now.timeValue6[0],
          allocateTime2: now.timeValue6[1],
          sourceChannel: now.value3,
          flag: e.name,
          jobNumber: Number,
        }).then(res => {
          console.log(res)
          now.download(res)
        }).catch(err => {
          console.log(err)
        })
        console.log(e.name)
      }
    }
    return {
      dialog1: false,
      dialog2: false,
      dialog3: false,
      dialog4: false,
      dialog5: false,
      dialog6: false,
      dialog7: false,
      dialog8: false,
      dialog9: false,
      baseURL: this.$store.state.baseURL,
      // baseURL:'http://39.102.203.193:9090',
      timeValue1: [this.month(), this.ShowDate(-1) + ' 00:00:00'],
      timeValue2: [this.month(), this.ShowDate(-1) + ' 00:00:00'],
      timeValue3: [this.month(), this.ShowDate(-1) + ' 00:00:00'],
      timeValue4: [this.month(), this.ShowDate(-1) + ' 00:00:00'],
      timeValue5: [this.month(), this.ShowDate(-1) + ' 00:00:00'],
      timeValue6: [this.month(), this.ShowDate(-1) + ' 00:00:00'],
      timeOfDay: [this.ShowDate(0) + ' 00:00:00', this.ShowDate(0) + ' 23:59:59'],//当天时间
      totalTime: [this.month(), this.ShowDate(-1) + ' 00:00:00'],//总时间
      value1: 'H',
      options1: [
        {
          value: 'J-1',
          label: 'J-1'
        }, {
          value: 'H',
          label: 'H'
        }, {
          value: 'J-2',
          label: 'J-2'
        },
      ],//未处理-已处理 批次下拉菜单
      value2: 'H',
      options2: [
        {
          value: 'J-1',
          label: 'J-1'
        }, {
          value: 'H',
          label: 'H'
        }, {
          value: 'J-2',
          label: 'J-2'
        },
      ],//已处理详情 批次下拉菜单
      value3: 'H',
      options3: [
        {
          value: 'J-1',
          label: 'J-1'
        }, {
          value: 'H',
          label: 'H'
        }, {
          value: 'J-2',
          label: 'J-2'
        },
      ],//呼叫状态统计  批次下拉菜单
      colorList: ['#19D4AE', "#5AB1EF", "#FF6347", "#FFD700", "#61a0a8", "#d48265", "#A8E6CE", "#00BFFF", "#00FF7F"],//全局颜色
      // vchartsConfig: {
      //   setting: {
      //     // 别称
      //     labelMap: {
      //       // 'area': '状态',
      //       // 'count': '数量',
      //     },
      //     itemStyle: {
      //       // normal: {
      //         color: (params)=> { //设置每个柱子的颜色
      //           return this.colorList[params.dataIndex]
      //         }
      //       // },
      //       // color: "red", //全局颜色
      //     },
      //   },
      // },

      //第一个柱状图数据
      oneHisData: {
        columns: ["状态", "数量"],
        rows: [
          {状态: "", 数量: Number},
          {状态: "", 数量: Number},
        ],

      },
      //第一个饼图数据
      onePieData: {
        columns: ['接通状态', '数量'],
        rows: []
      },
      //第二个柱状图数据
      twoHisData: {
        columns: ["状态", "数量"],
        rows: [
          {"状态": "111", "数量": '2021-04-01 00:11:00'},
          {"状态": "222", "数量": '2021-04-01 00:21:00'},
        ],

      },
      //第二个饼图数据
      twoPieData: {
        columns: ['接通状态', '数量'],
        rows: []
      },
      //第三个柱状图数据
      threeHisData: {
        columns: ["状态", "数量"],
        rows: [
          // {"状态": "", "数量": Number},
          // {"状态": "", "数量": Number},
        ],

      },
      //第三个饼图数据
      threePieData: {
        columns: ['接通状态', '数量'],
        rows: []
      },
      //第四个柱状图 比较1
      fourHisData: {
        columns: ['坐席号', '总量', '未处理', '已处理'],
        rows: [
          // { 坐席号: Number, 总量: Number, 未处理: Number, 已处理: Number },
          // { 坐席号: Number, 总量: Number, 未处理: Number, 已处理: Number },
          // { '坐席号': '23', '总量': 2923, '未处理': 2623, '已处理': 760 },
          // { '坐席号': '25', '总量': 1723, '未处理': 1423, '已处理': 409 },
        ]
      },
      //第五个柱状图 比较2
      fiveHisData: {
        columns: ['坐席号', '总量', '未处理', '已处理'],
        rows: [
          // { 坐席号: Number, 总量: Number, 未处理: Number, 已处理: Number },
          // { 坐席号: Number, 总量: Number, 未处理: Number, 已处理: Number },
          // { '坐席号': '23', '总量': 2923, '未处理': 2623, '已处理': 760 },
          // { '坐席号': '25', '总量': 1723, '未处理': 1423, '已处理': 409 },
        ]
      },
      //第四个饼状图
      fourPieData: {
        columns: ['接通状态', '数量'],
        rows: []
      },
      flag: '',
      jobNumber: Number,
    }
  },
  methods: {
    //console.log(this.ShowDate(-1)+' 00:00:00')

    //第一个柱状图
    // hisOne(){
    //   axios({
    //     method: 'get',
    //     url: this.baseURL + '/hetao/monitor/gettodayallocate',
    //     headers: {
    //       "Content-Type": "application/json;charset=UTF-8",
    //       'token': localStorage.token,
    //     },
    //   }).then(res => {
    //     console.log(res)
    //     let rows = []
    //     for (let a = 0; a < res.data.x.length ; a++){
    //       if(res.data.x[a+1]){
    //         let row = {}
    //         row.状态 = res.data.x[a+1]
    //         row.数量 = res.data.y[a+1]
    //         rows.push(row)
    //       }
    //     }
    //     this.oneHisData.rows = rows
    //     // console.log(this.oneHisData.rows)
    //     // this.oneHisData.rows[0].数量 = res.data.processed
    //     // this.oneHisData.rows[1].数量 = res.data.untreated
    //   }).catch(err => {
    //     console.log(err)
    //   })
    // },

    //第一个饼状图
    // pieOne(){
    //   axios({
    //     method: 'get',
    //     url: this.baseURL + '/hetao/monitor/gettodaydetail',
    //     headers: {
    //       "Content-Type": "application/json;charset=UTF-8",
    //       'token': localStorage.token,
    //     },
    //   }).then(res => {//onePieData
    //     let rows = []
    //     for (let a = 0; a < res.data.y.length ; a++){
    //       let row = {}
    //       row.接通状态 = res.data.x[0][a]
    //       row.数量 = res.data.y[a]
    //       rows.push(row)
    //     }
    //     this.onePieData.rows = rows
    //     // console.log(this.onePieData.rows)
    //     // console.log(rows)
    //     // console.log(res.data.x)
    //     // console.log(res.data.y)
    //
    //   }).catch(err => {
    //     console.log(err)
    //   })
    // },

    //第二个柱状图
    // hisTwo(){
    //   axios({
    //     method: 'get',
    //     url:`${this.baseURL}/hetao/monitor/getallcreate/${this.timeValue1[0]}/${this.timeValue1[1]}`,
    //     headers: {
    //       "Content-Type": "application/json;charset=UTF-8",
    //       'token': localStorage.token,
    //     },
    //   }).then(res => {
    //     // console.log(res)
    //     let rows = []
    //     for (let a = 0; a < res.data.x.length ; a++){
    //       if(res.data.x[a+1]){
    //         let row = {}
    //         row.状态 = res.data.x[a+1]
    //         row.数量 = res.data.y[a+1]
    //         rows.push(row)
    //       }
    //     }
    //     this.twoHisData.rows = rows
    //     // for (var a = 0; a < res.data.x.length ; a++){
    //     //   this.twoHisData.rows[a].状态 = res.data.x[a+1]
    //     //   this.twoHisData.rows[a].数量 = res.data.y[a+1]
    //     //
    //     // }
    //   }).catch(err => {
    //     console.log(err)
    //   })
    // },

    //第二个饼状图
    // pieTwo(){//
    //   axios({
    //     method: 'get',
    //     url:`${this.baseURL}/hetao/monitor/getalldetail/${this.timeValue2[0]}/${this.timeValue2[1]}`,
    //     headers: {
    //       "Content-Type": "application/json;charset=UTF-8",
    //       'token': localStorage.token,
    //     },
    //   }).then(res => {
    //     let rows = []
    //     for (let a = 0; a < res.data.y.length ; a++){
    //       let row = {}
    //       row.接通状态 = res.data.x[0][a]
    //       row.数量 = res.data.y[a]
    //       rows.push(row)
    //     }
    //     this.twoPieData.rows = rows
    //     // console.log(res)
    //     // for (var a = 0; a < res.data.x.length ; a++){
    //     //   this.twoPieData.rows[a].接通状态 = res.data.x[0][a]
    //     //   this.twoPieData.rows[a].数量 = res.data.y[a]
    //     //
    //     // }
    //     // console.log(res.data.x)
    //     // console.log(res.data.y)
    //   }).catch(err => {
    //     console.log(err)
    //   })
    // },

    //第三个柱状图
    // hisThree(){
    //   axios({
    //     method: 'get',
    //     url: this.baseURL + '/hetao/monitor/getdatasourceallocate/'+this.value1,
    //     headers: {
    //       "Content-Type": "application/json;charset=UTF-8",
    //       'token': localStorage.token,
    //     },
    //   }).then(res => {
    //     let rows = []
    //     for (let a = 0; a < res.data.x.length ; a++){
    //       if(res.data.x[a+1]){
    //         let row = {}
    //         row.状态 = res.data.x[a+1]
    //         row.数量 = res.data.y[a+1]
    //         rows.push(row)
    //       }
    //     }
    //     this.threeHisData.rows = rows
    //     // console.log(res)
    //     // for (var a = 0; a < res.data.x.length ; a++){
    //     //   this.threeHisData.rows[a].状态 = res.data.x[a+1]
    //     //   this.threeHisData.rows[a].数量 = res.data.y[a+1]
    //     // }
    //     // this.oneHisData.rows[0].数量 = res.data.processed
    //     // this.oneHisData.rows[1].数量 = res.data.untreated
    //   }).catch(err => {
    //     console.log(err)
    //   })
    // },

    //第三个饼状图
    // pieThree(){
    //   axios({
    //     method: 'get',
    //     url: this.baseURL + '/hetao/monitor/getdatasourcedetail/'+this.value2,
    //     headers: {
    //       "Content-Type": "application/json;charset=UTF-8",
    //       'token': localStorage.token,
    //     },
    //   }).then(res => {
    //     let rows = []
    //     for (let a = 0; a < res.data.y.length ; a++){
    //       let row = {}
    //       row.接通状态 = res.data.x[0][a]
    //       row.数量 = res.data.y[a]
    //       rows.push(row)
    //     }
    //     this.threePieData.rows = rows
    //
    //     // console.log(res)
    //     // for (var a = 0; a < res.data.x.length ; a++){
    //     //   this.threePieData.rows[a].接通状态 = res.data.x[0][a]
    //     //   this.threePieData.rows[a].数量 = res.data.y[a]
    //     //
    //     // }
    //     // console.log(res.data.x)
    //     // console.log(res.data.y)
    //   }).catch(err => {
    //     console.log(err)
    //   })
    // },

    //比较1 第四个柱状图
    // hisFour(){
    //   axios({
    //     method: 'get',
    //     url: this.baseURL + '/hetao/monitor/gettodayseatallocate',
    //     headers: {
    //       "Content-Type": "application/json;charset=UTF-8",
    //       'token': localStorage.token,
    //     },
    //   }).then(res => {
    //     // console.log(res)
    //     let rows = []
    //     for (let a = 0; a < res.data.length ; a++){
    //       let row = {}
    //       row.坐席号 = res.data[a].坐席
    //       row.总量 = res.data[a].总量
    //       row.未处理 = res.data[a].未处理
    //       row.已处理 = res.data[a].已处理
    //       rows.push(row)
    //     }
    //     this.fourHisData.rows = rows
    //     // console.log(rows)
    //     // console.log(this.fourHisData.rows)
    //   }).catch(err => {
    //     console.log(err)
    //   })
    // },

    //比较2 第五个柱状图
    // hisFive(){
    //   axios({
    //     method: 'get',
    //     url:`${this.baseURL}/hetao/monitor/getallseatallocate/${this.timeValue3[0]}/${this.timeValue3[1]}`,
    //     headers: {
    //       "Content-Type": "application/json;charset=UTF-8",
    //       'token': localStorage.token,
    //     },
    //   }).then(res => {
    //     // console.log(res)
    //     let rows = []
    //     for (let a = 0; a < res.data.length ; a++){
    //       let row = {}
    //       row.坐席号 = res.data[a].坐席
    //       row.总量 = res.data[a].总量
    //       row.未处理 = res.data[a].未处理
    //       row.已处理 = res.data[a].已处理
    //       rows.push(row)
    //     }
    //     this.fiveHisData.rows = rows
    //     // console.log(res)
    //     // console.log(this.fourHisData.rows)
    //   }).catch(err => {
    //     console.log(err)
    //   })
    // },

    //第四个饼状图
    pieFour() {
      axios({
        method: 'put',
        url: this.baseURL + '/hetao/monitor/getdatasourcestatusclassmonitor',//+this.value3
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          'token': localStorage.token,
        },
        data: {
          allocateTime: this.timeValue6[0],
          allocateTime2: this.timeValue6[1],
          sourceChannel: this.value3
        }
      }).then(res => {
        let rows = []
        for (let a = 0; a < res.data.y.length; a++) {
          let row = {}
          row.接通状态 = res.data.x[0][a]
          row.数量 = res.data.y[a]
          rows.push(row)
        }
        this.fourPieData.rows = rows

        // console.log(res)
        // for (var a = 0; a < res.data.x.length ; a++){
        //   this.threePieData.rows[a].接通状态 = res.data.x[0][a]
        //   this.threePieData.rows[a].数量 = res.data.y[a]
        //
        // }
        // console.log(res.data.x)
        // console.log(res.data.y)
      }).catch(err => {
        console.log(err)
      })
    },
    //第四个饼状图 时间切换
    timePisFour() {
      if (this.timeValue6 == null) {
        this.timeValue6 = []
      } else {
        this.pieFour()
      }
      console.log(this.timeValue6)
    },

    //总分配时间 第二个柱状图时间切换
    timeHisTwo() {
      if (this.timeValue1 == null) {
        this.timeValue1 = []
      } else {
        console.log(this.timeValue1)
        this.hisTwo()
      }
      // axios({
      //   method: 'get',
      //   url: `${this.baseURL}/hetao/monitor/getallcreate/${this.valuesj[0]}/${this.valuesj[1]}`,
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
    //第二个饼状图时间切换
    timePieTwo() {
      if (this.timeValue2 == null) {
        this.timeValue2 = []
      } else {
        this.pieTwo()
      }
      console.log(this.timeValue2)

    },
    //第五个柱状图时间切换
    timeHisFive() {
      if (this.timeValue3 == null) {
        this.timeValue3 = []
      } else {
        this.hisFive()
      }
      console.log(this.timeValue3)
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
    //当前月
    //new Date().getFullYear()+(new Date().getMonth() + 1).toString().padStart(2,'0')+"01 00:00:00"
    month() {
      return new Date().getFullYear() + '-' + (new Date().getMonth() + 1).toString().padStart(2, '0') + "-01 00:00:00"
      // return new Date().getFullYear()+(new Date().getMonth() + 1).toString().padStart(2,'0')+"01 00:00:00"
    },

    //三合一 柱状图
    // hisProcessed(data){
    //   axios({
    //     method: 'put',
    //     url: this.baseURL + '/hetao/monitor/getallocatemonitor',
    //     headers: {
    //       "Content-Type": "application/json;charset=UTF-8",
    //       'token': localStorage.token,
    //     },
    //     data:data
    //     //   {
    //     //   allocateTime: data[0],
    //     //   allocateTime2: data[1],
    //     //   sourceChannel: ""
    //     // }
    //   }).then(res => {
    //     return res
    //     // console.log(res)
    //   }).catch(err => {
    //     return err
    //     // console.log(err)
    //   })
    // },
    //sanzhu1
    hisProcessed(data) {
      return new Promise((resolve, reject) => {
        axios({
          method: 'put',
          url: this.baseURL + '/hetao/monitor/getallocatemonitor',
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
    //柱一
    hisOne() {
      this.hisProcessed({
        allocateTime: this.timeOfDay[0],
        allocateTime2: this.timeOfDay[1],
        sourceChannel: ""
      }).then(res => {
        let rows = []
        for (let a = 0; a < res.data.x.length; a++) {
          if (res.data.x[a + 1]) {
            let row = {}
            row.状态 = res.data.x[a + 1]
            row.数量 = res.data.y[a + 1]
            rows.push(row)
          }
        }
        this.oneHisData.rows = rows
      }).catch(err => {
        console.log(err)
      })
    },
    //柱二
    hisTwo() {
      this.hisProcessed({
        allocateTime: this.timeValue1[0],
        allocateTime2: this.timeValue1[1],
        sourceChannel: ""
      }).then(res => {
        let rows = []
        for (let a = 0; a < res.data.x.length; a++) {
          if (res.data.x[a + 1]) {
            let row = {}
            row.状态 = res.data.x[a + 1]
            row.数量 = res.data.y[a + 1]
            rows.push(row)
          }
        }
        this.twoHisData.rows = rows
      }).catch(err => {
        console.log(err)
      })
    },
    //柱三
    hisThree() {
      this.hisProcessed({
        allocateTime: this.timeValue4[0],
        allocateTime2: this.timeValue4[1],
        sourceChannel: this.value1
      }).then(res => {
        let rows = []
        for (let a = 0; a < res.data.x.length; a++) {
          if (res.data.x[a + 1]) {
            let row = {}
            row.状态 = res.data.x[a + 1]
            row.数量 = res.data.y[a + 1]
            rows.push(row)
          }
        }
        this.threeHisData.rows = rows
      }).catch(err => {
        console.log(err)
      })
    },
    //柱三时间切换
    timeHisThree() {
      if (this.timeValue4 == null) {
        this.timeValue4 = []
      } else {
        this.hisThree()
      }
      console.log(this.timeValue4)
    },

    // 三合一 饼状图
    pieDetail(data) {
      return new Promise((resolve, reject) => {
        axios({
          method: 'put',
          url: this.baseURL + '/hetao/monitor/getallocatedetailmonitor',
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
    //饼一
    pieOne() {
      this.pieDetail({
        allocateTime: this.timeOfDay[0],
        allocateTime2: this.timeOfDay[1],
        sourceChannel: ""
      }).then(res => {
        let rows = []
        for (let a = 0; a < res.data.y.length; a++) {
          let row = {}
          row.接通状态 = res.data.x[0][a]
          row.数量 = res.data.y[a]
          rows.push(row)
        }
        this.onePieData.rows = rows
      }).catch(err => {
        console.log(err)
      })
    },
    //饼二
    pieTwo() {
      this.pieDetail({
        allocateTime: this.timeValue2[0],
        allocateTime2: this.timeValue2[1],
        sourceChannel: ""
      }).then(res => {
        let rows = []
        for (let a = 0; a < res.data.y.length; a++) {
          let row = {}
          row.接通状态 = res.data.x[0][a]
          row.数量 = res.data.y[a]
          rows.push(row)
        }
        this.twoPieData.rows = rows
      }).catch(err => {
        console.log(err)
      })
    },
    //饼三
    pieThree() {
      this.pieDetail({
        allocateTime: this.timeValue5[0],
        allocateTime2: this.timeValue5[1],
        sourceChannel: this.value2
      }).then(res => {
        let rows = []
        for (let a = 0; a < res.data.y.length; a++) {
          let row = {}
          row.接通状态 = res.data.x[0][a]
          row.数量 = res.data.y[a]
          rows.push(row)
        }
        this.threePieData.rows = rows
      }).catch(err => {
        console.log(err)
      })
    },
    //饼三时间切换
    timePisThree() {
      if (this.timeValue5 == null) {
        this.timeValue5 = []
      } else {
        this.pieThree()
      }
      console.log(this.timeValue5)
    },

    //比较柱 二合一
    hisSeats(data) {
      return new Promise((resolve, reject) => {
        axios({
          method: 'put',
          url: this.baseURL + '/hetao/monitor/getseatallocatemonitor',
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
    //比较柱一
    hisFour() {
      this.hisSeats({
        allocateTime: this.timeOfDay[0],
        allocateTime2: this.timeOfDay[1],
        sourceChannel: ""
      }).then(res => {
        let rows = []
        for (let a = 0; a < res.data.length; a++) {
          let row = {}
          row.坐席号 = res.data[a].坐席
          row.总量 = res.data[a].总量
          row.未处理 = res.data[a].未处理
          row.已处理 = res.data[a].已处理
          rows.push(row)
        }
        this.fourHisData.rows = rows
      }).catch(err => {
        console.log(err)
      })
    },
    //比较柱二
    hisFive() {
      this.hisSeats({
        allocateTime: this.timeValue3[0],
        allocateTime2: this.timeValue3[1],
        sourceChannel: ""
      }).then(res => {
        let rows = []
        for (let a = 0; a < res.data.length; a++) {
          let row = {}
          row.坐席号 = res.data[a].坐席
          row.总量 = res.data[a].总量
          row.未处理 = res.data[a].未处理
          row.已处理 = res.data[a].已处理
          rows.push(row)
        }
        this.fiveHisData.rows = rows
      }).catch(err => {
        console.log(err)
      })
    },

    //导出柱
    hisProcessedExport(data) {
      return new Promise((resolve, reject) => {
        axios({
          method: 'put',
          url: this.baseURL + '/hetao/monitor/exportallocatemonitor',
          headers: {
            "Content-Type": "application/json;charset=UTF-8",
            'token': localStorage.token,
          },
          responseType: "blob",
          data: data
        }).then(res => {
          console.log('这个是请求参数', res)
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    //导出饼
    pieDetailExport(data) {
      return new Promise((resolve, reject) => {
        axios({
          method: 'put',
          url: this.baseURL + '/hetao/monitor/exportdetailmonitor',
          headers: {
            "Content-Type": "application/json;charset=UTF-8",
            'token': localStorage.token,
          },
          responseType: "blob",
          data: data
        }).then(res => {
          console.log('这个是请求参数', res)
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    //导出比较柱方法
    hisSeatsExport(data) {
      return new Promise((resolve, reject) => {
        axios({
          method: 'put',
          url: this.baseURL + '/hetao/monitor/exportseatallocatemonitor',
          headers: {
            "Content-Type": "application/json;charset=UTF-8",
            'token': localStorage.token,
          },
          responseType: "blob",
          data: data
        }).then(res => {
          console.log('这个是请求参数', res)
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    //导出饼
    pieFourExport(data) {
      return new Promise((resolve, reject) => {
        axios({
          method: 'put',
          url: this.baseURL + '/hetao/monitor/exportCallStatusMonitor',
          headers: {
            "Content-Type": "application/json;charset=UTF-8",
            'token': localStorage.token,
          },
          responseType: "blob",
          data: data
        }).then(res => {
          console.log('这个是请求参数', res)
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },

    //下载文件方法
    download(res) {
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
        // this.$message.success('导出成功');
      } else {
        // 返回json
        this.$message.warning(res.data.msg);
      }
    },


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


  },
  created() {
    // //当天 处理未处理
    // this.hisProcessed({allocateTime: this.timeOfDay[0], allocateTime2: this.timeOfDay[1], sourceChannel: ""})
    // //总 处理未处理
    // this.hisProcessed({allocateTime: this.totalTime[0], allocateTime2: this.totalTime[1], sourceChannel: ""})
    // //批次处理未处理
    // this.hisProcessed({allocateTime: "", allocateTime2: "", sourceChannel: this.value1})

    console.log(this.month())
    this.hisOne()
    // setInterval(this.hisOne,10000)

    //this.pieOne()
    // setInterval(this.pieOne,10000)

    //this.hisTwo()
    // setInterval(this.hisTwo,10000)

    //this.pieTwo()
    // setInterval(this.pieTwo,10000)

    this.hisThree()
    // setInterval(this.hisThree,10000)

    //this.pieThree()
    // setInterval(this.pieThree,10000)

    this.hisFour()
    // setInterval(this.hisFour,10000)

    this.hisFive()
    // setInterval(this.hisFive,10000)

    //this.pieFour()
    // setInterval(this.pieFour,10000)
  },

}
</script>

<style scoped>
/*  时间长度*/
>>> .el-date-editor--datetimerange.el-input, .el-date-editor--datetimerange.el-input__inner {
  width: auto;
}

>>> .el-dialog__body {
  padding: 0 20px;
}

.chartDiv {
  width: 25%;
  height: 48vh;
  display: inline-block;
  text-align: center;
  box-sizing: border-box;
}

.chartDiv p {
  font-size: 12px;
  line-height: 16px;
}

.myve {
  /*box-sizing: border-box;*/
  height: 45vh;
  /*width: 100%;*/
}
</style>
