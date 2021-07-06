<template>
  <div class="qcfd" style="position: relative; width: 100%; height: 100%;">
<!--    <el-alert :closable="false" title="menu 1-1" type="success">-->
<!--      <router-view />-->
<!--    </el-alert>-->
    <div v-if="this.$store.state.rest" class="mask">
      <div >休息中...</div>
    </div>
    <div class="left">
      <div class="gundong" v-loading="loading">
        <div @click="dataxq(index)" v-for="(qq,index) in data" :key="index" class="namehm">
          <span>供销商：{{ qq.name }}</span><br/>
          <span>渠道来源：{{ qq.brand }}</span><br>
          <span>剩余时间：00：05：36</span>
        </div>
      </div>
    </div>

    <div class="right"  v-loading="loading2">

      <div style="background: rgb(245,245,245)">
        <div class="flex" style="width: 100%;">
          <div style="width:75%;">
            <el-steps style="width:100%;" :active="active" finish-status="success">
              <el-step title="任务创建"></el-step>
              <el-step title="首次跟进"></el-step>
              <el-step title="数据跟踪"></el-step>
              <el-step title="质检"></el-step>
              <el-step title="完成"></el-step>
            </el-steps>
          </div>
          <div class="zux" style="width: 20%;">
<!--            坐席状态：<br>-->
          <span>
            预计拨打数量：430
          </span><br>
            <span>
            已拨打数量：281
          </span>
          </div>
        </div>

      </div>
      <div class="right-s"  style="width:100%; border-bottom: 1px #666 solid;background: rgba(245,245,245,0.5)">
        <div class="right-sd"><span title="31355">数据编号：</span><span>{{onedata.guid}}</span></div>
        <div class="right-sd"><span title="2020-11-24 13:45:03">省份：</span><span>{{onedata.province}}</span></div>
        <div class="right-sd"><span title="2020-11-24 13:45:03">城市：</span><span>{{onedata.city}}</span></div>
        <div class="right-sd"><span title="2020-11-24 13:45:03">经销商编号：</span><span>15098</span></div>
        <div class="right-sd"><span title="I-8">经销商名称：</span><span>合肥盈丰</span></div>
        <div class="right-sd"><span title="天津和凌">供销商：</span><span>天津和凌</span></div>
        <div class="right-sd"><span title="天津上缘利煤炭销售有限公司">区域：</span><span>华东大区</span></div>
        <div class="right-sd"><span title="13752211555">姓名：</span><span>{{onedata.name}}</span></div>
        <div class="right-sd"><span title="滨海新区">手机号：</span><span>{{onedata.phone}}</span></div>
        <div class="right-sd"><span title="31355">线索来源：</span><span>主机厂</span></div>
        <div class="right-sd"><span title="滨海新区">意向车型：</span><span>{{onedata.brand}}</span></div>
        <div class="right-sd"><span title="31355">活动名称：</span><span>4-5月全新一代瑞虎7新增广告投放项目</span></div>
      </div>
      <div class="right-d">
        <div class="right-w1 jbkxg wb" style="border-right: none">
          <div class="leftbt">
            <h4>基本信息</h4>
          </div>
          <div class="jbxxbottom">
            <div class="jbbottom">
              <div>
                <span title="I-8">客户级别：</span><span style="font-weight: 900">A</span>
              </div>
              <div>
                <span title="I-8"><i class="el-icon-edit xglogo"></i>省份：</span><span>安徽</span>
              </div>
              <div>
                <span title="天津和凌"><i class="el-icon-edit xglogo"></i>城市：</span><span>芜湖</span>
              </div>
              <div>
                <span title="31355">清洗时间：</span><span>2020/12/17 9:03:37</span>
              </div>

              <div>
                <span title="2020-11-24 13:45:03"><i class="el-icon-edit xglogo"></i>回访结果：</span><span>回访结果</span>
              </div>
              <div>
                <span title="2020-11-24 13:45:03"><i class="el-icon-edit xglogo"></i>二级选项：</span><span>配合回访</span>
              </div>
              <div>
                <span title="2020-11-24 13:45:03"><i class="el-icon-edit xglogo"></i>三级选项：</span><span>配合回访</span>
              </div>
              <div>
                <span title="2020-11-24 13:45:03"><i class="el-icon-edit xglogo"></i>是否愿意去4S店看车：</span><span>是</span>
              </div>

              <div>
                <span title="天津上缘利煤炭销售有限公司"><i class="el-icon-edit xglogo"></i>客户姓名更新：</span>
                <span><input style="font-family: 微软雅黑 Light;" @blur="xiugaixm" v-model="syrxm" type="text"></span>
              </div>
              <div>
                <span title="13752211555"><i class="el-icon-edit xglogo"></i>联系方式更新：</span>
                <span><input style="font-family: 微软雅黑 Light;" @blur="xiugaihm" v-model="syrhm" type="text"></span>
              </div>
              <div>
                <span title="滨海新区"><i class="el-icon-edit xglogo"></i>意向车型更新：</span>
                <span><input style="font-family: 微软雅黑 Light;" @blur="xiugaizz" v-model="syrzz" type="text"></span>
              </div>
            </div>
            <div  class="jbbottom">
              <div class="wb" style="margin-top: 28px; border-right: none; padding-left: 8px">
                <span>对比车型：奇瑞瑞虎8</span><br>
                <span>购车时间：一个月内</span><br>
                <span>上牌地区：本市</span><br>
                <span>是否置换：是</span><br>
                <span>付款方式：全款</span><br>
                <span>用车区域：芜湖</span><br>
                <span>是否有牌照：是</span><br>
                <span>是否已看车：是</span><br>
              </div>
            </div>
          </div>
