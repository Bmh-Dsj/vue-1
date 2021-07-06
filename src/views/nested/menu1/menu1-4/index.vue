<template>
  <div>
    <!--    <span>所有工单</span>-->
    <div>
      <div class="teday">
        <!--   @change="handleChange"   -->
        <el-collapse class="sstj" v-model="activeNames">
          <el-collapse-item>
          <span class="sstitle" slot="title">
            搜索条件
            <!--            <i class="header-icon el-icon-info"></i>-->
          </span>
            <el-form ref="from" :inline="true" :model="from" class="demo-form-inline">
              <el-form-item prop="day">
                <el-date-picker
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
              </el-form-item><!-- 操作开始结束时间 -->
              <el-form-item prop="day2">
                <el-date-picker
                  @change="time2"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  size="small"
                  class="shou"
                  :editable='false'
                  v-model="from.day2"
                  type="datetimerange"
                  range-separator="~"
                  start-placeholder="创建开始时间"
                  end-placeholder="创建结束时间">
                </el-date-picker><!-- 开始结束时间 -->
              </el-form-item><!-- 创建开始结束时间 -->
              <el-form-item prop="guid">
                <el-input
                  size="small"
                  placeholder="数据编号"
                  v-model="from.guid">
                  <i slot="prefix" class="el-input__icon el-icon-search"></i>
                </el-input>
              </el-form-item><!-- 数据编号 -->
              <el-form-item prop="jobNumber">
                <el-input
                  size="small"
                  placeholder="工号"
                  v-model="from.jobNumber">
                  <i slot="prefix" class="el-input__icon el-icon-search"></i>
                </el-input>
              </el-form-item><!-- 工号 -->
              <el-form-item prop="status">
                <el-input
                  size="small"
                  placeholder="工单状态"
                  v-model="from.status">
                  <i slot="prefix" class="el-input__icon el-icon-search"></i>
                </el-input>
              </el-form-item><!-- 工单状态 -->
              <el-form-item prop="error">
                <el-input
                  size="small"
                  placeholder="报名是否出错"
                  v-model="from.error">
                  <i slot="prefix" class="el-input__icon el-icon-search"></i>
                </el-input>
              </el-form-item><!-- 报名是否出错 -->
              <el-form-item prop="name">
                <el-input
                  size="small"
                  placeholder="报名人姓名"
                  v-model="from.name">
                  <i slot="prefix" class="el-input__icon el-icon-search"></i>
                </el-input>
              </el-form-item><!-- 报名人姓名 -->
              <el-form-item prop="phone">
                <el-input
                  size="small"
                  placeholder="手机号码"
                  v-model="from.phone">
                  <i slot="prefix" class="el-input__icon el-icon-search"></i>
                </el-input>
              </el-form-item><!-- 手机号码 -->
              <el-form-item prop="city">
                <el-input
                  size="small"
                  placeholder="车辆所在城市"
                  v-model="from.city">
                  <i slot="prefix" class="el-input__icon el-icon-search"></i>
                </el-input>
              </el-form-item><!-- 车辆所在城市 -->
              <el-form-item prop="brand">
                <el-input
                  size="small"
                  placeholder="车辆品牌"
                  v-model="from.brand">
                  <i slot="prefix" class="el-input__icon el-icon-search"></i>
                </el-input>
              </el-form-item><!-- 车辆品牌 -->
              <el-form-item prop="categoryOfScript">
                <el-input
                  size="small"
                  placeholder="话术类别"
                  v-model="from.categoryOfScript">
                  <i slot="prefix" class="el-input__icon el-icon-search"></i>
                </el-input>
              </el-form-item><!-- 话术类别 -->
              <el-form-item prop="queryResultInvite">
                <el-input
                  size="small"
                  placeholder="天天拍车邀约结果"
                  v-model="from.queryInvite">
                  <i slot="prefix" class="el-input__icon el-icon-search"></i>
                </el-input>
              </el-form-item><!-- 天天拍车邀约结果 -->
              <el-form-item>
                <div class="buttonDiv">
                  <el-button size="small" @click="fromShow" type="primary" icon="el-icon-search">搜索</el-button>
                  <el-button size="small" @click="fromClear('from')" type="info">清空<i class="el-icon-delete el-icon--right"></i></el-button>
                  <!--      <el-button type="primary">上传<i class="el-icon-upload el-icon&#45;&#45;right"></i></el-button>-->
                  <el-button size="small" @click="shanchu" type="danger">删除所选</el-button>
