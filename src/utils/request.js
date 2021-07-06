import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import store from '@/store'
import router from '../router'
// import { getToken } from '@/utils/auth'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: '',
    roles:[],

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
}
// create an axios instance 网站链接
const service = axios.create({
  // baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url 192.168.2.135:9090
  baseURL:'http://106.14.41.132:9090',
  // baseURL: 'http://192.168.0.47:9090',
  // baseURL: 'http://39.102.203.193:9090', // url = base url + request url 39.102.203.193:9090
  // baseURL: 'https://www.apiopen.top/meituApi?page=1', // url = base url + request url
  // baseURL: 'https://api.apiopen.top/recommendPoetry',
  //https://api.apiopen.top/EmailSearch?number=1012002
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 20000 // request timeout 超时时间
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent

    // if (store.getters.token) {
    //   // let each request carry token
    //   // ['X-Token'] is a custom headers key
    //   // please modify it according to the actual situation
    //   config.headers['X-Token'] = getToken()
    // }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    console.log(response)
    // if(response.headers.authorization){
    //   localStorage.token = response.headers.authorization
    // }
    // const res = response.data
    const res = response.data
    // console.log(res.code)
    // if the custom code is not 20000, it is judged as an error.
    // if (res.code !== 20000) {
      if (res.code !== 200) {
        Message({
        message: res.message || 'Error',
        type: 'error',
        duration: 5 * 1000,
      })
        if(res.message == "该账号已在别处登录"){
          // this.$router.push({ path:'/login'})
          router.push('/login')
          // alert('sssss')
        }
      //   alert('非200')
        console.log(res)
        console.log(response.headers)
        // if(res.code===500){
        //   MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
        //             confirmButtonText: '重新登录',
        //             cancelButtonText: '取消',
        //             type: 'warning'
        //     // MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
        //     //       confirmButtonText: 'Re-Login',
        //     //       cancelButtonText: 'Cancel',
        //     //       type: 'warning'
        //         }).then(() => {
        //           store.dispatch('user/resetToken').then(() => {
        //             location.reload()
        //           })
        //         })
        //       }
      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了
      // if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
      //   to re-login
      //   请自行在引入 MessageBox
        //       // import { Message, MessageBox } from 'element-ui'
        //       MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
        //         confirmButtonText: '重新登录',
        //         cancelButtonText: '取消',
        //         type: 'warning'
      //   MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
      //     confirmButtonText: 'Re-Login',
      //     cancelButtonText: 'Cancel',
      //     type: 'warning'
      //   }).then(() => {
      //     store.dispatch('user/resetToken').then(() => {
      //       location.reload()
      //     })
      //   })
      // }
      // return Promise.reject(new Error(res.message || 'Error'))
    } else {
        // alert('ss')
        // Message({
        //   message: res.message || 'Error',
        //   type: 'success',
        //   duration: 5 * 1000,
        // })
        // console.log(response.headers)
        // res.token = response.headers['authorization']
        // // commit('SET_TOKEN', response.token)
        // setToken(res.token)
        //
        // // Cookies.set('TokenKey', response.token)
        // console.log(getToken('TokenKey'))
        // localStorage.token = res.token
        // localStorage.user = JSON.stringify(res)
        // console.log(JSON.parse(localStorage.user))
        return response
        // return response
    }
  },
  error => {
    // if(error.code===500){
    //   MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
    //             confirmButtonText: '重新登录',
    //             cancelButtonText: '取消',
    //             type: 'warning'
    //     // MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
    //     //       confirmButtonText: 'Re-Login',
    //     //       cancelButtonText: 'Cancel',
    //     //       type: 'warning'
    //         }).then(() => {
    //           store.dispatch('user/resetToken').then(() => {
    //             location.reload()
    //           })
    //         })
    //       }
    // console.log('err' + error) // for debug
    alert('请求错误,网络超时')
    Message({
      message: `网络超时${error.message}`  || error.message,
      type: 'error',
      duration: 5 * 1000
    })
    console.log(error)
    return Promise.reject(error)
  }
)
// export default {
//   namespaced: true,
//   state,
//   mutations,
//   // actions,
//   service
// }
export default service
