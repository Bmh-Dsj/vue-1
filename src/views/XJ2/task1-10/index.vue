<template>
  <div>
    <div class="head">
      <!--     基础信息-->
      <div class="basis">
        <p>工单基础信息</p>
        <el-form label-position="left" :inline="true" size="mini" ref="form" :model="from" label-width="70px">
          <el-form-item label="来源渠道">
            <el-input placeholder="来源渠道" v-model="from.sourceChannel"></el-input>
          </el-form-item>
          <br>
          <el-form-item style="width: 30%;" label="家长姓名">
            <el-input placeholder="家长姓名" v-model="from.name"></el-input>
          </el-form-item>
          <el-form-item style="width: 30%;" label="联系方式">
            <el-input placeholder="联系方式" v-model="from.phone"></el-input>
          </el-form-item>
<!--          <el-form-item style="width: 30%;" label="家长性别">-->
<!--            <el-select v-model="from.sex" placeholder="家长性别">-->
<!--              <el-option label="男" value='男'></el-option>-->
<!--              <el-option label="女" value='女'></el-option>-->
<!--            </el-select>-->
<!--          </el-form-item>-->
          <br>
          <el-form-item style="width: 38%;" label-width="110px" label="备用联系人姓名">
            <el-input placeholder="备用联系人姓名" v-model="from.spareName"></el-input>
          </el-form-item>
          <el-form-item style="width: 34%;" label-width="100px" label="备用联系方式">
            <el-input placeholder="备用联系方式" v-model="from.sparePhone"></el-input>
          </el-form-item>
<!--          <el-form-item style="width: 38%;" label-width="110px" label="备用联系人性别">-->
<!--            <el-select v-model="from.spareSex" placeholder="备用联系人性别">-->
<!--              <el-option label="男" value="男"></el-option>-->
<!--              <el-option label="女" value="女"></el-option>-->
<!--            </el-select>-->
<!--            &lt;!&ndash;                <el-input placeholder="备用联系人性别" v-model="from.spareSex"></el-input>&ndash;&gt;-->
<!--          </el-form-item>-->
          <br>
          <el-form-item style="width: 25%;" label="孩子姓名">
            <el-input placeholder="孩子姓名" v-model="from.babyName"></el-input>
          </el-form-item>
<!--          <el-form-item style="width: 25%;" label="孩子性别">-->
<!--            <el-select v-model="from.babySex" placeholder="孩子性别">-->
<!--              &lt;!&ndash;                  <el-option label="未知" value=""></el-option>&ndash;&gt;-->
<!--              <el-option label="男" value='男'></el-option>-->
<!--              <el-option label="女" value='女'></el-option>-->
<!--            </el-select>-->
<!--          </el-form-item>-->
          <el-form-item style="width: 25%;" label="孩子年龄">
            <el-input placeholder="孩子年龄" v-model="from.babyAge"></el-input>
<!--            <el-select v-model="from.babyAge" placeholder="孩子年龄">-->
<!--              <el-option-->
<!--                v-for="item in optionsBabyAge"-->
<!--                :key="item.value"-->
<!--                :label="item.label"-->
<!--                :value="item.value">-->
<!--              </el-option>-->
<!--            </el-select>-->
          </el-form-item>