<!--                  <el-button size="small" type="primary">获取处理结果</el-button>-->
                  <el-button size="small" @click="exportFile()" type="success">导出数据</el-button>
                  <el-upload
                    style="display: inline-block;margin-left: 10px"
                    class="upload-demo"
                    action="http://192.168.2.148:9090/ttpai/signup/readdata"
                    :headers="headers"
                    :show-file-list="false"
                    name="file"
                    accept =".xls"
                    :on-success="handleChange"
                    :file-list="fileList">
                    <el-button size="small" type="primary">点击上传</el-button>
                  </el-upload>
                  <el-button style="margin-left: 10px" size="small" type="success">分配数据</el-button>
<!--                  <el-button size="small" @click="xz" type="primary">下载</el-button>-->
                </div>
              </el-form-item><!-- 提交按钮 -->
            </el-form>
              <div v-show="false">
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
                </el-date-picker><!-- 开始结束时间 -->
                <div class="inputDiv">
                  <el-input
                    size="small"
                    placeholder="数据编号"
                    v-model="from.sjbh">
                    <i slot="prefix" class="el-input__icon el-icon-search"></i>
                  </el-input>
                </div><!-- 数据编号 -->
                <div class="inputDiv">
                  <el-input
                    size="small"
                    placeholder="工号"
                    v-model="from.job">
                    <i slot="prefix" class="el-input__icon el-icon-search"></i>
                  </el-input>
                </div><!-- 工号 -->
                <div class="inputDiv">
                  <el-input
                    size="small"
                    placeholder="状态"
                    v-model="from.state">
                    <i slot="prefix" class="el-input__icon el-icon-search"></i>
                  </el-input>
                </div><!-- 状态 -->
                <div class="inputDiv">
                  <el-input
                    size="small"
                    placeholder="报名是否出错"
                    v-model="from.signSF">
                    <i slot="prefix" class="el-input__icon el-icon-search"></i>
                  </el-input>
                </div><!-- 报名是否出错 -->
                <div class="inputDiv">
                  <el-input
                    size="small"
                    placeholder="报名人姓名"
                    v-model="from.name">
                    <i slot="prefix" class="el-input__icon el-icon-search"></i>
                  </el-input>
                </div><!-- 报名人姓名 -->
                <div class="inputDiv">
                  <el-input
                    size="small"
                    placeholder="手机号码"
                    v-model="from.phone">
                    <i slot="prefix" class="el-input__icon el-icon-search"></i>
                  </el-input>
                </div><!-- 手机号码 -->
                <div class="inputDiv">
                  <el-input
                    size="small"
                    placeholder="车辆所在城市"
                    v-model="from.clszcs">
                    <i slot="prefix" class="el-input__icon el-icon-search"></i>
                  </el-input>
                </div><!-- 车辆所在城市 -->
                <div class="inputDiv">
                  <el-input
                    size="small"
                    placeholder="车辆品牌"
                    v-model="from.clpp">
                    <i slot="prefix" class="el-input__icon el-icon-search"></i>
                  </el-input>
                </div><!-- 车辆品牌 -->
                <div class="inputDiv">
                  <el-input
                    size="small"
                    placeholder="话术类别"
                    v-model="from.category">
                    <i slot="prefix" class="el-input__icon el-icon-search"></i>
                  </el-input>
                </div><!-- 话术类别 -->
                <div class="inputDiv">
                  <el-input
                    size="small"
                    placeholder="天天拍车邀约结果"
                    v-model="from.result">
                    <i slot="prefix" class="el-input__icon el-icon-search"></i>
                  </el-input>
                </div><!-- 天天拍车邀约结果 -->
                <div class="buttonDiv">
                  <el-button size="small" @click="fromShow" type="primary" icon="el-icon-search">搜索</el-button>
                  <el-button size="small" @click="fromClear" type="primary">清空<i class="el-icon-delete el-icon--right"></i></el-button>
                  <!--      <el-button type="primary">上传<i class="el-icon-upload el-icon&#45;&#45;right"></i></el-button>-->
                </div><!-- 提交按钮 -->
              </div>
          </el-collapse-item>
        </el-collapse>
      </div>
      <div class="gdt">
        <div class="table" v-loading="loading">
          <el-table
            height="calc(100vh - 120px)"
            size="mini"
            border
            ref="multipleTable"
            :data="tableData"
            tooltip-effect="dark"
            style="width: 100%"
            @selection-change="handleSelectionChange">
            <el-table-column
              header-align="center"
              align="center"
              type="selection"
              width="37">
            </el-table-column>
            <el-table-column
              class="ycbt"
              :show-overflow-tooltip="true"
              header-align="center"
              prop="guid"
              label="数据编号"
              min-width="70">
            </el-table-column>
            <el-table-column
              :show-overflow-tooltip="true"
              header-align="center"
              label="创建时间"
              min-width="80">
              <template slot-scope="scope">{{ scope.row.createTime }}</template>
            </el-table-column>
            <el-table-column
              :show-overflow-tooltip="true"
              header-align="center"
              label="操作时间"
              min-width="80">
              <template slot-scope="scope">{{ scope.row.operateTime }}</template>
            </el-table-column>
            <el-table-column
              :show-overflow-tooltip="true"
              header-align="center"
              label="分配时间"
              min-width="80">
              <template slot-scope="scope">{{ scope.row.allocateTime }}</template>
            </el-table-column>
            <el-table-column
              :show-overflow-tooltip="true"
              header-align="center"
              prop="name"
              label="报名人姓名"
              min-width="90">
            </el-table-column>
            <el-table-column
              :show-overflow-tooltip="true"
              header-align="center"
              prop="mobile"
              label="手机号"
              min-width="90">
            </el-table-column>
            <el-table-column
              :show-overflow-tooltip="true"
              header-align="center"
              prop="city"
              label="车辆所在城市"
              min-width="100">
            </el-table-column>
            <el-table-column
              :show-overflow-tooltip="true"
              header-align="center"
              prop="brand"
              label="车辆品牌"
              min-width="80">
            </el-table-column>
            <el-table-column
              :show-overflow-tooltip="true"
              header-align="center"
              prop="jobNumber"
              label="工号"
              min-width="50">
            </el-table-column>
            <el-table-column
              :show-overflow-tooltip="true"
              header-align="center"
              prop="status"
              label="工单状态"
              min-width="80">
            </el-table-column>
            <el-table-column
              :show-overflow-tooltip="true"
              header-align="center"
              prop="seatNote"
              label="备注"
              min-width="60">
            </el-table-column>
            <el-table-column
              :show-overflow-tooltip="true"
              header-align="center"
              prop="categoryOfScript"
              label="话术类别"
              min-width="70">
            </el-table-column>
            <el-table-column
              :show-overflow-tooltip="true"
              header-align="center"
              prop="error"
              label="报名是否出错"
              min-width="95">
            </el-table-column>
            <el-table-column
              :show-overflow-tooltip="true"
              header-align="center"
              prop="errorMessage"
              label="错误信息"
              min-width="70">
            </el-table-column>
            <el-table-column
              :show-overflow-tooltip="true"
              header-align="center"
              prop="resultId"
              label="报名返回值id"
              min-width="100">
            </el-table-column>