<!--          <div>-->
<!--            <span title="31355">品牌：</span><span>{{cssj1.y}}</span>-->
<!--          </div>-->

        </div>

        <div class="wb xtxxDiv">
          <h4>填选信息</h4>
          <div class="shangcisj">
<!--            <span>上次处理结果</span>-->
<!--            <span>客户级别：A</span>-->
            <span>考虑因素：价格</span>
            <span>下次跟进目的：确认客户到店时间</span>
            <span>客户意向度：优<br>
<!--              <div v-html="textarea" :title="textarea" style="width: 100%; height: 35px; margin-bottom: 5px;-->
<!--                text-indent: 2em;-->
<!--                overflow:hidden;-->
<!--                text-overflow:ellipsis;-->
<!--                display:-webkit-box;-->
<!--                -webkit-box-orient:vertical;-->
<!--                -webkit-line-clamp:2;-->
<!--                line-height: 18px;"-->
<!--              ></div>-->
<!--              <el-input-->
<!--                readonly-->
<!--                style="margin-bottom: 5px;"-->
<!--                type="textarea"-->
<!--                :rows="2"-->
<!--                resize="none"-->
<!--                placeholder="请输入内容"-->
<!--                v-model="textarea">-->
<!--              </el-input>-->
            </span>
          </div>
          <div style="margin-bottom: 8px;">
            <span>拨打结果：</span>
            <span>
              <el-select style="width: calc(100% - 70px);" @change="zhikong()" size="mini" v-model="form.call" placeholder="请选择">
                <el-option
                  style="width:100%;"
                  v-for="item in options"
                  :key="item.label"
                  :value="item.label">
                </el-option>
              </el-select>
            </span>
          </div>
<!--          <div style="margin-bottom: 10px;">-->
<!--            是否成功回访：-->
<!--            <el-radio-group :disabled="hfjy" size="mini" v-model="radio1">-->
<!--              <el-radio-button label="是"></el-radio-button>-->
<!--              <el-radio-button label="否"></el-radio-button>-->
<!--            </el-radio-group>-->
<!--          </div>-->
<!--          <div>-->
<!--            是否参加活动：-->
<!--            <el-radio-group :disabled="hdjy" size="mini" v-model="radio2">-->
<!--              <el-radio-button label="是"></el-radio-button>-->
<!--              <el-radio-button label="否"></el-radio-button>-->
<!--            </el-radio-group>-->
<!--          </div>-->
          <div class="gjsj" style="margin-bottom: 10px;">
            <span>跟进时间：</span>
            <span style="width: calc(100% - 70px);"><el-date-picker
              style="width:100%;"
              size="mini"
              v-model="form.gjday"
              type="datetime"
              value-format="yyyy-MM-dd HH:mm:ss"
              placeholder="选择日期">
            </el-date-picker></span>

          </div>
          <span style="line-height: 20px;">备注：</span>
          <el-input
            type="textarea"
            :rows="4"
            resize="none"
            placeholder="请输入内容"
            v-model="form.textarea1">
          </el-input>

        </div>
        <div class="czjlDid" style="">
