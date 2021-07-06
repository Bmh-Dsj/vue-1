<template>
  <div>
    <div>
      <el-date-picker
        style="margin-right: 10px;"
        @change="time"
        value-format="yyyy-MM-dd HH:mm:ss"
        size="small"
        class="shou"
        :editable='false'
        v-model="from.day"
        type="datetimerange"
        range-separator="~"
        start-placeholder="操作开始时间"
        end-placeholder="操作结束时间">
      </el-date-picker><!-- 开始结束时间 -->
      <el-select style="margin-right: 10px;" size="small" v-model="from.value1" multiple placeholder="请选择外呼批次">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <el-button @click="demand" size="small" type="primary">查询</el-button>
    </div>
    <div class="content">
      <div style="display: inline-block">
        <el-table
          :data="data"
          border
          style="width: 100%">
          <el-table-column
            prop="status"
            label="接通状态"
            header-align="center"
            align="center"
            width="250">
          </el-table-column>
          <el-table-column
            header-align="center"
            align="center"
            prop="proportion"
            label="数量"
            width="250">
          </el-table-column>
        </el-table>
      </div>
      <div class="chartDiv">
<!--        <p>外呼总批次</p>-->
        <ve-pie
          height="70vh"
          class="myve"
          :data="onePieData"
          :legend-visible="false"
          :extend="onePieExtend">
        </ve-pie>
      </div>
    </div>


  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "index",
  data(){
    let now = this
    //第一个饼图颜色配置
    this.onePieExtend = {
      series: {
        center: ['50%', '23%'],
        radius: '40%',
      },

      // orient: 'vertical',
      // left: '70%',  //图例距离左的距离
      // y: 'center',  //图例上下居中
      // textStyle: { //图例文字的样式
      //   fontSize: 10
      // },
      avoidLabelOverlap: true,
      color:['#DC143C','#bbe2e8',"#FF6347","#FFD700",'#800080',"#FF69B4","#7CFC00",'#19D4AE', "#FF1493","#4169E1" ,"#61a0a8", "#FF4500","#d48265", "#9932CC","#00BFFF","#00FF7F"],
    }
    return{
      baseURL:this.$store.state.baseURL,
      //第一个饼图数据
      onePieData: {
        columns: ['接通状态', '数量'],
        rows: [
        ]
      },
      data:[],
      options:[],//多选数据
      from:{
        day:[],//
        value1:[],//多选数组
        current: 1,
        size: 50,
      },

    }
  },
  methods:{
    list(){
      axios({
        method: 'post',
        url: `${this.baseURL}/hetao/outboundlisthetao/gettheproportionofoutboundcalls/${this.from.size}/${this.from.current}`,
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          'token': localStorage.token,
        },
        data : this.from
      }).then(res => {
        console.log('这个是请求参数',res)
      }).catch(err => {
        console.log(err)
      })
    },
    //获取批次号
    batchNumber(){
      axios({
        method: 'post',
        url: `${this.baseURL}/hetao/outboundlisthetao/getallbatchnumbers`,
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          'token': localStorage.token,
        },
      }).then(res => {
        console.log(res.data.data.dataList)
        this.options = []
        for (let i = 0; i < res.data.data.dataList.length; i++) {
          let obj = {}
          obj.value = res.data.data.dataList[i]
          obj.label = res.data.data.dataList[i]
          this.options.push(obj)
        }

      }).catch(err => {
        console.log(err)
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
    demand(){
      this.list()
    }
  },
  created() {
    this.list()
    this.batchNumber()
  }
}
</script>

<style scoped>
.chartDiv{
  width: 50%;
  height: 48vh;
  display: inline-block;
  text-align: center;
  box-sizing: border-box;
}
.chartDiv p{
  font-size: 12px;
  line-height: 16px;
}
.myve{
  /*box-sizing: border-box;*/
  height: 60vh;
  /*width: 100%;*/
}
.content{
  display: flex;
}
</style>