<!--            <el-table-column-->
<!--              :show-overflow-tooltip="true"-->
<!--              header-align="center"-->
<!--              prop="name"-->
<!--              label="天天拍车邀约结果"-->
<!--              min-width="120">-->
<!--            </el-table-column>-->
            <el-table-column :show-overflow-tooltip="true" header-align="center" prop="queryResultInvite" min-width="120">
              <template slot="header" slot-scope="scope">
<!--                <el-tooltip class="item" effect="dark" content="天天拍车邀约结果" placement="left">-->
                  <span class="spot">天天拍车邀约结果</span>
<!--                </el-tooltip>-->
              </template>
            </el-table-column>
            <el-table-column
              header-align="center"
              align="center"
              prop="address"
              label="操作历史"
              show-overflow-tooltip>
              <template slot-scope="scope">
                <el-button @click="dialogTableVisible = true" type="primary"
                           size="mini">查看
                </el-button>
              </template>
            </el-table-column>
            <el-table-column
              header-align="center"
              align="center"
              prop="address"
              label="查看报名结果"
              current-row-key="31313513"
              min-width="100"
              show-overflow-tooltip>
              <template slot-scope="scope">
                <el-button type="primary" @click="handleEdit(scope.row)"
                           size="mini">查看
                </el-button>
              </template>
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
              :current-page="from.current"
              :page-size="50"
              layout="total, prev, pager, next, jumper"
              :total="total">
            </el-pagination>
          </div>
        </div>
      </div>
    </div>

    <el-dialog title="报名结果" :visible.sync="dialogTableVisible">
      <p>竞拍状态:{{bmdata.auction?bmdata.auction:'暂无信息'}}</p>
      <p>车辆信息:{{bmdata.brandFamily?bmdata.brandFamily:'暂无信息'}}</p>
      <p>车辆所在城市:{{bmdata.city?bmdata.city:'暂无信息'}}</p>
      <p>报名创建时间:{{bmdata.createTime?bmdata.createTime:'暂无信息'}}</p>
      <p>成交状态:{{bmdata.deal?bmdata.deal:'暂无信息'}}</p>
      <p>检测状态:{{bmdata.detection?bmdata.detection:'暂无信息'}}</p>
      <p>id:{{bmdata.id?bmdata.id:'暂无信息'}}</p>
      <p>邀约状态:{{bmdata.invite?bmdata.invite:'暂无信息'}}</p>
      <p>首次上牌时间（值为1 或者 2 ，1代表08年之前； 2代表 08后）:{{bmdata.license?bmdata.license:'暂无信息'}}</p>
      <p>来源渠道:{{bmdata.source?bmdata.source:'暂无信息'}}</p>
      <p>来源描述:{{bmdata.utmSource?bmdata.utmSource:'暂无信息'}}</p>

      <!--      <el-table :data="bmdata">-->
