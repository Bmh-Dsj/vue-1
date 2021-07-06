import {
  tyFp,
  login, logout, getInfo, password,gongdlist,unworklist,onelist,completedlist,shanchu,SubmitGd,qhzhuangt,
  htgongdlist,htgongdtj,htgdList,htgdoneList,htgdFp
} from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: '',
    roles: []
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_USER: (state, user) => {
    state.form = user
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  }
}

const actions = {
  // user login   https://api.apiopen.top/searchAuthors?name=李白
  // login({ commit }, userInfo) {
    login({ commit },userInfo) {
      // localStorage.namepass = JSON.stringify(userInfo)
    const { random, username, password , code } = userInfo
      // console.log( username , password , userInfo)
    return new Promise((resolve, reject) => {
    // const cc = JSON.stringify(userInfo)
      // 发送了网络请求，进行了登录操作  { jobNumber: Number(username), password: password, code: code}
      // login({ username: username.trim(), password: password }).then(response => {
      login({ jobNumber:username, password: password, code: code,random:random.toString()}).then(response => {
        console.log('这个是请求参数',response)
        // const { data ,user } = response
        // const user = response.data
        // commit('SET_NAME', data.user)
        // commit('SET_USER', data.user)
        // const { data } = response
        // commit('SET_USER', data.user)
        // setToken(data.user)
        // commit('SET_TOKEN', response.token)
        // setToken(response.token)
        // console.log(getToken('TokenKey'))
        // localStorage.token = JSON.stringify(response.token)
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  // getInfo({ commit, state },userInfo) {
  getInfo({ commit, state }) {
      // const { username, password , code } = userInfo
    // console.log(userInfo)
    return new Promise((resolve, reject) => {
      // getInfo(state.token).then(response => {
      getInfo().then(res => {
      // getInfo({ jobNumber:username, password: password, code: code}).then(response => {
      //   console.log(res)
      //   console.log(res)
      const { user  } = res.data.data
        if (!user) {
          // return reject('Verification failed, please Login again.')验证失败，请重新登录。
          // return reject('验证失败，请重新登录。')
          alert('验证失败，请重新登录')
        }
        // console.log(res.roles)roles
        localStorage.user = JSON.stringify(res.data.data)
        localStorage.roles = JSON.stringify(res.data.data.roles)
        console.log(JSON.parse(localStorage.user))
        let roles = []
        for (let i = 0 ; i< res.data.data.roles.length;i++ ){
          roles.push(res.data.data.roles[i].roleDescribe)
        }
      // &&JSON.parse(localStorage.user).user.jobNumber == 210504006

        if(JSON.parse(localStorage.user).user.wayOfWorking === true){
            //自动 true
            if(JSON.parse(localStorage.xmOne) !== false){
              let a = JSON.parse(localStorage.xmOne)

              if(localStorage.xmOne.indexOf('手拨') !== -1){
                a.splice(1)
                console.log('删除手拨',a)
                localStorage.xmOne = JSON.stringify(a)
              }

              if(localStorage.xmOne.indexOf('自动') === -1){
                a.push('自动')
                localStorage.xmOne = JSON.stringify(a)
                console.log(333,a)
                location.reload()
              }else {
                console.log('以自动')
              }

            }else {
              console.log('无JSON.parse(localStorage.xmOne)')
            }
          }else if(JSON.parse(localStorage.user).user.wayOfWorking === false){
            //手拨 false
            if(JSON.parse(localStorage.xmOne) !== false){
              let a = JSON.parse(localStorage.xmOne)
              if(localStorage.xmOne.indexOf('自动') !== -1){
                a.splice(1)
                console.log('删除自动')
                localStorage.xmOne = JSON.stringify(a)
              }

              if(localStorage.xmOne.indexOf('手拨') === -1){
                a.push('手拨')
                localStorage.xmOne = JSON.stringify(a)
                console.log(22,a)
                location.reload()
              }else {
                console.log('以手拨')
              }

            }else {
              console.log('无JSON.parse(localStorage.xmOne)')
            }
            console.log(1)
          }

        commit('SET_AVATAR', roles)
        commit('SET_ROLES', roles)
        localStorage.roles = JSON.stringify(roles)
        // localStorage.namepass = ''
        // state.roles = roles
        console.log(roles)
        // const { name, avatar } = data
        // commit('SET_NAME', name)
        // commit('SET_AVATAR', avatar)

        resolve(roles)
      }).catch(error => {
        reject(error)
      })

    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      // logout(state.token).then(() => {
        logout().then(() => {
        //   removeToken() // must remove  token  first
        // resetRouter()
          commit('RESET_STATE')
          commit('SET_ROLES', [])
          commit('SET_TOKEN','')
          removeToken()
          localStorage.roles=''
          localStorage.xmOne = false
          localStorage.token = false
          localStorage.user = false
          resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      commit('SET_AVATAR')
      commit('SET_ROLES', [])
      localStorage.roles = ''
      localStorage.xmOne = false
      resolve()
    })
  },
  //修改个人信息
  password({ commit },data){
    // const { temp }=data
    return new Promise((resolve, reject) => {
      password(data).then(response => {
        console.log('这个是请求参数',response)
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  //获取已完成工单
  gongdlist({ commit },data){
    // const { size , current } = data
    // console.log( size , current , data)
    return new Promise((resolve, reject) => {
      gongdlist(data).then(response => {
        // console.log(list)
        console.log('这个是请求参数',response)
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  //查询未处理工单
  unworklist({ commit },data){
    // const { size , current } = data
    // console.log( size , current , data)
    return new Promise((resolve, reject) => {
      unworklist(data).then(response => {
        // console.log(list)
        console.log('这个是请求参数',response)
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  //查询单个未处理工单
  onelist({ commit },data){
    // const { size , current } = data
    // console.log( size , current , data)
    return new Promise((resolve, reject) => {
      onelist(data).then(response => {
        // console.log(list)
        console.log('这个是请求参数',response)
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  //获取已完成工单
  completedlist({ commit },data){
    // const { size , current } = data
    // console.log( size , current , data)
    return new Promise((resolve, reject) => {
      completedlist(data).then(response => {
        // console.log(list)
        console.log('这个是请求参数',response)
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  //删除工单
  shanchu({ commit },data){
    // const { size , current } = data
    // console.log( size , current , data)
    return new Promise((resolve, reject) => {
      shanchu(data).then(response => {
        // console.log(list)
        console.log('这个是请求参数',response)
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  //提交工单
  SubmitGd({ commit },data){
    // const { size , current } = data
    // console.log( size , current , data)
    return new Promise((resolve, reject) => {
      SubmitGd(data).then(response => {
        // console.log(list)
        console.log('这个是请求参数',response)
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  //切换状态
  qhzhuangt({ commit },data){
    // const { size , current } = data
    // console.log( size , current , data)
    return new Promise((resolve, reject) => {
      qhzhuangt(data).then(response => {
        // console.log(list)
        console.log('这个是请求参数',response)
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  //核桃获取所有工单
  htgongdlist({ commit },data){
    // const { size , current } = data
    // console.log( size , current , data)
    return new Promise((resolve, reject) => {
      htgongdlist(data).then(response => {
        // console.log(list)
        console.log('这个是请求参数',response)
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  //核桃工单列表
  htgdList({ commit },data){
    // const { size , current } = data
    // console.log( size , current , data)
    return new Promise((resolve, reject) => {
      htgdList(data).then(response => {
        // console.log(list)
        console.log('这个是请求参数',response)
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  //核桃单个工单
  htgdoneList({ commit },data){
    // const { size , current } = data
    // console.log( size , current , data)
    return new Promise((resolve, reject) => {
      htgdoneList(data).then(response => {
        // console.log(list)
        console.log('这个是请求参数',response)
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  //核桃提交工单
  htgongdtj({ commit },data){
    // const { size , current } = data
    // console.log( size , current , data)
    return new Promise((resolve, reject) => {
      htgongdtj(data).then(response => {
        // console.log(list)
        console.log('这个是请求参数',response)
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  //核桃分配工单
  htgdFp({ commit },data){
    // const { size , current } = data
    // console.log( size , current , data)
    return new Promise((resolve, reject) => {
      htgdFp(data).then(response => {
        // console.log(list)
        console.log('这个是请求参数',response)
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  //通用获取分配人员
  tyFp({ commit },data){
    // const { size , current } = data
    // console.log( size , current , data)
    return new Promise((resolve, reject) => {
      tyFp(data).then(response => {
        // console.log(list)
        console.log('这个是请求参数',response)
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}

