<!--<template functional>-->
<template>
  <div>
    <div class="teday">
<!--   @change="handleChange"   -->
      <el-collapse class="sstj" v-model="activeNames" >
        <el-collapse-item name="1">
          <span class="sstitle" slot="title">
            搜索条件
<!--            <i class="header-icon el-icon-info"></i>-->
          </span>
          <el-date-picker
            value-format="yyyy-MM-dd"
            size="small"
            class="shou"
            :editable='false'
            v-model="from.day"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
          <div class="inputDiv">
            <el-input
              size="small"
              placeholder="数据编号"
              v-model="from.sjbh">
              <i slot="prefix" class="el-input__icon el-icon-search"></i>
            </el-input>
          </div>
          <div class="inputDiv">
            <el-input
              size="small"
              placeholder="报名人姓名"
              v-model="from.name">
              <i slot="prefix" class="el-input__icon el-icon-search"></i>
            </el-input>
          </div>
          <div class="inputDiv">
            <el-input
              size="small"
              placeholder="手机号码"
              v-model="from.phone">
              <i slot="prefix" class="el-input__icon el-icon-search"></i>
            </el-input>
          </div>
          <div class="inputDiv">
            <el-input
              size="small"
              placeholder="车辆所在城市"
              v-model="from.clszcs">
              <i slot="prefix" class="el-input__icon el-icon-search"></i>
            </el-input>
          </div>
          <div class="inputDiv">
            <el-input
              size="small"
              placeholder="车辆品牌"
              v-model="from.clpp">
              <i slot="prefix" class="el-input__icon el-icon-search"></i>
            </el-input>
          </div>
          <div class="buttonDiv">

            <el-button size="small" @click="sxdata" type="primary" icon="el-icon-search">搜索</el-button>
            <el-button size="small" type="primary">清空<i class="el-icon-delete el-icon--right"></i></el-button>
            <!--      <el-button type="primary">上传<i class="el-icon-upload el-icon&#45;&#45;right"></i></el-button>-->

          </div>
        </el-collapse-item>
      </el-collapse>
    </div>
    <div class="gdt">
      <div class="table">
        <!--    <el-alert :closable="false" title="menu 1-3" type="success" />-->
<!--            已完成工单-->
        <el-table
          class="ccc"
          :data="tableData"
          height="calc(100vh - 120px)"
          border
          size="mini"
          style="width: 100%"

        >
          <el-table-column
            prop="guid"
            label="数据编号"
            min-width="80"
            height="40px"
            :show-overflow-tooltip="true"
            header-align="center"
          >
          </el-table-column>
          <el-table-column
            prop="createTime"
            header-align="center"
            label="创建时间"
            min-width="80"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            prop="name"
            label="操作时间"
            min-width="80"
            header-align="center"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            prop="name"
            label="报名人姓名"
            min-width="100"
            header-align="center"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            prop="name"
            label="手机号"
            min-width="80"
            header-align="center"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            prop="city"
            label="车辆所在城市"
            min-width="110"
            header-align="center"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            prop="brand"
            label="车辆品牌"
            min-width="80"
            header-align="center"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            prop="name"
            label="操作时间"
            min-width="80"
            header-align="center"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            prop="name"
            label="工单状态"
            min-width="80"
            header-align="center"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            prop="name"
            label="备注"
            min-width="80"
            header-align="center"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            prop="name"
            label="报名是否出错"
            min-width="110"
            header-align="center"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            prop="name"
            label="错误信息"
            min-width="80"
            header-align="center"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            prop="address"
            label="报名返回值id"
            :show-overflow-tooltip="true"
            header-align="center"
            min-width="110"
          >
          </el-table-column>
        </el-table>
      </div>
      <div class="fywDiv">
        <div class="block">
          <!--        <span class="demonstration">显示总数</span>-->
          <el-pagination
            background
            :pager-count="5"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="list.page"
            :page-size="50"
            layout="total, prev, pager, next, jumper"
            :total="1000">
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

export default {
  data() {
    return {
      tableData: [],
      activeNames: [],//是否显示搜索条件
      from:{
        sjbh:'',//数据编号
        name:'',//报名人姓名
        phone:'',//手机号码
        clszcs:'',//车辆所在城市
        clpp:'',//车辆品牌
        day:'',//日期值
      },
      list:{
        size: 1,
        current:50
      },
      size: {
        size: "50",
        current:"1"
      },

      btnLoading:false
    }
  },
  methods: {
    // iRowStyle: function ({row, rowIndex}) {
    //   return 'height:35px';
    // },

    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    sxdata(){
      alert(JSON.stringify(this.from))
    },
    dataList(data){
      this.$store.dispatch('user/completedlist',data).then((res) => {
        console.log(res)
        // const list = res.data.data.dataList
        // for (let i = 0; i<list.length; i++){
        //
        // }
        // this.tableData = list
      }).catch((err) => {
        console.log(err)
      })
    },


  },
  // created() {
  //   this.dataList(this.list)
  // },
  mounted() {
    this.dataList(this.size)
    // this.exportFile()
    // dataList(this.list){
    //   this.$store.dispatch('user/gongdlist' , this.size).then((res) => {
    //     // console.log(this.list)
    //     console.log(res)
    //   }).catch((err) => {
    //     console.log(err)
    //   })
    // }
  }
}
</script>
<style scoped>
.shou{
  cursor: pointer;
  margin: 3px;
}
.sstitle{
  /*text-indent: 2em;*/
  font-size: 16px;
  font-weight: 900;
}
.sstj{
  padding-left: 30px;
  /*height: 40px;*/
}
>>>.el-collapse-item__header{
  line-height: 40px;
  height: 40px;
}
.fywDiv{
  width: 100%;
  display: flex;
  justify-content: flex-end;
}
.block{
  display: inline-block;
}
.inputDiv{
  width: 200px;
  display: inline-block;
  margin: 3px;
}
.buttonDiv{
  display: flex;
  justify-content: end;
  margin: 3px;
}
/*.sstitle {*/
/*  flex: 10 90%;*/
/*  order: 1;*/
/*}*/

/*.el-collapse-item__header {*/
/*  flex: 1 0 auto;*/
/*  order: -1;*/
/*}*/

.gdt {
  width: 98%;
  /*height: 400px;*/
  /*border: 1px solid red;*/
  margin: 0 auto;
  white-space: nowrap;
}

.gdt .table {
  height: 100%;
}

/*.gdt .box2 {*/
/*  margin-top: 50px;*/
/*  height: 200px;*/
/*  overflow: overlay;*/
/*}*/
 /*最为关键得两个样式代码，可以设置全局滚动条样式，也可以按需设置 */
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
