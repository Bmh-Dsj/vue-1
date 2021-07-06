import request from '@/utils/request'
// import $axios from 'axios'
const query = data=>{
  if(data){
    let str ='?'
    for(let x in data){
      str +=`${x}=${data[x]}&`
    }
    return str.slice(0,-1)
  }else return
}

export function login(data) {
  return request({
    // url: '/vue-admin-template/user/login',
    method: 'post',
    // url: '/user/login',
    url: '/user/login',
    // data,
    headers:{"Content-Type": "application/json;charset=UTF-8"},
    data
  })
  // const post = (options)=>{
  //   let {url,data} = options
  //   return new Promise((resolve,reject)=>{
  //     $axios.post(baseUrl+url,data,{
  //       headers:{
  //         'Authorization': 'XIEGE ' + token,
  //         'Content-Type': 'application/json;charset=UTF-8'
  //       }
  //     }).then(res=>{
  //       resolve(res)
  //     }).catch(err=>{
  //       reject(err)
  //     })
  //   })
  // }
}

export function getInfo() {
  return request({
    // url: '/vue-admin-template/user/info',
    url: '/user/getcurrentuser',
    method: 'get',
    headers:{"Content-Type": "application/json;charset=UTF-8",
      'token': localStorage.token,},
    // data
    // params: { token }
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'get',
    headers:{
      // 'Authorization': localStorage.user,
      'token': localStorage.token,
      "Content-Type": "application/json;charset=UTF-8"
    },
  })
}

const list = {
  // '修改用户信息':'/user/updateuserinfobyguid',/user/test2
  '修改用户信息':'/user/updateuserinfobyguid',
  '获取已完成工单':'/ttpai/signup/getseatcompletedatabycondition',
  '获取所有工单':'/ttpai/signup/getalldatabyconditition',
  '查询未处理工单':'/ttpai/signup/getneedhandledata',
  '查询单个未处理工单':'/ttpai/signup/getdetail',
  '删除所选工单':'/ttpai/signup/deletebyguids',
  '提交工单':'/ttpai/signup/addstatus',
  '切换状态':'/user/updateonlinestatus',
  '通用分配人员':'/user/depart/getseatsbydepartguids',
  '核桃所有工单':'/hetao/admin/getalldatabyconditition',
  '核桃提交工单':'/hetao/admin/addstatus',
  '核桃工单列表':'/hetao/admin/getneedhandledata',
  '核桃单个工单':'/hetao/admin/getdetail',
  '核桃工单分配':'/hetao/admin/allocatedatabyguids',
}
export function password(data) {//修改用户信息
  // const  { temp } = data
  return request({
    url: list['修改用户信息'],
    method: 'put',
    headers:{
      // 'Authorization': localStorage.user,
      'token': localStorage.token,
      'Content-Type': "application/json",
      // "Content-Type": "application/json;charset=UTF-8"
    },
    data:data
  })
}

export function gongdlist(data) {
  return request({
    url: list['获取所有工单'],
    method: 'post',
    headers:{
      // 'Authorization': localStorage.user,
      'token': localStorage.token,
      "Content-Type": "application/json;charset=UTF-8"
    },
    data
  })
}
export function completedlist(data) {
  return request({
    url: list['获取已完成工单'],
    method: 'post',
    headers:{
      // 'Authorization': localStorage.user,
      'token': localStorage.token,
      "Content-Type": "application/json;charset=UTF-8"
    },
    data
  })
}
export function unworklist(data) {
  return request({
    url: list['查询未处理工单'],
    method: 'post',
    headers:{
      // 'Authorization': localStorage.user,
      'token': localStorage.token,
      "Content-Type": "application/json;charset=UTF-8"
    },
    data
  })
}
export function onelist(data) {
  return request({
    url: list['查询单个未处理工单'] +query(data),
    method: 'get',
    headers:{
      // 'Authorization': localStorage.user,
      'token': localStorage.token,
      "Content-Type": "application/json;charset=UTF-8"
    },
    // data
  })
}
export function shanchu(data) {
  return request({
    url: list['删除所选工单'] +[`?guids=${data}`],
    method: 'get',
    headers:{
      // 'Authorization': localStorage.user,
      'token': localStorage.token,
      "Content-Type": "application/json;charset=UTF-8"
    },
    // data
  })
}
export function SubmitGd(data) {
  return request({
    url: list['提交工单'],
    method: 'post',
    headers:{
      // 'Authorization': localStorage.user,
      'token': localStorage.token,
      "Content-Type": "application/json;charset=UTF-8"
    },
    data
  })
}
export function qhzhuangt(data) {
  return request({
    url: list['切换状态']+ query(data),
    method: 'get',
    headers:{
      // 'Authorization': localStorage.user,
      'token': localStorage.token,
      "Content-Type": "application/json;charset=UTF-8"
    },
    // data
  })
}
export function htgongdlist(data) {
  return request({
    url: list['核桃所有工单'],
    method: 'post',
    headers:{
      // 'Authorization': localStorage.user,
      'token': localStorage.token,
      "Content-Type": "application/json;charset=UTF-8"
    },
    data
  })
}
//核桃工单列表
export function htgdList(data) {
  return request({
    url: list['核桃工单列表'],
    method: 'post',
    headers:{
      // 'Authorization': localStorage.user,
      'token': localStorage.token,
      "Content-Type": "application/json;charset=UTF-8"
    },
    data
  })
}
//核桃单个工单
export function htgdoneList(data) {
  return request({
    url: list['核桃单个工单']+'/'+data,
    method: 'get',
    headers:{
      // 'Authorization': localStorage.user,
      'token': localStorage.token,
      "Content-Type": "application/json;charset=UTF-8"
    },
    // data
  })
}
//核桃提交工单
export function htgongdtj(data) {
  return request({
    url: list['核桃提交工单'],
    method: 'post',
    headers:{
      // 'Authorization': localStorage.user,
      'token': localStorage.token,
      "Content-Type": "application/json;charset=UTF-8"
    },
    data:data
  })
}
//核桃工单分配
export function htgdFp(data) {
  const { job , guids } = data
  return request({
    url: list['核桃工单分配']+'/'+job,
    method: 'post',
    headers:{
      // 'Authorization': localStorage.user,
      'token': localStorage.token,
      "Content-Type": "application/json;charset=UTF-8"
    },
    data:guids
  })
}
//tyFp统用获取分配工单人员
export function tyFp() {
  // const { job , guids } = data
  return request({
    url: list['通用分配人员'],
    method: 'get',
    headers:{
      // 'Authorization': localStorage.user,
      'token': localStorage.token,
      "Content-Type": "application/json;charset=UTF-8"
    },
    // data:guids
  })
}