<!--        <el-table-column property="operateTime" label="操作时间"></el-table-column>-->
<!--        <el-table-column property="name" label="操作人"></el-table-column>-->
<!--        <el-table-column property="status" label="工单状态"></el-table-column>-->
<!--        <el-table-column property="seatNote" label="备注" ></el-table-column>-->
<!--        <el-table-column property="name" label="描述" ></el-table-column>-->
<!--      </el-table>-->
    </el-dialog>

    <el-dialog
      title="提示"
      :visible.sync="errData"
      >
<!--      jsonObject1.hasOwnProperty(p1)-->
      <div style="height: 50vh; overflow:auto;">
        <p>成功{{this.errList.success}}条</p>
        <p>失败{{this.errList.error}}条</p>
        <p v-for="(a,b) in this.errList.errorPhone">失败号码：{{b}} 失败原因：{{a}}</p>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button @click="errData = false">取 消</el-button>
        <el-button type="primary" @click="errData = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "index",
  data() {
    return {

      activeNames: [],//是否显示搜索条件
      loading:true,
      from: {
        guid: '',//数据编号
        jobNumber:'',//工号
        status:'',//工单状态
        error:'',//报名是否出错
        name: '',//报名人姓名
        phone: '',//手机号码
        city: '',//车辆所在城市
        brand: '',//车辆品牌
        categoryOfScript:'',//话术类别
        queryInvite:'',//天天拍车邀约结果
        day: [],//操作时间数组
        day2: [],//创建时间数组
        size: 50,//个数
        current:1,//页数
        operateTime:'',//操作开始时间
        operateTime2:'',//操作结束时间
        createTime:'',//创建开始时间
        createTime2:'',//创建结束时间
      },//搜索表单
      size: {
        size: 50,
        current:1
      },
      total:0,//分页总条数
      tableData: [],//所有数据 表格数据
      multipleSelection: [],//复选框值
      page: 1,
      errData:false,//查看成功失败条数dlg
      dialogTableVisible: false,//查看报名结果dlg
      errList:{},//成功失败条数
      headers:{
        // "Content-Type": "multipart/form-data",
        'token': localStorage.token
      },//请求头
      fileList:[],//上传的文件列表
      guids:[],
      bmdata:{},
      data2:'',
    }
  },
  methods: {
    handleEdit(row){
      var data = {
        id:'52400974',
        source: '2-7402-7669'
      }
      console.log(row)
      console.log(row.resultId)
      console.log(row.source)
      this.$jsonp("http://openapi.ttpai.cn/api/v2.0/query_ttp_sign_up", data)
        .then((data) => {
          // 返回的jsonp数据不会放这里，而是在 window.jsonpCallback
          console.log(data)
          if (data.error == "true") {
            alert("请求出错," + data.message);
          } else {
            this.bmdata = data.result
            this.dialogTableVisible = true
            // const temp = "竞拍状态:" + data.result.auction + "\n车辆信息:" + data.result.brandFamily + "\n车辆所在城市+" + data.result.city + "\n报名创建时间+" + data.result.createTime + "\n成交状态:" + data.result.deal + "\n检测状态:" + data.result.detection + "\nid:" + data.result.id + "\n邀约状态:" + data.result.invite + "\n首次上牌时间（值为1 或者 2 ，1代表08年之前； 2代表 08后）:" + data.result.license + "\n来源渠道：" + data.result.source + "\n来源描述:" + data.result.utmSource;
            // alert(temp);
          }
        })
    },
    chakanId(row){
      var data = {
        id:'52400974',
        source: '2-7402-7669'
      }
      console.log(row)
      console.log(row.resultId)
      console.log(row.source)
      this.$jsonp("http://openapi.ttpai.cn/api/v2.0/query_ttp_sign_up", data)
        .then((data) => {
          // 返回的jsonp数据不会放这里，而是在 window.jsonpCallback
          console.log(data)
          if (data.error == "true") {
                alert("请求出错," + data.message);
              } else {
                this.bmdata = data.result
                this.dialogTableVisible = true
                // const temp = "竞拍状态:" + data.result.auction + "\n车辆信息:" + data.result.brandFamily + "\n车辆所在城市+" + data.result.city + "\n报名创建时间+" + data.result.createTime + "\n成交状态:" + data.result.deal + "\n检测状态:" + data.result.detection + "\nid:" + data.result.id + "\n邀约状态:" + data.result.invite + "\n首次上牌时间（值为1 或者 2 ，1代表08年之前； 2代表 08后）:" + data.result.license + "\n来源渠道：" + data.result.source + "\n来源描述:" + data.result.utmSource;
                // alert(temp);
              }
        })
      // if (true) {
      //   axios({
      //     method: "GET",
      //     url: "http://openapi.ttpai.cn/api/v2.0/query_ttp_sign_up",
      //     headers: {
      //       dataType: "jsonp",
      //     },
      //     data: {
      //       id:'52400974',
      //       source: '2-7402-7669'
      //     },
          // dataType: "jsonp",
          // success: function (data) {
          //   if (data.error == "true") {
          //     alert("请求出错," + data.message);
          //   } else {
          //     const temp = "竞拍状态:" + data.result.auction + "\n车辆信息:" + data.result.brandFamily + "\n车辆所在城市+" + data.result.city + "\n报名创建时间+" + data.result.createTime + "\n成交状态:" + data.result.deal + "\n检测状态:" + data.result.detection + "\nid:" + data.result.id + "\n邀约状态:" + data.result.invite + "\n首次上牌时间（值为1 或者 2 ，1代表08年之前； 2代表 08后）:" + data.result.license + "\n来源渠道：" + data.result.source + "\n来源描述:" + data.result.utmSource;
          //     alert(temp);
          //   }
          // }
        // }).then(res=>{
        //   console.log(res)
        // }).catch(err=>{
        //   console.log(err)
        // })
      // } else {
      //   alert("该条数据还未报名，或者报名失败，请检查后，再查看报名信息");
      // }
    },
    //文件上传成功文件钩子
    handleChange(response){
      console.log(response.data)
      this.errList = response.data
      this.errData = true
    },
    //当复选框状态改变时获取复选框的值
    handleSelectionChange(val) {
      this.multipleSelection = val;
      this.guids = []
      for (let a = 0; a < val.length; a++){
        this.guids.push(`${val[a].guid}`)
      }
      console.log(this.guids)
    },
    //提交
    fromShow() {
      this.dataList(this.from)
    },
    //清除表单
    fromClear(from) {
      this.$refs[from].resetFields()
      this.from.operateTime = ''//操作开始时间
      this.from.operateTime2 = ''//操作结束时间
      this.from.createTime = ''//创建开始时间
      this.from.createTime2 = ''//创建结束时间
    },
    //分页 条数改变钩子
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    //分页 页数改变钩子
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.from.current = val
      console.log(this.from);

      this.dataList(this.from)
    },
    //操作开始结束时间
    time(val){
      if(val == null){
        val = []
        this.from.operateTime = ""
        this.from.operateTime2 = ""
      }else {
        this.from.operateTime = val[0]
        this.from.operateTime2 = val[1]
      }
      console.log(this.from)
      console.log(val)
    },
    //创建开始结束时间
    time2(val){
      if(val == null){
        val = []
        this.from.createTime = ""
        this.from.createTime2 = ""
      }else {
        this.from.createTime = val[0]
        this.from.createTime2 = val[1]
      }
      console.log(this.from)
      console.log(val)
    },
    //获取所有数据
    dataList(data){
      this.loading = true
      this.$store.dispatch('user/gongdlist',data).then((res) => {
        console.log(res.data.data.dataList)
        this.total = res.data.data.total
        const list = res.data.data.dataList
        // for (let i = 0; i<list.length; i++){
        //
        // }
        this.tableData = list
        this.loading = false
      }).catch((err) => {
        console.log(err)
        this.loading = false
      })
    },
    // responseType 响应类型//下载文件
    exportFile() {
      console.log(this.from)
      this.loading = true;
      axios({
        method: 'post',
        url: 'http://192.168.2.128:9090/ttpai/signup/exportalldatabycondition',
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          'token': localStorage.token,
        },
        responseType: "blob",
        data:this.from
      })
        .then(res => {
          this.loading = false;
          console.log(res)
          if (res.data.type) {
            // 文件下载
            const blob = new Blob([res.data], {
              type: "application/vnd.ms-excel"
            });
            let contentDisposition = res.headers['content-disposition'];
            let fileName = window.decodeURI(contentDisposition.substring(contentDisposition.indexOf('=')+1));
            let link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
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
          this.loading = false;
          this.$message.error("下载失败");
        });
    },
    //删除选中项
    shanchu(){
      if(this.guids.length > 0){
        this.$confirm(`该操作不可撤销`,'确定删除', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(res=>{
          this.$store.dispatch('user/shanchu',this.guids).then((res) => {
            // console.log(res)
            this.dataList(this.from)
          }).catch((err) => {
            console.log(err)
          })
        }).catch(res=>{
          console.log(res)
        })
      }else {
        alert('当前未选中任何数据')
      }

    }

  },
  created() {
    this.dataList(this.from)
  }
}
</script>

<style scoped>
  >>>.el-dialog__body{
  /*  dlg 内边距*/
    padding-top: 0;
  }
  >>>.el-collapse-item__content{
    padding-bottom: 0px;
  }
.spot{
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.ycbt{
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.shou {
  cursor: pointer;
  margin: 3px;
}
>>>.el-form-item{
  margin-bottom: 3px;
}
.sstitle {
  /*text-indent: 2em;*/
  font-size: 16px;
  font-weight: 900;
}

.sstj {
  padding-left: 30px;
  /*height: 40px;*/
}

>>> .el-collapse-item__header {
  line-height: 40px;
  height: 40px;
}
>>>.el-table-column--selection .cell{
  padding-right: 10px;
}
.inputDiv {
  width: 200px;
  display: inline-block;
  margin: 3px;
}
.fywDiv{
  width: 100%;
  display: flex;
  justify-content: flex-end;
}
.block{
  display: inline-block;
}
.buttonDiv {
  margin: 3px;
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

