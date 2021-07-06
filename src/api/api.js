import $axios from 'axios'
import { getToken, setToken, removeToken } from '@/utils/auth'
// var token = "$2a$10$7BZF2Q7fTgXG2Om0ulg2cuH2m5lfgJ4y7Aacwz4S/x5O2eCzBqnj2-f8650a8f-4235-4fae-b2e3-b8759dfdee71"
let baseUrl = 'http://39.102.203.193:9090'
// let baseUrl = ''
const query = data=>{
  if(data){
    let str ='?'
    for(let x in data){
      str +=`${x}=${data[x]}&`
    }
    return str.slice(0,-1)
  }else return
}

const request = (options)=>{
  let {url,data} = options
  return new Promise((resolve,reject)=>{
    $axios.put(
      baseUrl + url,
      // url, +query(data)
      data,
      {
        headers: {
          // Authorization: "XIEGE " + token, localStorage.token
          'token': getToken('TokenKey') ,
          // "Content-Type": "application/x-www-form-urlencoded",
          // "Content-Type": "application/json;charset=UTF-8",
        }
      }).then(res => {
      resolve(res)
    }).catch(err=>{
      reject(err)
      console.log('ccc')
      // this.$router.push('/login')
    })
  })
}

// const post = (url,data,header,urld)=>{
//   let time = new Date().getTime()
//   return new Promise((resolve,reject)=>{
//     wx.request({
//       url: baseUrl+url+(urld?query(data):''),
//       data:urld?{}:data || {},
//       method:"POST",
//       timeout:10000,
//       header:header || {},
//       success:res=>{
//         resolve(res)
//         console.log('耗时',(new Date().getTime()-time),'ms');
//       },fail:err=>{
//         console.log(err)
//         wx.hideLoading({
//           success: (res) => {
//             wx.showToast({
//               title: '网络错误',
//               icon:'none'
//             })
//           },
//         })
//         reject(err)
//       }
//     })
//   })
// }

const list = {
  '修改用户信息':'/user/updateuserinfobyguid'
}

const xgxx = (data)=>{
  console.log(1)
  return request({
    url:list['修改用户信息'],
    data:data
  })
  // console.log(2)

}
// const daifb = ()=>{
//   return request({
//     url:list['待发布活动'],
//     data:{state:3}
//   })
// }
// const fbdaifb = (data) => {
//   return request({
//     url: list['待发布发布活动'],
//     data: data
//   })
// }
// const schd = (data) => {
//   return request({
//     url: list['删除活动'],
//     data: data
//   })
// }
// const bainjihd = (data) => {
//   return request({
//     url: list['编辑活动'],
//     data: data
//   })
// }
// const yifab = (data) => {
//   return request({
//     url: list['待发布活动'],
//     data: {state:1}
//   })
// }
// const jieshuhd = (data) => {
//   return request({
//     url: list['结束活动'],
//     data: data
//   })
// }
// const biaomin = (data) => {
//   return request({
//     url: list['获取报名详情'],
//     data: data
//   })
// }
// const hqyjs = (data) => {
//   return request({
//     url: list['获取已结束'],
//     data: {state:2}
//   })
// }
// const qdm = (data) => {
//   return request({
//     url: list['签到码'],
//     data: data
//   })
// }
export default {

  request,
  xgxx,

}
