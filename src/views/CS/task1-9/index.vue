<template>
  <div>
    <!--      自动外呼坐席界面    -->
    <!--      <el-button @click="editor" type="primary">打开工单</el-button>-->
    <!--      <el-button @click="bustling" type="primary">状态切换</el-button>-->
    <!--  全部工单  -->
    <el-dialog custom-class="dialogbig" :visible="allWorkDialog">
      <template slot="title">
        <div>工单详情 排队中数量 <span style="color: red">{{ this.calling }}</span></div>
      </template>
      <div style="width: 100%; height: 80vh;overflow: auto">
        <div class="allHeart">
          <div style="background: rgb(245,245,245)">
            <div class="flex" style="width: 100%;">
              <div style="width:75%;">
                <div>
                  <el-steps simple style="width:100%;font-size: 12px" space="10" :active="active"
                            finish-status="success">
                    <el-step title="任务创建"></el-step>
                    <el-step title="首次跟进"></el-step>
                    <el-step title="跟进中"></el-step>
                    <el-step title="已添加微信"></el-step>
                    <el-step title="成功下单"></el-step>
                  </el-steps>
                </div>
                <div class="right-s"
                     style="width:100%; border-bottom: 1px #666 solid;background: rgba(245,245,245,0.5)">
                  <div class="right-sd"><span
                    :title="this.onedata.guid">数据编号：</span><span>{{ this.onedata.guid }}</span></div>
                  <!--              <div class="right-sd"><span :title="this.onedata.phone">手机号码：</span><span>{{this.onedata.phone}}</span></div>-->
                  <div class="right-sd"><span
                    :title="this.onedata.sourceChannel">来源渠道：</span><span>{{ this.onedata.sourceChannel }}</span></div>
                  <!--              <div class="right-sd"><span title="I-8">XXXX：</span><span>XXXX</span></div>-->
                  <div class="right-sd"><span
                    :title="this.onedata.phone">联系方式：</span><span>{{ this.onedata.phone }}</span></div>
                  <div class="right-sd"><span
                    :title="this.onedata.addressOfNumber">号码归属地：</span><span>{{ this.onedata.addressOfNumber }}</span>
                  </div>
                  <!--              <div class="right-sd"><span title="天津和凌">XXXX：</span><span>XXXX</span></div>-->
                </div>
              </div>
              <div class="zux" style="width: 25%;">
                <div><span style="font-weight: 900;margin-bottom: 5px;">成功下单量排名:</span></div>
                <div><span>第一名 : {{ this.first.seatName }}  </span><span>成功下单 : {{ this.first.successAmount }}单</span>
                </div>
                <div>
                  <span>第二名 : {{ this.second ? this.second.seatName : '无' }}  </span><span>成功下单 : {{ this.second ? this.second.successAmount : '0' }}单</span>
                </div>
                <div>
                  <span>第三名 : {{ this.third ? this.third.seatName : '无' }}  </span><span>成功下单 : {{ this.third ? this.third.successAmount : '0' }}单</span>
                </div>
                <div>
                  <div style="margin-right: 10px;">本&nbsp;&nbsp;&nbsp;人 :</div>
                  成功下单 : {{ this.own.successAmount }}单
                </div>
              </div>
            </div>
          </div>

          <div class="right-d">
            <div class="right-w1 jbkxg wb" style="border-right: none">
              <!--          <p>客户基础信息</p>-->
              <div>
                <el-form class="tablewb" :label-position="titleLeft" :inline="true" size="mini" ref="form" :model="form"
                         label-width="100%">
                  <!--                    <el-form-item style="width: 20%;" label="工号">-->
                  <!--                      <el-select @change="((val)=>{modify(val,form.guid,'jobNumber')})" v-model="form.jobNumber" placeholder="工号">-->
                  <!--                        <el-option-->
                  <!--                          v-for="item in optionsZx"-->
                  <!--                          :key="item.value"-->
                  <!--                          :label="item.label"-->
                  <!--                          :value="item.value">-->
                  <!--                        </el-option>-->
                  <!--                      </el-select>-->

                  <!--                      &lt;!&ndash;                    <el-select v-model="oneZx" placeholder="请选择">&ndash;&gt;-->
                  <!--                      &lt;!&ndash;                      <el-option&ndash;&gt;-->
                  <!--                      &lt;!&ndash;                        v-for="item in optionsZx"&ndash;&gt;-->
                  <!--                      &lt;!&ndash;                        :key="item.value"&ndash;&gt;-->
                  <!--                      &lt;!&ndash;                        :label="item.label"&ndash;&gt;-->
                  <!--                      &lt;!&ndash;                        :value="item.value">&ndash;&gt;-->
                  <!--                      &lt;!&ndash;                      </el-option>&ndash;&gt;-->
                  <!--                      &lt;!&ndash;                    </el-select>&ndash;&gt;-->
                  <!--                      &lt;!&ndash;                    <el-input @change="((val)=>{modify(val,form.guid,'jobNumber')})" placeholder="工号" v-model="form.jobNumber"></el-input>&ndash;&gt;-->
                  <!--                    </el-form-item>-->
                  <el-form-item style="width: 20%;" label="家长姓名">
                    <el-input placeholder="家长姓名"
                              v-model="form.name"></el-input>
                  </el-form-item>
                  <el-form-item style="width: 22%;" label="家长性别">
                    <!--                style="width:92%"-->
                    <el-select v-model="form.sex" placeholder="家长性别">
                      <el-option label="男" value='男'></el-option>
                      <el-option label="女" value='女'></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item style="width: 20%;" label=" ">
                    <el-button :loading="swopLoading" @click="swop" size="mini" type="primary">主备信息交换</el-button>
                  </el-form-item>
                  <br>
                  <el-form-item label-width="120px" style="width: 30%;" label="备用联系人姓名">
                    <el-input placeholder="备用联系人姓名"
                              v-model="form.spareName"></el-input>
                  </el-form-item>
                  <el-form-item label-width="120px" style="width: 30%;" label="备用联系方式">
                    <el-input placeholder="备用联系方式"
                              v-model="form.sparePhone"></el-input>
                  </el-form-item>

                  <el-form-item label-width="120px" style="width: 30%;" label="备用联系人性别">
                    <el-select v-model="form.spareSex"
                               placeholder="备用联系人性别">
                      <el-option label="男" value="男"></el-option>
                      <el-option label="女" value="女"></el-option>
                    </el-select>
                    <!--                <el-input placeholder="备用联系人性别" v-model="form.spareSex"></el-input>-->
                  </el-form-item>
                  <br>
                  <el-form-item style="width: 23%;" label="孩子姓名">
                    <el-input placeholder="孩子姓名"
                              v-model="form.babyName"></el-input>
                  </el-form-item>
                  <el-form-item style="width: 23%;" label="孩子性别">
                    <el-select v-model="form.babySex"
                               placeholder="孩子性别">
                      <!--                  <el-option label="未知" value=""></el-option>-->
                      <el-option label="男" value='男'></el-option>
                      <el-option label="女" value='女'></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item style="width: 23%;" label="孩子年龄">
                    <el-select v-model="form.babyAge"
                               placeholder="孩子年龄">
                      <el-option
                        v-for="item in optionsBabyAge"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item style="width: 23%;" label="孩子学龄">
                    <el-select v-model="form.babySchoolAge"
                               placeholder="孩子学龄">
                      <el-option
                        v-for="item in optionsBabySchoolAge"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                  </el-form-item>

                  <el-form-item style="width: 50%;" label="孩子学校">
                    <el-input placeholder="孩子学校"
                              v-model="form.babySchool"></el-input>
                  </el-form-item>
                  <br>

                  <!--              <el-form-item style="width: 35%;" label="出生日期">-->
                  <!--                <el-date-picker-->
                  <!--                  v-model="form.birthday"-->
                  <!--                  type="date"-->
                  <!--                  placeholder="出生日期">-->
                  <!--                </el-date-picker>-->
                  <!--                &lt;!&ndash;                <el-input placeholder="出生日期" v-model="form.name"></el-input>&ndash;&gt;-->
                  <!--              </el-form-item>-->
                  <!--              <br>-->
                  <el-form-item style="width: 23%;" label="二宝姓名">
                    <el-input placeholder="二宝姓名"
                              v-model="form.secondBabyName"></el-input>
                  </el-form-item>
                  <el-form-item style="width: 23%;" label="二宝性别">
                    <el-select v-model="form.secondBabySex"
                               placeholder="二宝性别">
                      <!--                  <el-option label="未知" value=""></el-option>-->
                      <el-option label="男" value='男'></el-option>
                      <el-option label="女" value='女'></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item style="width: 23%;" label="二宝年龄">
                    <el-select v-model="form.secondBabyAge"
                               placeholder="二宝年龄">
                      <el-option
                        v-for="item in optionsBabyAge"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item style="width: 23%;" label="二宝学龄">
                    <el-select
                               v-model="form.secondBabySchoolAge" placeholder="二宝学龄">
                      <el-option
                        v-for="item in optionsBabySchoolAge"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item style="width: 50%;" label="二宝学校">
                    <el-input placeholder="二宝学校"
                              v-model="form.secondBabySchool"></el-input>
                  </el-form-item>
                  <br>
                  <el-form-item style="width: 26%;" label="省份">
                    <el-input placeholder="省份"
                              v-model="form.province"></el-input>
                  </el-form-item>
                  <el-form-item style="width: 26%;" label="城市">
                    <el-input placeholder="城市"
                              v-model="form.city"></el-input>
                  </el-form-item>
                  <el-form-item style="width: 26%;" label="区域">
                    <el-input placeholder="区域"
                              v-model="form.region"></el-input>
                  </el-form-item>
                  <br>
                  <el-form-item style="width: 50%;" label="家庭住址">
                    <el-input
                      style="width: 100%;"
                      type="textarea"
                      :rows="2"
                      resize="none"
                      placeholder="家庭住址"
                      v-model="form.address">
                    </el-input>
                  </el-form-item>
                  <!--                  <el-form-item style="width: 40%;" label="操作时间">-->
                  <!--&lt;!&ndash;                    <el-input&ndash;&gt;-->
                  <!--&lt;!&ndash;                      @change="((val)=>{modify(val,form.guid,'address')})"&ndash;&gt;-->
                  <!--&lt;!&ndash;                      style="width: 100%;"&ndash;&gt;-->
                  <!--&lt;!&ndash;                      type="textarea"&ndash;&gt;-->
                  <!--&lt;!&ndash;                      :rows="2"&ndash;&gt;-->
                  <!--&lt;!&ndash;                      resize="none"&ndash;&gt;-->
                  <!--&lt;!&ndash;                      placeholder="家庭住址"&ndash;&gt;-->
                  <!--&lt;!&ndash;                      v-model="form.address">&ndash;&gt;-->
                  <!--&lt;!&ndash;                    </el-input>&ndash;&gt;-->
                  <!--&lt;!&ndash;                    <el-date-picker&ndash;&gt;-->
                  <!--&lt;!&ndash;                      v-model="value1"&ndash;&gt;-->
                  <!--&lt;!&ndash;                      type="datetime"&ndash;&gt;-->
                  <!--&lt;!&ndash;                      placeholder="选择日期时间">&ndash;&gt;-->
                  <!--&lt;!&ndash;                    </el-date-picker>&ndash;&gt;-->
                  <!--                    <el-date-picker-->
                  <!--                      @change="((val)=>{modify(val,form.guid,'operateTime')})"-->
                  <!--                      value-format="yyyy-MM-dd HH:mm:ss"-->
                  <!--                      size="small"-->
                  <!--                      class="shou"-->
                  <!--                      :editable='false'-->
                  <!--                      v-model="form.operateTime"-->
                  <!--                      type="datetime"-->
                  <!--                      placeholder="操作时间"-->
                  <!--                      >-->
                  <!--                    </el-date-picker>-->
                  <!--                  </el-form-item>-->


                  <!--              <el-form-item style="width: auto;" label="备注">-->
                  <!--                <el-input-->
                  <!--                  style="width: 100%;"-->
                  <!--                  type="textarea"-->
                  <!--                  :rows="2"-->
                  <!--                  resize="none"-->
                  <!--                  placeholder="备注"-->
                  <!--                  v-model="form.seatNote">-->
                  <!--                </el-input>-->
                  <!--              </el-form-item>-->
                  <!--              <el-form-item label="备注">-->

                  <!--              </el-form-item>-->

                  <!--              <el-form-item>-->
                  <!--                <el-button type="primary" @click="onSubmit">提交</el-button>-->
                  <!--&lt;!&ndash;                <el-button>取消</el-button>&ndash;&gt;-->
                  <!--              </el-form-item>-->
                </el-form>
              </div>

            </div>
            <div class="wb xtxxDiv">
              <!--          <h4>填选信息</h4>-->
              <br>
              <div class="mBottom">
                <span class="required">接通状态：</span>
                <el-cascader
                  style="width: calc(100% - 60px);"
                  size="mini"
                  @change="stateSwitchinglog1"
                  placeholder="接通状态"
                  v-model="form.call"
                  :options="options"
                  :props="{ expandTrigger: 'hover'}"
                ></el-cascader>
              </div>
              <div class="mBottom">
                <span style="width: 60px; display: inline-block">意 向 度 ：</span>
                <el-radio-group size="mini" v-model="form.intentionality">
                  <el-radio label="强">强</el-radio>
                  <el-radio label="中">中</el-radio>
                  <el-radio label="弱">弱</el-radio>
                </el-radio-group>
                <el-button style="margin-left: 10px;" @click="clearIntention" size="mini" type="primary">清除</el-button>
              </div>
              <div class="gjsj mBottom">
                <span>跟进时间：</span>
                <span class="statusWidth"><el-date-picker
                  size="mini"
                  v-model="form.followUpTime"
                  type="datetime"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  placeholder="选择日期">
            </el-date-picker></span>
                <br>
                <span>上次跟进时间：</span>
                <span>{{ this.followUpTime }}</span>
              </div>
              <div class="mBottom">
                <span class="required">添加微信：</span>
                <el-radio v-model="form.addWechat" label="是">是</el-radio>
                <el-radio v-model="form.addWechat" label="否">否</el-radio>
              </div>
              <div class="mBottom">
                <span class="required">业务状态：</span>
                <el-cascader
                  size="mini"
                  style="width: calc(100% - 60px);"
                  @change="stateSwitchinglog2"
                  placeholder="业务状态"
                  v-model="form.Business"
                  :options="options4"
                  :props="{ expandTrigger: 'hover' }"
                ></el-cascader>
              </div>


              <!--          <div class="gjsj mBottom">-->
              <!--            -->
              <!--          </div>-->

              <div class="color mBottom">
                <span>个人标签：</span>
                <span class="statusWidth">
                  <el-radio-group @change="colorValue" size="mini" :fill="this.form.personalLabel"
                                  v-model="form.personalLabel">
                    <el-radio-button label="#00BFFF">蓝</el-radio-button>
                    <el-radio-button label="#00FF7F">绿</el-radio-button>
                    <el-radio-button label="#D81E06">红</el-radio-button>
                    <el-radio-button label="#DA70D6">紫</el-radio-button>
                  </el-radio-group>
                </span>
              </div>
              <!--          <div>-->
              <!--            <span>历史备注：</span>-->
              <!--            <el-input-->
              <!--              style="width: 100%;border: none"-->
              <!--              type="textarea"-->
              <!--              :rows="3"-->
              <!--              readonly-->
              <!--              resize="none"-->
              <!--              placeholder="历史备注"-->
              <!--              v-model="form.seatNote">-->
              <!--            </el-input>-->
              <!--          </div>-->
              <div>
                <span>备注：</span>
                <!--            <el-input-->
                <!--              readonly-->
                <!--              style="width: 100%;"-->
                <!--              type="textarea"-->
                <!--              :rows="2"-->
                <!--              resize="none"-->
                <!--              v-model="form.seatNote">-->
                <!--            </el-input>-->
                <div class="history">
                  <span v-for="a in pastNote">
                    {{ a }}<br>
                  </span>
                </div>
                <el-input
                  style="width: 100%;"
                  type="textarea"
                  :rows="3"
                  resize="none"
                  placeholder="备注"
                  v-model="form.seatNote">
                </el-input>
              </div>
              <div>
