<template>
  <div>
    <div>
      <el-collapse class="sstj" v-model="activeNames">
        <el-collapse-item>
          <span class="sstitle" slot="title">
            搜索条件
          </span>
          <el-form @keyup.enter.native="allList" ref="numberOf" :inline="true" :model="numberOf"
                   class="demo-form-inline">
            <!--            <el-form-item style="display: block">-->
            <!--              <div class="buttonDiv">-->
            <!--                <el-button class="mrr" @click="synchronous" size="small" type="success">同步数据</el-button>-->
            <!--              </div>-->
            <!--            </el-form-item>&lt;!&ndash; 提交按钮 &ndash;&gt;-->

            <!--            <el-form-item prop="status">-->

            <!--              <el-checkbox-group size="mini" v-model="from.status">-->
            <!--                <el-checkbox-button label="应答"></el-checkbox-button>-->
            <!--                <el-checkbox-button label="排队未接"></el-checkbox-button>-->
            <!--                <el-checkbox-button label="未接"></el-checkbox-button>-->
            <!--                <el-checkbox-button label="停机/占线/关机"></el-checkbox-button>-->
            <!--                <el-checkbox-button label="空号"></el-checkbox-button>-->
            <!--              </el-checkbox-group>-->
            <!--            </el-form-item>&lt;!&ndash; 工单状态 &ndash;&gt;-->

            <el-form-item>
              <div class="buttonDiv">
                <!--                @click="fromShow"-->
                <el-button size="small" @click="dialogFormShow" type="primary"
                           icon="el-icon-search">生成新批次
                </el-button>
              </div>
            </el-form-item><!-- 按钮 -->
            <br>
            <!--            <el-form-item prop="depict">-->
            <!--              <el-input-->
            <!--                size="small"-->
            <!--                placeholder="批次描述"-->
            <!--                v-model="numberOf.depict">-->
            <!--                <i slot="prefix" class="el-input__icon el-icon-search"></i>-->
            <!--              </el-input>-->
            <!--            </el-form-item>&lt;!&ndash; 批次描述 &ndash;&gt;-->
            <el-form-item prop="batchNums">
              <el-input
                size="small"
                placeholder="批次号"
                v-model="numberOf.batchNums">
                <i slot="prefix" class="el-input__icon el-icon-search"></i>
              </el-input>
            </el-form-item><!-- 批次号 -->
            <el-form-item>
              <div class="buttonDiv">
                <!--                <el-button size="small" @click="fromShow" type="primary"-->
                <!--                           icon="el-icon-search">生成新批次-->
                <!--                </el-button>-->
                <el-button size="small" @click="allList" type="primary"
                           icon="el-icon-search">搜索
                </el-button>
                <el-button size="small" @click="fromClear('numberOf')" type="info">清空<i
                  class="el-icon-delete el-icon--right"></i></el-button>
              </div>
            </el-form-item><!-- 提交按钮 -->
          </el-form>
        </el-collapse-item>
      </el-collapse>
    </div>
    <!--   外呼批次   -->
    <div class="gdt">
      <div class="table" v-loading="loading">
         <el-table
           height="calc(100vh - 120px)"
          size="mini"
          @cell-click="cell"
          :data="tableData"
          border
          @selection-change="handleSelectionChange"
          style="width: 100%">
          <el-table-column
            header-align="center"
            align="center"
            type="selection"
            width="45">
          </el-table-column>
          <el-table-column
            prop="batchNum"
            label="批次号"
            header-align="center"
            align="center"
            min-width="180">
          </el-table-column>
          <el-table-column
            prop="depict"
            label="描述"
            header-align="center"
            align="center"
            min-width="150">
          </el-table-column>
          <el-table-column
            prop="total"
            label="数据总数量"
            header-align="center"
            align="center"
            min-width="120">
          </el-table-column>
          <el-table-column
            prop="amountCompleted"
            label="已完成数据量"
            header-align="center"
            align="center"
            min-width="120">
          </el-table-column>
          <el-table-column
            prop="calling"
            label="呼叫中数量"
            header-align="center"
            align="center"
            min-width="110">
          </el-table-column>
          <el-table-column
            prop="unfinished"
            header-align="center"
            align="center"
            label="未完成数量"
            min-width="110">
          </el-table-column>
          <el-table-column
            prop="waitNumber"
            header-align="center"
            align="center"
            label="排队数量"
            min-width="110">
          </el-table-column>
          <el-table-column
            prop="outBoundSpeed"
            label="外呼速率"
            header-align="center"
            align="center"
            min-width="110">
            <template slot-scope="scope">
              <!--              <el-input v-model="scope.row.outBoundSpeed" placeholder=""></el-input>-->
              <el-select size="mini" @change="cellRate(scope.row)" style="margin-right: 10px;"
                         v-model="scope.row.outBoundSpeed"
                         placeholder="">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </template>
          </el-table-column>
          <!--          <el-table-column-->
          <!--            prop="outBoundSpeed"-->
          <!--            label="数据类型"-->
          <!--            header-align="center"-->
          <!--            align="center"-->
          <!--            min-width="150">-->
          <!--            <template slot-scope="scope">-->
          <!--              &lt;!&ndash;              <el-input v-model="scope.row.outBoundSpeed" placeholder=""></el-input>&ndash;&gt;-->
          <!--              <el-select size="mini" @change="cellGenre(scope.row)" style="margin-right: 10px;" v-model="scope.row.status"-->
          <!--                         placeholder="">-->
          <!--                <el-option-->
          <!--                  v-for="item in options2"-->
          <!--                  :key="item.value"-->
          <!--                  :label="item.label"-->
          <!--                  :value="item.value">-->
          <!--                </el-option>-->
          <!--              </el-select>-->
          <!--            </template>-->
          <!--          </el-table-column>-->
          <!--          <el-table-column-->
          <!--            min-width="150"-->
          <!--            header-align="center"-->
          <!--            align="center"-->
          <!--            prop="address"-->
          <!--            label="回访结果"-->
          <!--            show-overflow-tooltip>-->
          <!--            <template slot-scope="scope">-->
          <!--              <el-button type="primary"-->
          <!--                         size="mini">查看-->
          <!--              </el-button>-->
          <!--            </template>-->
          <!--          </el-table-column>-->
          <el-table-column
            min-width="100"
            header-align="center"
            align="center"
            prop="outboundOpen"
            label="外呼状态"
            show-overflow-tooltip>
            <template slot-scope="scope">
              <el-switch
                v-model="scope.row.outboundOpen"
                @change="startOutbound(scope.row)"
              >
              </el-switch>
            </template>
          </el-table-column>
          <!--          <el-table-column-->
          <!--            min-width="110"-->
          <!--            header-align="center"-->
          <!--            align="center"-->
          <!--            label="同步数据"-->
          <!--            show-overflow-tooltip>-->
          <!--            <template slot-scope="scope">-->
          <!--              <el-button size="mini" @click="synchronous(scope.row)" type="primary">同步数据</el-button>-->
          <!--            </template>-->
          <!--          </el-table-column>-->

          <el-table-column
            min-width="110"
            header-align="center"
            align="center"
            label="删除批次"
            show-overflow-tooltip>
            <template slot-scope="scope">
              <el-button size="mini" @click="deleteBatch(scope.row)" type="danger">删除批次</el-button>
            </template>
          </el-table-column>
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

    <div>
      <el-dialog custom-class="dialogbig" title="数据详情" :visible.sync="dialogTableVisible">
        <div class="gdt">
          <div class="table">
            <el-table
              size="mini"
              stripe
              height="70vh"
              border
              :data="dialogData">
              <el-table-column
                prop="createTime"
                label="创建时间"
                header-align="center"
                align="center"
                min-width="180">
              </el-table-column>
              <el-table-column
                prop="operateTime"
                label="呼叫时间"
                header-align="center"
                align="center"
                min-width="180">
              </el-table-column>
              <el-table-column
                prop="batchNum"
                label="批次号"
                header-align="center"
                align="center"
                min-width="180">
              </el-table-column>
              <el-table-column
                prop="jobNumber"
                label="工号"
                header-align="center"
                align="center"
                min-width="130">
              </el-table-column>
              <el-table-column
                prop="phone"
                label="手机号"
                header-align="center"
                align="center"
                min-width="130">
              </el-table-column>
              <el-table-column
                prop="status"
                label="外呼状态"
                header-align="center"
                align="center"
                min-width="130">
              </el-table-column>
            </el-table>
          </div>

        </div>
        <div class="fywDiv">
          <el-pagination
            background
            :pager-count="5"
            @current-change="numberOfPages"
            :current-page="popUps.current"
            layout="total, prev, pager, next, jumper"
            :page-size="50"
            :total="popUps.total">
          </el-pagination>
        </div>
      </el-dialog>
    </div>
    <div>
      <el-dialog title="生成新批次" :visible.sync="dialogForm">
        <div style="padding: 30px;">
          <el-form ref="from" :model="from">
            <el-form-item prop="depict" label="批次描述" label-width="80">
              <el-input v-model="from.depict"></el-input>
            </el-form-item>
            <el-form-item prop="status">
              <el-checkbox-group size="mini" v-model="from.status">
                <el-checkbox-button label="应答"></el-checkbox-button>
                <el-checkbox-button label="排队未接"></el-checkbox-button>
                <el-checkbox-button label="未接"></el-checkbox-button>
                <el-checkbox-button label="停机/占线/关机"></el-checkbox-button>
                <el-checkbox-button label="空号"></el-checkbox-button>
                <el-checkbox-button label="客户秒挂"></el-checkbox-button>
              </el-checkbox-group>
            </el-form-item><!-- 工单状态 -->
          </el-form>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogForm = false">取 消</el-button>
          <el-button type="primary" @click="newBreathe">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import {login} from "@/api/user";
