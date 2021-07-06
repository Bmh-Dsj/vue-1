<template>
  <div style="background:#304156 " class="navbar">
    <hamburger :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar"/>
    <!--  style="filter: drop-shadow( 0 0 0 #ffffff);"  -->
    <!--    <breadcrumb  class="breadcrumb-container" />-->

    <div class="right-menu size">
      <span
        style="color: white ; margin-right: 10px">在线：{{ totalTimehour }}:{{ totalTimeminute }}:{{ totalTimesecond }}</span>
      <span
        style="color: white ; margin-right: 10px">工作：{{ workTimehour }}:{{ workTimeminute }}:{{ workTimesecond }}</span>
      <span
        style="color: white ; margin-right: 10px">休息：{{ idleTimehour }}:{{ idleTimeminute }}:{{ idleTimesecond }}</span>
      <span
        style="color: white ; margin-right: 10px">通话时长：{{ talkTimeHour }}:{{ talkTimeMinute }}:{{ talkTimeSecond }}</span>
      <span style="color: white ; margin-right: 10px">任务：{{ needHandle }}/{{ hadHadle }}/{{ total }} </span>
      <el-dropdown @command="handleCommand" trigger="click">
      <span style="margin-right: 10px" class="el-dropdown-link">
        <span :style="this.ztcolor">[ {{ zhuangtai }} ]</span>
        <!--        选择状态-->
        <!--        <i class="el-icon-arrow-down el-icon&#45;&#45;right"></i>-->
      </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="工作" style="color:#67C23A" icon="el-icon-success">工作</el-dropdown-item>
          <el-dropdown-item command="休息" style="color:#909399" icon="el-icon-remove">休息</el-dropdown-item>
          <!--          <el-dropdown-item command="离线" style="color:#909399"  icon="el-icon-coffee-cup">离线</el-dropdown-item>-->
          <!--          <el-dropdown-item icon="el-icon-check">双皮奶</el-dropdown-item>-->
          <!--          <el-dropdown-item icon="el-icon-circle-check">蚵仔煎</el-dropdown-item>-->
        </el-dropdown-menu>
      </el-dropdown>
      <!--      #3C9EE4-->
<!--      {{ ({0: '注册', 1: '登录', 2: '变更', 3: '后台', 5: '开通'})[9] || '30天未登录' }}-->
<!--      <span v-if="this.abc === '核桃坐席' ? true : false" style="color: #FFFFFF">拨号方式 :-->
<!--      {{({核桃坐席: true, 作业帮坐席: true, })[this.abc] || false}}-->
      <span
        v-show="({'核桃坐席': true,'作业帮坐席': true,'天天拍车坐席': true, '爱驰坐席': true, '向聚坐席': true,'向聚二部坐席': true,})[this.abc] || false" style="color: #FFFFFF">拨号方式 :
      </span>
<!--      v-if="this.abc === '核桃坐席' ? true : false"-->
      <el-dropdown
        v-show="({'核桃坐席': true,'作业帮坐席': true,'天天拍车坐席': true, '爱驰坐席': true, '向聚坐席': true,'向聚二部坐席': true,})[this.abc] || false" @command="dialingMethod" trigger="click">
        <span style="margin-right: 10px" class="el-dropdown-link">
          <span>[ {{ this.method }} ]</span>
          <!--        选择状态-->
          <!--        <i class="el-icon-arrow-down el-icon&#45;&#45;right"></i>-->
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item v-show="this.method == '自动'" command="手拨">手拨</el-dropdown-item>
          <el-dropdown-item v-show="this.method == '手拨'" command="自动">自动</el-dropdown-item>
          <!--          <el-dropdown-item command="离线" style="color:#909399"  icon="el-icon-coffee-cup">离线</el-dropdown-item>-->
          <!--          <el-dropdown-item icon="el-icon-check">双皮奶</el-dropdown-item>-->
          <!--          <el-dropdown-item icon="el-icon-circle-check">蚵仔煎</el-dropdown-item>-->
        </el-dropdown-menu>
      </el-dropdown>
      <span style="margin-right:10px ;"
        v-show="({'核桃坐席': true,'核桃主管': true,'作业帮坐席': true, '天天拍车坐席': true, '爱驰坐席': true, '向聚坐席': true,'向聚二部坐席': true,})[this.abc] || false" >
         <el-switch
           @change="bustling"
           v-model="val"
           active-text="忙碌"
         >
         </el-switch>
      </span>
      <!--      v-show="this.abc == '核桃坐席'? true : false" -->
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper ">
          <span style="color: white ; margin-right: 5px"><i class="el-icon-user-solid"/>工号：{{jobNumber}} ( {{ name }} )
            <!--            <span :style="this.ztcolor">[{{zhuangtai}}]</span>-->
            <!--          <img :src="avatar+'?imageView2/1/w/80/h/80'" class="user-avatar">-->
          <i class="el-icon-caret-bottom"/></span>
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <!--          <router-link to="/">-->
          <!--            <el-dropdown-item>-->
          <!--              首页-->
          <!--            </el-dropdown-item>-->
          <!--          </router-link>-->
          <router-link to="/password2">
            <el-dropdown-item>
              修改密码
            </el-dropdown-item>
          </router-link>
          <router-link to="/password">
            <el-dropdown-item>
              修改个人资料
            </el-dropdown-item>
          </router-link>

          <!--          <a target="_blank" href="https://github.com/PanJiaChen/vue-admin-template/">-->
          <!--            <el-dropdown-item>Github</el-dropdown-item>-->
          <!--          </a>-->
          <!--          <a target="_blank" href="https://panjiachen.github.io/vue-element-admin-site/#/">-->
          <!--            <el-dropdown-item>Docs</el-dropdown-item>-->
          <!--          </a>-->
          <el-dropdown-item divided @click.native="logout">
            <span style="display:block;">退出</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import axios from "axios";
