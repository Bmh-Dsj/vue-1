<template>
  <div>
    <div>
      <el-collapse class="sstj" v-model="activeNames">
        <el-collapse-item>
          <span class="sstitle" slot="title">
            搜索条件
            <!--            <i class="header-icon el-icon-info"></i>-->
          </span>
          <el-form ref="from" :inline="true" :model="from" class="demo-form-inline">
            <div>
              <el-button size="small" @click="exportTab1" type="primary">导出通话记录</el-button>
            </div>
            <el-form-item prop="callTime">
              <el-date-picker
                @change="time"
                value-format="yyyy-MM-dd HH:mm:ss"
                size="small"
                class="shou"
                :editable='false'
                v-model="from.callTime"
                type="datetimerange"
                range-separator="~"
                start-placeholder="呼叫开始时间"
                end-placeholder="呼叫结束时间">
              </el-date-picker><!-- 开始结束时间 -->
            </el-form-item><!-- 呼叫开始结束时间 -->
<!--            <el-form-item prop="day2">-->
<!--              <el-date-picker-->
<!--                @change="time2"-->
<!--                value-format="yyyy-MM-dd HH:mm:ss"-->
<!--                size="small"-->
<!--                class="shou"-->
<!--                :editable='false'-->
<!--                v-model="from.day2"-->
<!--                type="datetimerange"-->
<!--                range-separator="~"-->
<!--                start-placeholder="创建开始时间"-->
<!--                end-placeholder="创建结束时间">-->
<!--              </el-date-picker>&lt;!&ndash; 开始结束时间 &ndash;&gt;-->
<!--            </el-form-item>&lt;!&ndash; 创建开始结束时间 &ndash;&gt;-->
<!--            <el-form-item prop="status">-->
<!--              <el-cascader-->
<!--                placeholder="工单状态"-->
<!--                v-model="value"-->
<!--                :options="options"-->
<!--                :props="{ expandTrigger: 'hover' }"-->
<!--                @change="handle"></el-cascader>-->
<!--              &lt;!&ndash;            <el-select v-model="from.status" placeholder="工单状态">&ndash;&gt;-->
<!--              &lt;!&ndash;              <el-option label="空" value="空"></el-option>&ndash;&gt;-->
<!--              &lt;!&ndash;              <el-option label="无人接听" value="无人接听"></el-option>&ndash;&gt;-->
<!--              &lt;!&ndash;              <el-option label="关机" value="关机"></el-option>&ndash;&gt;-->
<!--              &lt;!&ndash;              <el-option label="停机" value="停机"></el-option>&ndash;&gt;-->
<!--              &lt;!&ndash;              <el-option label="无法接通" value="无法接通"></el-option>&ndash;&gt;-->
<!--              &lt;!&ndash;              <el-option label="通话中" value="通话中"></el-option>&ndash;&gt;-->
<!--              &lt;!&ndash;              <el-option label="信息有误" value="信息有误"></el-option>&ndash;&gt;-->
<!--              &lt;!&ndash;              <el-option label="开场白拒绝" value="开场白拒绝"></el-option>&ndash;&gt;-->
<!--              &lt;!&ndash;              <el-option label="拒绝" value="拒绝"></el-option>&ndash;&gt;-->
<!--              &lt;!&ndash;              <el-option label="有意加微信通过" value="有意加微信通过"></el-option>&ndash;&gt;-->
<!--              &lt;!&ndash;              <el-option label="有意加微信未通过" value="有意加微信未通过"></el-option>&ndash;&gt;-->
<!--              &lt;!&ndash;              <el-option label="已下单" value="已下单"></el-option>&ndash;&gt;-->
<!--              &lt;!&ndash;              <el-option label="年龄不符" value="年龄不符"></el-option>&ndash;&gt;-->
<!--              &lt;!&ndash;              <el-option label="空号" value="空号"></el-option>&ndash;&gt;-->
<!--              &lt;!&ndash;              <el-option label="再联系" value="再联系"></el-option>&ndash;&gt;-->
<!--              &lt;!&ndash;            </el-select>&ndash;&gt;-->
<!--            </el-form-item>&lt;!&ndash; 工单状态 &ndash;&gt;-->
            <el-form-item prop="callerIdNumber">
              <el-input
                size="small"
                placeholder="主叫号码"
                v-model="from.callerIdNumber">
                <i slot="prefix" class="el-input__icon el-icon-search"></i>
              </el-input>
            </el-form-item><!-- 主叫号码 -->
            <el-form-item prop="destinationNumber">
              <el-input
                size="small"
                placeholder="被叫号码"
                v-model="from.destinationNumber">
                <i slot="prefix" class="el-input__icon el-icon-search"></i>
              </el-input>
            </el-form-item><!-- 被叫号码 -->

            <el-form-item prop="hangupCause">
              <el-input
                size="small"
                placeholder="挂断原因"
                v-model="from.hangupCause">
                <i slot="prefix" class="el-input__icon el-icon-search"></i>
              </el-input>
            </el-form-item><!-- 挂断原因 -->
            <el-form-item>
              <div class="buttonDiv">
                <el-button size="small" @click="fromShow" type="primary" icon="el-icon-search">搜索</el-button>
                <el-button size="small" @click="fromClear('from')" type="info">清空<i class="el-icon-delete el-icon--right"></i></el-button>
              </div>
            </el-form-item><!-- 提交按钮 -->
          </el-form>
        </el-collapse-item>
      </el-collapse>
    </div>
    <div class="gdt">
      <div class="table" v-loading="loading">
        <el-table
          stripe
          height="calc(100vh - 120px)"
          size="mini"
          border
          ref="multipleTable"
          :data="tableData"
          tooltip-effect="dark"
          style="width: 100%"
          >
