<template>
    <div>
      <div>
        <div>
          <div style="padding: 10px;">
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
            <el-button style="margin-left: 10px;" size="mini" @click="exportTab1" type="primary">导出</el-button>
          </div>
        </div>
        <el-table
          v-loading="table1"
          :data="tableData1"
          size="mini"
          border
          header-align="center"
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
          <el-table-column
            align="center"
            prop="distribution"
            label="分配量"
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
            prop="amountOfSuccess"
            label="成功量"
            width="60">
          </el-table-column>
          <el-table-column
            align="center"
            prop="amountOfFail"
            label="失败量"
            width="60">
          </el-table-column>
          <el-table-column
            align="center"
            prop="connectionRate"
            width="70"
            label="接通率">
          </el-table-column>
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

    </div>
</template>

<script>
    import axios from "axios";
    import {Message} from "element-ui";

    export default {
        name: "index",
      data(){
          return{
            table1:false,//表一加载--坐席业务状态统计
            tableData1:[],//表一数据--坐席业务状态统计
            baseURL:this.$store.state.baseURL,
            // baseURL:'http://39.102.203.193:9090',
            timeValue1:[],
            timeDate:{
              beginDate:'',
              overDate:''
            },

            options: [
              {
                value: '0.5',
                label: '0.5'
              },{
              value: '1',
              label: '1'
            },{
              value: '1.5',
              label: '1.5'
            },{
              value: '2',
              label: '2'
            },{
              value: '2.5',
              label: '2.5'
            },{
              value: '3',
              label: '3'
            }],
            options2: [
             {
                value: 'A',
                label: 'A'
              },{
                value: 'B',
                label: 'B'
              },{
                value: 'C',
                label: 'C'
              },{
                value: 'D',
                label: 'D'
              },],
            outboundOpen:false,//外呼是否开启
            outBoundSpeed:'',//开启外呼的速度
            outboundOpenGuid:'',//外呼编号
            batchNum:'',//批次号

            open:false,
            close:false,

            guid:111,

          }
      },
      watch: {
        guid: 'abc' // 值可以为methods的方法名
      },
      methods:{
        abc(){
          console.log(123)
        },
        ccc(){
          this.guid = 222
        },
        automatic(e){
          console.log(e)
          if(e){
            axios({
              method: 'post',
              url:`${this.baseURL}/hetao/admin/startautomaticoutboundcall`,
              headers: {
                "Content-Type": "application/json;charset=UTF-8",
                'token': localStorage.token,
              },
            }).then(res => {
              console.log(res)
            }).catch(err => {
              console.log(err)
            })
          }else {
            axios({
              method: 'post',
              url:`${this.baseURL}/hetao/admin/stopautomaticoutboundcall`,
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
        //查询预测
        queryForecast(){
          axios({
            method: 'post',
            url:`${this.baseURL}/freeswitch/outboundopen/queryautomaticoutboundcall`,
            headers: {
              "Content-Type": "application/json;charset=UTF-8",
              'token': localStorage.token,
            },
          }).then(res => {
            console.log(res)
            this.outBoundSpeed = res.data.data.outBoundSpeed
            this.outboundOpenGuid = res.data.data.outboundOpenGuid
            this.outboundOpen = res.data.data.outboundOpen
            this.batchNum = res.data.data.batchNum
          }).catch(err => {
            console.log(err)
          })
        },
        //开启外呼
        openOutboundCall(){
          this.open = true
          axios({
            method: 'post',
            url:`${this.baseURL}/hetao/admin/startautomaticoutboundcall/${this.outBoundSpeed}/${this.batchNum}`,
            headers: {
              "Content-Type": "application/json;charset=UTF-8",
              'token': localStorage.token,
            },
          }).then(res => {
            console.log(res)
            Message({
              message:`${res.data.message}`,
              type: 'success',
              duration: 5 * 1000,
            })
            this.queryForecast()
            this.open = false
          }).catch(err => {
            console.log(err)
            this.open = false
          })
        },
        //关闭外呼
        closeOutbound(){
          this.close = true
          axios({
            method: 'post',
            url:`${this.baseURL}/hetao/admin/stopautomaticoutboundcall`,
            headers: {
              "Content-Type": "application/json;charset=UTF-8",
              'token': localStorage.token,
            },
          }).then(res => {
            console.log(res)
            Message({
              message:`${res.data.message}`,
              type: 'success',
              duration: 5 * 1000,
            })
            this.queryForecast()
            this.close = false
          }).catch(err => {
            console.log(err)
            this.close = false
          })
        },


        //get请求数据拼接转换
        query(data){
          if(data){
            let str ='?'
            for(let x in data){
              str +=`${x}=${data[x]}&`
            }
            return str.slice(0,-1)
          }else return
        },
        //坐席业务状态统计
        allDetails(){
          this.table1 = true
          axios({
            method: 'get',
            // url:`${this.baseURL}/record/handle/getdetailbydepartguidanddatedesignatdepartment`,
            url:`${this.timeValue1.length == 0?`${this.baseURL}/record/handle/getdetailbydepartguidanddatedesignatdepartment`:`${this.baseURL}/record/handle/getdetailbydepartguidanddatedesignatdepartment${this.query(this.timeDate)}`}`,
            headers: {
              "Content-Type": "application/json;charset=UTF-8",
              'token': localStorage.token,
            },
          }).then(res => {
            // console.log(res)
            this.table1 = false
            this.tableData1 = res.data.data.dataList
            //this.timeConversion(1000)
            for (let a = 0;a < res.data.data.dataList.length;a++){
              res.data.data.dataList[a].totalPostProcessingTime = this.timeConversion(parseInt(res.data.data.dataList[a].totalPostProcessingTime / 1000))
              res.data.data.dataList[a].maximumPostProcessingTime = this.timeConversion(parseInt(res.data.data.dataList[a].maximumPostProcessingTime / 1000))
              res.data.data.dataList[a].avgPostProcessingTime = this.timeConversion(parseInt(res.data.data.dataList[a].avgPostProcessingTime / 1000))

              res.data.data.dataList[a].averageWorkTime = this.timeConversion(parseInt(res.data.data.dataList[a].averageWorkTime / 1000))
              res.data.data.dataList[a].maximumWorkTime = this.timeConversion(parseInt(res.data.data.dataList[a].maximumWorkTime / 1000))
              res.data.data.dataList[a].totalWorkTime = this.timeConversion(parseInt(res.data.data.dataList[a].totalWorkTime / 1000))

              res.data.data.dataList[a].averageTalkTime = this.timeConversion(res.data.data.dataList[a].averageTalkTime)
              res.data.data.dataList[a].maximumTalkTime = this.timeConversion(res.data.data.dataList[a].maximumTalkTime)
              res.data.data.dataList[a].totalTalkTime = this.timeConversion(res.data.data.dataList[a].totalTalkTime)

              if(res.data.data.dataList[a].connectionRate !== ''){
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
        timeHisFive(){
          console.log(this.timeValue1)
          if(this.timeValue1 == null){
            this.timeValue1 = []
          }else if(this.timeValue1.length !== 0){
            this.timeDate.beginDate = this.timeValue1[0]
            this.timeDate.overDate = this.timeValue1[1]
            this.allDetails()
          }
            },
        //表一坐席状态数据导出--坐席业务状态统计
        exportTab1(){
          axios({
            method: 'get',
            url:`${this.timeValue1.length == 0?`${this.baseURL}/record/handle/exportdetailbydepartguidanddatedesignatdepartment`:`${this.baseURL}/record/handle/exportdetailbydepartguidanddatedesignatdepartment${this.query(this.timeDate)}`}`,
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


      },
      created() {
        this.allDetails()
        this.queryForecast()

        // console.log(this.query(this.aa))
      }
    }
</script>

<style scoped>

</style>
