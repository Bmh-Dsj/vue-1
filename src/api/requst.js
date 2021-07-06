import $axios from 'axios'
// let token = '$2a$10$h4dsZcQ3iXQM6jlkkASgoe5isBZzf8vPbN/2q/PSXzLGiV1eP/2Eq-9f168721-b28f-40b7-aa33-8e68dd9948dd'
let baseUrl = 'https://39.102.203.193:9090'
const post = (options)=>{
  let {url,data} = options
  return new Promise((resolve,reject)=>{
    $axios.post(baseUrl+url,data,{
      headers:{
        'Content-Type': 'application/json;charset=UTF-8'
      }
    }).then(res=>{
      resolve(res)
    }).catch(err=>{
      reject(err)
    })
  })
}
const list = {
  '修改信息':'/user/updateuserinfobyguid',
  '删除活动': '/manage/delNews',
  '待发布发布活动': '/manage/updNews',
  '编辑活动': '/manage/updNews',
  '结束活动': '/manage/updNews',
  '获取报名详情':'/manage/getDetails',
  '获取已结束': '/manage/getAllNews',
  '签到码': '/manage/createEwm',

}

const daifb = ()=>{
  return request({
    url:list['待发布活动'],
    data:{state:3}
  })
}
export default {
  post,
  // get
}
