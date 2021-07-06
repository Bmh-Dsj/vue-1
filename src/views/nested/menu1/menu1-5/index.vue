<template>
  <div>
<!--    手动添加邀约成功数据-->
    <div class="manual">
      <div class="inputDiv leftDiv">
        <el-form size="small" ref="form" :model="form" label-width="80px">
          <el-form-item label="渠道来源">
            <el-input v-model="form.source"></el-input>
          </el-form-item>
          <el-form-item label="姓名">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="手机号码">
            <el-input v-model="form.phone"></el-input>
          </el-form-item>
          <el-form-item label="省份">
            <el-input v-model="form.province"></el-input>
          </el-form-item>
          <el-form-item label="城市">
            <el-input v-model="form.city"></el-input>
          </el-form-item>
          <el-form-item label="意向车型">
            <el-input v-model="form.intention"></el-input>
          </el-form-item>
          <el-form-item label="购买车型">
            <el-input v-model="form.purchase"></el-input>
          </el-form-item>
          <el-form-item label="购车时间">
            <el-input v-model="form.time"></el-input>
          </el-form-item>
          <el-form-item label="车辆品牌">
            <el-input v-model="form.brand"></el-input>
          </el-form-item>
          <el-form-item label="话术类别">
            <el-select style="width: 100%" v-model="form.category" placeholder="请选择话术类别">
              <el-option label="类别一" value="one"></el-option>
              <el-option label="类别二" value="two"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <div>
              <el-button style="width: 100%;" size="small" type="primary">提 交</el-button>
            </div>
          </el-form-item>
        </el-form>

      </div>
      <div class="rightDiv">
        <el-table
          :data="tableData"
          size="small"
          height="300"
          border
          style="width: 100%">
          <el-table-column
            show-overflow-tooltip
            header-align="center"
            prop="date"
            label="数据编号"
            min-width="100">
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            header-align="center"
            prop="name"
            label="报名人姓名"
            min-width="100">
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            header-align="center"
            min-width="100"
            prop="address"
            label="手机号">
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            header-align="center"
            min-width="100"
            prop="address"
            label="车辆所在城市">
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            header-align="center"
            min-width="100"
            prop="address"
            label="车辆品牌">
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
name: "index",
  data(){
    return{
      form:{
        source:'',//渠道来源
        name:'',//姓名
        phone:'',//手机号码
        province:'',//省份
        city:'',//城市
        intention:'',//意向车型
        purchase:'',//购买车型
        time:'',//购车时间
        brand:'',//车辆品牌
        category:'',//话术类别
      },
      tableData: [
        {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-08',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-06',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-07',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }],

    }
  },
  methods:{

  }
}
</script>

<style scoped>
.manual{
  display: flex;
  justify-content: end;
  padding-top: 10px;
}
.leftDiv{
  width: 25%;
  margin-left: 1%;
}
.rightDiv{
  margin: 0 2%;
  width: 70%;
}
>>>.el-form-item--mini.el-form-item{
  margin-bottom: 12px;
}
</style>
