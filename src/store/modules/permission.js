// import { asyncRouterMap, constantRoutes } from '@/router';
// // 用来筛选后端返回来的权限数据，和权限路由中的meta里面的数据匹配，匹配成功返回true，失败为false
// function hasPermission(roles, route) {
//   if (route.meta && route.meta.role) {
//     return roles.some(role => route.meta.role.indexOf(role) >= 0)
//   } else {
//     return true
//   }
// }
//
// const permission = {
//   // namespaced: true,
//   state: {
//     routers: constantRoutes,
//     addRouters: []
//   },
//   mutations: {
//     // 将匹配成功的权限路由拼接到公共路由中
//     SET_ROUTERS: (state, routers) => {
//       state.addRouters = routers;
//       state.routers = constantRoutes.concat(routers);
//     }
//   },
//   actions: {
//     // 对后台返回来的权限和动态路由权限匹配
//     GenerateRoutes({ commit }, data) {//roles是用户所带的权限
//       // 返回一个异步回调promise
//       return new Promise(resolve => {
//         // console.log(data)
//         let roles = data.toString()
//         // const { roles } = data;
//         console.log(roles)
//         // let a = 0
//         // for (let i=0; i<roles.length ; i++){
//         //   if(roles[i].indexOf('开发人员管理员') >= 0){
//         //     a++
//         //     return a
//         //   }
//         // }
//         const accessedRouters = asyncRouterMap.filter(v => {
//           // 判断如果后台返回的权限中包含admin就是管理员，可以进入权限路由页面
//           console.log(v)
//           if (roles.indexOf('开发人员管理员') >= 0) {
//           // if (a > 0) {
//               return true;
//           };
//
//           // 之后就是调用hasPerMission函数对象权限动态路由和后台返回的用户权限进行严格匹配
//           if (hasPermission(roles, v)) {
//             // 判断是否有权限路由是否有子路由，有子路由继续遍历
//             if (v.children && v.children.length > 0) {
//               v.children = v.children.filter(child => {
//                 // 对权限子路由和后台返回的用户权限数据，在进行匹配，匹配成功返回
//                 if (hasPermission(roles, child)) {
//                   console.log(child)
//                   return child
//                 }
//                 // 失败返回false
//                 return false;
//               });
//               // 并且要把权限的父路由返回来，不光要把权限子路由返回，无论权限子路有还是没有，都应该把权限父路由返回来
//               return v
//             } else {
//               // 权限父路由匹配成功返回
//               return v
//             }
//           }
//           // 如果每一个判断都没有进，说明该用户没有任何权限，返回false
//           return false;
//         });
//         commit('SET_ROUTERS', accessedRouters);
//         resolve();
//       })
//     }
//   },
//   getters: {
//
//     // 只要权限路由数组发生变化就重新计算
//     addRouters (state) {
//       return state.addRouters
//     }
//   }
// };
// export default permission;

import { asyncRouterMap, constantRoutes } from '@/router'

/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
//匹配权限
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, roles) {
  const res = []

  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })

  return res
}

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes) // 将过滤后的路由和constantRoutes存起来
  }
}

//筛选
const actions = {
  generateRoutes({ commit }, roles) {
    return new Promise(resolve => {
      let accessedRoutes
      //路由是否有admin,有直接全部显示
      if (roles.includes("开发人员管理员")&&roles.includes("人事管理员")) {
        // accessedRoutes = asyncRouterMap || []
        accessedRoutes = filterAsyncRoutes(asyncRouterMap, roles)
      } else {
        //过滤路由
        accessedRoutes = filterAsyncRoutes(asyncRouterMap, roles)
        //accessedRoutes这个就是当前角色可见的动态路由
      }
      commit('SET_ROUTES', accessedRoutes)
      console.log(accessedRoutes)
      resolve(accessedRoutes)
    })
  }
}
export default {
  // permission,
  namespaced: true,
  state,
  mutations,
  actions
}