<!--          <h4>状态区域</h4>-->
<!--          <div>-->
<!--            <div>坐席状态</div>-->
<!--            <span>拨打数量：</span><span>222</span><br>-->
<!--            <span>接通数量：</span><span>222</span><br>-->
<!--            <span>拨打数量：</span><span>222</span><br>-->
<!--            <span>拨打数量：</span><span>222</span><br>-->
<!--          </div>-->
          <div style="font-family: 微软雅黑 Light; font-size:13px;padding-top: 15px; border-bottom: 1px rgba(0,0,0,0.1) solid">
            <span style="font-weight: 900">操作记录：</span><br><br>
            <div style="margin-bottom: 10px;">
              <span>
             2020/12/15 10:23:45 分配至 王康   <br>
            </span>
              <span>
             2020/12/15 10:45:35 王康拨打 <br>
            </span>
              <span>
             2020/12/15 10:46:57 王康填写 <br>状态：未接通 备注：无人接听 <br>
            </span>
            </div>
            <div style="margin-bottom: 10px;">
              <span>
             2020/12/16 9:35:23 分配至 王康   <br>
            </span>
              <span>
             2020/12/16 9:36:46 王康拨打 <br>
            </span>
              <span>
             2020/12/16 9:37:20 王康填写 <br>状态：需跟进 备注：用户忙 <br>
            </span>
            </div>
            <div style="margin-bottom: 10px;">
              <span>
             2020/12/16 15:15:13 分配至 王康   <br>
            </span>
              <span>
             2020/12/16 15:18:35 王康拨打 <br>
            </span>
              <span>
             2020/12/16 15:19:34 王康填写 <br>状态：成功 备注：成功 <br>
            </span>
            </div>
          </div>
          <div class="buttonsDiv">
            <div class="buttonDiv">
              <el-button :disabled="sfbddh" @click="makeCall" size="small" :type="phonezt">{{this.bddh}}
                <i class="el-icon-phone el-icon--right"></i>
              </el-button>
              <!--          </div>-->
              <!--          <div class="buttonDivs">-->
              <!--            <el-button disabled @click="alldata" size="small" type="danger">挂断电话-->
              <!--              <i class="el-icon-phone el-icon&#45;&#45;right"></i>-->
              <!--            </el-button>-->
            </div>
            <div class="buttonDiv">
              <el-button :disabled="sftjrw" @click="alldata" size="small" type="primary">提交任务</el-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      sftjrw:true,//提交任务
      rest:this.$store.state.rest,//休息蒙版
      loading:true,
      loading2:true,
      bddh:'拨打电话',
      sfbddh:false,//是否拨打电话
      phonezt:'success',
      data: [],
      onedata:{},
      options: [
        {
          label: '邀约成功'
        }, {
          label: '开场白挂断'
        }, {
          label: '联系不上'
        }, {
          label: '空号/停机'
        }, {
          label: '拒接'
        }, {
          label: '客户拒接'
        }, {
          label: '客户挂断'
        },
        // {
        //   label: '无法接通'
        // }, {
        //   label: '其他'
        // }
        ],
      call: '',//接通状态
      textarea:'',//回填备注
      textarea1: '',//备注
      radio1:'',//是否回访
      hfjy:false,//是否回访禁用
      radio2:'',//是否活动
      hdjy:false,//是否活动禁用
      syrxm:'黄满山',//使用人姓名
      syrhm:'15312731991',//使用人号码
      syrzz:'全新一代瑞虎7',//使用人住址
      active:3,//步骤条进度
      gjday:'',//跟进时间
      guid:0,
      form:{
        guid:0,
        call: '',//接通状态
        gjday:'',//跟进时间
        textarea1: '',//备注
      },
      size:{
        size: 50,
        current:1
      }
    }
  },
  watch: {},
  methods: {
    alterdz(dz){
      this.syrzz = dz
      console.log(dz)
      console.log(this.syrzz)
    },
    //打电话
    makeCall(){
      let job =  {
        jobNumber:this.onedata.jobNumber,
        phone:this.onedata.phone
      }
        if(this.bddh == '拨打电话'){
          this.bddh = '挂断电话'
          this.phonezt = 'danger'
          // this.sftjrw = true
          console.log(job)
          axios({
            method: 'get',
            url: `http://192.168.54.115:9090/freeswitch/callPhone/1000/18225666629`,
            headers: {
              "Content-Type": "application/json;",
              'token': localStorage.token,
            },
            // responseType: "blob",
            // data:job
          }).then(res=>{
            console.log(res)
          }).catch(err=>{
            console.log(err)
          })
        }else if(this.bddh == '挂断电话'){
          this.bddh = '拨打电话'//
          this.phonezt = 'success'
          this.sfbddh = true
          this.sftjrw = false
        }


    },
    alldata(){
      this.sfbddh = false
      this.bddh = '拨打电话'
      this.sftjrw = true
      // if(!this.call){
      //   alert('请填写拨打结果')
      // }else {
      //   let form = {
      //     bianhao:1231,
      //     call:this.call,
      //     huifang:this.radio1,
      //     huodong:this.radio2,
      //     textarea:this.textarea1
      //   }
      //   console.log(form)
      //   // alert(JSON.stringify(this._data))
      //   alert(JSON.stringify(form))
      // }
      // this.getlist(this.size)
    },
    //根据拨打结果修改单选按钮
    zhikong(){
      console.log(this.form)
      this.$store.dispatch('user/SubmitGd',this.form).then(res=>{
        console.log(res)
      }).catch(err=>{
        console.log(err)
      })
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
    dataxq(index){
      this.loading2 = true
      this.guid = this.data[index].guid
      this.form.guid = this.data[index].guid
      console.log(this.guid)
      this.$store.dispatch('user/onelist', {guid: this.guid}).then((res) => {
        console.log(res)
        this.onedata = res.data.data.data
        this.loading2 = false
        // this.getlist(this.size)
      }).catch((err) => {
        console.log(err)
        this.loading2 = false
      })
    },
    xiugaixm(){
      //......
      let bb = this.syrxm
      console.log(bb)
    },
    xiugaihm(){
      //..........
      let bb = this.syrhm
      console.log(bb)
    },
    xiugaizz(){
      //..........
      let bb = this.syrzz
      console.log(bb)
    },
    getlist(data){//
      this.loading= true
      this.$store.dispatch('user/unworklist',data).then((res) => {
        console.log(res)
        this.loading= false
        this.data = res.data.data.dataList
        this.dataxq(0)
        console.log(this.$store.state.rest)
        // const list = res.data.data.dataList
        // this.tableData = list
      }).catch((err) => {
        console.log(err)
      })
    }
  },
  created(){//实例前
    this.getlist(this.size)
  },
  mounted() {

  }
}
</script>