<!--          <el-table-column-->
<!--            header-align="center"-->
<!--            align="center"-->
<!--            type="selection"-->
<!--            width="38">-->
<!--          </el-table-column>-->
<!--          <el-table-column-->
<!--            class="ycbt"-->
<!--            :show-overflow-tooltip="true"-->
<!--            header-align="center"-->
<!--            prop="guid"-->
<!--            label="数据编号"-->
<!--            min-width="70">-->
<!--          </el-table-column>-->
<!--          <el-table-column-->
<!--            :show-overflow-tooltip="true"-->
<!--            header-align="center"-->
<!--            label="创建时间"-->
<!--            min-width="80">-->
<!--            <template slot-scope="scope">{{ scope.row.createTime }}</template>-->
<!--          </el-table-column>-->
<!--          <el-table-column-->
<!--            :show-overflow-tooltip="true"-->
<!--            header-align="center"-->
<!--            label="操作时间"-->
<!--            min-width="80">-->
<!--            <template slot-scope="scope">{{ scope.row.operateTime }}</template>-->
<!--          </el-table-column>-->
<!--          <el-table-column-->
<!--            :show-overflow-tooltip="true"-->
<!--            header-align="center"-->
<!--            label="分配时间"-->
<!--            min-width="80">-->
<!--            <template slot-scope="scope">{{ scope.row.allocateTime }}</template>-->
<!--          </el-table-column>-->

          <el-table-column
            :show-overflow-tooltip="true"
            header-align="center"
            align="center"
            prop="callerIdNumber"
            label="主叫号码"
            min-width="50">
          </el-table-column>
          <el-table-column
            :show-overflow-tooltip="true"
            header-align="center"
            align="center"
            prop="destinationNumber"
            label="被叫号码"
            min-width="60">
          </el-table-column>

          <el-table-column
            :show-overflow-tooltip="true"
            header-align="center"
            align="center"
            prop="startStamp"
            label="呼叫开始时间"
            min-width="80">
          </el-table-column>
          <el-table-column
            :show-overflow-tooltip="true"
            header-align="center"
            align="center"
            prop="answerStamp"
            label="接听时间"
            min-width="80">
          </el-table-column>
          <el-table-column
            :show-overflow-tooltip="true"
            header-align="center"
            align="center"
            prop="endStamp"
            label="呼叫结束时间"
            min-width="80">
          </el-table-column>
          <el-table-column
            :show-overflow-tooltip="true"
            header-align="center"
            align="center"
            prop="uduration"
            label="总呼叫时长"
            min-width="60">
          </el-table-column>
          <el-table-column
            :show-overflow-tooltip="true"
            header-align="center"
            align="center"
            prop="ringingTime"
            label="振铃时长"
            min-width="60">
          </el-table-column>
          <el-table-column
            :show-overflow-tooltip="true"
            header-align="center"
            align="center"
            prop="billsec"
            label="接通时长"
            min-width="60">
          </el-table-column>
          <el-table-column
            :show-overflow-tooltip="true"
            header-align="center"
            align="center"
            prop="hangupCause"
            label="挂断原因"
            min-width="95">
          </el-table-column>
