<template>
  <div>
    <div v-if="this.$store.state.rest" class="mask">
      <div >休息中...</div>
    </div>
    <!--    <el-alert :closable="false" title="menu 1-1" type="success">-->
    <!--      <router-view />-->
    <!--    </el-alert>-->
    <div class="left">
      <div class="sousuo">
        <el-collapse accordion>
          <el-collapse-item>
            <template slot="title">
              搜索条件
            </template>
            <el-form @keyup.enter.native="onSubmit" ref="formInline" size="mini" :inline="true" :model="formInline" class="demo-form-inline">
              <el-form-item prop="guid">
                <el-input v-model="formInline.guid" placeholder="数据编号"></el-input>
              </el-form-item>
              <el-form-item prop="intentionality">
                <el-select v-model="formInline.intentionality" placeholder="意向度">
                  <el-option label="强" value='强'></el-option>
                  <el-option label="中" value='中'></el-option>
                  <el-option label="弱" value='弱'></el-option>
                </el-select>
              </el-form-item>
              <el-form-item prop="state">
                <el-cascader
                  placeholder="接通状态"
                  @change="statess"
                  v-model="formInline.state"
                  :options="options"
                  :props="{ expandTrigger: 'hover' ,checkStrictly: true }"
                ></el-cascader>
              </el-form-item>
              <!--              <el-form-item prop="personalLabel">-->
              <!--                <el-select v-model="formInline.personalLabel" placeholder="标签">-->
              <!--                  <el-option label="蓝" value='#00BFFF'></el-option>-->
              <!--                  <el-option label="绿" value='#00FF7F'></el-option>-->
              <!--                  <el-option label="黄" value='#FFD700'></el-option>-->
              <!--                  <el-option label="紫" value='#DA70D6'></el-option>-->
              <!--                </el-select>-->
              <!--              </el-form-item>-->
              <el-form-item prop="name">
                <el-input v-model="formInline.name" placeholder="家长姓名"></el-input>
              </el-form-item>
              <el-form-item prop="phone">
                <el-input v-model="formInline.phone" placeholder="联系方式"></el-input>
              </el-form-item>
              <el-form-item prop="province">
                <el-input v-model="formInline.province" placeholder="省份"></el-input>
              </el-form-item>
              <el-form-item prop="city">
                <el-input v-model="formInline.city" placeholder="城市"></el-input>
              </el-form-item>

              <el-form-item style="width: 60%;">
                <div>
                  <el-button type="primary" @click="onSubmit">查询</el-button>
                  <el-button @click="fromClear('formInline')">清空</el-button>
                </div>
              </el-form-item>
            </el-form>
          </el-collapse-item>
        </el-collapse>

      </div>
      <div class="gundong" v-loading="loading">
        <div :class="acg == index ? 'selectedBorder' : ''" :style="`background: ${qq.background}`" @click="dataxq(index)" v-for="(qq,index) in data" :key="index" class="namehm">
          <div class="noLineBreak">
            <span>数据编号: {{qq.guid}}</span>
            <span>姓名：{{ qq.name }}</span>
            <span :title="qq.phone">联系方式：{{ qq.phone }}</span>
          </div>
          <div class="noLineBreak">
            <span>省份：{{ qq.province }}</span>
            <span>城市：{{ qq.city }}</span>
            <span>意向度：{{qq.intentionality?qq.intentionality:'无' }} </span>
            <span>状态：{{ qq.status?qq.status:'无' }}</span>
          </div>
          <div :style="`background:url('${qq.urlAddress}') no-repeat`" class="label">
            <!--            <div class="triangle"></div>-->
            <!--            <svg xmlns="../../../icons/svg/bc.svg"></svg>-->
          </div>
          <!--          <el-tooltip class="item" effect="dark" :content="qq.seatNote" placement="top-start">-->
          <!--            <div>备注：{{ qq.seatNote?qq.seatNote:'无' }}</div>-->
          <!--          </el-tooltip>-->
        </div>
        <div>
          <el-pagination
            small
            :pager-count="5"
            @current-change="handleCurrentChange"
            :current-page="formInline.current"
            :page-size="50"
            layout="total, prev, pager, next,jumper"
            :total="total">
          </el-pagination>
        </div>
      </div>
    </div>
    <div class="right"  v-loading="loading2">
      <div style="background: rgb(245,245,245)">
        <div class="flex" style="width: 100%;">
          <div style="width:75%;">
            <div>
              <el-steps simple style="width:100%;font-size: 12px" space="10" :active="active" finish-status="success">
                <el-step title="任务创建"></el-step>
                <el-step title="首次跟进"></el-step>
                <el-step title="跟进中"></el-step>
                <el-step title="已添加微信"></el-step>
                <el-step title="成功下单"></el-step>
              </el-steps>
            </div>
            <div class="right-s" style="width:100%; border-bottom: 1px #666 solid;background: rgba(245,245,245,0.5)">
              <!--              <div class="right-sd"><span :title="this.onedata.guid">客户等级：</span><span>{{this.onedata.guid}}</span></div>-->
              <div class="right-sd"><span :title="this.onedata.guid">数据编号：</span><span>{{this.onedata.guid}}</span></div>
              <!--              <div class="right-sd"><span :title="this.onedata.phone">手机号码：</span><span>{{this.onedata.phone}}</span></div>-->
              <div class="right-sd"><span :title="this.onedata.sourceChannel">来源渠道：</span><span>{{this.onedata.sourceChannel}}</span></div>
              <!--              <div class="right-sd"><span title="I-8">XXXX：</span><span>XXXX</span></div>-->
              <div class="right-sd"><span :title="this.onedata.phone">联系方式：</span><span>{{this.onedata.phone}}</span></div>
              <div class="right-sd"><span :title="this.onedata.addressOfNumber">号码归属地：</span><span>{{this.onedata.addressOfNumber}}</span></div>
              <!--              <div class="right-sd"><span title="天津和凌">XXXX：</span><span>XXXX</span></div>-->
            </div>
          </div>
          <div class="zux" style="width: 25%;">
            <div><span style="font-weight: 900;margin-bottom: 5px;">成功下单量排名:</span></div>
            <div><span>第一名 : {{this.first.seatName}}  </span><span>成功下单 : {{this.first.successAmount}}单</span></div>
            <div><span>第二名 : {{this.second?this.second.seatName:'无'}}  </span><span>成功下单 : {{this.second?this.second.successAmount:'0'}}单</span></div>
            <div><span>第三名 : {{this.third?this.third.seatName:'无'}}  </span><span>成功下单 : {{this.third?this.third.successAmount:'0'}}单</span></div>
            <div><div style="margin-right: 10px;">本&nbsp;&nbsp;&nbsp;人 : </div>成功下单 : {{this.own.successAmount}}单</div>
          </div>
        </div>

      </div>

      <div class="right-d">
        <div class="right-w1 jbkxg wb" style="border-right: none">
          <!--          <p>客户基础信息</p>-->
          <div>
            <el-form class="tablewb" :label-position="titleLeft" :inline="true" size="mini" ref="form" :model="form" label-width="80px">
              <el-form-item style="width: 20%;" label="家长姓名">
                <el-input placeholder="家长姓名" v-model="form.name"></el-input>
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
                <el-input placeholder="备用联系人姓名" v-model="form.spareName"></el-input>
              </el-form-item>
              <el-form-item label-width="120px" style="width: 30%;" label="备用联系方式">
                <el-input placeholder="备用联系方式" v-model="form.sparePhone"></el-input>
              </el-form-item>

              <el-form-item label-width="120px" style="width: 30%;" label="备用联系人性别">
                <el-select v-model="form.spareSex" placeholder="备用联系人性别">
                  <el-option label="男" value="男"></el-option>
                  <el-option label="女" value="女"></el-option>
                </el-select>
                <!--                <el-input placeholder="备用联系人性别" v-model="form.spareSex"></el-input>-->
              </el-form-item>
              <br>
              <el-form-item style="width: 23%;" label="孩子姓名">
                <el-input placeholder="孩子姓名" v-model="form.babyName"></el-input>
              </el-form-item>
              <el-form-item style="width: 23%;" label="孩子性别">
                <el-select v-model="form.babySex" placeholder="孩子性别">
                  <!--                  <el-option label="未知" value=""></el-option>-->
                  <el-option label="男" value='男'></el-option>
                  <el-option label="女" value='女'></el-option>
                </el-select>
              </el-form-item>
              <el-form-item style="width: 23%;" label="孩子年龄">
                <el-select v-model="form.babyAge" placeholder="孩子年龄">
                  <el-option
                    v-for="item in optionsBabyAge"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item style="width: 23%;" label="孩子学龄">
                <el-select v-model="form.babySchoolAge" placeholder="孩子学龄">
                  <el-option
                    v-for="item in optionsBabySchoolAge"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>

              <el-form-item style="width: 50%;" label="孩子学校">
                <el-input placeholder="孩子学校" v-model="form.babySchool"></el-input>
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
                <el-input placeholder="二宝姓名" v-model="form.secondBabyName"></el-input>
              </el-form-item>
              <el-form-item style="width: 23%;" label="二宝性别">
                <el-select v-model="form.secondBabySex" placeholder="二宝性别">
                  <!--                  <el-option label="未知" value=""></el-option>-->
                  <el-option label="男" value='男'></el-option>
                  <el-option label="女" value='女'></el-option>
                </el-select>
              </el-form-item>
              <el-form-item style="width: 23%;" label="二宝年龄">
                <el-select v-model="form.secondBabyAge" placeholder="二宝年龄">
                  <el-option
                    v-for="item in optionsBabyAge"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item style="width: 23%;" label="二宝学龄">
                <el-select v-model="form.secondBabySchoolAge" placeholder="二宝学龄">
                  <el-option
                    v-for="item in optionsBabySchoolAge"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item style="width: 50%;" label="二宝学校">
                <el-input placeholder="二宝学校" v-model="form.secondBabySchool"></el-input>
              </el-form-item>
              <br>
              <el-form-item style="width: 26%;" label="省份">
                <el-input placeholder="省份" v-model="form.province"></el-input>
              </el-form-item>
              <el-form-item style="width: 26%;" label="城市">
                <el-input placeholder="城市" v-model="form.city"></el-input>
              </el-form-item>
              <el-form-item style="width: 26%;" label="区域">
                <el-input placeholder="区域" v-model="form.region"></el-input>
              </el-form-item>
              <br>
              <el-form-item style="width: auto;" label="家庭住址">
                <el-input
                  style="width: 100%;"
                  type="textarea"
                  :rows="1"
                  resize="none"
                  placeholder="家庭住址"
                  v-model="form.address">
                </el-input>
              </el-form-item>
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
              @change="stateSwitching1"
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
            <el-button @click="clearIntention" size="mini" type="primary">清除</el-button>
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
            <span>{{this.followUpTime}}</span>
          </div>
          <div class="mBottom">
            <span class="required">添加微信：</span>
            <el-radio v-model="form.addWechat" label="是">是</el-radio>
            <el-radio v-model="form.addWechat" label="否">否</el-radio>
          </div>
          <div class="mBottom" style="display: flex; justify-content: end;flex-wrap: wrap; ">
            <span>微 信 名 ：</span>
            <el-input style="width: 70%;" size="mini" placeholder="微信名" v-model="form.weChatName"></el-input>
          </div>
          <div class="mBottom">
            <span class="required">业务状态：</span>
            <el-cascader
              size="mini"
              style="width: calc(100% - 60px);"
              @change="stateSwitching2"
              placeholder="业务状态"
              v-model="form.Business"
              :options="options4"
              :props="{ expandTrigger: 'hover' }"
            ></el-cascader>
          </div>
          <div class="color mBottom">
            <span>个人标签：</span>
            <span class="statusWidth">
              <el-radio-group @change="colorValue" size="mini" :fill="this.form.personalLabel" v-model="form.personalLabel">
              <el-radio-button label="#00BFFF">蓝</el-radio-button>
              <el-radio-button label="#00FF7F">绿</el-radio-button>
              <el-radio-button label="#D81E06">红</el-radio-button>
              <el-radio-button label="#DA70D6">紫</el-radio-button>
            </el-radio-group>
            </span>
          </div>
          <el-button size="mini" @click="blackList" type="danger">加入黑名单</el-button>
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
                {{a}}<br>
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

          </div>

        </div>
        <div class="czjlDid">
          <div class="record">
            <span style="font-weight: 900">操作记录：</span><br>
            <p v-for="a in record">
              {{a.details}}
            </p>
          </div>
          <div class="buttonsDiv">
            <div class="buttonDiv">
              <!--              Telephone2   dphone-->
              <el-button :disabled="sfbddh" @click="dphone" size="small" :type="phonezt">{{this.bddh}}
                <i class="el-icon-phone el-icon--right"></i>
              </el-button>
            </div>
            <div class="buttonDiv">
              <el-button :loading="loadingT" @click="alldata" :disabled="sftjrw" size="small" type="primary">提交任务</el-button>
            </div>
          </div>
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
      urlAddress:'',
      acg:0,//工单边框
      baseURL:this.$store.state.baseURL,
      uuid:'',
      titleLeft:'left',
      total:0,//分页总条数
      phonezt:'success',//拨打电话按钮状态
      sfbddh:false,//是否可以拨打电话
      sftjrw:true,//提交任务按钮状态
      bddh:'拨打电话',
      loading:false,
      loading2:false,
      loadingT:false,//提交按钮加载
      swopLoading:false,//信息交换加载
      data: [],//任务栏数据
      onedata:{},//工单详细信息
      optionsdj:[
        {
          value: 'A',
          label: 'A'
        }, {
          value: 'B',
          label: 'B'
        }, {
          value: 'C',
          label: 'C'
        }],//客户等级
      options: [
        // {
        //   value: '未接通',
        //   label: '未接通',
        //   children: [
        //     {
        //       value: '未接',
        //       label: '未接',
        //     },{
        //       value: '占线',
        //       label: '占线',
        //     },{
        //       value: '无法接通',
        //       label: '无法接通',
        //     },{
        //       value: '关机',
        //       label: '关机',
        //     },{
        //       value: '停机',
        //       label: '停机',
        //     }]
        // },{
        //   value: '已接通',
        //   label: '已接通',
        //   children: [
        //     {
        //       value: '开场白拒绝',
        //       label: '开场白拒绝',
        //     }, {
        //       value: '客户挂断',
        //       label: '客户挂断',
        //     }, {
        //       value: '客户秒挂',
        //       label: '客户秒挂',
        //     }, {
        //       value: '客户明确拒绝',
        //       label: '客户明确拒绝',
        //     }, {
        //       value: '客户正忙',
        //       label: '客户正忙',
        //     }]
        // },
      ],//接通状态--二级选择框
      options4: [
        // {
        //   value: '战败',
        //   label: '战败',
        //   children: [
        //     {
        //       value: '明确拒绝',
        //       label: '明确拒绝',
        //     }, {
        //       value: '无效数据',
        //       label: '无效数据',
        //       children: [{
        //         value: '空号',
        //         label: '空号',
        //       },{
        //         value: '无设备',
        //         label: '无设备',
        //       },{
        //         value: '信息错误',
        //         label: '信息错误',
        //         children: [
        //           {
        //             value: '号码错误',
        //             label: '号码错误',
        //           }, {
        //             value: '学龄不符',
        //             label: '学龄不符',
        //           }, {
        //             value: '无孩子',
        //             label: '无孩子',
        //           }
        //         ]
        //       }]
        //     },]
        // },{
        //   value: '成功下单',
        //   label: '成功下单',
        // },
      ],//业务状态--四级选择框
      optionsBabySchoolAge:[
        {
          value: '小班',
          label: '小班',
        },{
          value: '中班',
          label: '中班',
        },{
          value: '大班',
          label: '大班',
        },{
          value: '一年级',
          label: '一年级',
        },{
          value: '二年级',
          label: '二年级',
        },{
          value: '三年级',
          label: '三年级',
        },{
          value: '四年级',
          label: '四年级',
        },{
          value: '五年级',
          label: '五年级',
        },{
          value: '六年级',
          label: '六年级',
        },
      ],//孩子年级 下拉框
      optionsBabyAge:[
        {
          value: 5,
          label: 5,
        },{
          value: 6,
          label: 6,
        },{
          value: 7,
          label: 7,
        },{
          value: 8,
          label: 8,
        },{
          value: 9,
          label: 9,
        },{
          value: 10,
          label: 10,
        },{
          value: 11,
          label: 11,
        },{
          value: 12,
          label: 12,
        },{
          value: 13,
          label: 13,
        },
      ],//孩子年龄 下拉
      call: '',//接通状态
      textarea:'',//回填备注
      textarea1: '',//备注
      active:0,//步骤条进度
      followUpTime:'',//跟进时间
      guid:0,
      formInline: {
        current: 1,
        guid: '',
        size: 50,
        intentionality:'',//意向度
        name:'',//家长姓名
        province:'',//省份
        city:'',//城市
        state: '',//状态
        phone: '',//号码
        statusId:'',//接通状态
        personalLabel:'',//标签
      },
      form:{
        guid:'',//主键
        name:'',//家长姓名
        // phone:'',//手机号码
        sex: '' ,//性别
        province:'',//省份
        city:'',//城市
        region:'',//区域
        address:'',//家庭住址
        babyName:'',//孩子姓名
        babySex:'',//孩子性别
        babyAge:'',//孩子年龄
        // babyGrade:'',//孩子年级
        birthday:'',//出生日期

        followUpTime:'',//需跟进时间
        seatNote: '',//备注
        intentionality:'',//意向度
        addWechat:'',//是否添加微信
        Business:[],//业务状态 四级
        businessStatusId:'',//业务状态 ID
        call: [],//接通状态 两级
        statusId:'',//接通状态 ID
        personalLabel:'',//个人标签

        spareName:'',//备用联系人姓名
        sparePhone:'',//备用联系方式
        spareSex:'',//备用联系人性别
        babySchoolAge:'',//孩子学龄
        babySchool:'',//孩子学校
        secondBabyName:'',//二宝姓名
        secondBabySex:'',//二宝性别
        secondBabyAge:'',//二宝年龄
        secondBabySchoolAge:'',//二宝学龄
        secondBabySchool:'',//二宝学校
        url:'',//录音链接
        soundGuid:'',//录音ID
        callId:'',//通话记录ID
        calleeId:'',//通话记录ID2
        gateWay:'',//网关
        weChatName:'',//微信名

        callLog:'',//真正的通话记录
      },//表单
      jobNumber:JSON.parse(localStorage.user).user.jobNumber,
      size:{
        size: 50,
        current:1
      },
      record:[],//工单状态
      king:[],//排名
      own:{},//自己数量
      first:{},//第一
      second:{},//第二
      third:{},//第三
      colors:'',//选择颜色
      pastNote:[],//历史备注
    }
  },
  watch: {},
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
          url: `${this.baseURL}/zyb/admin/adddatabyphoneanddepartguid/${this.onedata.phone}`,
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
    //搜索状态转换
    statess(val){
      console.log(val)
      this.formInline.statusId = val[val.length-1]
    },
    //接通状态转换
    stateSwitching1(val){
      console.log(val)
      if(val.length>0){
        this.form.statusId = val[val.length-1]
      }
      // console.log(val[val.length-1])
      // console.log(this.$store.state.baseURL)

      // this.form.status = val[1]
    },
    //任务状态切换
    stateSwitching2(val){
      console.log(val)
      if(val.length>0){
        this.form.businessStatusId = val[val.length-1]
      }
    },
    //清空表单
    fromClear(from) {
      this.$refs[from].resetFields()
      this.formInline.statusId = ''
    },
    //搜索工单
    onSubmit(){
      console.log(this.formInline)
      this.getlist(this.formInline)
    },
    //搜索页跳转  handleCurrentChange
    handleCurrentChange(val){
      console.log(val)
      this.formInline.current = val
      this.getlist(this.formInline)
    },
    //提交工单
    alldata(){
      console.log(this.form)
      if(this.form.addWechat !== '' && this.form.Business.length > 0  && this.form.call.length > 0){
        if(this.form.intentionality !== ''){
          if(this.form.followUpTime !== null){
            this.loadingT = true
            //this.$store.dispatch('user/htgongdtj',this.form)
            axios({
              method: 'post',
              url: `${this.baseURL}/zyb/admin/addstatus`,
              headers: {
                "Content-Type": "application/json;",
                'token': localStorage.token,
              },
              data:this.form
            }).then(res=>{
              this.sftjrw = true
              this.sfbddh = false
              this.bddh = '拨打电话'
              this.loadingT = false
              console.log(res)
              this.getlist(this.formInline)
            }).catch(err=>{
              alert('提交失败,请重试')
              this.loadingT = false
              console.log(err)
            })
          }else {
            // alert('如果填选了意向度则需跟进时间为必填项')
            Message({
              message: `如果填选了意向度则需跟进时间为必填项`,
              type: 'error',
              duration: 5 * 1000,
            })
          }
        }else {
          console.log(this.form)
          this.loadingT = true
          //this.$store.dispatch('user/htgongdtj',this.form)
          axios({
            method: 'post',
            url: `${this.baseURL}/zyb/admin/addstatus`,
            headers: {
              "Content-Type": "application/json;",
              'token': localStorage.token,
            },
            data:this.form
          }).then(res=>{
            this.sftjrw = true
            this.sfbddh = false
            this.bddh = '拨打电话'
            this.loadingT = false
            console.log(res)
            this.getlist(this.formInline)
          }).catch(err=>{
            alert('提交失败,请重试')
            this.loadingT = false
            console.log(err)
          })
        }
      }else {
        this.loadingT = false
        // alert('接通状态和添加微信以及业务状态为必填项 请确认填选完整')
        Message({
          message: `接通状态和添加微信以及业务状态为必填项 请确认填选完整`,
          type: 'error',
          duration: 5 * 1000,
        })
      }

    },
    //拨打电话
    dphone(){
      if(this.bddh == '拨打电话'){
        axios({
          method: 'get',
          url: `${this.baseURL}/freeswitch/callPhone/${this.jobNumber}/${this.onedata.phone}`,
          headers: {
            "Content-Type": "application/json;",
            'token': localStorage.token,
          },
          // responseType: "blob",
          // data:job
        }).then(res=>{
          console.log(res)
          // console.log(res.data)
          if(res.data.data.message=="+OK"){
            this.form.callId = res.data.data.callId
            // this.form.url  = res.data.data.url
            // this.form.soundGuid = res.data.data.soundGuid
            this.form.calleeId = res.data.data.calleeId
            this.form.gateWay = res.data.data.gateWay
            this.form.callLog = res.data.data.callLog
            this.bddh = '挂断电话'
            this.phonezt = 'danger'
            console.log(this.form)
          }else {
            Message({
              message: `${res.data.data.message}`,
              type: 'error',
              duration: 5 * 1000,
            })
          }
        }).catch(err=>{
          console.log(err)
        })
      }else if(this.bddh == '挂断电话'){
        axios({
          method: 'get',
          url: `${this.baseURL}/freeswitch/breakPhone/${this.form.calleeId}/${this.form.gateWay}/${this.form.callLog}`,
          headers: {
            "Content-Type": "application/json;",
            'token': localStorage.token,
          },
          // responseType: "blob",
          // data:job
        }).then(res=>{
          console.log(res)
          if(res.data.data.message=="+OK"){
            console.log(res)
          }
        }).catch(err=>{
          console.log(err)
        })
        this.bddh = '拨打电话'//
        this.phonezt = 'success'
        this.sfbddh = true
        //延迟提交
        setTimeout(()=>{
          this.sftjrw = false
          console.log('延迟1')
        },1000)
      }
    },
    //根据拨打结果修改单选按钮
    zhikong(){
      // console.log(this.form)
      // this.$store.dispatch('user/SubmitGd',this.form).then(res=>{
      //   console.log(res)
      // }).catch(err=>{
      //   console.log(err)
      // })
      // if(!(this.call=='接通')){
      //   this.radio1='否'
      //   this.hfjy = true
      //   this.radio2='否'
      //   this.hdjy = true
      // }else {
      //   this.radio1='否'
      //   this.hfjy = false
      //   this.radio2='否'
      //   this.hdjy = false
      // }
      // document.getElementById('#sfhd').disabled = "true"
      // $('#sfhd').attr('disabled',true)
      // $('#sfhd').removeAttr('checked')
    },
    //点击切换工单数据
    dataxq(index){
      this.loading2 = true
      let guid = this.data[index].guid
      this.acg = index
      // this.form.guid = this.data[index].guid
      this.get(guid)
    },
    //工单列表数据
    getlist(data){
      this.loading = true
      this.loading2 = true
      //this.$store.dispatch('user/htgdList',data)
      axios({
        method: 'post',
        url: `${this.baseURL}/zyb/admin/getneedhandledata`,
        headers: {
          "Content-Type": "application/json;",
          'token': localStorage.token,
        },
        data:data
      }).then(res=>{
        console.log(res)
        this.loading = false
        this.data = res.data.data.dataList
        this.total = res.data.data.total
        this.formInline.current = res.data.data.current
        for(let i = 0 ; i < res.data.data.dataList.length; i++){
          if(res.data.data.dataList[i].personalLabel !== ''){
            res.data.data.dataList[i].urlAddress = require('../../../icons/svg/' + res.data.data.dataList[i].personalLabel + '.png')
            // console.log(res.data.data.dataList[i].urlAddress)
          }
          // if(res.data.data.dataList[i].followUpTime !== null){
          //   if(res.data.data.dataList[i].followUpTime.substring(0,10) == this.ShowDate(0)){
          //     console.log(true)
          //     res.data.data.dataList[i].colors = res.data.data.dataList[i].colors
          //   }
          // }
        }
        this.acg = 0
        if(res.data.data.dataList.length > 0){
          let guid =  res.data.data.dataList[0].guid
          this.get(guid)
        }else {
          alert('列表无数据')
          this.loading2 = false
        }

      }).catch(err=>{
        console.log(err)
        this.loading = false
      })
    },
    //单个工单详细数据 htgdoneList
    get(data){
      this.loading2 = true
      //this.$store.dispatch('user/htgdoneList',data)
      axios({
        method: 'get',
        url: `${this.baseURL}/zyb/admin/getdetail/${data}`,
        headers: {
          "Content-Type": "application/json;",
          'token': localStorage.token,
        },
      }).then(res=>{
        this.loading2 = false
        console.log(res)
        this.onedata = res.data.data.data
        this.form = res.data.data.data
        this.active = parseInt(this.onedata.plannedSpeed)
        // this.active = res.data.data.data.plannedSpeed
        this.form.call = []
        this.form.Business = []
        // this.form.babySchoolAgearr = []
        // this.form.babyAgearr = []
        // this.form.call.push(res.data.data.data.statusClass)
        // this.form.call.push(res.data.data.data.status)
        this.followUpTime = res.data.data.followUpTime
        this.pastNote = res.data.data.pastNote
        console.log(this.form)
        console.log(this.$store.state.rest)
        //this.form.guid = this.onedata.guid
        // for (let i = 0 ; i < res.data.data.record.length;i++){
        //   res.data.data.record[i].details = res.data.data.record[i].details.slice(0,29) + '\n' + res.data.data.record[i].details.slice(29)
        // }
        this.record = res.data.data.record
        this.ranking()//排名
      }).catch(err=>{
        console.log(err)
        this.loading = false
      })
      // axios({
      //   method: 'get',
      //   url: 'http://192.168.3.117:9090/zyb/admin/getdetail/'+data,
      //   headers: {
      //     "Content-Type": "application/json;charset=UTF-8",
      //     'token': localStorage.token,
      //   },
      // }).then(res=>{
      //   this.loading2 = false
      //   console.log(res)
      //   this.onedata = res.data.data.data
      //   this.form = res.data.data.data
      //   this.form.call = []
      //   this.form.call.push(res.data.data.data.statusClass)
      //   this.form.call.push(res.data.data.data.status)
      //   console.log(this.form)
      //   this.form.guid = this.onedata.guid
      //   this.record = res.data.data.record
      // }).catch(err=>{
      //   console.log(err)
      // })
    },
    //实时修改字段
    modify(value,guid,a){
      console.log(value,guid,a)
      axios({
        method: 'get',
        url: `${this.baseURL}/zyb/admin/updatebyguidandfieldnameandvalue/${guid}/${a}/${value}`,
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          'token': localStorage.token,
        },
      }).then(res => {
        console.log('这个是请求参数',res)
      }).catch(err => {
        console.log(err)
      })
    },
    //swop 主备信息交换
    swop(){
      this.swopLoading = true
      axios({
        method: 'get',
        url: `${this.baseURL}/zyb/admin/primaryandstandbydataexchange?guid=${this.form.guid}&sparePhone=${this.form.sparePhone}&spareName=${this.form.spareName}`,
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          'token': localStorage.token,
        },
      }).then(res => {
        this.swopLoading = false
        console.log('这个是请求参数',res)
        if(res.data.code == 400){
          Message({
            message: `${res.data.message}`,
            type: 'error',
            duration: 5 * 1000,
          })
        }else {
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
    //成功量排名
    ranking(){
      axios({
        method: 'post',
        url: this.baseURL + '/zyb/admin/getzybperformanceranking',
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          'token': localStorage.token,
        },
      }).then(res => {
        console.log('这个是请求参数',res)
        this.own = res.data.data.performanceRankingVos[res.data.data.performanceRankingVos.length-1]
        this.king = res.data.data.performanceRankingVos.slice(0,-1)
        this.first = this.king[0]
        this.second = this.king[1]
        this.third = this.king[2]
        // console.log(this.first,this.second,this.third)

      }).catch(err => {
        console.log(err)
      })
    },
    //获取业务(2) 接通(1)状态
    dropDownBox(data){
      return new Promise((resolve, reject) => {
        axios({
          method: 'get',
          url: this.baseURL + '/status/ynkStatus/getStatusTree/' + data,
          headers: {
            "Content-Type": "application/json;charset=UTF-8",
            'token': localStorage.token,
          },
        }).then(res => {
          // console.log(res)
          resolve(res)
          // let obj = []
          // for (let i = 0; i < res.data.length ; i++){
          //   let aa = {}
          //   aa.label = res.data[i].title
          //   aa.value = res.data[i].guid
          //   obj.push(aa)
          //   aa.children = []
          //   for (let j = 0 ; j < res.data[i].children.length; j++){
          //     let bb = {}
          //     bb.label = res.data[i].children[j].title
          //     bb.value = res.data[i].children[j].guid
          //     aa.children.push(bb)
          //   }
          // }
          // console.log(obj)
          // this.options = obj
        }).catch(err => {
          // console.log(err)
          reject(err)
        })
      })
    },
    //个人标签颜色
    colorValue(val){
      console.log(val)
      this.form.personalLabel = val //require('../../../icons/svg/' + val + '.png')
      this.urlAddress = require('../../../icons/svg/' + this.form.personalLabel + '.png')

      this.form.urlAddress = this.urlAddress
      console.log(this.urlAddress)
      console.log(this.form)
    },
    // 递归判断列表，把最后的children设为undefined
    getTreeData(data){
      for(let i=0;i<data.length;i++){
        if(data[i].children.length<1){
          // children若为空数组，则将children设为undefined
          data[i].children=undefined;
        }else {
          // children若不为空数组，则继续 递归调用 本方法
          this.getTreeData(data[i].children);
        }
      }
      return data;
    },
    //时间转换
    ShowDate(date){
      var num = date
      let n = num;
      let d = new Date();
      let year = d.getFullYear();
      let mon = d.getMonth() + 1;
      let day = d.getDate();
      if(day <= n) {
        if(mon > 1) {
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
    //清除意向度
    clearIntention(){
      this.form.intentionality = ''
    },
    //Telephone2
    Telephone2(){
      return new Promise((resolve, reject) => {
        axios({
          method: 'get',
          url: `${this.baseURL}/freeswitch/callPhone/${this.jobNumber}/${this.onedata.phone}/${this.onedata.guid}`,
          headers: {
            "Content-Type": "application/json;charset=UTF-8",
            'token': localStorage.token,
          },
          // data:data
        }).then(res => {
          console.log('这个是请求参数',res)
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    }
  },
  //实例前
  created(){
    this.getlist(this.formInline)
    // this.get()
    //接通状态下拉
    this.dropDownBox(1).then(res=>{
      console.log(res)
      // let obj = []
      // for (let i = 0; i < res.data.length ; i++){
      //   let aa = {}
      //   aa.label = res.data[i].title
      //   aa.value = res.data[i].guid
      //   obj.push(aa)
      //   aa.children = []
      //   for (let j = 0 ; j < res.data[i].children.length; j++){
      //     let bb = {}
      //     bb.label = res.data[i].children[j].title
      //     bb.value = res.data[i].children[j].guid
      //     aa.children.push(bb)
      //   }
      // }
      // console.log(obj)
      this.options = this.getTreeData(res.data)
    }).catch(err=>{
      console.log(err)
    })
    //业务状态下拉
    this.dropDownBox(2).then(res=>{
      console.log(res)
      // let arr = []
      // for (let i = 0; i < res.data.length; i++){
      //   let aa = {}
      //   aa.label = res.data[i].title
      //   aa.value = res.data[i].guid
      //   arr.push(aa)
      //   aa.children = []
      //   for (let q = 0 ; q <res.data[i].children.length; q++){
      //     let bb = {}
      //     bb.label = res.data[i].children[q].title
      //     bb.value = res.data[i].children[q].guid
      //     aa.children.push(bb)
      //     bb.children = []
      //     for (let w = 0 ; w < res.data[i].children[q].children.length; w++){
      //       let cc = {}
      //       cc.label = res.data[i].children[q].children[w].title
      //       cc.value = res.data[i].children[q].children[w].guid
      //       bb.children.push(cc)
      //       cc.children = []
      //       for (let z = 0 ; z < res.data[i].children[q].children[w].children.length;z++){
      //         let dd = {}
      //         dd.label = res.data[i].children[q].children[w].children[z].title
      //         dd.value = res.data[i].children[q].children[w].children[z].guid
      //         cc.children.push(cc)
      //       }
      //     }
      //   }
      // }
      // console.log(arr)
      this.options4 = this.getTreeData(res.data)
    }).catch(err=>{
      console.log(err)
    })
    // this.ranking()//排名
  },
  mounted() {
    // this.getlist(this.formInline)
    // this.ranking()//排名
  }
}
</script>

<style scoped>
>>>.el-form-item--mini .el-form-item__content, .el-form-item--mini .el-form-item__label{
  width: 100%;
}
/* 分页边距 */
>>>.el-pagination__jump , >>>.el-pagination .btn-next{
  margin-left: 0;
}
>>>.el-pagination .btn-prev{
  margin-right: 0;
}
/*单选按钮 外边距*/
>>>.el-radio{
  margin-right: 20px ;
}
/*单选按钮 内边距*/
>>>.el-radio__label{
  padding-left: 5px;
}
/* 单选字体 */
>>>.el-radio-button--mini .el-radio-button__inner{
  font-size: 13px;
}
/* 时间宽度 */
>>>.el-date-editor.el-input, .el-date-editor.el-input__inner{
  width: 100%;
}
/*状态 时间 宽度统一*/
.statusWidth{
  display: inline-block;
  width: calc(100% - 60px);
}
/*input 内边距*/
>>>.el-input__inner{
  padding: 0 10px;
}
/* 选中边框 */
.selectedBorder{
  border: #67C23A solid 1px ;
}
>>>.el-input--prefix .el-input__inner{
  padding-left: 30px;
}
>>>.el-form-item__label{
  font-size: 12px;
}
>>>.el-step.is-simple .el-step__title{
  font-size: 12px;
}
/*操作记录*/
.record{
  height: calc(100% - 150px);
  overflow: auto;
  white-space: pre-wrap;
  word-break: break-all;
  padding-left: 15px;
  font-family: 微软雅黑 Light;
  font-size:13px;
  padding-top: 15px;
  border-bottom: 1px rgba(0,0,0,0.1) solid
  /*white-space: normal;*/
}
/*奇数行*/
.record p:nth-of-type(odd){
  background: #F0F0F0;
}

.wb{
  font-family: 微软雅黑 Light;
  line-height: 28px;
}
.leftbt{
  text-align: center;
}
.jbxxbottom{
  display: flex;
  justify-content: space-between;
}
.jbbottom{
  width: 48%;
}
.xtxxDiv{
  width: 30%;
  border-right: none;
  border-left: 1px rgba(0,0,0,0.1) solid;
  padding-right:20px ;
  padding-left:20px ;
  font-family: 微软雅黑 Light;
}
/*.xtxxDiv h4{*/
/*  text-align: center;*/
/*}*/
/*.xtxxDiv div{*/
/*  margin-bottom: 10px;*/
/*}*/
.mBottom{
  margin-bottom: 10px;
}
.xtxxDiv div span{
  font-size: 12px;
}
.czjlDid{
  width: 30%;
  border-left:1px rgba(0,0,0,0.1) solid;
  background: rgba(245,245,245,0.5);
  padding-left: 15px;
  position: relative;
}
.flex{
  display: flex;
  justify-content: space-between;
}
.zux{
  /*margin-top: 10px;*/
  font-size: 12px;
  line-height: 14px;
  padding: 5px;
  border-bottom: black solid 1px;
}
.zux div{
  display: flex;
}
.zux div span{
  width: 50%;
}
>>>.el-steps--horizontal{
  /*  步骤条宽高*/
  font-size: 14px;
  padding: 4px 2%;
}
/*步骤条内边距*/
>>>.el-steps--simple{
  padding: 13px 4%;
}
>>>.el-step__title{
  font-size: 14px;
  line-height: 20px;
}
.gundong {
  height: calc(100vh - 90px);
  /*border: 1px red solid;*/
  overflow: auto;
}
.buttonsDiv{
  width: 50%;
  margin-left:25%;
  /*margin: 0 auto;*/
  position: absolute;
  bottom: 0px;
}
.buttonDiv{
  margin-bottom: 20px;
  width: 100%;
  /*position: relative;*/
  /*bottom: 0px;*/
}
.buttonDivs{
  margin-bottom: 20px;
  width: 100%;
  position: relative;
  bottom: -180px;
}
.buttonDiv button{
  width: 100%;
  /*margin-left: 25%;*/
}
/*.buttonDivs button{*/
/*  width: 48%;*/
/*  box-sizing: border-box;*/
/*}*/
>>>.el-button+.el-button{
  margin-left: 2%;
}
.sousuo{
  font-size: 12px;
  width: 94%;
  /*padding: 5px;*/
  margin: 10px auto 0px;
  line-height: 20px;
}
>>>.el-form--inline .el-form-item{
  margin:1%;
  width: 31%;
}
>>>.el-collapse-item__header{
  height: 28px;
}
>>>.el-collapse{
  border-top: none;
}
>>>.el-collapse-item__content{
  padding-bottom: 10px;
}
/* 历史备注 框 */
.history{
  padding: 5px;
  width: 100%;
  height: 140px;
  overflow: auto;
  border: 1px #d3dce6 solid;
  border-bottom:1px transparent solid ;
  font-size: 12px;
  line-height: 16px;
  word-break: break-all;
  white-space: pre-wrap;
}
/*不换行*/
.noLineBreak{
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.namehm {
  /*overflow: hidden;*/
  /*text-overflow: ellipsis;*/
  /*white-space: nowrap;*/
  font-size: 10px;
  width: 94%;
  height: 44px;
  padding: 5px;
  /*background: rgba(255,0,0,0.6);*/
  background: #F5F5F5;
  border-radius: 5px;
  margin: 10px auto;
  cursor: pointer;
  line-height: 18px;
  position: relative;
}
.namehm span{
  /*margin-left: 5px;*/
  margin-right: 5px;
}
.namehm div{
  word-break: break-all;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2; /* 这里是超出几行省略 */
  overflow: hidden;
  margin-left: 5px;
  margin-right: 10px;
}
/*.namehm + .namehm{*/
/*  background: rgba(	255,255,0,0.6);*/
/*  height: 46px;*/
/*}*/
/*.namehm + .namehm + .namehm{*/
/*  !*background:#62C3D0;*!*/
/*  background:#67C23A;*/
/*  height: 26px;*/

/*}*/

.left {
  float: left;
  width: 27%;
}

.right {
  float: right;
  width: 73%;
}

.right-d {
  display: flex;
  height: 75vh;
  justify-content: space-between;
  padding: 0 15px;
}

.right-w1 {
  width: 40%;
  padding: 5px;
  font-size: 14px;
  border-right: 1px rgba(0,0,0,0.1) solid;
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
.right-sd{
  margin: 3px;
  display: flex;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 12px;

}
.right-sd span:nth-of-type(2) {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.shangcisj span{
  font-size: 14px;
  line-height: 22px;
  /*margin-bottom:8px ;*/
  display: block;
}
.jbkxg span{
  /*display: flex;*/
  line-height: 28px;
}
/*.jbkxg div{*/
/*  overflow: hidden;*/
/*  white-space: nowrap;*/
/*}*/
input{
  /*width: 200px;*/
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  border: none;
  outline: none;

}
.xglogo{
  line-height: 28px;
}
/*.gjsj{*/
/*  display: flex;*/
/*  justify-content: end;*/
/*  white-space: nowrap;*/
/*}*/
.gjsj span{
  line-height: 28px;
}
/*标签*/
.label{
  width: 16px;
  height: 30px;
  /*border-radius: 100%;*/
  display: inline-block;
  /*border: black solid 1px;*/
  position: absolute;
  right: 0;
  top: 0px;
  margin: 0  !important;
  padding: 0;
  background-size: 100%;
}
.mask {
  background-color: rgb(0, 0, 0);
  opacity: 0.6;
  position: absolute;
  bottom: 0;
  right: 0;
  width: 100%;
  /*height: calc(100% - 44px);*/
  height: 100%;
  z-index: 999;
  text-align: center;
  padding-top: 17%;
  font-size: 80px;
  font-weight: 900;
  color: rgba(255,255,255,0.7);
}
.required{
  color: red;
}
.gundong::-webkit-scrollbar {
  /* 设置竖向滚动条的宽度 */
  width: 7px;
  /* 设置横向滚动条的高度 */
  height: 7px;
}
.gundong::-webkit-scrollbar-thumb {
  /*滚动条的背景色*/
  background-color: rgba(144,147,153,.3);
  border-radius: 35px;
  position: relative;
}
</style>

