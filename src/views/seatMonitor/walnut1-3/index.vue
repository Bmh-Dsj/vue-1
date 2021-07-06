<template>
    <div>

<!--      <ve-line class="cc" :data="chartData"></ve-line>-->

<!--      <div style="width: 48%;display: inline-block">-->
<!--        <ve-histogram :data="chartData" :settings="chartSettings"></ve-histogram>-->
<!--      </div>-->
<!--      <div style="width: 100%;">-->
<!--        <el-table-->
<!--          :data="table"-->
<!--          style="width: 100%">-->
<!--          <el-table-column-->
<!--            prop="zt"-->
<!--            label="坐席1"-->
<!--            width="100">-->
<!--          </el-table-column>-->
<!--          <el-table-column-->
<!--            prop="zt2"-->
<!--            label="坐席2"-->
<!--            width="100">-->
<!--          </el-table-column>-->
<!--          <el-table-column-->
<!--            prop="zt3"-->
<!--            label="坐席3"-->
<!--            width="100">-->
<!--          </el-table-column>-->
<!--          <el-table-column-->
<!--            prop="zt4"-->
<!--            label="坐席4"-->
<!--            width="100">-->
<!--          </el-table-column>-->
<!--          <el-table-column-->
<!--            prop="zt5"-->
<!--            label="坐席5"-->
<!--            width="100">-->
<!--          </el-table-column>-->
<!--          <el-table-column-->
<!--            prop="zt6"-->
<!--            label="坐席6"-->
<!--            width="100">-->
<!--          </el-table-column>-->
<!--        </el-table>-->
<!--      </div>-->
      <div style="margin-bottom: 10px; width: auto;" v-loading="loadingZy">
        <el-table size="mini" header-align="center" border style="padding-top: 10px;" ref="multipleTable" tooltip-effect="dark" :data="gridData">
          <el-table-column align="center" width="100" v-for="col in columns" :prop="col.prop" :label="col.label">
          </el-table-column>
        </el-table>
      </div>
<!--      <div>-->
<!--        <el-table-->
<!--          :data="tableData"-->
<!--          size="mini"-->
<!--          border-->
<!--          header-align="center"-->
<!--          style="width: 100%">-->
<!--          <el-table-column-->
<!--            align="center"-->
<!--            prop="jobNumber"-->
<!--            label="工号"-->
<!--            width="90">-->
<!--          </el-table-column>-->
<!--          <el-table-column-->
<!--            align="center"-->
<!--            prop="distribution"-->
<!--            label="分配量"-->
<!--            width="60">-->
<!--          </el-table-column>-->
<!--          <el-table-column-->
<!--            align="center"-->
<!--            prop="handleVolume"-->
<!--            label="处理量"-->
<!--            width="60">-->
<!--          </el-table-column>-->
<!--          <el-table-column-->
<!--            align="center"-->
<!--            prop="callOutVolume"-->
<!--            label="呼出量"-->
<!--            width="60">-->
<!--          </el-table-column>-->
<!--          <el-table-column-->
<!--            align="center"-->
<!--            prop="connectionVolume"-->
<!--            label="接通量"-->
<!--            width="60">-->
<!--          </el-table-column>-->
<!--          <el-table-column-->
<!--            align="center"-->
<!--            prop="amountOfSuccess"-->
<!--            label="成功量"-->
<!--            width="60">-->
<!--          </el-table-column>-->
<!--          <el-table-column-->
<!--            align="center"-->
<!--            prop="amountOfFail"-->
<!--            label="失败量"-->
<!--            width="60">-->
<!--          </el-table-column>-->
<!--          <el-table-column-->
<!--            align="center"-->
<!--            prop="connectionRate"-->
<!--            width="60"-->
<!--            label="接通率">-->
<!--          </el-table-column>-->
<!--          <el-table-column-->
<!--            prop="totalPostProcessingTime"-->
<!--            label="总后处理时长"-->
<!--            width="100">-->
<!--          </el-table-column>-->
<!--          <el-table-column-->
<!--            prop="maximumPostProcessingTime"-->
<!--            label="最大后处理时长"-->
<!--            width="110">-->
<!--          </el-table-column>-->
<!--          <el-table-column-->
<!--            prop="avgPostProcessingTime"-->
<!--            label="平均后处理时长"-->
<!--            width="110">-->
<!--          </el-table-column>-->
<!--        </el-table>-->
<!--      </div>-->
      <div class="filx">
