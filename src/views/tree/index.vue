<template>
  <!--  <div class="app-container">-->
  <!--    <el-input v-model="filterText" placeholder="Filter keyword" style="margin-bottom:30px;" />-->
  <!--  </div>-->
  <div>
    <div class="left">
      <div class="gundong">
        <div v-for="(qq,index) in data" :key="index" class="namehm">
          <span>姓名：{{ qq.name }}</span><br/>
          <span>手机号：{{ qq.phone }}</span>
        </div>
      </div>
    </div>
    <div class="right">
      <div class="right-s">
        <span title="31355">数据编号：31355</span>
        <span title="2020-11-24 13:45:03">创建时间：2020-11-24 13:45:03</span>
        <span title="2020-11-24 13:45:03">分配时间：2020-11-27 09:07:11</span>
        <span title="2020-11-24 13:45:03">操作时间：null</span>
        <span title="I-8">渠道来源：I-8</span>
        <span title="天津和凌">供销商：天津和凌</span>
        <span title="天津上缘利煤炭销售有限公司">使用人姓名：天津上缘利煤炭销售有限公司</span>
        <span title="13752211555">使用人手机：13752211555</span>
        <span title="滨海新区">使用人住址：滨海新区</span>
        <span title="31355">品牌：L</span>
      </div>
      <div class="right-d">
        <div class="right-w jbkxg">
          <h4>基本可修改信息</h4>
          <div>
            <span title="31355">数据编号：</span><span>31355</span>
          </div>
          <div>
            <span title="2020-11-24 13:45:03">创建时间：</span><span>2020-11-24 13:45:03</span>
          </div>
          <div>
            <span title="2020-11-24 13:45:03">分配时间：</span><span>2020-11-24 13:45:03</span>
          </div>
          <div>
            <span title="2020-11-24 13:45:03">操作时间：</span><span>null</span>
          </div>
          <div>
            <span title="I-8">渠道来源：</span><span>I-8</span>
          </div>
          <div>
            <span title="天津和凌">供销商：</span><span>天津和凌</span>
          </div>
          <div>
            <span title="天津上缘利煤炭销售有限公司"><i class="el-icon-edit xglogo"></i>使用人姓名：</span>
            <span><input v-model="syrxm" type="text"></span>
          </div>
          <div>
            <span title="13752211555"><i class="el-icon-edit xglogo"></i>使用人手机：</span>
            <span><input v-model="syrhm" type="text"></span>
          </div>
          <div>
            <span title="滨海新区"><i class="el-icon-edit xglogo"></i>使用人住址：</span>
            <span><input @blur="alterdz(syrzz)" v-model="syrzz" type="text"></span>
          </div>
          <div>
            <span title="31355">品牌：</span><span>L</span>
          </div>
          <div>
            <span>拨打结果：</span>
            <span>
              <el-select size="mini" v-model="call" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.label"
                  :value="item.label">
                </el-option>
              </el-select>
            </span>
          </div>
        </div>
        <div class="right-w">
          <h4>话术区域</h4>
          话术区域
        </div>
        <div class="right-w">
          <h4>填选信息</h4>
          <div class="shangcisj">
            <span>上次处理结果</span>
            <span>拨打结果：</span>
            <span>是否回访成功：</span>
            <span>是否参加活动：</span>
            <span>备注信息：</span>
          </div>
          <div style="margin-bottom: 10px;">
            是否成功回访：
            <el-radio-group size="mini" v-model="radio1">
              <el-radio-button label="是"></el-radio-button>
              <el-radio-button label="否"></el-radio-button>
            </el-radio-group>
          </div>
          <div>
            是否参加活动：
            <el-radio-group size="mini" v-model="radio2">
              <el-radio-button label="是"></el-radio-button>
              <el-radio-button label="否"></el-radio-button>
            </el-radio-group>
          </div>
          备注：
          <el-input
            type="textarea"
            :rows="4"
            resize="none"
            placeholder="请输入内容"
            v-model="textarea1">
          </el-input>
          <div class="buttonDiv">
            <el-button @click="alldata" size="small" type="primary">提交任务</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: [
        {
          name: 'aa',
          phone: '13456789'
        }, {
          name: 'bb',
          phone: '13456789'
        }, {
          name: 'cc',
          phone: '13456789'
        }, {
          name: 'aa',
          phone: '13456789'
        }, {
          name: 'bb',
          phone: '13456789'
        }, {
          name: 'cc',
          phone: '13456789'
        }, {
          name: 'aa',
          phone: '13456789'
        }, {
          name: 'bb',
          phone: '13456789'
        }, {
          name: 'cc',
          phone: '13456789'
        }, {
          name: 'aa',
          phone: '13456789'
        }, {
          name: 'bb',
          phone: '13456789'
        }, {
          name: 'cc',
          phone: '13456789'
        }, {
          name: 'aa',
          phone: '13456789'
        }, {
          name: 'bb',
          phone: '13456789'
        }, {
          name: 'cc',
          phone: '13456789'
        },
      ],
      options: [
        {
          label: '接通'
        }, {
          label: '正在通话'
        }, {
          label: '正忙'
        }, {
          label: '空号'
        }, {
          label: '停机'
        }, {
          label: '关机'
        }, {
          label: '无人接听'
        }, {
          label: '无法接通'
        }, {
          label: '其他'
        }],
      call: '',//接通状态
      textarea1: '',//备注
      radio1:'',//是否回访
      radio2:'',//是否活动
      syrxm:'天津上缘利煤炭销售有限公司',//使用人姓名
      syrhm:'54545454',//使用人号码
      syrzz:'滨海新区'//使用人住址
    }
  },
  watch: {},
  methods: {
    alterdz(dz){
      this.syrzz = dz
      console.log(dz)
      console.log(this.syrzz)
    },
    alldata(){
      alert(JSON.stringify(this._data))
    }
  }
}
</script>
<style scoped>
.gundong {
  height: calc(100vh - 50px);
  border: 1px red solid;
  overflow: auto;
}
.buttonDiv{
  margin-top: 20px;
  width: 100%;
}
.buttonDiv button{
  width: 100%;
}
.namehm {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 14px;
  width: 94%;
  padding: 5px;
  background: rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  margin: 10px auto;
  cursor: pointer;
  line-height: 20px;
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
  justify-content: space-between;
  padding: 0 15px;
}

.right-w {
  width: 33%;
  padding: 5px;
  font-size: 14px;
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

.right-s span {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin: 5px;
  font-size: 14px;
}
.shangcisj span{
  margin-bottom:10px ;
  display: block;
}
.jbkxg span{
  /*display: flex;*/
  line-height: 28px;
}
input{
  width: 200px;
  border: none;
  outline: none;
}
.xglogo{
  line-height: 28px;
}
</style>