import {Message} from "element-ui";

export default {
  name: "index",
  data() {
    return {
      tableData: [],//表格数据
      //value:true,
      baseURL: this.$store.state.baseURL,
      batchNum: '',//批次号
      options: [
        {
          value: '1',
          label: '1'
        },
        {
          value: '1.5',
          label: '1.5'
        },
        {
          value: '2',
          label: '2'
        },
        {
          value: '2.5',
          label: '2.5'
        },
        {
          value: '3',
          label: '3'
        },
        {
          value: '3.5',
          label: '3.5'
        },
        {
          value: '4',
          label: '4'
        },
        {
          value: '4.5',
          label: '4.5'
        },
        {
          value: '5',
          label: '5'
        },
        {
          value: '5.5',
          label: '5.5'
        },
        {
          value: '6',
          label: '6'
        },
        {
          value: '6.5',
          label: '6.5'
        },
        {
          value: '7',
          label: '7'
        },
        {
          value: '7.5',
          label: '7.5'
        },
        {
          value: '8',
          label: '8'
        },
        {
          value: '8.5',
          label: '8.5'
        },
        {
          value: '9',
          label: '9'
        },
        {
          value: '9.5',
          label: '9.5'
        },
        {
          value: '10',
          label: '10'
        }
      ],//呼叫速率数据
      options2: [
        {
          value: '应答',
          label: '应答'
        }, {
          value: '排队未接',
          label: '排队未接'
        }, {
          value: '停机/占线/关机',
          label: '停机/占线/关机'
        }, {
          value: '未接',
          label: '未接'
        }, {
          value: '空号',
          label: '空号'
        }],//数据类型
      //value:'暂未呼叫',
      //status:'',
      dialogTableVisible: false,//弹框状态
      dialogData: [],//弹框表格数据
      loading: false,//表格加载

      outBoundSpeed: 1,//外呼速率
      activeNames: [],//是否显示搜索条件
      from: {
        status: [],//状态
        depict: '',//描述
        batchNums: [],//批次号
      },//生成新批次
      numberOf: {
        current: 1,
        size: 50,
        depict: '',//描述
        batchNums: '',//批次号
      },
      total: 0,//分页总条数
      dialogForm: false,//新批次
      popUps: {
        size: 50,
        current: 1,
        total: 0,
        pages: 1,
      },//弹窗分页
      //弹窗数据
      cellList: {
        label: '',
        status: '',
        batchNum: '',
      },
      cellTimer:'',//呼叫中表格定时器
    }
  },
  methods: {
//呼叫中数据刷新
    callBreak(){
      this.cellTimer = setTimeout(this.callBreak , 3000)
      if(this.cellList.status == "calling"){
        axios({
          method: 'get',
          url: `${this.baseURL}/hetao/outboundlisthetao/getdatadetails/${this.popUps.current}/${50}?batchNum=${this.cellList.batchNum}&status=${this.cellList.status}`,
          headers: {
            "Content-Type": "application/json;charset=UTF-8",
            'token': localStorage.token,
          },
        }).then(res => {
          console.log(res)
          this.dialogData = res.data.data.dataList
          this.popUps.current = res.data.data.current
          this.popUps.total = res.data.data.total
        }).catch(err => {
          console.log(err)
        })
      }else {
        console.log('NO呼叫中')
      }
    },
    //单元格弹出数据方法
    cell(row, column, cell, event) {
      console.log(row)
      console.log(column.label)
      //console.log(cell)
      //console.log(event)
      this.cellList.batchNum = row.batchNum
      this.cellList.label = column.label
      if (column.label == "已完成数据量") {
        this.cellList.status = 'amountCompleted'
        axios({
          method: 'get',
          url: `${this.baseURL}/hetao/outboundlisthetao/getdatadetails/${1}/${50}?batchNum=${this.cellList.batchNum}&status=${this.cellList.status}`,
          headers: {
            "Content-Type": "application/json;charset=UTF-8",
            'token': localStorage.token,
          },
        }).then(res => {
          console.log(res)
          this.dialogData = res.data.data.dataList
          this.dialogTableVisible = true
          this.popUps.current = res.data.data.current
          this.popUps.total = res.data.data.total
        }).catch(err => {
          console.log(err)
        })
      } else if (column.label == "呼叫中数量") {
        this.cellList.status = "calling"
        axios({
          method: 'get',
          url: `${this.baseURL}/hetao/outboundlisthetao/getdatadetails/${1}/${50}?batchNum=${this.cellList.batchNum}&status=${this.cellList.status}`,
          headers: {
            "Content-Type": "application/json;charset=UTF-8",
            'token': localStorage.token,
          },
        }).then(res => {
          console.log(res)
          this.dialogData = res.data.data.dataList
          this.dialogTableVisible = true
          this.popUps.current = res.data.data.current
          this.popUps.total = res.data.data.total
        }).catch(err => {
          console.log(err)
        })
      } else if (column.label == "未完成数量") {
        this.cellList.status = "unfinished"
        axios({
          method: 'get',
          url: `${this.baseURL}/hetao/outboundlisthetao/getdatadetails/${1}/${50}?batchNum=${this.cellList.batchNum}&status=${this.cellList.status}`,
          headers: {
            "Content-Type": "application/json;charset=UTF-8",
            'token': localStorage.token,
          },
        }).then(res => {
          console.log(res)
          this.dialogData = res.data.data.dataList
          this.dialogTableVisible = true
          this.popUps.current = res.data.data.current
          this.popUps.total = res.data.data.total
        }).catch(err => {
          console.log(err)
        })
      } else if (column.label == "数据总数量") {
        this.cellList.status = ""
        axios({
          method: 'get',
          url: `${this.baseURL}/hetao/outboundlisthetao/getdatadetails/${1}/${50}?batchNum=${this.cellList.batchNum}&status=${this.cellList.status}`,
          headers: {
            "Content-Type": "application/json;charset=UTF-8",
            'token': localStorage.token,
          },
        }).then(res => {
          console.log(res)
          this.dialogData = res.data.data.dataList
          this.dialogTableVisible = true
          this.popUps.current = res.data.data.current
          this.popUps.total = res.data.data.total
        }).catch(err => {
          console.log(err)
        })
      }
      // else if (column.label == "外呼状态"){
      //   this.batchNum = row.batchNum
      //   this.outBoundSpeed = row.outBoundSpeed
      // }
    },

    //弹窗数据刷新 (切换页)
    newCell() {
      axios({
        method: 'get',
        url: `${this.baseURL}/hetao/outboundlisthetao/getdatadetails/${this.popUps.current}/${this.popUps.size}?batchNum=${this.cellList.batchNum}&status=${this.cellList.status}`,
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          'token': localStorage.token,
        },
      }).then(res => {
        console.log(res)
        this.dialogData = res.data.data.dataList
        this.dialogTableVisible = true
        this.popUps.current = res.data.data.current
        this.popUps.total = res.data.data.total
      }).catch(err => {
        console.log(err)
      })
    },
    //外呼数据列表
    allList() {
      this.loading = true
      axios({
        method: 'get',
        url: `${this.baseURL}/hetao/outboundlisthetao/batchdetails/${this.numberOf.size}/${this.numberOf.current}?batchNum=${this.numberOf.batchNums}`,
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          'token': localStorage.token,
        },
        data: {
          // batchNum
        }
      }).then(res => {
        console.log(res)
        console.log(res.data.data.dataList)
        this.tableData = res.data.data.dataList
        this.total = res.data.data.total
        this.numberOf.size = res.data.data.pageSize
        this.numberOf.current = res.data.data.currentPage
        this.loading = false
      }).catch(err => {
        console.log(err)
        this.loading = false
      })
    },
    //修改外呼速率
    cellRate(row) {
      console.log(row)
      axios({
        method: 'get',
        url: `${this.baseURL}/freeswitch/outboundopen/updatespeedbybatchnum?batchNum=${row.batchNum}&speed=${row.outBoundSpeed}`,
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          'token': localStorage.token,
        },
        // data: {
        //   batchNum:row.batchNum,
        //   speed:row.outBoundSpeed
        // }
      }).then(res => {
        console.log(res)
        Message({
          message: res.data.message,
          type: 'success',
          duration: 5 * 1000,
        })
      }).catch(err => {
        console.log(err)
      })
    },
    //修改数据类型
    cellGenre(row) {
      console.log(row)
      axios({
        method: 'get',
        url: `${this.baseURL}/freeswitch/outboundopen/updatestausbybatchnum?batchNum=${row.batchNum}&status=${row.status}`,
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          'token': localStorage.token,
        },
        // data: {
        //   batchNum:row.batchNum,
        //   speed:row.outBoundSpeed
        // }
      }).then(res => {
        console.log(res)
        Message({
          message: res.data.message,
          type: 'success',
          duration: 5 * 1000,
        })
      }).catch(err => {
        console.log(err)
      })
    },
    //分页 页数改变钩子
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.numberOf.current = val
      console.log(this.numberOf);
      this.allList()
    },
    //分页 条数改变钩子
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.numberOf.size = val
      this.allList()
    },
    //分页 弹框页数
    numberOfPages(val) {
      console.log(`当前页: ${val}`);
      this.popUps.current = val
      console.log(this.popUps);
      this.newCell()
    },
    //同步数据
    synchronous(row) {
      this.$confirm('此操作将同步数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        axios({
          methods: 'get',
          url: `${this.baseURL}/hetao/outboundlisthetao/datasynchronization/${row.batchNum}`,
          headers: {
            "Content-Type": "application/json;charset=UTF-8",
            'token': localStorage.token,
          },
        }).then(res => {
          console.log(res)
          Message({
            message: res.data.message,
            type: 'success',
            duration: 5 * 1000,
          })
        }).catch(err => {
          console.log(err)
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消同步'
        });
      });
      //console.log(row.batchNum)
    },
    //开启外呼
    startOutbound(row) {
      console.log(row)
      //console.log(this.outBoundSpeed,this.batchNum)
      if (row.outboundOpen == true) {
        axios({
          method: 'post',
          url: `${this.baseURL}/freeswitch/outboundopen/startautomaticoutboundcall/${row.outBoundSpeed}/${row.batchNum}`,
          headers: {
            "Content-Type": "application/json;charset=UTF-8",
            'token': localStorage.token,
          },
        }).then(res => {
          console.log(res)
          Message({
            message: `${res.data.message}`,
            type: 'success',
            duration: 5 * 1000,
          })
        }).catch(err => {
          console.log(err)
        })
      } else {
        axios({
          method: 'post',
          url: `${this.baseURL}/freeswitch/outboundopen/stopautomaticoutboundcall`,
          headers: {
            "Content-Type": "application/json;charset=UTF-8",
            'token': localStorage.token,
          },
        }).then(res => {
          console.log(res)
          Message({
            message: `${res.data.message}`,
            type: 'success',
            duration: 5 * 1000,
          })
          this.close = false
        }).catch(err => {
          console.log(err)
          this.close = false
        })
      }
    },
    //生成新批次  弹窗
    dialogFormShow() {
      if (this.from.batchNums.length > 0) {
        this.dialogForm = true
      } else {
        Message({
          message: '请勾选批次号',
          type: 'error',
          duration: 5 * 1000
        })
      }
    },
    //newBreathe 提交
    newBreathe() {
      if (this.from.depict !== '') {
        console.log(this.from)
        axios({
          method: 'post',
          url: `${this.baseURL}/hetao/outboundlisthetao/importdataimportdatabybatchnumsandstatus`,
          headers: {
            "Content-Type": "application/json;charset=UTF-8",
            'token': localStorage.token,
          },
          data: this.from
        }).then(res => {
          console.log(res)
          Message({
            message: `${res.data.message}`,
            type: 'success',
            duration: 5 * 1000,
          })
          this.allList()
          this.fromClear('from')
          this.dialogForm = false
        }).catch(err => {
          console.log(err)
        })
      } else {
        Message({
          message: '请填写批次描述',
          type: 'error',
          duration: 5 * 1000
        })
      }
    },
    //生成新批次
    fromShow() {
      if (this.from.depict !== '' && this.from.batchNums.length > 0) {
        console.log(this.from)
        axios({
          method: 'post',
          url: `${this.baseURL}/hetao/outboundlisthetao/importdataimportdatabybatchnumsandstatus`,
          headers: {
            "Content-Type": "application/json;charset=UTF-8",
            'token': localStorage.token,
          },
          data: this.from
        }).then(res => {
          console.log(res)
          Message({
            message: `${res.data.message}`,
            type: 'success',
            duration: 5 * 1000,
          })
          this.allList()
          this.fromClear('numberOf')
        }).catch(err => {
          console.log(err)
        })
      } else {
        Message({
          message: '请选择批次号和批次描述',
          type: 'error',
          duration: 5 * 1000
        })
      }

      // this.dataList(this.from)
    },
    //清空表单
    fromClear(from) {
      this.$refs[from].resetFields()
      this.from.status = []
    },
    //当复选框状态改变时获取复选框的值
    handleSelectionChange(val) {
      console.log(val)
      //this.multipleSelection = val;
      this.from.batchNums = []
      for (let a = 0; a < val.length; a++) {
        this.from.batchNums.push(`${val[a].batchNum}`)
      }
      console.log(this.from.batchNums)
    },
    //删除批次
    deleteBatch(val) {
      console.log(val.batchNum)
      this.$confirm('此操作将永久删除该批次, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        axios({
          method: 'post',
          url: `${this.baseURL}/hetao/outboundlisthetao/${val.batchNum}`,
          headers: {
            "Content-Type": "application/json;charset=UTF-8",
            'token': localStorage.token,
          },
        }).then(res => {
          console.log(res)
          Message({
            message:`${res.data.message}`,
            type:"success",
            duration:5*1000
          })
          this.allList()
        }).catch(err => {
          console.log(err)
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
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
    }
  },
  created() {
    this.branch(9)
    this.allList()

    this.callBreak()
  },
  destroyed() {
    clearInterval(this.cellTimer);
    this.cellTimer = null;
  }
}
</script>

<style scoped>
/*搜索框下边距*/
>>> .el-collapse-item__content {
  padding-bottom: 5px;
}

/*搜索项*/
>>> .el-form-item {
  margin-bottom: 0;
}

/*搜索框高度*/
>>> .el-collapse-item__header {
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

.fywDiv {
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

/* dlg 外边距 */
>>> .dialogbig {
  margin-top: 7vh !important;
  /*margin-left: 1vw;*/
  /*margin-right: 1vw;*/
  width: 80%;
  /*height: 80vh;*/
}

>>> .el-dialog__body {
  padding: 0;
}
.callhjz{
  display: flex;
}
.callhjz div{
  width: 16%;
  height: 32px;
  /*border: #cccccc solid 1px;*/
  text-align: center;
  line-height: 16px;
  color: #90A1C4;
  padding: 2px;
  font-size: 14px;

  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
}
</style>