import {Message} from "element-ui";

export default {
  data() {
    return {
      baseURL: this.$store.state.baseURL,
      name: JSON.parse(localStorage.user).user.name,
      jobNumber: JSON.parse(localStorage.user).user.jobNumber,
      ztcolor: 'color:#909399',
      zaixian: 'color:#67C23A',
      lixian: 'color:#909399',
      manglu: 'color:#909399',
      zhuangtai: JSON.parse(localStorage.user).user.onlineStatus,
      //工作时长
      time1: '',
      workTimehour: JSON.parse(localStorage.user).workTime.hour,
      workTimeminute: JSON.parse(localStorage.user).workTime.minute,
      workTimesecond: JSON.parse(localStorage.user).workTime.second,
      //总时长
      time2: '',
      totalTimehour: JSON.parse(localStorage.user).totalTime.hour,
      totalTimeminute: JSON.parse(localStorage.user).totalTime.minute,
      totalTimesecond: JSON.parse(localStorage.user).totalTime.second,
      //休息时长
      time3: '',
      idleTimehour: JSON.parse(localStorage.user).idleTime.hour,
      idleTimeminute: JSON.parse(localStorage.user).idleTime.minute,
      idleTimesecond: JSON.parse(localStorage.user).idleTime.second,
      //通话时长
      time4: '',
      talkTimeHour: JSON.parse(localStorage.user).talkTime.hour,
      talkTimeMinute: JSON.parse(localStorage.user).talkTime.minute,
      talkTimeSecond: JSON.parse(localStorage.user).talkTime.second,

      total: JSON.parse(localStorage.user).task.total,//总量
      needHandle: JSON.parse(localStorage.user).task.needHandle,//需处理
      hadHadle: JSON.parse(localStorage.user).task.hadHadle,//已处理

      method: '',//通话方式
      val: !JSON.parse(localStorage.user).user.workStatus,//是否忙碌
      monitor: true,

      abc: JSON.parse(localStorage.xmOne)[0],
    }
  },
  components: {
    Breadcrumb,
    Hamburger
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar'
    ])
  },
  watch: {
    //monitor: 'sx', // 值可以为methods的方法名
    val: 'sx' // 值可以为methods的方法名
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    logout: async function () {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
      this.$router.go(0);
      // this.$router.push(`/login`)
    },
    //工作状态切换
    handleCommand(command) {
      this.$store.dispatch('user/qhzhuangt', {'onlineStatus': command}).then((res) => {
        console.log(res)
        this.zhuangtai = command
        this.xuanranzt()
        if(command == '休息'){
          this.aaaaa()
        }

      }).catch((err) => {
        console.log(err)
      })
      // if(command == '工作'){
      //   this.ztcolor = this.zaixian
      // }else if(command == '离线'){
      //   this.ztcolor = this.lixian
      // }else if(command == '休息'){
      //   this.ztcolor = this.manglu
      // }
      // this.$message('已' + command);
    },
    xuanranzt() {
      if (this.zhuangtai == '工作') {
        this.ztcolor = this.zaixian
        clearInterval(this.time1)
        clearInterval(this.time3)
        this.$store.commit('xgRest', false)
        this.time1 = setInterval(this.workTime, 1000)
      } else if (this.zhuangtai == '离线') {
        this.ztcolor = this.lixian
      } else if (this.zhuangtai == '休息') {
        this.ztcolor = this.manglu
        clearInterval(this.time1)
        clearInterval(this.time3)
        this.$store.commit('xgRest', true)
        // this.$router.push(`/login`)
        this.time3 = setInterval(this.idleTime, 1000)
      }
    },
    //工作时长
    workTime() {
      this.workTimesecond++
      if (this.workTimesecond == 60) {
        this.workTimesecond = 1
        this.workTimeminute++
        if (this.workTimeminute == 60) {
          this.workTimeminute = 0
          this.workTimehour++
        }
      }
    },
    //在线时间
    totalTime() {
      this.totalTimesecond++
      if (this.totalTimesecond == 60) {
        this.totalTimesecond = 1
        this.totalTimeminute++
        if (this.totalTimeminute == 60) {
          this.totalTimeminute = 0
          this.totalTimehour++
        }
      }
    },
    //休息时间
    idleTime() {
      this.idleTimesecond++
      if (this.idleTimesecond == 60) {
        this.idleTimesecond = 1
        this.idleTimeminute++
        if (this.idleTimeminute == 60) {
          this.idleTimeminute = 0
          this.idleTimehour++
        }
      }
    },
    //通话方式
    dialingMethod(val) {
      //  /user/wayofworkingswitch
      console.log(val)
      this.method = val
      localStorage.automatic = JSON.stringify(val)
      axios({
        method: 'get',
        url: this.baseURL + '/user/wayofworkingswitch',
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          'token': localStorage.token,
        },
      }).then(res => {
        console.log(res)
        this.$router.push({path:'/dashboard'})
        this.$store.dispatch('user/getInfo')

      }).catch(err=>{
        console.log(err)
      })
    },
    newMethod(){
      if(JSON.parse(localStorage.user).user.wayOfWorking == true){
        this.method = '自动'
      }else if(JSON.parse(localStorage.user).user.wayOfWorking == false){
        this.method = '手拨'
      }
    },
    //是否自动外呼

    // whetherAutomatic(){
    //   if(this.method == "自动"){
    //
    //   }
    // }
    //状态切换 忙碌
    bustling() {
      //user.workStatus
      if(this.method == '手拨'){
        this.val = !JSON.parse(localStorage.user).user.workStatus
        Message({
          message: '手拨时不能切换忙碌状态',
          type: 'error',
          duration: 5 * 1000,
        })
      }else {
        axios({
          method: 'get',
          url: `${this.baseURL}/user/stateswitching`,
          headers: {
            "Content-Type": "application/json;charset=UTF-8",
            'token': localStorage.token,
          },
        }).then(res => {
          console.log(res)
          if (res.data.message == "当前状态不在工作中，无法切换置忙状态") {
            this.val = !JSON.parse(localStorage.user).user.workStatus
            Message({
              message: res.data.message,
              type: 'error',
              duration: 5 * 1000,
            })
          } else {
            Message({
              message: res.data.message,
              type: 'success',
              duration: 5 * 1000,
            })
          }
          this.$store.dispatch('user/getInfo')
          this.newMethod()
        }).catch(err => {
          console.log(err)
        })
      }
    },
    sx() {
      // console.log(111)
      // this.$store.dispatch('user/getInfo')
      // this.$forceUpdate()
    },
    aaaaa() {
      //user.workStatus
      this.val = JSON.parse(localStorage.user).user.workStatus
        this.$store.dispatch('user/getInfo')

    },
  },
  mounted() {
    // this.time1 = setInterval(this.workTime,1000)
    this.time2 = setInterval(this.totalTime, 1000)
    this.xuanranzt()
  },
  created() {
    this.newMethod()
    window.addEventListener('setItem', () => {
      this.newVal = localStorage.getItem('user');
      //console.log(111)
      //console.log(JSON.parse(localStorage.user).user.workStatus)
      this.val = JSON.parse(localStorage.user).user.workStatus
      //this.monitor = !this.monitor
      this.$forceUpdate()
    })
  }
}
</script>

<style lang="scss" scoped>
.size {
  font-size: 14px;
}

.el-dropdown-link {
  cursor: pointer;
  color: #409EFF;
}

.el-icon-arrow-down {
  font-size: 12px;
}

.demonstration {
  display: block;
  color: #8492a6;
  font-size: 14px;
  margin-bottom: 20px;
}

.navbar {
  height: 44px;
  //50
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, .08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 44px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        //margin-top: 5px;
        position: relative;
        cursor: pointer;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 20px;
          //25
          font-size: 12px;
        }
      }
    }
  }
}
</style>
