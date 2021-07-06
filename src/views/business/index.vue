<template>
  <div class="businessDiv">
    <div class="dashboard-text title">欢迎{{ name }}进入系统</div>
    <div class="business">
      <el-select filterable v-model="value" @change="xmm" placeholder="请选择项目">
        <el-option
          v-for="item in options"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </div>

  </div>
</template>

<script>
import store from "@/store";
import axios from "axios";

export default {
  name: "business",
  data() {
    return {
      dd: this.$store.state.user.avatar,
      // baseURL:'http://39.102.203.193:9090',
      baseURL: this.$store.state.baseURL,
      options: [],
      value: this.$route.query.value || '',
      name: JSON.parse(localStorage.user).user.name,
    }
  },
  methods: {
    //切换业务
    xmm() {
      console.log(this.value)
      console.log(store.getters.roles)
      axios({
        method: 'get',
        url: this.baseURL + '/user/switchingservices?departGuid=' + this.value,
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          'token': localStorage.token,
        },
      }).then(res => {
        console.log(res.data.data.roles[0].roleDescribe)
        let xmOne = []
        xmOne.push(res.data.data.roles[0].roleDescribe)
        console.log(store.getters.roles)

        let b = xmOne
        let ccc = []
        for (let i = 0; i < store.getters.roles.length; i++) {
          for (let j = 0; j < b.length; j++) {
            if (store.getters.roles[i] == b[j]) {
              ccc.push(store.getters.roles[i])
            }
          }
        }
        localStorage.xmOne = JSON.stringify(ccc)

        let url = this.$router.resolve({
          name: `/`,
          // query: localStorage.xmOne,this.$route.query.
          query: {value: JSON.parse(localStorage.xmOne)[0]}
        });


        // window.opener=null;
        // window.close();

        window.open(url.href, "_blank");

        this.closeWin()
      }).catch(err => {
        console.log(err)
      })


    },
    //关闭当前页面

    closeWin() {
      window.opener = null;
      window.open('', '_self');
      window.close();
    },
    //业务切换状态栏
    qiehuan() {
      let depart = JSON.parse(localStorage.user).departs
      let departs = []
      for (let a = 0; a < depart.length; a++) {
        let obj = {}
        obj.value = depart[a].guid
        obj.label = depart[a].name
        departs.push(obj)
      }
      this.options = departs
    },
    //生成自动外呼值
    autoCall() {
      if (localStorage.call) {

      } else {
        localStorage.call = '自动'
      }
    }
  },
  created() {
    this.qiehuan()
  },
}
</script>

<style scoped>
.businessDiv {
  position: relative;
  background: #A0CFFF;
  width: 100%;
  height: 100%;
}

.business {
  position: absolute;
  left: calc(50% - 100px);
  top: calc(50% - 50px);
}

.title {
  text-align: center;
  font-size: 50px;
  padding-top: 10%;
}
</style>