<!--          <el-form-item style="width: 25%;" label="孩子学龄">-->
<!--            <el-select v-model="from.babySchoolAge" placeholder="孩子学龄">-->
<!--              <el-option-->
<!--                v-for="item in optionsBabySchoolAge"-->
<!--                :key="item.value"-->
<!--                :label="item.label"-->
<!--                :value="item.value">-->
<!--              </el-option>-->
<!--            </el-select>-->
<!--          </el-form-item>-->
<!--          <el-form-item style="width: 50%;" label="孩子学校">-->
<!--            <el-input placeholder="孩子学校" v-model="from.babySchool"></el-input>-->
<!--          </el-form-item>-->
<!--          <br>-->
<!--          <el-form-item style="width: 25%;" label="二宝姓名">-->
<!--            <el-input placeholder="二宝姓名" v-model="from.secondBabyName"></el-input>-->
<!--          </el-form-item>-->
<!--          <el-form-item style="width: 25%;" label="二宝性别">-->
<!--            <el-select v-model="from.secondBabySex" placeholder="二宝性别">-->
<!--              &lt;!&ndash;                  <el-option label="未知" value=""></el-option>&ndash;&gt;-->
<!--              <el-option label="男" value='男'></el-option>-->
<!--              <el-option label="女" value='女'></el-option>-->
<!--            </el-select>-->
<!--          </el-form-item>-->
<!--          <el-form-item style="width: 25%;" label="二宝年龄">-->
<!--            <el-select v-model="from.secondBabyAge" placeholder="二宝年龄">-->
<!--              <el-option-->
<!--                v-for="item in optionsBabyAge"-->
<!--                :key="item.value"-->
<!--                :label="item.label"-->
<!--                :value="item.value">-->
<!--              </el-option>-->
<!--            </el-select>-->
<!--          </el-form-item>-->
<!--          <el-form-item style="width: 25%;" label="二宝学龄">-->
<!--            <el-select v-model="from.secondBabySchoolAge" placeholder="二宝学龄">-->
<!--              <el-option-->
<!--                v-for="item in optionsBabySchoolAge"-->
<!--                :key="item.value"-->
<!--                :label="item.label"-->
<!--                :value="item.value">-->
<!--              </el-option>-->
<!--            </el-select>-->
<!--          </el-form-item>-->
<!--          <el-form-item style="width: 50%;" label="二宝学校">-->
<!--            <el-input placeholder="二宝学校" v-model="from.secondBabySchool"></el-input>-->
<!--          </el-form-item>-->
          <br>
          <el-form-item style="width: 33%;" label-width="40px" label="省份">
            <el-input placeholder="省份" v-model="from.province"></el-input>
          </el-form-item>
          <el-form-item style="width: 33%;" label-width="40px" label="城市">
            <el-input placeholder="城市" v-model="from.city"></el-input>
          </el-form-item>
          <el-form-item style="width: 33%;" label-width="40px" label="区域">
            <el-input placeholder="区域" v-model="from.region"></el-input>
          </el-form-item>
<!--          <el-form-item style="width: 80%;" label="家庭住址">-->
<!--            <el-input-->
<!--              type="textarea"-->
<!--              :rows="1"-->
<!--              resize="none"-->
<!--              placeholder="家庭住址"-->
<!--              v-model="from.address">-->
<!--            </el-input>-->
<!--          </el-form-item>-->
        </el-form>
      </div>
      <!--     选填信息-->
      <div class="optional">
        <p>选填信息</p>
        <div class="marginB">
          <span class="writing">接通状态：</span>
          <el-cascader
            size="mini"
            @change="stateSwitching1"
            placeholder="接通状态"
            v-model="from.call"
            :options="options"
            :props="{ expandTrigger: 'hover'}"
          ></el-cascader>
        </div>
<!--        <div class="marginB">-->
<!--          <span class="writing">意 向 度 ：</span>-->
<!--          <el-radio-group size="mini" v-model="from.intentionality">-->
<!--            <el-radio-button label="强"></el-radio-button>-->
<!--            <el-radio-button label="中"></el-radio-button>-->
<!--            <el-radio-button label="弱"></el-radio-button>-->
<!--          </el-radio-group>-->
<!--          <el-button @click="clearIntention" style="margin-left: 20px;" size="mini" type="primary">清除</el-button>-->
<!--        </div>-->
<!--        <div class="marginB">-->
<!--          <span class="writing">跟进时间：</span>-->
<!--          <span class="statusWidth"><el-date-picker-->
<!--            size="mini"-->
<!--            v-model="from.followUpTime"-->
<!--            type="datetime"-->
<!--            value-format="yyyy-MM-dd HH:mm:ss"-->
<!--            placeholder="选择日期">-->
<!--            </el-date-picker></span>-->
<!--          <br>-->
<!--          &lt;!&ndash;         <span class="writing writingS">上次跟进时间：{{this.followUpTime}}</span>&ndash;&gt;-->
<!--          &lt;!&ndash;         <span class="writingS">{{this.followUpTime}}</span>&ndash;&gt;-->
<!--        </div>-->
        <div class="marginB">
          <span class="writing">添加微信：</span>
          <!--         <el-radio-group size="mini" v-model="from.addWechat">-->
          <!--           <el-radio-button label="是"></el-radio-button>-->
          <!--           <el-radio-button label="否"></el-radio-button>-->
          <!--         </el-radio-group>-->
          <el-radio v-model="from.addWechat" label="是">是</el-radio>
          <el-radio v-model="from.addWechat" label="否">否</el-radio>
        </div>