<style scoped>
  .buttonsDiv{
    width: 50%;
    margin-left:25%;
    /*margin: 0 auto;*/
    position: absolute;
    bottom: 0px;
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
.xtxxDiv h4{
  text-align: center;
}
.xtxxDiv span{
  font-size: 14px;
}
.czjlDid{
  width: 25%;
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
  line-height: 20px;
  padding: 5px;
}
>>>.el-steps--horizontal{
/*  步骤条宽高*/
  font-size: 14px;
  padding: 4px 2%;
}
>>>.el-step__title{
  font-size: 14px;
  line-height: 20px;
}
.gundong {
  height: calc(100vh - 50px);
  /*border: 1px red solid;*/
  overflow: auto;
}
.buttonDiv{
  margin-bottom: 20px;
  width: 100%;
  position: relative;
  bottom: 0px;
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
.namehm {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 12px;
  width: 94%;
  height: 70px;
  padding: 5px;
  background: rgba(255,0,0,0.6);
  /*background: #DC143C;*/
  border-radius: 5px;
  margin: 10px auto;
  cursor: pointer;
  line-height: 20px;
}
.namehm + .namehm{
  background: rgba(	255,255,0,0.6);
  height: 46px;
}
.namehm + .namehm + .namehm{
  /*background:#62C3D0;*/
  background:#67C23A;
  height: 26px;

}

.left {
  float: left;
  width: 15%;

}

.right {
  float: right;
  width: 85%;
}

.right-d {
  display: flex;
  height: 75vh;
  justify-content: space-between;
  padding: 0 15px;
}

.right-w1 {
  width: 45%;
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
  grid-template-columns: repeat(6, 1fr);
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
.jbkxg div{
  overflow: hidden;
  white-space: nowrap;
}
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
.gjsj{
  display: flex;
  justify-content: end;
  white-space: nowrap;
}
.gjsj span{
  line-height: 28px;
}
>>>.el-date-editor.el-input, .el-date-editor.el-input__inner{
  width: auto;
}
/*.gundong::-webkit-scrollbar {*/
/*  !*滚动条整体样式*!*/
/*  width : 10px;  !*高宽分别对应横竖滚动条的尺寸*!*/
/*  height: 1px;*/
/*}*/
/*.gundong::-webkit-scrollbar-thumb {*/
/*  !*滚动条里面小方块*!*/
/*  border-radius   : 10px;*/
/*  background-color: skyblue;*/
/*  background-image: -webkit-linear-gradient(*/
/*    45deg,*/
/*    rgba(255, 255, 255, 0.2) 25%,*/
/*    transparent 25%,*/
/*    transparent 50%,*/
/*    rgba(255, 255, 255, 0.2) 50%,*/
/*    rgba(255, 255, 255, 0.2) 75%,*/
/*    transparent 75%,*/
/*    transparent*/
/*  );*/
/*}*/
/*.gundong::-webkit-scrollbar-track {*/
/*  !*滚动条里面轨道*!*/
/*  box-shadow   : inset 0 0 5px rgba(0, 0, 0, 0.1);*/
/*  background   : #ededed;*/
/*  border-radius: 10px;*/
/*}*/

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
  .qcfd:after{
    content: "";
    display: block;
    clear: both;
  }
</style>