<!--                <el-button size="mini" @click="openWords" type="primary">打开话术</el-button>-->
                <el-button size="mini" @click="blackList" type="danger">加入黑名单</el-button>
              </div>

            </div>
            <div class="czjlDid">
              <div class="record">
                <span style="font-weight: 900">操作记录：</span><br>
                <p v-for="a in records">
                  {{ a.details }}
                </p>
              </div>
              <div class="buttonsDiv">
                <!--                <div class="buttonDiv">-->
                <!--                  &lt;!&ndash;              Telephone2   dphone&ndash;&gt;-->
                <!--                  <el-button :disabled="sfbddh" @click="dphone" size="small" :type="phonezt">{{this.bddh}}-->
                <!--                    <i class="el-icon-phone el-icon&#45;&#45;right"></i>-->
                <!--                  </el-button>-->
                <!--                </div>-->
                <div class="buttonTDiv">
                  <el-button :loading="loadingP" type="danger" :disabled="hangUpPhone" @click="hangUp">挂断电话</el-button>
                  <el-button :loading="loadingT" :disabled="submit" @click="alldata" type="primary">提交工单</el-button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </el-dialog>
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
      allWorkDialog: false,//全部工单对话框

      //弹窗数据
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
        },
        {
          value: '六年级',
          label: '六年级',
        },{
          value: '初一',
          label: '初一',
        },{
          value: '初二',
          label: '初二',
        },{
          value: '初三',
          label: '初三',
        },{
          value: '高一',
          label: '高一',
        },{
          value: '高二',
          label: '高二',
        },{
          value: '高三',
          label: '高三',
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
      call: '',//接通状态
      onedata: {},//工单详细信息
      form: {
        guid: '',//主键
        jobNumber: '',//工号
        name: '',//家长姓名
        // phone:'',//手机号码
        sex: '',//性别
        province: '',//省份
        city: '',//城市
        region: '',//区域
        address: '',//家庭住址
        babyName: '',//孩子姓名
        babySex: '',//孩子性别
        babyAge: '',//孩子年龄
        // babyGrade:'',//孩子年级
        birthday: '',//出生日期

        followUpTime: '',//需跟进时间
        seatNote: '',//备注
        intentionality: '',//意向度
        addWechat: '',//是否添加微信
        Business: [],//业务状态 四级
        businessStatusId: '',//业务状态 ID
        call: [],//接通状态 两级
        statusId: '',//接通状态 ID
        personalLabel: '',//个人标签

        spareName: '',//备用联系人姓名
        sparePhone: '',//备用联系方式
        spareSex: '',//备用联系人性别
        babySchoolAge: '',//孩子学龄
        babySchool: '',//孩子学校
        secondBabyName: '',//二宝姓名
        secondBabySex: '',//二宝性别
        secondBabyAge: '',//二宝年龄
        secondBabySchoolAge: '',//二宝学龄
        secondBabySchool: '',//二宝学校
        url: '',//录音链接
        soundGuid: '',//录音ID
        callId: '',//通话记录ID
        calleeId: '',//挂电话

        gateWay:'',//网关
        weChatName:'',//微信名

        callLog:'',//真正的通话记录
      },//表单
      followUpTime: '',//跟进时间
      active: 0,//步骤条进度
      records: [],//工单状态
      king: [],//排名
      own: {},//自己数量
      first: {},//第一
      second: {},//第二
      third: {},//第三
      colors: '',//选择颜色
      pastNote: [],//历史备注
      titleLeft: 'left',
      loadingT: false,//提交按钮加载
      loadingP:false,//挂断按钮加载
      swopLoading: false,//信息交换加载

      optionsZx: [],
      options4: [],//业务状态数据
      options: [
        {
          value: '成功客户',
          label: '成功客户',
          children: [
            {
              value: '已下单',
              label: '已下单',
            }]
        }, {
          value: '未接通',
          label: '未接通',
          children: [
            {
              value: '无人接听',
              label: '无人接听',
            }, {
              value: '关机',
              label: '关机',
            }, {
              value: '通话中',
              label: '通话中',
            }, {
              value: '无法接通',
              label: '无法接通',
            }]
        }, {
          value: '无效数据',
          label: '无效数据',
          children: [
            {
              value: '空号',
              label: '空号',
            }, {
              value: '停机',
              label: '停机',
            }, {
              value: '已报核桃编程',
              label: '已报核桃编程',
            }]
        }, {
          value: '信息不符',
          label: '信息不符',
          children: [
            {
              value: '年龄不符',
              label: '年龄不符',
            }, {
              value: '无孩子',
              label: '无孩子',
            },]
        }, {
          value: '战败数据',
          label: '战败数据',
          children: [
            {
              value: '拒绝',
              label: '拒绝',
            }, {
              value: '无设备',
              label: '无设备',
            }, {
              value: '开场白拒绝',
              label: '开场白拒绝',
            },]
        }, {
          value: '意向客户',
          label: '意向客户',
          children: [
            {
              value: '有意加微信未通过',
              label: '有意加微信未通过',
            }, {
              value: '有意加微信通过',
              label: '有意加微信通过',
            }, {
              value: '再联系',
              label: '再联系',
            },]
        }],//二级选择框
      manner: "自动",
      timer: '',//定时器

      calleeId: '',//挂电话

      requestData: true,//请求数据
      calling: '',//外呼数量

      hangUpPhone:false,///挂断电话
      submit:true,//提交工单
    }
  },
  methods: {
    //加入黑名单
    blackList(){
      this.$confirm('此操作无法撤销, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        axios({
          method: 'get',
          url: `${this.baseURL}/demo/demo/adddatabyphoneanddepartguid/${this.onedata.phone}`,
          headers: {
            "Content-Type": "application/json;",
            'token': localStorage.token,
          },
        }).then(res => {
          console.log(res)
          this.getlist(this.formInline)
          // this.cutover()
          // this.loadingT = false
          // this.allWorkDialog = false
          // this.requestData = true
        }).catch(err => {
          console.log(err)
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        });
      });


    },
    //打开话术
    openWords(){
      let url = this.$router.resolve({
        path: '/walnut/words',

      });
      window.open(url.href, "_blank");
    },
    //挂断电话
    hangUp() {
      this.loadingP = true
      axios({
        method: 'get',
        url: `${this.baseURL}/freeswitch/breakPhone/${this.form.calleeId}/${this.form.gateWay}/${this.form.callLog}`,
        headers: {
          "Content-Type": "application/json;",
          'token': localStorage.token,
        },
      }).then(res => {
        console.log(res)
        this.cutover()
        this.loadingP = false
        if (res.data.data.message == "+OK") {
          console.log(res)
        }
      }).catch(err => {
        console.log(err)
      })
    },
    //状态切换 忙碌

    // bustling() {
    //   //user  //
    //   axios({
    //     method: 'get',
    //     url: `${this.baseURL}/user/stateswitching`,
    //     headers: {
    //       "Content-Type": "application/json;charset=UTF-8",
    //       'token': localStorage.token,
    //     },
    //   }).then(res => {
    //     console.log(res)
    //     Message({
    //       message: res.data.message,
    //       type: 'success',
    //       duration: 5 * 1000,
    //     })
    //     this.$store.dispatch('user/getInfo')
    //     this.resetSetItem('user', localStorage.user);
    //   }).catch(err => {
    //     console.log(err)
    //   })
    // },

    //切换按钮状态
    cutover(){
      if(this.hangUpPhone == false){
        this.hangUpPhone = true
        setTimeout(()=>{
          this.submit = false
        } , 1000)
      }else if(this.submit == false){
        this.hangUpPhone = false
        this.submit = true
      }

    },

    //操作数据 getPhone

    // 版本1
    editor(val) {
      //this.get(val.guid)
      //this.allWorkDialog = true
      //console.log(this.manner)
      clearInterval(this.timer)
      this.timer = setInterval(this.editor, 2000)
      //this.manner = JSON.parse(localStorage.automatic)

      if (this.manner == "自动") {
        if (JSON.parse(localStorage.user).user.workStatus == true) {
          if (this.requestData) {
            if (this.allWorkDialog !== true) {
              axios({
                method: 'get',
                url: `${this.baseURL}/hetao/outboundlisthetao/getphone`,
                headers: {
                  "Content-Type": "application/json;charset=UTF-8",
                  'token': localStorage.token,
                },
              }).then(res => {
                console.log(res)
                if (res.data == '') {
                  console.log('暂无数据')
                }else if(res.data.code == 400){
                  Message({
                    message: `${res.data.message} ` || 'getphone--400',
                    type: 'error',
                    duration: 5 * 1000,
                  })

                  this.$store.dispatch('user/getInfo')
                  this.resetSetItem('user', localStorage.user);
                  if(res.data.message == '自动外呼已关闭,请联系管理员'){
                    alert('自动外呼已关闭,请联系管理员.')
                  }
                }else if (Object.keys(res.data.data).length !== 0) {
                  console.log("自动呼叫")
                  this.allWorkDialog = true
                  this.onedata = res.data.data.data
                  this.form = res.data.data.data
                  this.active = parseInt(this.onedata.plannedSpeed)
                  this.form.call = []
                  this.form.Business = []
                  this.followUpTime = res.data.data.followUpTime
                  this.pastNote = res.data.data.pastNote
                  this.calleeId = res.data.data.calleeId
                  this.form.calleeId = res.data.data.calleeId
                  this.calling = res.data.data.calling
                  console.log(this.form)
                  this.$store.dispatch('user/getInfo')
                  this.resetSetItem('user', localStorage.user);
                  // console.log(this.$store.state.rest)
                  //操作记录
                  this.records = res.data.data.record
                  this.ranking()//排名
                  this.requestData = false
                }
              }).catch(err => {
                console.log(err)
                Message({
                  message: `${err.data.message}`,
                  type: 'success',
                  duration: 5 * 1000,
                })
              })
            }
          } else {
            console.log('已有数据')
          }
        } else {
          console.log("忙碌")
        }
      } else {
        console.log("手动呼叫")
      }
    },

    //自动外呼版本2
    // editor(val) {
    //   // this.editor()
    //   //this.get(val.guid)
    //   //this.allWorkDialog = true
    //   //console.log(this.manner)
    //   //this.manner = JSON.parse(localStorage.automatic)
    //
    //   // clearInterval(this.timer)
    //   // this.timer = setInterval(this.editor, 2000)
    //
    //   if (this.manner == "自动") {
    //     if (JSON.parse(localStorage.user).user.workStatus == true) {
    //       if (this.requestData) {
    //         if (this.allWorkDialog !== true) {
    //           axios({
    //             method: 'get',
    //             url: `${this.baseURL}/hetao/outboundlisthetao/getphone`,
    //             headers: {
    //               "Content-Type": "application/json;charset=UTF-8",
    //               'token': localStorage.token,
    //             },
    //           }).then(res => {
    //             console.log(res)
    //             if (res.data == '') {
    //               console.log('暂无数据')
    //               this.editor()
    //             }else if(res.data.code == 400){
    //               Message({
    //                 message: `${res.data.message} ` || 'getphone--400',
    //                 type: 'error',
    //                 duration: 5 * 1000,
    //               })
    //
    //               this.$store.dispatch('user/getInfo')
    //               this.resetSetItem('user', localStorage.user);
    //             }else if (Object.keys(res.data.data).length !== 0) {
    //               console.log("自动呼叫")
    //               this.allWorkDialog = true
    //               this.onedata = res.data.data.data
    //               this.form = res.data.data.data
    //               this.active = parseInt(this.onedata.plannedSpeed)
    //               this.form.call = []
    //               this.form.Business = []
    //               this.followUpTime = res.data.data.followUpTime
    //               this.pastNote = res.data.data.pastNote
    //               this.calleeId = res.data.data.calleeId
    //               this.form.calleeId = res.data.data.calleeId
    //               this.calling = res.data.data.calling
    //               console.log(this.form)
    //               this.$store.dispatch('user/getInfo')
    //               this.resetSetItem('user', localStorage.user);
    //               // console.log(this.$store.state.rest)
    //               //操作记录
    //               this.records = res.data.data.record
    //               this.ranking()//排名
    //               this.requestData = false
    //             }
    //           }).catch(err => {
    //             console.log(err)
    //             Message({
    //               message: `${err.data.message}`,
    //               type: 'success',
    //               duration: 5 * 1000,
    //             })
    //           })
    //         }
    //       } else {
    //         console.log('已有数据')
    //       }
    //     } else {
    //       console.log("忙碌")
    //       setTimeout(()=>{
    //         this.editor()
    //       },1000)
    //     }
    //   } else {
    //     console.log("手动呼叫")
    //     //setTimeout(this.editor(),2000)
    //   }
    // },

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
    //坐席列表
    // seatList(){
    //   this.$store.dispatch('user/tyFp').then(res=>{
    //     let jobs = []
    //     for (let a = 0; a < res.data.data.data.length; a++){
    //       let job = {}
    //       job.value = res.data.data.data[a].jobNumber
    //       job.label = res.data.data.data[a].jobNumber
    //       jobs.push(job)
    //     }
    //     this.optionsZx = jobs
    //     // console.log(jobs)
    //     // let job = this.oneZx
    //   }).catch(err=>{
    //     console.log(err)
    //   })
    // },
    //成功量排名
    ranking() {
      axios({
        method: 'post',
        url: this.baseURL + '/demo/demo/getperformanceranking',
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
    //单个工单详细数据 htgdoneList
    get(data) {
      //this.$store.dispatch('user/htgdoneList', data)
      axios({
        method: 'get',
        url: `${this.baseURL}/demo/demo/getdetail/${data}`,
        headers: {
          "Content-Type": "application/json;",
          'token': localStorage.token,
        },
      }).then(res => {
        console.log(res)
        this.onedata = res.data.data.data
        this.form = res.data.data.data
        this.active = parseInt(this.onedata.plannedSpeed)
        this.form.call = []
        this.form.Business = []
        this.followUpTime = res.data.data.followUpTime
        this.pastNote = res.data.data.pastNote
        console.log(this.form)
        // console.log(this.$store.state.rest)
        //操作记录
        this.records = res.data.data.record
        this.ranking()//排名
      }).catch(err => {
        console.log(err)
      })
    },
    //清除意向度
    clearIntention() {
      this.form.intentionality = ''
    },
    //提交工单
    alldata() {
      console.log(this.form)
      if(this.form.addWechat !== '' && this.form.Business.length > 0  && this.form.call.length > 0){
        this.loadingT = true
        //this.$store.dispatch('user/htgongdtj', this.form)
        axios({
          method: 'post',
          url: `${this.baseURL}/demo/demo/addstatus`,
          headers: {
            "Content-Type": "application/json;",
            'token': localStorage.token,
          },
          data:this.form
        }).then(res => {
          console.log(res)
          //this.dataList(this.from)
          //this.bustling()
          this.cutover()
          this.loadingT = false
          this.allWorkDialog = false
          this.requestData = true
          Message({
            message: `提交成功`,
            type: 'success',
            duration: 5 * 1000,
          })
        }).catch(err => {
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
    //实时修改字段
    modify(value, guid, a) {
      console.log(value, guid, a)
      axios({
        method: 'get',
        url: `${this.baseURL}/demo/demo/updatebyguidandfieldnameandvalue/${guid}/${a}/${value}`,
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          'token': localStorage.token,
        },
      }).then(res => {
        console.log('这个是请求参数', res)
      }).catch(err => {
        console.log(err)
      })
    },
    //swop 主备信息交换
    swop() {
      this.swopLoading = true
      axios({
        method: 'get',
        url: `${this.baseURL}/demo/demo/primaryandstandbydataexchange?guid=${this.form.guid}&sparePhone=${this.form.sparePhone}&spareName=${this.form.spareName}`,
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          'token': localStorage.token,
        },
      }).then(res => {
        this.swopLoading = false
        console.log('这个是请求参数', res)
        if (res.data.code == 400) {
          Message({
            message: `${res.data.message}`,
            type: 'error',
            duration: 5 * 1000,
          })
        } else {
          this.onedata = res.data.data.data
          this.form = res.data.data.data
          this.form.call = []
          this.form.Business = []
        }
      }).catch(err => {
        this.swopLoading = false
        console.log(err)
      })
    },
    //个人标签颜色
    colorValue(val) {
      console.log(val)
      this.form.personalLabel = val //require('../../../icons/svg/' + val + '.png')
      this.urlAddress = require('../../../icons/svg/' + this.form.personalLabel + '.png')

      this.form.urlAddress = this.urlAddress
      console.log(this.urlAddress)
      console.log(this.form)
    },
    //接通状态转换
    stateSwitchinglog1(val) {
      console.log(val)
      if (val.length > 0) {
        this.form.statusId = val[val.length - 1]
      }
      // console.log(val[val.length-1])
      // console.log(this.$store.state.baseURL)

      // this.form.status = val[1]
    },
    //任务状态切换
    stateSwitchinglog2(val) {
      console.log(val)
      if (val.length > 0) {
        this.form.businessStatusId = val[val.length - 1]
      }
    },
    ////状态切换 忙碌
    bustling() {
      //user.workStatus
      axios({
        method: 'get',
        url: `${this.baseURL}/user/statetobusy`,
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          'token': localStorage.token,
        },
      }).then(res => {
        console.log(res)
        // if (res.data.message == "当前状态不在工作中，无法切换置忙状态") {
        //   this.val = !JSON.parse(localStorage.user).user.workStatus
        //   Message({
        //     message: res.data.message,
        //     type: 'error',
        //     duration: 5 * 1000,
        //   })
        // } else {
        //   Message({
        //     message: res.data.message,
        //     type: 'success',
        //     duration: 5 * 1000,
        //   })
        // }
        this.$store.dispatch('user/getInfo')
        location.reload()
      }).catch(err => {
        console.log(err)
      })
    },
  },
  created() {
    //this.editor()
    //坐席列表
    //this.seatList()
    //业务状态下拉
    this.dropDownBox(2).then(res => {
      console.log(res)
      this.options4 = this.getTreeData(res.data)
    }).catch(err => {
      console.log(err)
    })
    //接通状态下拉
    this.dropDownBox(1).then(res => {
      console.log(res)
      this.options = this.getTreeData(res.data)
    }).catch(err => {
      console.log(err)
    })
    this.editor()
  },
  //页面销毁
  destroyed() {
    clearInterval(this.timer);
    this.timer = null;

    this.bustling()
  }
}
</script>

<style scoped>
/* dlg 外边距 */
>>> .dialogbig {
  margin-top: 7vh !important;
  margin-left: 1vw;
  margin-right: 1vw;
  width: auto;
}

/*操作记录 弹出框样式*/
.dlgjl {
  height: 70vh;
  overflow: auto;
}

.dlgjl div {
  border-bottom: 1px #999999 solid;
  margin-bottom: 5px;
  padding-bottom: 5px;
}

/* 弹窗标题边距 */
>>> .el-dialog__header {
  padding: 15px 20px 10px;
}

/* 弹窗文本边距 */
>>> .el-dialog__body {
  padding: 5px 20px 15px;
}

/* 全部工单格式 */
.allHeart {
  width: 100%;
}

.right-d {
  display: flex;
  height: 75vh;
  justify-content: space-between;
  padding: 0 15px;
}

.right-w1 {
  width: 50%;
  padding: 5px;
  font-size: 14px;
  border-right: 1px rgba(0, 0, 0, 0.1) solid;
  /*line-height: 20px;*/
}

.right-w h4 {
  text-align: center;
}

.right-s {
  display: grid;
  /*grid-template-columns: repeat(4, 1fr);*/
  grid-template-columns: 15% 15% 25% 40%;
  padding: 10px;
}

/*成功量排名*/
.zux {
  /*margin-top: 10px;*/
  font-size: 12px;
  line-height: 14px;
  /*padding: 5px;*/
  border-bottom: black solid 1px;
}

.zux div {
  display: flex;
}

.zux div span {
  width: 50%;
}

.flex {
  display: flex;
  justify-content: space-between;
}

.right-d {
  display: flex;
  height: 75vh;
  justify-content: space-between;
  padding: 0 15px;
}

.right-s {
  display: grid;
  /*grid-template-columns: repeat(4, 1fr);*/
  grid-template-columns: 15% 15% 25% 40%;
  padding: 10px;
}

.wb {
  font-family: 微软雅黑 Light;
  line-height: 28px;
}

.right-w1 {
  width: 45%;
  padding: 5px;
  font-size: 14px;
  border-right: 1px rgba(0, 0, 0, 0.1) solid;
  /*line-height: 20px;*/
}

.xtxxDiv {
  width: 25%;
  border-right: none;
  border-left: 1px rgba(0, 0, 0, 0.1) solid;
  padding-right: 20px;
  padding-left: 20px;
  font-family: 微软雅黑 Light;
}

.czjlDid {
  width: 30%;
  border-left: 1px rgba(0, 0, 0, 0.1) solid;
  background: rgba(245, 245, 245, 0.5);
  padding-left: 15px;
  position: relative;
}

.xtxxDiv div span {
  font-size: 12px;
}

/*操作记录*/
.record {
  height: calc(100% - 150px);
  overflow: auto;
  white-space: pre-wrap;
  word-break: break-all;
  padding-left: 15px;
  font-family: 微软雅黑 Light;
  font-size: 13px;
  padding-top: 15px;
  border-bottom: 1px rgba(0, 0, 0, 0.1) solid
  /*white-space: normal;*/
}

/*奇数行*/
.record p:nth-of-type(odd) {
  background: #F0F0F0;
}

.buttonsDiv {
  width: 100%;
}

.mBottom {
  margin-bottom: 10px;
}

/* 历史备注 框 */
.history {
  padding: 5px;
  width: 100%;
  height: 140px;
  overflow: auto;
  border: 1px #d3dce6 solid;
  border-bottom: 1px transparent solid;
  font-size: 12px;
  line-height: 16px;
  word-break: break-all;
  white-space: pre-wrap;
}

.buttonTDiv {
  /*width: 100px;*/
  margin: 20px auto;
}

/*不换行*/
.noLineBreak {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

>>> .el-form-item__content {
  width: 100%;
}
.required{
  color: red;
}
</style>

