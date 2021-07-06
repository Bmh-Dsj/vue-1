<template>
  <div>
    <!--    <div style="width: 40%;">-->
    <!--      <el-form label-width="80px" :model="formInline" class="demo-form-inline">-->
    <!--        <el-form-item label="映射来源">-->
    <!--          <el-input v-model="formInline.sourceKey" placeholder="映射来源"></el-input>-->
    <!--        </el-form-item>-->
    <!--        <el-form-item label="实际来源">-->
    <!--          <el-input v-model="formInline.sourceValue" placeholder="实际来源"></el-input>-->
    <!--        </el-form-item>-->

    <!--        <el-form-item label="业务描述">-->
    <!--          <el-input v-model="formInline.sourceDescribe" placeholder="业务描述"></el-input>-->
    <!--        </el-form-item>-->

    <!--        <el-form-item>-->
    <!--          <el-button type="primary" @click="onSubmit">生成批次</el-button>-->
    <!--        </el-form-item>-->
    <!--      </el-form>-->
    <!--    </div>-->
    <!--    <div>-->
    <!--      <el-table-->
    <!--        border-->
    <!--        :data="tableData"-->
    <!--        style="width: 100%">-->
    <!--        <el-table-column-->
    <!--          header-align="center"-->
    <!--          align="center"-->
    <!--          prop="sourceBusiness"-->
    <!--          label="业务名"-->
    <!--          width="100">-->
    <!--        </el-table-column>-->
    <!--        <el-table-column-->
    <!--          header-align="center"-->
    <!--          align="center"-->
    <!--          prop="sourceKey"-->
    <!--          label="映射来源"-->
    <!--          width="100">-->
    <!--        </el-table-column>-->
    <!--        <el-table-column-->
    <!--          header-align="center"-->
    <!--          align="center"-->
    <!--          prop="sourceValue"-->
    <!--          label="实际来源"-->
    <!--          width="100">-->
    <!--        </el-table-column>-->

    <!--        <el-table-column-->
    <!--          header-align="center"-->
    <!--          align="center"-->
    <!--          prop="sourceDescribe"-->
    <!--          label="业务描述">-->
    <!--        </el-table-column>-->
    <!--      </el-table>-->
    <!--    </div>-->

    <div>
      <div>
        <el-collapse class="sstj" v-model="search">
          <el-collapse-item>
          <span class="sstitle" slot="title">
            添加来源渠道
            <!--            <i class="header-icon el-icon-info"></i>-->
          </span>
            <el-form :inline="true" label-width="80px" :model="formInline" class="demo-form-inline">
              <el-form-item label="映射来源">
                <el-input v-model="formInline.sourceKey" placeholder="映射来源"></el-input>
              </el-form-item>
              <el-form-item label="实际来源">
                <el-input v-model="formInline.sourceValue" placeholder="实际来源"></el-input>
              </el-form-item>

              <el-form-item label="业务描述">
                <el-input v-model="formInline.sourceDescribe" placeholder="业务描述"></el-input>
              </el-form-item>

              <el-form-item>
                <el-button type="primary" @click="onSubmit">生成来源渠道</el-button>
              </el-form-item>
            </el-form>

            <!--            <el-upload-->
            <!--              class="upload-demo mrr"-->
            <!--              :action="this.baseURL + '/imei/finddatabyimeis'"-->
            <!--              :headers="headers"-->
            <!--              :show-file-list="false"-->
            <!--              name="file"-->
            <!--              accept =".xls"-->
            <!--              :on-progress="progress"-->
            <!--              :on-error="err"-->
            <!--              :on-success="handleChange"-->
            <!--              :file-list="fileList">-->
            <!--              <el-button size="small" type="primary">上传数据</el-button>-->
            <!--            </el-upload>-->
          </el-collapse-item>
        </el-collapse>
      </div>
      <div class="gdt">
        <div class="table">
          <el-table
            border
            size="mini"
            height="calc(100vh - 120px)"
            :data="tableData"
            style="width: 100%">
            <!--            <el-table-column-->
            <!--              header-align="center"-->
            <!--              align="center"-->
            <!--              prop="sourceBusiness"-->
            <!--              label="业务名"-->
            <!--              width="100">-->
            <!--            </el-table-column>-->
            <el-table-column
              header-align="center"
              align="center"
              prop="sourceKey"
              label="映射来源"
              min-width="300">
            </el-table-column>
            <el-table-column
              header-align="center"
              align="center"
              prop="sourceValue"
              label="实际来源"
              min-width="300">
            </el-table-column>
            <el-table-column
              header-align="center"
              align="center"
              prop="sourceDescribe"
              label="业务描述"
              min-width="300">
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>

    <!--    时间-->
    <!--    <div id="myChart" style="width: 40%; height: 400px; margin: 20px;"></div>-->
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
      baseURL: this.$store.state.baseURL,
      headers:{
        // "Content-Type": "multipart/form-data",
        'token': localStorage.token
      },//请求头
      fileList:[],//上传的文件列表

      option:{
        tooltip: {
          show: true,
          formatter: function (params) {
            return aaa.fomartTime(params.data)
          }
        },
        xAxis: {
          type: 'category',
          data: ['坐席1', '坐席2', '坐席3', '坐席4', '坐席5', '坐席6', '坐席7']
        },
        yAxis: {
          type: 'value',
          // interval :2,
          axisLabel: {
            formatter:function (value, index) {
              return aaa.fomartTime(value)
            }
          },
        },
        series: [{
          data: [3, 21.4, 15, 8, 158.5, 98, 32],//这个数组我的单位是分钟
          type: 'bar'
        }]
      },//图表数据

      formInline: {
        sourceKey: '',//映射来源
        sourceValue: '',//实际来源
        //sourceBusiness: '',//对应业务
        sourceDescribe: '',//业务描述
      },//来源渠道表单数据

      tableData:[],//来源渠道表格
      search:[],//搜索
    }
  },

  methods: {
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById('myChart'))
      // 绘制图表
      myChart.setOption(this.option);
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
    //生成来源渠道
    onSubmit() {
      if(this.formInline.sourceKey !== '' && this.formInline.sourceValue !== ''){
        axios({
          method: 'post',
          url: `${this.baseURL}/datasource/adddata`,
          headers: {
            "Content-Type": "application/json;charset=UTF-8",
            'token': localStorage.token,
          },
          data:this.formInline
        }).then(res => {
          console.log(res)
          Message({
            message:`${res.data.message}`,
            type:"success",
            duration:5*1000
          })
          this.listTab()
        }).catch(err=>{
          console.log(err)
        })
      }else {
        Message({
          message:'映射来源和实际来源为必填项',
          type:"error",
          duration:1000*5
        })
      }

    },
    //来源渠道列表
    listTab(){
      axios({
        method: 'get',
        url: `${this.baseURL}/datasource/querydata`,
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          'token': localStorage.token,
        },
      }).then(res => {
        console.log(res)
        this.tableData = res.data.data.data
      }).catch(err=>{
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
    // this.$store.commit('branch',6)
    this.branch(6)
    this.listTab()
  },
  mounted() {

  },

}
</script>

<style scoped>
/*搜索项*/
>>>.el-form-item{
  margin-bottom: 0;
}
/*搜索框高度*/
>>>.el-collapse-item__header{
  height: 40px;
}
/*搜索框下边距*/
>>>.el-collapse-item__content{
  padding-bottom: 5px;
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
.gdt {
  width: 98%;
  height: calc(100vh - 130px);
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