<!--          <el-table-column-->
<!--            :show-overflow-tooltip="true"-->
<!--            header-align="center"-->
<!--            prop="seatNote"-->
<!--            label="备注"-->
<!--            min-width="100">-->
<!--          </el-table-column>-->
          <!--          <el-table-column :show-overflow-tooltip="true" header-align="center" prop="queryResultInvite" min-width="120">-->
          <!--            <template slot="header" slot-scope="scope">-->
          <!--              &lt;!&ndash;                <el-tooltip class="item" effect="dark" content="天天拍车邀约结果" placement="left">&ndash;&gt;-->
          <!--              <span class="spot">天天拍车邀约结果</span>-->
          <!--              &lt;!&ndash;                </el-tooltip>&ndash;&gt;-->
          <!--            </template>-->
          <!--          </el-table-column>-->
<!--          <el-table-column-->
<!--            header-align="center"-->
<!--            align="center"-->
<!--            prop="address"-->
<!--            label="操作记录"-->
<!--            show-overflow-tooltip>-->
<!--            <template slot-scope="scope">-->
<!--              <el-button @click="record(scope.row)" type="primary"-->
<!--                         size="mini">查看-->
<!--              </el-button>-->
<!--            </template>-->
<!--          </el-table-column>-->
          <!--          <el-table-column-->
          <!--            header-align="center"-->
          <!--            align="center"-->
          <!--            prop="address"-->
          <!--            label="查看报名结果"-->
          <!--            current-row-key="31313513"-->
          <!--            min-width="100"-->
          <!--            show-overflow-tooltip>-->
          <!--            <template slot-scope="scope">-->
          <!--              <el-button type="primary" @click="handleEdit(scope.row)"-->
          <!--                         size="mini">查看-->
          <!--              </el-button>-->
          <!--            </template>-->
          <!--          </el-table-column>-->
        </el-table>
      </div>
      <div class="fywDiv">
        <div class="block">
          <!--        <span class="demonstration">显示总数</span>-->
          <!--         分页   -->
          <el-pagination
            background
            :pager-count="5"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="from.current"
            :page-sizes="[50,100, 200, 300, 400]"
            layout="sizes,total, prev, pager, next, jumper"
            :total="total">
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from "axios";
    export default {
      name: "index",
      data() {
        return {
          recordDialog:false,
          dlgLoading:false,
          dialog:false,
          baseURL:this.$store.state.baseURL,
          loading:false,//表格加载
          activeNames: [],//是否显示搜索条件
          from:{
            // guid: '',//数据编号
            callTime:[],//呼叫开始结束时间
            startStamp:'',//呼叫开始时间
            startStamp2:'',//呼叫结束时间

            callerIdNumber:'',//主叫号码
            destinationNumber:'',//被叫号码
            //startStamp:'',//呼叫开始时间
            answerStamp:'',//接听时间
            endStamp:'',//呼叫结束时间
            uduration:'',//总呼叫时长
            billsec: '',//接通时长
            hangupCause:'',//挂断原因

            size: 50,//个数
            current:1,//页数
          },//搜索表单
          headers:{
            // "Content-Type": "multipart/form-data",
            'token': localStorage.token
          },//请求头
          fileList:[],//上传的文件列表
          total:0,//分页总条数
          tableData:[],//表格数据
          multipleSelection: [],//复选框值
          recordLog:{},//操作记录
        }
      },
      methods:{
        //搜索按钮
        fromShow() {
          console.log(this.from)
          this.dataList(this.from)
        },

        //清空表单
        fromClear(from) {
          this.$refs[from].resetFields()
          this.from.startStamp = ''
          this.from.startStamp2 = ''
        },

        //分页 页数改变钩子
        handleCurrentChange(val){
          console.log(`当前页: ${val}`);
          this.from.current = val
          console.log(this.from);
          this.dataList(this.from)
        },

        //分页 条数改变钩子
        handleSizeChange(val){
          console.log(`每页 ${val} 条`);
          this.from.size = val
          this.dataList(this.from)
        },

        //获取所有数据
        dataList(data){
          this.loading = true
          // this.$store.dispatch('user/htgongdlist',data).then(res=>{
          //   this.tableData = res.data.data.dataList
          //   this.total = res.data.data.total
          //   console.log(res)
          //   this.loading = false
          // }).catch(err=>{
          //   console.log(err)
          //   this.loading = false
          // })

          axios({
            method: 'post',
            url: this.baseURL + '/freeswitch/callrecords/getAllDateByCondition',
            headers: {
              "Content-Type": "application/json;charset=UTF-8",
              'token': localStorage.token,
            },
            data:data
          }).then(res=>{
            //Math.ceil()  向上取整  Math.round() 四舍五入 Math.floor() 向下取整
            for(let i = 0 ; i < res.data.data.dataList.length; i++){
              res.data.data.dataList[i].uduration = Math.round(Math.round(res.data.data.dataList[i].uduration)/(1000000)) + ' s'
              res.data.data.dataList[i].billsec = res.data.data.dataList[i].billsec + ' s'
              res.data.data.dataList[i].ringingTime = res.data.data.dataList[i].ringingTime + ' s'
            }
            this.tableData = res.data.data.dataList
            this.total = res.data.data.total
            console.log(res)
            this.loading = false
          }).catch(err=>{
            console.log(err)
            this.loading = false
          })
        },

        //time 呼叫时间转换
        time(){
          if(this.from.callTime.length > 0){
            this.from.startStamp = this.from.callTime[0]
            this.from.startStamp2 = this.from.callTime[1]
          }else {
            this.from.callTime = []
          }
        },

        //导出方法
        exportTab1(){
          axios({
            method: 'post',
            url:`${this.baseURL}/freeswitch/callrecords/exportAllDateByCondition`,
            // url: '${this.baseURL}/record/handle/exportdetailbydepartguidanddatedesignatdepartment',
            headers: {
              "Content-Type": "application/json;charset=UTF-8",
              'token': localStorage.token,
            },
            responseType: "blob",
            data:this.from
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
      },
      created() {
        this.dataList(this.from)
      }
    }
</script>

<style scoped>
  >>>.el-table--mini td, .el-table--mini th{
    padding: 0;
  }
  >>>.el-table td, .el-table th{
    padding: 0;
  }
  /*搜索框下边距*/
  >>>.el-collapse-item__content{
    padding-bottom: 5px;
  }
  >>>.el-form-item{
    margin-bottom: 0;
  }
  /*搜索框高度*/
  >>>.el-collapse-item__header{
    height: 40px;
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
  /*时间手*/
  .shou {
    cursor: pointer;
    margin: 3px;
  }
  .fywDiv{
    width: 100%;
    display: flex;
    justify-content: flex-end;
  }
  .gdt {
    width: 98%;
    /*height: 400px;*/
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