<!--        <div style="width: 33%;display: inline-block">-->
<!--          <p style="margin-bottom: 48px;">坐席状态统计</p>-->
<!--          <ve-pie :data="chartData"></ve-pie>-->
<!--        </div>-->
        <div style="width: 33%;display: inline-block">
          <p>坐席成功量排名</p>
          <!--          <div>-->
          <!--            <P v-for="aa in this.oneHisData.rows">-->
          <!--              工号 : {{aa.工号}}  成功单数 : {{aa.数量}}-->
          <!--            </P>-->
          <!--          </div>-->
          <div>
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
            <el-table
              :data="oneHisData"
              border
              style="width: 100%">
              <el-table-column
                prop="ranking"
                label="名次"
                min-width="60"
                align="center"
                title-align="center"
              >
              </el-table-column>
              <el-table-column
                align="center"
                title-align="center"
                prop="jobNumber"
                label="工号"
                min-width="120">
              </el-table-column>
              <el-table-column
                align="center"
                title-align="center"
                prop="seatName"
                label="姓名"
                min-width="120">
              </el-table-column>
              <el-table-column
                prop="successAmount"
                label="成功量"
                align="center"
                title-align="center"
                min-width="80">
              </el-table-column>

            </el-table>
          </div>
          <!--          <el-date-picker-->
          <!--            size="mini"-->
          <!--            value-format="yyyy-MM-dd HH:mm:ss"-->
          <!--            @change="timeHisTwo"-->
          <!--            v-model="timeValue1"-->
          <!--            type="datetimerange"-->
          <!--            range-separator="至"-->
          <!--            start-placeholder="开始日期"-->
          <!--            end-placeholder="结束日期">-->
          <!--          </el-date-picker>-->
          <!--          <ve-histogram-->
          <!--            height="50vh"-->
          <!--            class="myve"-->
          <!--            :data="oneHisData"-->
          <!--            :extend="oneHisExtend"-->
          <!--          ></ve-histogram>-->
        </div>
        <!--    当天分配 坐席已处理-未处理   第四个柱状图-->
<!--        <div style="width: 33%;display: inline-block">-->

<!--                <div style="box-sizing: border-box; margin-bottom: 48px;">-->
<!--                  <p>当天分配 坐席已处理-未处理</p>-->
<!--&lt;!&ndash;                  <el-date-picker&ndash;&gt;-->
<!--&lt;!&ndash;                    v-show="false"&ndash;&gt;-->
<!--&lt;!&ndash;                    size="mini"&ndash;&gt;-->
<!--&lt;!&ndash;                    v-model="value1"&ndash;&gt;-->
<!--&lt;!&ndash;                    type="datetimerange"&ndash;&gt;-->
<!--&lt;!&ndash;                    range-separator="至"&ndash;&gt;-->
<!--&lt;!&ndash;                    start-placeholder="开始日期"&ndash;&gt;-->
<!--&lt;!&ndash;                    end-placeholder="结束日期">&ndash;&gt;-->
<!--&lt;!&ndash;                  </el-date-picker>&ndash;&gt;-->
<!--                </div>-->
<!--          <ve-histogram-->
<!--            class="myve"-->
<!--            :data="fourHisData"-->
<!--          ></ve-histogram>-->
<!--        </div>-->

        <!--    总分配 坐席已处理-未处理    第五个柱状图-->
<!--        <div style="width: 33%;display: inline-block">-->

<!--          <div style="box-sizing: border-box">-->
<!--            <p>总分配 未处理-已处理</p>-->
<!--            <el-date-picker-->
<!--              size="mini"-->
<!--              value-format="yyyy-MM-dd HH:mm:ss"-->
<!--              @change="timeHisFive"-->
<!--              v-model="timeValue3"-->
<!--              type="datetimerange"-->
<!--              range-separator="至"-->
<!--              start-placeholder="开始日期"-->
<!--              end-placeholder="结束日期">-->
<!--            </el-date-picker>-->
<!--          </div>-->
<!--          <ve-histogram-->
<!--            class="myve"-->
<!--            :data="fiveHisData"-->
<!--          ></ve-histogram>-->
<!--        </div>-->
        <!--    坐席排名-->

      </div>

    </div>
</template>