<!--        <div class="marginB weChat">-->
<!--          <span class="writing">微 信 名 : </span>-->
<!--          <div>-->
<!--            <el-input size="mini" placeholder="微信名" v-model="from.weChatName"></el-input>-->
<!--          </div>-->
<!--        </div>-->
        <div class="marginB">
          <span class="writing">业务状态：</span>
          <el-cascader
            size="mini"
            @change="stateSwitching2"
            placeholder="业务状态"
            v-model="from.Business"
            :options="options4"
            :props="{ expandTrigger: 'hover' }"
          ></el-cascader>
        </div>
<!--       seatName-->
        <div class="marginB">
          <span class="writing">备注：</span>
          <!--         <div class="history">-->
          <!--              <span v-for="a in pastNote">-->
          <!--                {{a}}<br>-->
          <!--              </span>-->
          <!--         </div>-->
          <el-input
            type="textarea"
            :rows="3"
            resize="none"
            placeholder="备注"
            v-model="from.seatNote">
          </el-input>
        </div>
      </div>
      <!--     提交按钮-->
      <div class="submit">
<!--        <div class="rank">-->
<!--          <span style="font-weight: 900;">成功下单量排名:</span><br>-->
<!--          <span-->
<!--            class="rankLR">第一名 : {{ this.first.seatName }}  </span><span>成功下单 : {{ this.first.successAmount }}单</span><br>-->
<!--          <span-->
<!--            class="rankLR">第二名 : {{ this.second ? this.second.seatName : '无' }}  </span><span>成功下单 : {{ this.second ? this.second.successAmount : '0' }}单</span><br>-->
<!--          <span-->
<!--            class="rankLR">第三名 : {{ this.third ? this.third.seatName : '无' }}  </span><span>成功下单 : {{ this.third ? this.third.successAmount : '0' }}单</span><br>-->
<!--          <span-->
<!--            class="rankLR">本&nbsp;&nbsp;&nbsp;人 : {{ this.own.seatName }} </span><span>成功下单 : {{ this.own.successAmount }}单</span><br>-->
<!--        </div>-->
        <div class="buttonsDiv">
          <!--         <div class="buttonDiv">-->
          <!--           <el-button size="small" type="success">拨打电话-->
          <!--             <i class="el-icon-phone el-icon&#45;&#45;right"></i>-->
          <!--           </el-button>-->
          <!--         </div>-->
          <div class="buttonDiv">
            <el-button :loading="loadingT" @click="submit" size="small" type="primary">提交工单</el-button>
          </div>
          <!--          <div class="buttonsDiv">-->
          <!--            <div class="buttonDiv">-->
          <!--              &lt;!&ndash;              Telephone2   dphone&ndash;&gt;-->
          <!--              <el-button :disabled="sfbddh" @click="dphone" size="small" :type="phonezt">{{ this.bddh }}-->
          <!--                <i class="el-icon-phone el-icon&#45;&#45;right"></i>-->
          <!--              </el-button>-->
          <!--            </div>-->
          <!--            <div class="buttonDiv">-->
          <!--              <el-button :loading="loadingT" @click="alldata" :disabled="sftjrw" size="small" type="primary">提交任务-->
          <!--              </el-button>-->
          <!--            </div>-->
          <!--          </div>-->
        </div>
      </div>
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
      jobNumber: JSON.parse(localStorage.user).user.jobNumber,
      urlAddress: '',
      from: {
        call: '',//接通状态
        //guid: '',//数据编号
        jobNumber: '',//工号
        sourceChannel: '',//来源渠道
        // statusClass:'',//工单状态 一级
        status: [],//工单状态 数组

        // day: [],//操作时间数组
        // day2: [],//创建时间数组

        // size: 50,//个数
        // current:1,//页数
        // operateTime:'',//操作开始时间
        // operateTime2:'',//操作结束时间
        // createTime:'',//创建开始时间
        // createTime2:'',//创建结束时间
        // allocateTime:'',//分配开始时间
        // allocateTime2:'',//分配结束时间
        name: '',//联系人
        phone: '',//联系电话
        sex: '',//联系人性别
        spareName: '',//备用联系人
        sparePhone: '',//备用联系人号码
        spareSex: '',//备用联系人性别

        babyName: '',//孩子姓名
        babySex: '',//孩子性别
        babyAge: '',//孩子年龄
        babySchoolAge: '',//孩子学龄
        babySchool: '',//孩子学校
        secondBabyName: '',//二宝姓名
        secondBabySex: '',//二宝性别
        secondBabyAge: '',//二宝年龄
        secondBabySchoolAge: '',//二宝学龄
        secondBabySchool: '',//二宝学校

        province: '',//省份
        city: '',//城市
        region: '',//区域
        Business: [],//业务状态
        businessStatusId: '',//业务状态id
        intentionality: '',//意向度
        statusId: '',//接通状态
        //callNum:'',//拨打次数
        seatNote: '',//备注
        followUpTime: '',//需跟进时间
        addWechat: '',//是否添加微信
        weChatName: '',//微信名
        personalLabel: '',//个人标签
        urlAddress: '',
      },
      optionsBabySchoolAge: [
        {
          value: '小班',
          label: '小班',
        }, {
          value: '中班',
          label: '中班',
        }, {
          value: '大班',
          label: '大班',
        }, {
          value: '一年级',
          label: '一年级',
        }, {
          value: '二年级',
          label: '二年级',
        }, {
          value: '三年级',
          label: '三年级',
        }, {
          value: '四年级',
          label: '四年级',
        }, {
          value: '五年级',
          label: '五年级',
        }, {
          value: '六年级',
          label: '六年级',
        },
      ],//孩子年级 下拉框
      optionsBabyAge: [
        {
          value: 5,
          label: 5,
        }, {
          value: 6,
          label: 6,
        }, {
          value: 7,
          label: 7,
        }, {
          value: 8,
          label: 8,
        }, {
          value: 9,
          label: 9,
        }, {
          value: 10,
          label: 10,
        }, {
          value: 11,
          label: 11,
        }, {
          value: 12,
          label: 12,
        }, {
          value: 13,
          label: 13,
        },
      ],//孩子年龄 下拉
      options: [],//接通状态--二级选择框
      options4: [],//业务状态--四级选择框
      king: [],//排名
      own: {},//自己数量
      first: {},//第一
      second: {},//第二
      third: {},//第三

      phonezt: 'success',//拨打电话按钮状态
      sfbddh: false,//是否可以拨打电话
      sftjrw: true,//提交任务按钮状态
      bddh: '拨打电话',
      loadingT: false,//提交按钮加载
    }
  },
  methods: {
    //拨打电话
    dphone() {
      if (this.from.sourceChannel !== '' && this.from.phone !== '') {
        if (this.bddh == '拨打电话') {
          axios({
            method: 'get',
            url: `${this.baseURL}/freeswitch/callPhone/${this.jobNumber}/${this.from.phone}`,
            headers: {
              "Content-Type": "application/json;",
              'token': localStorage.token,
            },
            // responseType: "blob",
            // data:job
          }).then(res => {
            console.log(res)
            // console.log(res.data)
            if (res.data.data.message == "+OK") {
              this.from.callId = res.data.data.callId
              // this.from.url  = res.data.data.url
              // this.from.soundGuid = res.data.data.soundGuid
              this.from.calleeId = res.data.data.calleeId
              this.from.gateWay = res.data.data.gateWay
              this.from.callLog = res.data.data.callLog
              this.bddh = '挂断电话'
              this.phonezt = 'danger'
              console.log(this.from)
            } else {
              Message({
                message: `${res.data.data.message}`,
                type: 'error',
                duration: 5 * 1000,
              })
            }
          }).catch(err => {
            console.log(err)
          })
        } else if (this.bddh == '挂断电话') {
          axios({
            method: 'get',
            url: `${this.baseURL}/freeswitch/breakPhone/${this.from.calleeId}/${this.from.gateWay}/${this.from.callLog}`,
            headers: {
              "Content-Type": "application/json;",
              'token': localStorage.token,
            },
            // responseType: "blob",
            // data:job
          }).then(res => {
            console.log(res)
            if (res.data.data.message == "+OK") {
              console.log(res)
            }
          }).catch(err => {
            console.log(err)
          })
          this.bddh = '拨打电话'//
          this.phonezt = 'success'
          this.sfbddh = true
          //延迟提交
          setTimeout(() => {
            this.sftjrw = false
            console.log('延迟1')
          }, 1000)
        }
      } else {
        Message({
          message: '来源渠道和手机号必填',
          type: 'error',
          duration: 5 * 1000
        })
      }

    },
    //清除意向度
    clearIntention() {
      this.from.intentionality = ''
    },

    //个人标签颜色
    colorValue(val) {
      console.log(val)
      this.from.personalLabel = val //require('../../../icons/svg/' + val + '.png')
      this.urlAddress = require('../../../icons/svg/' + this.from.personalLabel + '.png')

      this.from.urlAddress = this.urlAddress
      console.log(this.urlAddress)
      console.log(this.from)
    },
    //成功量排名
    ranking() {
      axios({
        method: 'post',
        url: this.baseURL + '/xjtwo/admin/getxjtwoperformanceranking',
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          'token': localStorage.token,
        },
      }).then(res => {
        console.log('这个是请求参数', res)
        this.own = res.data.data.performanceRankingVos[res.data.data.performanceRankingVos.length - 1]
        this.king = res.data.data.performanceRankingVos.slice(0, -1)
        this.first = this.king[0]
        this.second = this.king[1]
        this.third = this.king[2]
        // console.log(this.first,this.second,this.third)

      }).catch(err => {
        console.log(err)
      })
    },
    //获取业务(2) 接通(1)状态
    dropDownBox(data) {
      return new Promise((resolve, reject) => {
        axios({
          method: 'get',
          url: this.baseURL + '/status/ynkStatus/getStatusTree/' + data,
          headers: {
            "Content-Type": "application/json;charset=UTF-8",
            'token': localStorage.token,
          },
        }).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    //接通状态转换
    stateSwitching1(val) {
      console.log(val)
      if (val.length > 0) {
        this.from.statusId = val[val.length - 1]
      }
      // console.log(val[val.length-1])
      // console.log(this.$store.state.baseURL)

      // this.form.status = val[1]
    },
    //任务状态切换
    stateSwitching2(val) {
      console.log(val)
      if (val.length > 0) {
        this.from.businessStatusId = val[val.length - 1]
      }
    },
    // 递归判断列表，把最后的children设为undefined
    getTreeData(data) {
      for (let i = 0; i < data.length; i++) {
        if (data[i].children.length < 1) {
          // children若为空数组，则将children设为undefined
          data[i].children = undefined;
        } else {
          // children若不为空数组，则继续 递归调用 本方法
          this.getTreeData(data[i].children);
        }
      }
      return data;
    },
    //提交
    submit() {
      console.log(this.from)
      this.loadingT = true
      if (this.from.sourceChannel !== '' && this.from.phone !== '') {
        axios({
          method: 'post',
          url: `${this.baseURL}/xjtwo/admin/addticket`,
          headers: {
            "Content-Type": "application/json;",
            'token': localStorage.token,
          },
          // responseType: "blob",
          data: this.from
        }).then(res => {
          this.loadingT = false
          console.log(res)

          Message({
            message:res.data.message,
            duration:5*1000
          })
        }).catch(err => {
          this.loadingT = false
          alert('提交失败,请重试')
          console.log(err)
        })
      } else {
        this.loadingT = false
        Message({
          message: '来源渠道和手机号必填',
          type: 'error',
          duration: 5 * 1000
        })
      }

    },
    //提交工单
    alldata() {
      console.log(this.from)
      if (this.from.Business.length > 0 && this.from.call.length > 0) {
        this.loadingT = true
        //this.$store.dispatch('user/htgongdtj',this.from)
        axios({
          method: 'post',
          url: `${this.baseURL}/hetao/admin/addticket`,
          headers: {
            "Content-Type": "application/json;",
            'token': localStorage.token,
          },
          // responseType: "blob",
          data: this.from
        }).then(res => {
          this.sftjrw = true
          this.sfbddh = false
          this.bddh = '拨打电话'
          this.loadingT = false
          console.log(res)
          //this.getlist(this.formInline)
        }).catch(err => {
          alert('提交失败,请重试')
          this.loadingT = false
          console.log(err)
        })
      } else {
        this.loadingT = false
        // alert('接通状态和添加微信以及业务状态为必填项 请确认填选完整')
        Message({
          message: `接通状态和添加微信以及业务状态为必填项 请确认填选完整`,
          type: 'error',
          duration: 5 * 1000,
        })
      }

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
    // this.branch(5)
    this.$store.commit('branch',10)
    this.ranking()
    //接通状态下拉
    this.dropDownBox(1).then(res => {
      console.log(res)
      this.options = this.getTreeData(res.data)
    }).catch(err => {
      console.log(err)
    })
    //业务状态下拉
    this.dropDownBox(2).then(res => {
      console.log(res)
      this.options4 = this.getTreeData(res.data)
    }).catch(err => {
      console.log(err)
    })
  }
}
</script>

<style scoped>
/*外层*/
.head {
  display: flex;
}

/*工单基础信息*/
.basis {
  width: 40%;
  height: 90vh;
  padding: 10px;
  border-right: #2b2f3a 1px solid;
}

/*基础信息标题*/
p {
  text-align: center;
}

/*输入框宽度*/
>>> .el-form-item__content {
  width: 90%;
}

/*表单边距*/
>>> .el-form--inline .el-form-item {
  margin-right: 0px;
}

/*选填信息*/
.optional {
  width: 30%;
  height: 90vh;
  padding: 10px;
  border-right: #2b2f3a 1px solid;
}

/*选填文字*/
.writing {
  font-family: 微软雅黑 Light;
  line-height: 28px;
  font-size: 14px;
}

/*文字小*/
.writingS {
  font-size: 10px !important;
}

/*下边距*/
.marginB {
  margin-bottom: 20px;
}

/*微信名*/
.weChat {
  display: flex;
  justify-content: start;
  box-sizing: border-box;
}

.weChat div {
  width: 70%;
  margin-left: 5px;
}

/*备注*/
.history {
  width: 100%;
  height: 100px;
  border: #DCDFE6 1px solid;
  border-radius: 5px;
}

/*提交*/
.submit {
  width: 30%;
  height: 90vh;
  padding: 10px;
  /*border: #2b2f3a 1px solid;*/
  position: relative;
}

/*排名*/
.rank span {
  font-size: 12px;
}

.rankLR {
  margin: 0 15px;
}

.buttonsDiv {
  position: absolute;
  width: 100%;
  /*border: #2b2f3a 1px solid;*/
  bottom: 0;
}

.buttonDiv {
  width: 200px;
  margin: 20px auto;
}

.buttonDiv button {
  width: 100%;
  /*margin-left: 25%;*/
}
</style>
