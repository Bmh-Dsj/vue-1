import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import settings from './modules/settings'
import user from './modules/user'

import permission from "@/store/modules/permission";
import axios from "axios";

Vue.use(Vuex)

const store = new Vuex.Store({
  state:{
    rest:true,
    //baseURLZyb:'http://192.168.0.13:8090',
    baseURL:'http://106.14.41.132:9090',
    // baseURL:'http://192.168.0.47:9090',
    // baseURL: 'http://39.102.203.193:9090',
  },
  //模块
  modules: {
    app,
    settings,
    user,
    permission
  },
  getters,//计算属性
  mutations:{
    xgRest(state,rest){
      state.rest = rest
    },
    //全局部门号选择
    branch(state,data){
      // console.log(state.baseURL,data)
      axios({
        method: 'get',
        url: `${state.baseURL}/user/lockdepartment/${data}`,
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
  }
})

export default store
