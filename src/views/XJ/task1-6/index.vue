<template>
  <div>
    <div>
      <el-collapse class="sstj" v-model="search">
        <el-collapse-item>
          <span class="sstitle" slot="title">
            搜索条件
            <!--            <i class="header-icon el-icon-info"></i>-->
          </span>
          <el-form @keyup.enter.native="fromShow" ref="form" :inline="true" :model="form" class="demo-form-inline">
            <div>
              <el-button size="small" @click="exportTab1" type="primary">导出消费记录</el-button>
            </div>
            <el-form-item prop="workTime">
              <el-date-picker
                @change="time"
                value-format="yyyy-MM-dd HH:mm:ss"
                size="small"
                class="shou"
                :editable='false'
                v-model="form.workTime"
                type="datetimerange"
                range-separator="~"
                start-placeholder="开始时间"
                end-placeholder="结束时间">
              </el-date-picker><!-- 开始结束时间 -->
            </el-form-item><!-- 开始结束时间 -->
            <!--            <el-form-item prop="departGuid">-->
            <!--              <el-input-->
            <!--                size="small"-->
            <!--                placeholder="部门号"-->
            <!--                v-model="form.departGuid">-->
            <!--                <i slot="prefix" class="el-input__icon el-icon-search"></i>-->
            <!--              </el-input>-->
            <!--            </el-form-item>&lt;!&ndash; 部门号 &ndash;&gt;-->
            <!--            <el-form-item prop="billingDuration">-->
            <!--              <el-input-->
            <!--                size="small"-->
            <!--                placeholder="计费时长"-->
            <!--                v-model="form.billingDuration">-->
            <!--                <i slot="prefix" class="el-input__icon el-icon-search"></i>-->
            <!--              </el-input>-->
            <!--            </el-form-item>&lt;!&ndash; 计费时长 &ndash;&gt;-->
            <!--            <el-form-item prop="depositMoney">-->
            <!--              <el-input-->
            <!--                size="small"-->
            <!--                placeholder="客户预存款"-->
            <!--                v-model="form.depositMoney">-->
            <!--                <i slot="prefix" class="el-input__icon el-icon-search"></i>-->
            <!--              </el-input>-->
            <!--            </el-form-item>&lt;!&ndash; 客户预存款 &ndash;&gt;-->
            <!--            <el-form-item prop="callMoney">-->
            <!--              <el-input-->
            <!--                size="small"-->
            <!--                placeholder="已用话费"-->
            <!--                v-model="form.callMoney">-->
            <!--                <i slot="prefix" class="el-input__icon el-icon-search"></i>-->
            <!--              </el-input>-->
            <!--            </el-form-item>&lt;!&ndash; 已用话费 &ndash;&gt;-->
            <el-form-item>
              <div class="buttonDiv">
                <el-button style="margin-right: 10px;" size="small" @click="fromShow" type="primary" icon="el-icon-search">搜索</el-button>
                <el-button size="small" @click="fromClear('form')" type="info">清空<i class="el-icon-delete el-icon--right"></i></el-button>
              </div>
            </el-form-item><!-- 提交按钮 -->
          </el-form>
        </el-collapse-item>
      </el-collapse>
    </div>
    <div class="gdt">
      <div class="table">
        <el-table
          :data="tableData"
          border
          style="width: 100%">
          <el-table-column
            header-align="center"
            align="center"
            prop="departGuid"
            label="部门号"
            width="100">
          </el-table-column>
          <!--          <el-table-column-->
          <!--            header-align="center"-->
          <!--            align="center"-->
          <!--            prop="billingDuration"-->
          <!--            label="计费时长"-->
          <!--            width="80">-->
          <!--          </el-table-column>-->
          <el-table-column
            header-align="center"
            align="center"
            prop="depositMoney"
            label="客户预存款"
            width="100">
          </el-table-column>
          <el-table-column
            header-align="center"
            align="center"
            prop="callMoney"
            label="已用话费"
            width="100">
          </el-table-column>
          <el-table-column
            header-align="center"
            align="center"
            prop="balanceMoney"
            label="话费余额"
            width="100">
          </el-table-column>

        </el-table>
      </div>
      <!--      <div class="fywDiv">-->
      <!--        <div class="block">-->
      <!--          &lt;!&ndash;        <span class="demonstration">显示总数</span>&ndash;&gt;-->
      <!--          &lt;!&ndash;         分页   &ndash;&gt;-->
      <!--          <el-pagination-->
      <!--            background-->
      <!--            :pager-count="5"-->
      <!--            @current-change="handleCurrentChange"-->
      <!--            :current-page="form.current"-->
      <!--            layout="total, prev, pager, next, jumper"-->
      <!--            :total="total">-->
      <!--          </el-pagination>-->
      <!--        </div>-->
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
    return {
      baseURL: this.$store.state.baseURL,
      search:[],//搜索
      form:{
        // departGuid:'',//部门号
        // billingDuration:'',//计费时长
        // depositMoney:'',//客户预存款
        // callMoney:'',//已用话费
        // balanceMoney:'',//话费余额

        workTime:[this.month(),this.ShowDate(0) + ' 23:59:59'],//时间筛选 当前月
        startTime:this.month(),
        startTime2:this.ShowDate(0) + ' 23:59:59',
        // current:1,//页
        // size:50,//条数
      },
      total:0,//总条数
      tableData: [],//列表数据
    }
  },
  methods:{
    //获取数据
    dataList(){
      axios({
        method: 'put',
        url: `${this.baseURL}/phonebills/calllog/findcalllogbillsbydepartguid`,
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          'token': localStorage.token,
        },
        data:this.form
      }).then(res => {
        console.log(res)
        this.total = res.data.data.total
        this.tableData = res.data.data.phoneBills
        if(res.data.code == 300){
          Message({
            message:`${res.data.message}`,
            type:"error",
            duration:5*1000
          })
        }
      }).catch(err=>{
        console.log(err)

      })
    },
    //查询
    fromShow(){
      console.log(this.form)
      this.dataList()
    },
    //清除
    fromClear(form) {
      //this.$refs[form].resetFields()
      this.form.workTime = [this.month(),this.ShowDate(0) + ' 23:59:59']
      this.form.startTime = this.month()
      this.form.startTime2 = this.ShowDate(0) + ' 23:59:59'
    },
    //分页 页数改变钩子
    handleCurrentChange(val){
      console.log(`当前页: ${val}`);
      this.from.current = val
      console.log(this.from);
      this.dataList(this.from)
    },
    //当前月
    //new Date().getFullYear()+(new Date().getMonth() + 1).toString().padStart(2,'0')+"01 00:00:00"
    month() {
      // return new Date().getFullYear()+(new Date().getMonth() + 1).toString().padStart(2,'0')+"01 00:00:00"
      return new Date().getFullYear() + '-' + (new Date().getMonth() + 1).toString().padStart(2, '0') + "-01 00:00:00"
    },
    //时间转换
    ShowDate(date) {
      let num = date
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

    //
    // time(val){
    //   console.log(val)
    //   this.form.startTime = val[0]
    //   this.form.startTime2 = val[1]
    //   //console.log(this.month(),this.ShowDate(-1) + ' 00:00:00')
    // }
    time(val){
      if(val == null){
        val = []
        this.form.startTime =""
        this.form.startTime2 = ""
      }else {
        this.form.startTime = val[0]
        this.form.startTime2 = val[1]
      }
      console.log(this.form)
    },
    //导出方法
    exportTab1(){
      axios({
        method: 'post',
        url:`${this.baseURL}/phonebills/calllog/exportcalllogcountforday`,
        // url: '${this.baseURL}/record/handle/exportdetailbydepartguidanddatedesignatdepartment',
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          'token': localStorage.token,
        },
        responseType: "blob",
        data:this.form
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
    this.branch(5)
    this.dataList()
  }

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
.fywDiv{
  width: 100%;
  display: flex;
  justify-content: flex-end;
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