<script>
    import axios from "axios";

    export default {
      name: "index",
      data() {
        // this.chartSettings = {
        //   metrics: ['坐席状态', '人数'],
        //   dimension: ['日期']
        // }
        //第一个柱状图配置
        this.oneHisExtend = {
          itemStyle: {
            color: (params)=> { //设置每个柱子的颜色
              return ["#00FF7F",'#FF4500',][params.dataIndex]
              //       颜色                  // 配置在每根柱子上
            }
          },
          // barWidth: 10,// 宽度
          color:{

          },

        }
        return {
          timer:'',//定时器
          loadingZy:false,//坐席状态加载
          columns:[],//坐席状态列表
          gridData:[],//坐席状态数据
          tableData:[],
          baseURL:this.$store.state.baseURL,
          // baseURL:'http://39.102.203.193:9090',
          timeValue3:[this.month() , this.ShowDate(-1)+' 00:00:00'],
          timeValue1:[this.month() , this.ShowDate(-1)+' 00:00:00'],
          timeOfDay:[this.ShowDate(0)+' 00:00:00' , this.ShowDate(0)+' 23:59:59'],//当天时间
          chartData: {
            columns: ['坐席状态', '人数', '下单用户'],
            rows: [
              { '坐席状态': '工作中', '人数': 13, '下单用户': 10,},
              { '坐席状态': '离线', '人数': 35, '下单用户': 30,},
              { '坐席状态': '通话中', '人数': 23, '下单用户': 26,},
              { '坐席状态': '休息中', '人数': 13, '下单用户': 14,},
              { '坐席状态': '候处理', '人数': 32, '下单用户': 34,},
              { '坐席状态': '振铃中', '人数': 43, '下单用户': 43,}
            ]
          },
          table:[
            {
              zt:"✅工作中",
              zt2:"❌离线",
              zt3:'📱通话中',
              zt4:'☕休息中',
              zt5:'🔄候处理',
              zt6:'🔔振铃中',
            }
          ],
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
          //第一个柱状图数据
          oneHisData: [],
        }
      },
      methods:{

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

        //比较柱 二合一
        hisSeats(data){
          return new Promise((resolve, reject) => {
            axios({
              method: 'put',
              url: this.baseURL + '/hetao/monitor/getseatallocatemonitor',
              headers: {
                "Content-Type": "application/json;charset=UTF-8",
                'token': localStorage.token,
              },
              data:data
            }).then(res => {
              console.log('这个是请求参数',res)
              resolve(res)
            }).catch(err => {
              reject(err)
            })
          })
        },
        //比较柱一
        hisFour(){
          this.hisSeats({allocateTime: this.timeOfDay[0], allocateTime2: this.timeOfDay[1], sourceChannel: ""})
            .then(res=>{
            let rows = []
            for (let a = 0; a < res.data.length ; a++){
              let row = {}
              row.坐席号 = res.data[a].坐席
              row.总量 = res.data[a].总量
              row.未处理 = res.data[a].未处理
              row.已处理 = res.data[a].已处理
              rows.push(row)
            }
            this.fourHisData.rows = rows
          })
            .catch(err=>{
            console.log(err)
          })
        },
        //比较柱二
        hisFive(){
          this.hisSeats({allocateTime: this.timeValue3[0], allocateTime2: this.timeValue3[1], sourceChannel: ""}).then(res=>{
            let rows = []
            for (let a = 0; a < res.data.length ; a++){
              let row = {}
              row.坐席号 = res.data[a].坐席
              row.总量 = res.data[a].总量
              row.未处理 = res.data[a].未处理
              row.已处理 = res.data[a].已处理
              rows.push(row)
            }
            //console.log(this.month())
            this.fiveHisData.rows = rows
          }).catch(err=>{
            console.log(err)
          })
        },

        //第五个柱状图时间切换
        timeHisFive(){
          if(this.timeValue3 == null){
            this.timeValue3 = []
          }else if(this.timeValue3.length !== 0){
            this.hisFive()
          }
          console.log(this.timeValue3)
          // this.hisFive()
        },
        //时间转换
        ShowDate(date){
          var num = date
          let n = num;
          let d = new Date();
          let year = d.getFullYear();
          let mon = d.getMonth() + 1;
          let day = d.getDate();
          if(day <= n) {
            if(mon > 1) {
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
        month(){
          // return new Date().getFullYear()+(new Date().getMonth() + 1).toString().padStart(2,'0')+"01 00:00:00"
          return new Date().getFullYear()+'-'+(new Date().getMonth() + 1).toString().padStart(2,'0')+"-01 00:00:00"
        },
        //坐席状态
        state(){
          clearInterval(this.timer)
          this.timer = setInterval(this.state,10000)
          this.loadingZy = true
          this.gridData = []
          this.columns = []
          axios({
            method: 'get',
            url:`${this.baseURL}/user/depart/getseatstatusbydepartguid`,
            headers: {
              "Content-Type": "application/json;charset=UTF-8",
              'token': localStorage.token,
            },
          }).then(res => {
            console.log(res)
            //console.log(res.data.data.data)
            let arr = []
            for (let a = 0; a < res.data.data.data.length ; a++){
                let obj = {}
                obj.label = res.data.data.data[a].name
                obj.prop = res.data.data.data[a].name
                arr.push(res.data.data.data[a].name)
                this.columns.push(obj)
                //console.log(obj)
            }
            console.log(arr)
            let aa = {}
            for ( let i = 0 ; i < res.data.data.data.length; i++){
              if(res.data.data.data[i].status == '休息'){
                res.data.data.data[i].status = "☕休息中"
              }else if(res.data.data.data[i].status == '离线'){
                res.data.data.data[i].status = "❌离线"
              }else if(res.data.data.data[i].status == '工作中'){
                res.data.data.data[i].status = "✅工作中"
              }else if(res.data.data.data[i].status == '振铃中'){
                res.data.data.data[i].status = "🔔振铃中"
              }else if(res.data.data.data[i].status == '通话中'){
                res.data.data.data[i].status = "📱通话中"
              }else if(res.data.data.data[i].status == '后处理中'){
                res.data.data.data[i].status = "🔄后处理中"
              }
              this.$set(aa, res.data.data.data[i].name, res.data.data.data[i].status)
            }
            this.gridData.push(aa)
            this.loadingZy = false

            // console.log(this.gridData)
            // console.log(this.columns)
          }).catch(err => {
            console.log(err)
            this.loadingZy = false
          })
        },
        //坐席业务状态统计
        allDetails(){
          axios({
            method: 'get',
            url:`${this.baseURL}/record/handle/getdetailbydepartguidanddatedesignatdepartment`,
            headers: {
              "Content-Type": "application/json;charset=UTF-8",
              'token': localStorage.token,
            },
          }).then(res => {
            this.tableData = res.data.data.dataList
            console.log(res.data.data.dataList)
          }).catch(err => {
            console.log(err)
          })
        },

        //柱状图
        hisProcessed(data){
          return new Promise((resolve, reject) => {
            axios({
              method: 'put',
              url: this.baseURL + '/hetao/monitor/getseatperformancemonitor',
              headers: {
                "Content-Type": "application/json;charset=UTF-8",
                'token': localStorage.token,
              },
              data:data
            }).then(res => {
              console.log('这个是请求参数',res)
              resolve(res)
            }).catch(err => {
              reject(err)
            })
          })
        },
        //柱一
        hisOne(){
          this.hisProcessed({allocateTime: this.timeValue1[0], allocateTime2: this.timeValue1[1]}).then(res=>{
            for (let a = 0 ; a < res.data.data.rankList.length ; a++){
              res.data.data.rankList[a].ranking = a+1
            }
            console.log(res)
            this.oneHisData = res.data.data.rankList
          }).catch(err=>{
            console.log(err)
          })
        },
        // 第一个柱状图数据时间切换
        timeHisTwo(){
          console.log(this.timeValue1)
          if(this.timeValue1 == null){
            this.timeValue1 = []
          }else {
            console.log(this.timeValue1)
            this.hisOne()
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
      },
      created(){
        this.hisFour()
        this.hisFive()
        this.state()
        this.allDetails()

      },
      mounted() {
        this.hisOne()
      },
      //页面销毁
      destroyed() {
        clearInterval(this.timer);
        this.timer = null;
      }
    }
</script>

<style scoped>
  .filx{
    display: flex;
  }
.cc{
  width: 500px;
  height: 500px;
}
p{
  text-align: center;
}
/*  时间长度*/
>>>.el-date-editor--datetimerange.el-input, .el-date-editor--datetimerange.el-input__inner{
  width: auto;
}
</style>
