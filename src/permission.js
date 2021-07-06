import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar 一个进度条的插件
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false }) // NProgress Configuration 是否有转圈效果

const whiteList = ['/login'] // no redirect whitelist  没有重定向白名单

router.beforeEach(async(to, from, next) => {
  // start progress bar 开始进度条
  NProgress.start()

  // set page title 设置页面标题
  document.title = getPageTitle(to.meta.title)

  // determine whether the user has logged in 确定用户是否登录
  const hasToken = getToken()

  if (hasToken) {//判断是否有token登录信息
    if (to.path === '/login') {//如果有不让进入登录页 // 如果已登录，则重定向到主页
      // if is logged in, redirect to the home page
      // next({ path: '/' })//强制进入首页
      next()
      NProgress.done()
    } else {
      // const hasGetUserInfo = store.getters.name  this.$store.state.user.avatar
      // const hasGetUserInfo = store.state.user.avatar
      //const hasGetUserInfo = false  this.$store.state.user.roles

      const hasRoles = store.getters.roles && store.getters.roles.length > 0//这里指的是src/store/getters.js的roles
      //console.log(hasRoles)
      // let danxm = ccc && ccc.length == 1
      // const hasRoles = JSON.parse(localStorage.roles) && JSON.parse(localStorage.roles).length > 0
      // console.log(hasRoles)
      console.log(store.getters.roles)
      // console.log(store.getters.roles.length)
      // console.log(localStorage.roles&&JSON.parse(localStorage.roles).length > 0)
      if (hasRoles) {
        // if(true){
        //   console.log('danxm')
        // }else {
        //   if(localStorage.xmOne){
        //     console.log(JSON.parse(localStorage.xmOne))
        //     console.log(1)
        //     try {
        //       const accessRoutes = await store.dispatch('permission/generateRoutes', ccc)//第二步
        //       router.options.routes = store.getters.permission_routes//第三步
        //       router.addRoutes(accessRoutes)
        //       next({...to, replace: true})
        //       console.log(accessRoutes)
        //       next()
        //     }catch (error) {
        //       // remove token and go to login page to re-login
        //       await store.dispatch('user/resetToken')
        //       // Message.error(error || 'Has Error' )
        //       Message.error('权限过期000' )
        //       next(`/login?redirect=${to.path}`)
        //       NProgress.done()
        //     }
        // }
        // }
        console.log(to, to.matched.length)
        // if(to.matched.length === 2){
          //const roles = await store.dispatch('user/getInfo')
          // const accessRoutes = await store.dispatch('permission/generateRoutes', JSON.parse(localStorage.xmOne) || roles)//第二步
          // router.options.routes = store.getters.permission_routes//第三步
          // router.addRoutes(accessRoutes)
          // next({...to, replace:true})
          next()
        // }else {
        //   next()
        // }
        // console.log('有用户信息')
      } else {
        // console.log('无用户信息')
        try {
          // get user info 获取用户信息
            const roles = await store.dispatch('user/getInfo')
            // .then(res=>{
            console.log(roles)
            // let roles = []
            // for (let i = 0 ; i< res.data.roles.length;i++ ){
            //   roles.push(res.data.roles[i].roleDescribe)
            // }
            // 调用 permission.js方法中的GenerateRoutes方法，将后台返回的用户的权限数据，传递回去进行筛选处理
            // store.dispatch('GenerateRoutes', roles).then(() => { // 生成可访问的路由表
            //   // 将筛选的权限路由数组动态挂载
            //   router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
            //   next({ ...to, replace: true }) // hack方法 确保addRoutes添加完成
            // })
            //获取通过权限验证的路由



            const accessRoutes = await store.dispatch('permission/generateRoutes', JSON.parse(localStorage.xmOne) || roles)//第二步
            // alert(111)
            router.options.routes = store.getters.permission_routes//第三步
            // router.options.routes = store.getters.permission_routes
            // dynamically add accessible routes
            router.addRoutes(accessRoutes)
            // console.log(store)
            // hack method to ensure that addRoutes is complete
            // set the replace: true, so the navigation will not leave a history record
            next({ ...to, replace: true })
            // console.log(accessRoutes)
          // }).catch(err=>{
          //   alert('失败')
          //   console.log(err)
          // })
          // localStorage.user
          //实际是请求用户信息后返回，这里是模拟数据，直接从store中取
          //接口方法
          // const roles=store.getters.roles;
          // const roles=[JSON.parse(localStorage.user).data.roles[0].roleDescribe];
          // this.$store.dispatch('permission/GenerateRoutes', { roles }).then(() => { // 生成可访问的路由表
          //   router.addRoutes(store.getters.addRouters); // 动态添加可访问路由表
          //   router.options.routes=store.getters.routers;
          //   next({ ...to, replace: true });// hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
          // })
          next()
        } catch (error) {
          // remove token and go to login page to re-login
          await store.dispatch('user/resetToken')
          // Message.error(error || 'Has Error' )
          Message.error('权限过期' )
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else {
    /* has no token*/
    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
