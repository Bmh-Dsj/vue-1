import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    name:'login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/password',
    component: () => import('@/views/password/index'),
    hidden: true
  },
  {
    path: '/password2',
    component: () => import('@/views/password2/index'),
    hidden: true
  },
  {
    path: '/business',
    name:'business',
    component: () => import('@/views/business/index'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: '/dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '首页', icon: 'dashboard' }
    }]
  },

  // {
  //   path: '/example',
  //   component: Layout,
  //   redirect: '/example/table',
  //   name: '雷克萨斯',
  //   meta: { title: '雷克萨斯', icon: 'qcr' },
  //   children: [
  //     {
  //       path: 'menu1-1',
  //       component: () => import('@/views/nested/menu1/menu1-1'),
  //       name: 'Menu1-1',
  //       meta: { title: '待处理工单',icon: 'qcr' }
  //     },
  //     {
  //       path: 'menu1-3',
  //       component: () => import('@/views/nested/menu1/menu1-3'),
  //       name: 'Menu1-3',
  //       meta: { title: '已完成工单' ,icon: 'qcr' }
  //     }
  // //     // {
  // //     //   path: 'tree',
  // //     //   name: 'Tree',
  // //     //   component: () => import('@/views/tree/index'),
  // //     //   meta: { title: '待处理工单', icon: 'qcr' }
  // //     // }
  // //     // ,{
  // //     //   path: 'table',
  // //     //   name: 'Table',
  // //     //   component: () => import('@/views/table/index'),
  // //     //   meta: { title: 'Table', icon: 'table' }
  // //     // }
  // //
  //   ]
  // },

  // {
  //   path: '/form',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       name: 'Form',
  //       component: () => import('@/views/form/index'),
  //       meta: { title: 'Form', icon: 'form' }
  //     }
  //   ]
  // },

  // {
  //   path: '/nested',
  //   component: Layout,
  //   redirect: '/nested/menu1',
  //   name: '雷克萨斯',
  //   meta: {
  //     title: '雷克萨斯',
  //     icon: 'qcr'
  //   },
  //   children: [
      // {
      //   path: 'menu1',
      //   component: () => import('@/views/nested/menu1/index'), // Parent router-view
      //   name: 'Menu1',
      //   meta: { title: 'Menu1',  },
      //   children: [
      //     {
      //       path: 'menu1-1',
      //       component: () => import('@/views/nested/menu1/menu1-1'),
      //       name: 'Menu1-1',
      //       meta: { title: '待处理工单',icon: 'qcr' }
      //     },
  //         // {
  //         //   path: 'menu1-2',
  //         //   component: () => import('@/views/nested/menu1/menu1-2'),
  //         //   name: 'Menu1-2',
  //         //   meta: { title: 'Menu1-2' },
  //         //   children: [
  //         //     {
  //         //       path: 'menu1-2-1',
  //         //       component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
  //         //       name: 'Menu1-2-1',
  //         //       meta: { title: 'Menu1-2-1' }
  //         //     },
  //         //     {
  //         //       path: 'menu1-2-2',
  //         //       component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
  //         //       name: 'Menu1-2-2',
  //         //       meta: { title: 'Menu1-2-2' }
  //         //     }
  //         //   ]
  //         // },
  //         // {
  //         //   path: 'menu1-3',
  //         //   component: () => import('@/views/nested/menu1/menu1-3'),
  //         //   name: 'Menu1-3',
  //         //   meta: { title: '已完成工单' ,icon: 'qcr' }
  //         // },
  //         // {
  //         //   path: 'menu1-4',
  //         //   component: () => import('@/views/nested/menu1/menu1-4'),
  //         //   name: 'Menu1-4',
  //         //   meta: { title: '全部工单' ,icon: 'qcr' }
  //         // }
  //       // ]
  //     // },
  //     // {
  //     //   path: 'menu2',
  //     //   component: () => import('@/views/nested/menu2/index'),
  //     //   name: 'Menu2',
  //     //   meta: { title: 'menu2' }
  //     // }
  //   ]
  // },

  // {
  //   path: 'external-link',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
  //       meta: { title: 'External Link', icon: 'link' }
  //     }
  //   ]
  // },

  // 404 page must be placed at the end !!! 404页面必须放在最后!!
 // { path: '*', redirect: '/404', hidden: true }
]
//创建路由
const createRouter = () => new Router({
  mode: 'hash', // require service support 服务支持
  // base: '/hot/',
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()
//重置路由
// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}
// router.selfaddRoutes = function (params){
//   router.matcher = new Router().matcher;
//   router.addRoutes(params)
// }

//异步挂载的路由
//动态需要根据权限加载的路由表
let a = '最高级管理员'
// let a = '核桃主管'
let b = 'THZ管理员'

export const asyncRouterMap = [
  {
    path: '/nested',
    component: Layout,
    // name: '天天拍车',
    redirect: '/nested/menu1',
    alwaysShow: true,
    meta: { title:'天天拍车', icon: 'qcr', roles: [] }, //页面需要的权限
    children: [
      {
        path: 'menu1-1',
        component: () => import('@/views/nested/menu1/menu1-1'),
        name: 'Menu1-1',
        meta: { title: '待处理工单',icon: 'qcr' , roles: ['天天拍车管理员',"天天拍车坐席",]}
      },
      {
        path: 'menu1-3',
        component: () => import('@/views/nested/menu1/menu1-3'),
        name: 'Menu1-3',
        meta: { title: '已完成工单' ,icon: 'qcr' , roles: ['人事管理员','天天拍车管理员',"天天拍车坐席",] }
      },
      {
        path: 'menu1-4',
        component: () => import('@/views/nested/menu1/menu1-4'),
        name: 'Menu1-4',
        meta: { title: '全部工单' ,icon: 'qcr' , roles: ['人事管理员','天天拍车管理员',"天天拍车坐席",] }
      },
    ]
  },
  {
    path: '/example',
    component: Layout,
    redirect: '/example/table',
    // name: '雷克萨斯',
    alwaysShow: true,
    meta: { title: '雷克萨斯', icon: 'qcr',roles: []},
    children: [
      {
        path: 'menu1-1',
        component: () => import('@/views/nested/menu1/menu1-1'),
        name: 'Menu1-1',
        meta: { title: '待处理工单',icon: 'qcr',roles: ['开发人员管理员','天天拍车管理员'] }
      },
      {
        path: 'menu1-3',
        component: () => import('@/views/nested/menu1/menu1-3'),
        name: 'Menu1-3',
        meta: { title: '已完成工单' ,icon: 'qcr',roles: ['开发人员管理员','天天拍车管理员'] }
      },
      {
        path: 'menu1-5',
        component: () => import('@/views/nested/menu1/menu1-5'),
        name: 'Menu1-5',
        meta: { title: '手动添加工单' ,icon: 'qcr',roles: ['开发人员管理员','天天拍车管理员'] }
      },
      {
        path: 'menu1-6',
        component: () => import('@/views/nested/menu1/menu1-6'),
        name: 'Menu1-6',
        meta: { title: '58传数据' ,icon: 'qcr',roles: ['开发人员管理员','天天拍车管理员'] }
      }
      //     // {
      //     //   path: 'tree',
      //     //   name: 'Tree',
      //     //   component: () => import('@/views/tree/index'),
      //     //   meta: { title: '待处理工单', icon: 'qcr' }
      //     // }
      //     // ,{
      //     //   path: 'table',
      //     //   name: 'Table',
      //     //   component: () => import('@/views/table/index'),
      //     //   meta: { title: 'Table', icon: 'table' }
      //     // }
      //
    ]
  },
  {
    path: '/walnut',
    component: Layout,
    redirect: '/example/table',
    alwaysShow: true,
    meta: { title: '核桃编程', icon: 'ht',roles: [a,b,'核桃主管','核桃坐席','核桃录音']},
    children: [
      {
        path: 'walnut1-1',
        component: () => import('@/views/walnut/walnut1-1'),
        name: 'walnut1-1',
        meta: { title: '待处理工单',icon: 'ht',roles: ['手拨'] }
      },
      {
        path: '/walnut1-2',
        component: () => import('@/views/walnut/walnut1-2/index'),
        name: 'walnut1-2',
        meta: { title: '全部工单',icon: 'qbgd',roles: [a,b,'核桃主管'] },
      },
      // {
      //   path: 'walnut1-3',
      //   component: () => import('@/views/walnut/walnut1-3'),
      //   name: 'walnut1-3',
      //   meta: {title: '坐席状态统计', icon: 'ht', roles: ['核桃主管',]},
      // },
      // {
      //   path: 'walnut1-4',
      //   component: () => import('@/views/walnut/walnut1-4'),
      //   name: 'walnut1-4',
      //   meta: { title: '实时监控',icon: 'ht',roles: ['核桃主管',] }
      // },
      // {
      //   path: 'walnut1-5',
      //   component: () => import('@/views/walnut/walnut1-5'),
      //   name: 'walnut1-5',
      //   meta: { title: '报表统计',icon: 'ht',roles: ['核桃主管'] }
      // },
      // {
      //   path: 'walnut1-6',
      //   component: () => import('@/views/walnut/walnut1-6'),
      //   name: 'walnut1-6',
      //   meta: { title: '录音',icon: 'ly',roles: ['核桃主管',] }
      // },
      // {
      //   path: 'walnut1-7',
      //   component: () => import('@/views/walnut/walnut1-7'),
      //   name: 'walnut1-7',
      //   meta: { title: '通话记录',icon: 'ly',roles: ['核桃主管',] }
      // },
      {
        path: 'walnut1-8',
        component: () => import('@/views/walnut/walnut1-8'),
        name: 'walnut1-8',
        meta: { title: '自动外呼',icon: 'ly',roles: ['自动'] }
      },
      {
        path: 'batch',
        component: () => import('@/views/batch'),
        name: 'batch',
        meta: { title: '外呼批次',icon: 'whpc',roles: [a,b,'核桃主管'] }
      },
      // //外呼状态
      // {
      //   path: 'task1-11',
      //   component: () => import('@/views/walnut/task1-11'),
      //   name: 'task1-11',
      //   meta: { title: '外呼状态',icon: 'thz',roles: [a,b,'核桃主管'] }
      // },
      // {
      //   path: 'batch2',
      //   component: () => import('@/views/batch2'),
      //   name: 'batch2',
      //   meta: { title: '外呼批次率',icon: 'ly',roles: ['核桃主管',] }
      // },
      // {
      //   path: 'summary',
      //   component: () => import('@/views/summary'),
      //   name: 'summary',
      //   meta: { title: '呼叫汇总',icon: 'ly',roles: ['核桃主管',] }
      // },

      // {
      //   path: 'chart',
      //   component: () => import('@/views/chart'),
      //   name: 'chart',
      //   meta: { title: '图表',icon: 'ly',roles: ['核桃主管',] }
      // },
      //坐席监控
      {
        path: 'seatMonitor',
        component: () => import('@/views/seatMonitor'),
        name: 'seatMonitor',
        meta: { title: '坐席监控',icon: 'zx',roles: [a,b,'核桃主管'] },
        alwaysShow: true,
        children: [
          // {
          //   path: 'walnut1-3',
          //   component: () => import('@/views/seatMonitor/walnut1-3'),
          //   name: 'walnut1-3',
          //   meta: {title: '坐席状态统计', icon: 'ht', roles: ['核桃主管',]},
          // },
          {
            path: 'walnut1-5',
            component: () => import('@/views/seatMonitor/walnut1-5'),
            name: 'walnut1-5',
            meta: { title: '坐席状态',icon: 'zx',roles: [a,b,'核桃主管'] }
          },
          // {
          //   path: 'walnut1-4',
          //   component: () => import('@/views/seatMonitor/walnut1-4'),
          //   name: 'walnut1-4',
          //   meta: {title: '实时监控', icon: 'ht', roles: ['核桃主管']},
          // },

        ]
      },
      //通话记录
      {
        path: 'callLog',
        component: () => import('@/views/callLog'),
        name: 'callLog',
        meta: { title: '通话记录',icon: 'thjl',roles: [a,b,'核桃主管','核桃录音'] },
        children: [
          {
            path: 'walnut1-6',
            component: () => import('@/views/callLog/walnut1-6'),
            name: 'walnut1-6',
            meta: { title: '录音',icon: 'ly',roles: [a,b,'核桃主管','核桃录音'] }
          },
          {
            path: 'walnut1-7',
            component: () => import('@/views/callLog/walnut1-7'),
            name: 'walnut1-7',
            meta: { title: '通话记录',icon: 'thjl',roles: [a,b,'核桃主管'] }
          },
        ]
      },
      //报表统计
      {
        path: 'reportCount',
        component: () => import('@/views/reportCount'),
        name: 'reportCount',
        meta: { title: '报表统计',icon: 'bbtj',roles: [a,b,'核桃主管'] },
        children: [
          {
            path: 'batch2',
            component: () => import('@/views/reportCount/batch2'),
            name: 'batch2',
            meta: { title: '外呼批次率',icon: 'whpcl',roles: [a,b,'核桃主管'] }
          },
          {
            path: 'summary',
            component: () => import('@/views/reportCount/summary'),
            name: 'summary',
            meta: { title: '呼叫汇总',icon: 'hjhz',roles: [a,b,'核桃主管'] }
          },
        ]
      },
      //新增工单
      {
        path: 'handDial',
        component: () => import('@/views/handDial'),
        name: 'handDial',
        meta: { title: '新增工单',icon: 'tjqd',roles: [a,b,'核桃主管'] }
      },
      //富文本编辑器 编辑话术
      {
        path: 'addWord',
        component: () => import('@/views/addWord'),
        name: 'addWord',
        meta: { title: '编辑话术',icon: 'ly',roles: [a,b,'核桃主管',] }
      },
      //FAQ
      {
        path: 'words',
        component: () => import('@/views/Faq'),
        name: 'words',
        meta: { title: '话术',icon: 'ly',roles: [a,b,'核桃主管','核桃坐席'] }
      },
      //话术图片
      // {
      //   path: 'speechcraft',
      //   component: () => import('@/views/speechcraft'),
      //   name: 'speechcraft',
      //   meta: { title: '话术图片',icon: 'ly',roles: ['核桃主管',] }
      // },
      //坐席B
      {
        path: 'seatsB',
        component: () => import('@/views/seatsB'),
        name: 'seatsB',
        meta: { title: '坐席B',icon: 'whpc',roles: ['核桃主管',] }
      },
      //添加角色
      {
        path: 'addRole',
        component: () => import('@/views/addRole'),
        name: 'addRole',
        meta: { title: '添加角色',icon: 'tjqd',roles: [] }
      },
      //话费余额
      {
        path: 'balance',
        component: () => import('@/views/balance'),
        name: 'balance',
        meta: {
          title: '话费余额',
          icon: 'ye',
          roles: [a,b,'核桃主管'] ,
          keepAlive: false, // 此组件不需要被缓存
        }
      },
      //添加渠道
      {
        path: '/time',
        component: () => import('@/views/time/index'),
        name: 'time',
        meta: { title: '添加渠道',icon: 'tjqd',roles: [a,b,] }
      },

      //测试临时
      {
        path: '/cs',
        component: () => import('@/views/ceshi/index'),
        name: 'cs',
        meta: { title: 'cs',icon: 'tjqd',roles: [] }
      },
      {
        path: '/cs',
        component: () => import('@/views/ceshi2/index'),
        name: 'cs',
        meta: { title: 'cs',icon: 'tjqd',roles: [] }
      },
    ]
  },
  {
    path: '/Zyb',
    component: Layout,
    alwaysShow: true,
    meta: { title: '作业帮', icon: 'zyb',roles: [a,b,'作业帮管理员','作业帮坐席']},
    children: [
      //手拨
      {
        path: 'task1-8',
        component: () => import('@/views/Zyb/task1-8'),
        name: 'task1-8',
        meta: { title: '待处理工单',icon: 'ht',roles: ['手拨'] }
      },
      //自动外呼
      {
        path: 'task1-9',
        component: () => import('@/views/Zyb/task1-9'),
        name: 'task1-9',
        meta: { title: '自动外呼',icon: 'ly',roles: ['自动'] }
      },

      //全部工单
      {
        path: 'task1-1',
        component: () => import('@/views/Zyb/task1-1'),
        name: 'task1-1',
        meta: { title: '全部工单',icon: 'qbgd',roles: [a,b,'作业帮管理员'] }
      },
      //外呼批次
      {
        path: 'task1-2',
        component: () => import('@/views/Zyb/task1-2'),
        name: 'task1-2',
        meta: { title: '外呼批次',icon: 'whpc',roles: [a,b,'作业帮管理员'] }
      },
      // //外呼状态
      // {
      //   path: 'task1-11',
      //   component: () => import('@/views/Zyb/task1-11'),
      //   name: 'task1-11',
      //   meta: { title: '外呼状态',icon: 'thz',roles: [a,b,'作业帮管理员'] }
      // },
      //坐席监控
      {
        path: 'task1-3',
        component: () => import('@/views/Zyb/task1-3'),
        name: 'task1-3',
        meta: { title: '坐席监控',icon: 'zx',roles: [a,b,'作业帮管理员'] },
        alwaysShow: true,
        children: [
          {
            path: 'task1-3-1',
            component: () => import('@/views/Zyb/task1-3/task1-3-1'),
            name: 'task1-3-1',
            meta: { title: '坐席状态',icon: 'zx',roles: [a,b,'作业帮管理员'] }
          },
        ]
      },
      //通话记录
      {
        path: 'task1-4',
        component: () => import('@/views/Zyb/task1-4'),
        name: 'task1-4',
        meta: { title: '通话记录',icon: 'thjl',roles: [a,b,'作业帮管理员'] },
        children: [
          {
            path: 'task1-4-1',
            component: () => import('@/views/Zyb/task1-4/task1-4-1'),
            name: 'task1-4-1',
            meta: { title: '录音',icon: 'ly',roles: [a,b,'作业帮管理员'] }
          },
          {
            path: 'task1-4-2',
            component: () => import('@/views/Zyb/task1-4/task1-4-2'),
            name: 'task1-4-2',
            meta: { title: '通话记录',icon: 'thjl',roles: [a,b,'作业帮管理员'] }
          },
        ]
      },
      //报表统计
      {
        path: 'task1-5',
        component: () => import('@/views/Zyb/task1-5'),
        name: 'task1-5',
        meta: { title: '报表统计',icon: 'bbtj',roles: [a,b,'作业帮管理员'] },
        children: [
          {
            path: 'task1-5-1',
            component: () => import('@/views/Zyb/task1-5/task1-5-1'),
            name: 'task1-5-1',
            meta: { title: '外呼批次率',icon: 'whpcl',roles: [a,b,'作业帮管理员'] }
          },
          {
            path: 'task1-5-2',
            component: () => import('@/views/Zyb/task1-5/task1-5-2'),
            name: 'task1-5-2',
            meta: { title: '呼叫汇总',icon: 'hjhz',roles: [a,b,'作业帮管理员'] }
          },
        ]
      },
      //话费余额
      {
        path: 'task1-6',
        component: () => import('@/views/Zyb/task1-6'),
        name: 'task1-6',
        meta: {
          title: '话费余额',
          icon: 'ye',
          roles: [a,b,'作业帮管理员'] ,
          keepAlive: false, // 此组件不需要被缓存
        }
      },
      //添加渠道
      {
        path: 'task1-7',
        component: () => import('@/views/Zyb/task1-7'),
        name: 'task1-7',
        meta: { title: '添加渠道',icon: 'tjqd',roles: [a,b,] }
      },

    ]
  },
  // {
  //   path: '/imei',
  //   component: Layout,
  //   alwaysShow: true,
  //   meta: { title: 'imei码', icon: 'qbgd',roles: [a,]},
  //   children: [
  //     {
  //       path: 'imei',
  //       component: () => import('@/views/imei'),
  //       name: 'imei',
  //       meta: { title: 'imei码数据转入',icon: 'qbgd',roles: [a] }
  //     }
  //   ]
  //
  // },
  {
    path: '/imei',
    component: Layout,
    redirect: '/imei',
    children: [{
      path: 'imei',
      name: 'imei',
      component: () => import('@/views/imei/index'),
      meta: { title: 'imei码数据转入', icon: 'qbgd',roles: [a] }
    }]
  },
  {
    path: '/manageUsers',
    component: Layout,
    redirect: '/manageUsers',
    children: [{
      path: 'manageUsers',
      name: 'manageUsers',
      component: () => import('@/views/manageUsers/index'),
      meta: { title: '用户管理', icon: 'zx',roles: [a] }
    }]
  },

  {
    path: '/Jz',
    component: Layout,
    alwaysShow: true,
    meta: { title: '家装', icon: 'jz',roles: [a,'家装管理员','家装坐席']},
    children: [
      //手拨
      {
        path: 'task1-8',
        component: () => import('@/views/Jz/task1-8'),
        name: 'task1-8',
        meta: { title: '待处理工单',icon: 'ht',roles: ['手拨','家装坐席'] }
      },
      //自动外呼
      {
        path: 'task1-9',
        component: () => import('@/views/Jz/task1-9'),
        name: 'task1-9',
        meta: { title: '自动外呼',icon: 'ly',roles: [''] }
      },

      //全部工单
      {
        path: 'task1-1',
        component: () => import('@/views/Jz/task1-1'),
        name: 'task1-1',
        meta: { title: '全部工单',icon: 'qbgd',roles: [a,'作业帮管理员','家装管理员'] }
      },
      //外呼批次
      {
        path: 'task1-2',
        component: () => import('@/views/Jz/task1-2'),
        name: 'task1-2',
        meta: { title: '外呼批次',icon: 'whpc',roles: [] }
      },
      //坐席监控
      {
        path: 'task1-3',
        component: () => import('@/views/Jz/task1-3'),
        name: 'task1-3',
        meta: { title: '坐席监控',icon: 'zx',roles: [] },
        alwaysShow: true,
        children: [
          {
            path: 'task1-3-1',
            component: () => import('@/views/Jz/task1-3/task1-3-1'),
            name: 'task1-3-1',
            meta: { title: '坐席状态',icon: 'zx',roles: [] }
          },
        ]
      },
      //通话记录
      {
        path: 'task1-4',
        component: () => import('@/views/Jz/task1-4'),
        name: 'task1-4',
        meta: { title: '通话记录',icon: 'thjl',roles: [] },
        children: [
          {
            path: 'task1-4-1',
            component: () => import('@/views/Jz/task1-4/task1-4-1'),
            name: 'task1-4-1',
            meta: { title: '录音',icon: 'ly',roles: [] }
          },
          {
            path: 'task1-4-2',
            component: () => import('@/views/Jz/task1-4/task1-4-2'),
            name: 'task1-4-2',
            meta: { title: '通话记录',icon: 'thjl',roles: [] }
          },
        ]
      },
      //报表统计
      {
        path: 'task1-5',
        component: () => import('@/views/Jz/task1-5'),
        name: 'task1-5',
        meta: { title: '报表统计',icon: 'bbtj',roles: [] },
        children: [
          {
            path: 'task1-5-1',
            component: () => import('@/views/Jz/task1-5/task1-5-1'),
            name: 'task1-5-1',
            meta: { title: '外呼批次率',icon: 'whpcl',roles: [] }
          },
          {
            path: 'task1-5-2',
            component: () => import('@/views/Jz/task1-5/task1-5-2'),
            name: 'task1-5-2',
            meta: { title: '呼叫汇总',icon: 'hjhz',roles: [] }
          },
        ]
      },
      //话费余额
      {
        path: 'task1-6',
        component: () => import('@/views/Jz/task1-6'),
        name: 'task1-6',
        meta: {title: '话费余额',icon: 'ye',roles: [] ,keepAlive: false, // 此组件不需要被缓存
          }
      },
      //添加渠道
      {
        path: 'task1-7',
        component: () => import('@/views/Jz/task1-7'),
        name: 'task1-7',
        meta: { title: '添加渠道',icon: 'tjqd',roles: [] }
      },

    ]
  },
  {
    path: '/XJ',
    component: Layout,
    alwaysShow: true,
    meta: { title: '向聚一部', icon: 'ht',roles: [a,'向聚管理员','向聚坐席','向聚录音']},
    children: [
      //手拨
      {
        path: 'task1-8',
        component: () => import('@/views/XJ/task1-8'),
        name: 'task1-8',
        meta: { title: '待处理工单',icon: 'ht',roles: ['手拨'] }
      },
      //自动外呼
      {
        path: 'task1-9',
        component: () => import('@/views/XJ/task1-9'),
        name: 'task1-9',
        meta: { title: '自动外呼',icon: 'ly',roles: ['自动'] }
      },

      //全部工单
      {
        path: 'task1-1',
        component: () => import('@/views/XJ/task1-1'),
        name: 'task1-1',
        meta: { title: '全部工单',icon: 'qbgd',roles: [a,'向聚管理员'] }
      },
      //外呼批次
      {
        path: 'task1-2',
        component: () => import('@/views/XJ/task1-2'),
        name: 'task1-2',
        meta: { title: '外呼批次',icon: 'whpc',roles: [a,'向聚管理员'] }
      },
      // //外呼状态
      // {
      //   path: 'task1-11',
      //   component: () => import('@/views/XJ/task1-11'),
      //   name: 'task1-11',
      //   meta: { title: '外呼状态',icon: 'thz',roles: [a,b,'向聚管理员'] }
      // },
      //坐席监控
      {
        path: 'task1-3',
        component: () => import('@/views/XJ/task1-3'),
        name: 'task1-3',
        meta: { title: '坐席监控',icon: 'zx',roles: [a,'向聚管理员'] },
        alwaysShow: true,
        children: [
          {
            path: 'task1-3-1',
            component: () => import('@/views/XJ/task1-3/task1-3-1'),
            name: 'task1-3-1',
            meta: { title: '坐席状态',icon: 'zx',roles: [a,'向聚管理员'] }
          },
        ]
      },
      //通话记录
      {
        path: 'task1-4',
        component: () => import('@/views/XJ/task1-4'),
        name: 'task1-4',
        meta: { title: '通话记录',icon: 'thjl',roles: [a,'向聚管理员','向聚录音'] },
        children: [
          {
            path: 'task1-4-1',
            component: () => import('@/views/XJ/task1-4/task1-4-1'),
            name: 'task1-4-1',
            meta: { title: '录音',icon: 'ly',roles: [a,'向聚管理员','向聚录音'] }
          },
          {
            path: 'task1-4-2',
            component: () => import('@/views/XJ/task1-4/task1-4-2'),
            name: 'task1-4-2',
            meta: { title: '通话记录',icon: 'thjl',roles: [a,'向聚管理员'] }
          },
        ]
      },
      //报表统计
      {
        path: 'task1-5',
        component: () => import('@/views/XJ/task1-5'),
        name: 'task1-5',
        meta: { title: '报表统计',icon: 'bbtj',roles: [a,'向聚管理员'] },
        children: [
          {
            path: 'task1-5-1',
            component: () => import('@/views/XJ/task1-5/task1-5-1'),
            name: 'task1-5-1',
            meta: { title: '外呼批次率',icon: 'whpcl',roles: [a,'向聚管理员'] }
          },
          {
            path: 'task1-5-2',
            component: () => import('@/views/XJ/task1-5/task1-5-2'),
            name: 'task1-5-2',
            meta: { title: '呼叫汇总',icon: 'hjhz',roles: [a,'向聚管理员'] }
          },
        ]
      },
      //话费余额
      {
        path: 'task1-6',
        component: () => import('@/views/XJ/task1-6'),
        name: 'task1-6',
        meta: {
          title: '话费余额',
          icon: 'ye',
          roles: [a,'向聚管理员'] ,
          keepAlive: false, // 此组件不需要被缓存
        }
      },
      //添加渠道
      {
        path: 'task1-7',
        component: () => import('@/views/XJ/task1-7'),
        name: 'task1-7',
        meta: { title: '添加渠道',icon: 'tjqd',roles: [a,'向聚管理员'] }
      },
      //手动添加工单
      {
        path: 'task1-10',
        component: () => import('@/views/XJ/task1-10'),
        name: 'task1-10',
        meta: { title: '添加工单',icon: 'qcr',roles: [a,'向聚管理员'] }
      },
    ]
  },
  {
    path: '/XJ2',
    component: Layout,
    alwaysShow: true,
    meta: { title: '向聚二部', icon: 'ht',roles: [a,'向聚二部管理员','向聚二部坐席','向聚二部录音','向聚管理员']},
    children: [
      //手拨
      {
        path: 'task1-8',
        component: () => import('@/views/XJ2/task1-8'),
        name: 'task1-8',
        meta: { title: '待处理工单',icon: 'ht',roles: ['手拨'] }
      },
      //自动外呼
      {
        path: 'task1-9',
        component: () => import('@/views/XJ2/task1-9'),
        name: 'task1-9',
        meta: { title: '自动外呼',icon: 'ly',roles: ['自动'] }
      },

      //全部工单
      {
        path: 'task1-1',
        component: () => import('@/views/XJ2/task1-1'),
        name: 'task1-1',
        meta: { title: '全部工单',icon: 'qbgd',roles: [a,'向聚二部管理员','向聚管理员'] }
      },
      //外呼批次
      {
        path: 'task1-2',
        component: () => import('@/views/XJ2/task1-2'),
        name: 'task1-2',
        meta: { title: '外呼批次',icon: 'whpc',roles: [a,'向聚二部管理员','向聚管理员'] }
      },
      // //外呼状态
      // {
      //   path: 'task1-11',
      //   component: () => import('@/views/XJ2/task1-11'),
      //   name: 'task1-11',
      //   meta: { title: '外呼状态',icon: 'thz',roles: [a,b,'向聚二部管理员'] }
      // },
      //坐席监控
      {
        path: 'task1-3',
        component: () => import('@/views/XJ2/task1-3'),
        name: 'task1-3',
        meta: { title: '坐席监控',icon: 'zx',roles: [a,'向聚二部管理员','向聚管理员'] },
        alwaysShow: true,
        children: [
          {
            path: 'task1-3-1',
            component: () => import('@/views/XJ2/task1-3/task1-3-1'),
            name: 'task1-3-1',
            meta: { title: '坐席状态',icon: 'zx',roles: [a,'向聚二部管理员','向聚管理员'] }
          },
        ]
      },
      //通话记录
      {
        path: 'task1-4',
        component: () => import('@/views/XJ2/task1-4'),
        name: 'task1-4',
        meta: { title: '通话记录',icon: 'thjl',roles: [a,'向聚二部管理员','向聚二部录音','向聚管理员'] },
        children: [
          {
            path: 'task1-4-1',
            component: () => import('@/views/XJ2/task1-4/task1-4-1'),
            name: 'task1-4-1',
            meta: { title: '录音',icon: 'ly',roles: [a,'向聚二部管理员','向聚二部录音','向聚管理员'] }
          },
          {
            path: 'task1-4-2',
            component: () => import('@/views/XJ2/task1-4/task1-4-2'),
            name: 'task1-4-2',
            meta: { title: '通话记录',icon: 'thjl',roles: [a,'向聚二部管理员','向聚管理员'] }
          },
        ]
      },
      //报表统计
      {
        path: 'task1-5',
        component: () => import('@/views/XJ2/task1-5'),
        name: 'task1-5',
        meta: { title: '报表统计',icon: 'bbtj',roles: [a,'向聚二部管理员','向聚管理员'] },
        children: [
          {
            path: 'task1-5-1',
            component: () => import('@/views/XJ2/task1-5/task1-5-1'),
            name: 'task1-5-1',
            meta: { title: '外呼批次率',icon: 'whpcl',roles: [a,'向聚二部管理员','向聚管理员'] }
          },
          {
            path: 'task1-5-2',
            component: () => import('@/views/XJ2/task1-5/task1-5-2'),
            name: 'task1-5-2',
            meta: { title: '呼叫汇总',icon: 'hjhz',roles: [a,'向聚二部管理员','向聚管理员'] }
          },
        ]
      },
      //话费余额
      {
        path: 'task1-6',
        component: () => import('@/views/XJ2/task1-6'),
        name: 'task1-6',
        meta: {
          title: '话费余额',
          icon: 'ye',
          roles: [a,'向聚二部管理员','向聚管理员'] ,
          keepAlive: false, // 此组件不需要被缓存
        }
      },
      //添加渠道
      {
        path: 'task1-7',
        component: () => import('@/views/XJ2/task1-7'),
        name: 'task1-7',
        meta: { title: '添加渠道',icon: 'tjqd',roles: [a,'向聚二部管理员','向聚管理员'] }
      },
      //手动添加工单
      {
        path: 'task1-10',
        component: () => import('@/views/XJ2/task1-10'),
        name: 'task1-10',
        meta: { title: '添加工单',icon: 'qcr',roles: [a,'向聚二部管理员','向聚管理员'] }
      },
    ]
  },
  {
    path: '/TTPC',
    component: Layout,
    alwaysShow: true,
    meta: { title: '天天拍车', icon: 'qcr',roles: [a,b,'天天拍车管理员','天天拍车坐席']},
    children: [
      //手拨
      {
        path: 'task1-8',
        component: () => import('@/views/TTPC/task1-8'),
        name: 'task1-8',
        meta: { title: '待处理工单',icon: 'qcr',roles: ['手拨',] }
      },
      //自动外呼
      {
        path: 'task1-9',
        component: () => import('@/views/TTPC/task1-9'),
        name: 'task1-9',
        meta: { title: '自动外呼',icon: 'ly',roles: ['自动',] }
      },

      //全部工单
      {
        path: 'task1-1',
        component: () => import('@/views/TTPC/task1-1'),
        name: 'task1-1',
        meta: { title: '全部工单',icon: 'qbgd',roles: [a,b,'天天拍车管理员'] }
      },
      //外呼批次
      {
        path: 'task1-2',
        component: () => import('@/views/TTPC/task1-2'),
        name: 'task1-2',
        meta: { title: '外呼批次',icon: 'whpc',roles: [a,b,'天天拍车管理员'] }
      },
      // //外呼状态
      // {
      //   path: 'task1-11',
      //   component: () => import('@/views/TTPC/task1-11'),
      //   name: 'task1-11',
      //   meta: { title: '外呼状态',icon: 'thz',roles: [a,b,'天天拍车管理员'] }
      // },
      //坐席监控
      {
        path: 'task1-3',
        component: () => import('@/views/TTPC/task1-3'),
        name: 'task1-3',
        meta: { title: '坐席监控',icon: 'zx',roles: [a,b,'天天拍车管理员'] },
        alwaysShow: true,
        children: [
          {
            path: 'task1-3-1',
            component: () => import('@/views/TTPC/task1-3/task1-3-1'),
            name: 'task1-3-1',
            meta: { title: '坐席状态',icon: 'zx',roles: [a,b,'天天拍车管理员'] }
          },
        ]
      },
      //通话记录
      {
        path: 'task1-4',
        component: () => import('@/views/TTPC/task1-4'),
        name: 'task1-4',
        meta: { title: '通话记录',icon: 'thjl',roles: [a,b,'天天拍车管理员'] },
        children: [
          {
            path: 'task1-4-1',
            component: () => import('@/views/TTPC/task1-4/task1-4-1'),
            name: 'task1-4-1',
            meta: { title: '录音',icon: 'ly',roles: [a,b,'天天拍车管理员'] }
          },
          {
            path: 'task1-4-2',
            component: () => import('@/views/TTPC/task1-4/task1-4-2'),
            name: 'task1-4-2',
            meta: { title: '通话记录',icon: 'thjl',roles: [a,b,'天天拍车管理员'] }
          },
        ]
      },
      //报表统计
      {
        path: 'task1-5',
        component: () => import('@/views/TTPC/task1-5'),
        name: 'task1-5',
        meta: { title: '报表统计',icon: 'bbtj',roles: [a,b,'天天拍车管理员'] },
        children: [
          {
            path: 'task1-5-1',
            component: () => import('@/views/TTPC/task1-5/task1-5-1'),
            name: 'task1-5-1',
            meta: { title: '外呼批次率',icon: 'whpcl',roles: [a,b,'天天拍车管理员'] }
          },
          {
            path: 'task1-5-2',
            component: () => import('@/views/TTPC/task1-5/task1-5-2'),
            name: 'task1-5-2',
            meta: { title: '呼叫汇总',icon: 'hjhz',roles: [a,b,'天天拍车管理员'] }
          },
        ]
      },
      //话费余额
      {
        path: 'task1-6',
        component: () => import('@/views/TTPC/task1-6'),
        name: 'task1-6',
        meta: {
          title: '话费余额',
          icon: 'ye',
          roles: [a,b,'天天拍车管理员'] ,
          keepAlive: false, // 此组件不需要被缓存
        }
      },
      //添加渠道
      {
        path: 'task1-7',
        component: () => import('@/views/TTPC/task1-7'),
        name: 'task1-7',
        meta: { title: '添加渠道',icon: 'tjqd',roles: [a,b,] }
      },
      //手动添加工单
      {
        path: 'task1-10',
        component: () => import('@/views/TTPC/task1-10'),
        name: 'task1-10',
        meta: { title: '添加工单',icon: 'qcr',roles: [a,b,'天天拍车管理员'] }
      },

    ]
  },
  {
    path: '/AC',
    component: Layout,
    alwaysShow: true,
    meta: { title: '爱驰汽车', icon: 'qcr',roles: [a,b,'爱驰管理员','爱驰坐席','爱驰录音']},
    children: [
      //手拨
      {
        path: 'task1-8',
        component: () => import('@/views/AC/task1-8'),
        name: 'task1-8',
        meta: { title: '待处理工单',icon: 'qcr',roles: ['手拨',] }
      },
      //自动外呼
      {
        path: 'task1-9',
        component: () => import('@/views/AC/task1-9'),
        name: 'task1-9',
        meta: { title: '自动外呼',icon: 'ly',roles: ['自动',] }
      },

      //全部工单
      {
        path: 'task1-1',
        component: () => import('@/views/AC/task1-1'),
        name: 'task1-1',
        meta: { title: '全部工单',icon: 'qbgd',roles: [a,b,'爱驰管理员'] }
      },
      //外呼批次
      {
        path: 'task1-2',
        component: () => import('@/views/AC/task1-2'),
        name: 'task1-2',
        meta: { title: '外呼批次',icon: 'whpc',roles: [a,b,'爱驰管理员'] }
      },
      // //外呼状态
      // {
      //   path: 'task1-11',
      //   component: () => import('@/views/AC/task1-11'),
      //   name: 'task1-11',
      //   meta: { title: '外呼状态',icon: 'thz',roles: [a,b,'爱驰管理员'] }
      // },
      //坐席监控
      {
        path: 'task1-3',
        component: () => import('@/views/AC/task1-3'),
        name: 'task1-3',
        meta: { title: '坐席监控',icon: 'zx',roles: [a,b,'爱驰管理员'] },
        alwaysShow: true,
        children: [
          {
            path: 'task1-3-1',
            component: () => import('@/views/AC/task1-3/task1-3-1'),
            name: 'task1-3-1',
            meta: { title: '坐席状态',icon: 'zx',roles: [a,b,'爱驰管理员'] }
          },
        ]
      },
      //通话记录
      {
        path: 'task1-4',
        component: () => import('@/views/AC/task1-4'),
        name: 'task1-4',
        meta: { title: '通话记录',icon: 'thjl',roles: [a,b,'爱驰管理员','爱驰录音'] },
        children: [
          {
            path: 'task1-4-1',
            component: () => import('@/views/AC/task1-4/task1-4-1'),
            name: 'task1-4-1',
            meta: { title: '录音',icon: 'ly',roles: [a,b,'爱驰管理员','爱驰录音'] }
          },
          {
            path: 'task1-4-2',
            component: () => import('@/views/AC/task1-4/task1-4-2'),
            name: 'task1-4-2',
            meta: { title: '通话记录',icon: 'thjl',roles: [a,b,'爱驰管理员'] }
          },
        ]
      },
      //报表统计
      {
        path: 'task1-5',
        component: () => import('@/views/AC/task1-5'),
        name: 'task1-5',
        meta: { title: '报表统计',icon: 'bbtj',roles: [a,b,'爱驰管理员'] },
        children: [
          {
            path: 'task1-5-1',
            component: () => import('@/views/AC/task1-5/task1-5-1'),
            name: 'task1-5-1',
            meta: { title: '外呼批次率',icon: 'whpcl',roles: [a,b,'爱驰管理员'] }
          },
          {
            path: 'task1-5-2',
            component: () => import('@/views/AC/task1-5/task1-5-2'),
            name: 'task1-5-2',
            meta: { title: '呼叫汇总',icon: 'hjhz',roles: [a,b,'爱驰管理员'] }
          },
        ]
      },
      //话费余额
      {
        path: 'task1-6',
        component: () => import('@/views/AC/task1-6'),
        name: 'task1-6',
        meta: {
          title: '话费余额',
          icon: 'ye',
          roles: [a,b,'爱驰管理员'] ,
          keepAlive: false, // 此组件不需要被缓存
        }
      },
      //添加渠道
      {
        path: 'task1-7',
        component: () => import('@/views/AC/task1-7'),
        name: 'task1-7',
        meta: { title: '添加渠道',icon: 'tjqd',roles: [a,b,] }
      },
      //手动添加工单
      {
        path: 'task1-10',
        component: () => import('@/views/AC/task1-10'),
        name: 'task1-10',
        meta: { title: '添加工单',icon: 'qcr',roles: [a,b,'爱驰管理员'] }
      },

    ]
  },
  {
    path: '/CS',
    component: Layout,
    alwaysShow: true,
    meta: { title: '测试', icon: 'qcr',roles: ['测试坐席','测试管理员','测试录音']},
    children: [
      //手拨
      {
        path: 'task1-8',
        component: () => import('@/views/CS/task1-8'),
        name: 'task1-8',
        meta: { title: '待处理工单',icon: 'qcr',roles: ['手拨',] }
      },
      //自动外呼
      {
        path: 'task1-9',
        component: () => import('@/views/CS/task1-9'),
        name: 'task1-9',
        meta: { title: '自动外呼',icon: 'ly',roles: ['自动',] }
      },

      //全部工单
      {
        path: 'task1-1',
        component: () => import('@/views/CS/task1-1'),
        name: 'task1-1',
        meta: { title: '全部工单',icon: 'qbgd',roles: ['测试管理员'] }
      },
      //外呼批次
      {
        path: 'task1-2',
        component: () => import('@/views/CS/task1-2'),
        name: 'task1-2',
        meta: { title: '外呼批次',icon: 'whpc',roles: ['测试管理员'] }
      },
      //坐席监控
      {
        path: 'task1-3',
        component: () => import('@/views/CS/task1-3'),
        name: 'task1-3',
        meta: { title: '坐席监控',icon: 'zx',roles: ['测试管理员'] },
        alwaysShow: true,
        children: [
          {
            path: 'task1-3-1',
            component: () => import('@/views/CS/task1-3/task1-3-1'),
            name: 'task1-3-1',
            meta: { title: '坐席状态',icon: 'zx',roles: ['测试管理员'] }
          },
        ]
      },
      //通话记录
      {
        path: 'task1-4',
        component: () => import('@/views/CS/task1-4'),
        name: 'task1-4',
        meta: { title: '通话记录',icon: 'thjl',roles: ['测试管理员','测试录音'] },
        children: [
          {
            path: 'task1-4-1',
            component: () => import('@/views/CS/task1-4/task1-4-1'),
            name: 'task1-4-1',
            meta: { title: '录音',icon: 'ly',roles: ['测试管理员','测试录音'] }
          },
          {
            path: 'task1-4-2',
            component: () => import('@/views/CS/task1-4/task1-4-2'),
            name: 'task1-4-2',
            meta: { title: '通话记录',icon: 'thjl',roles: ['测试管理员'] }
          },
        ]
      },
      //报表统计
      {
        path: 'task1-5',
        component: () => import('@/views/CS/task1-5'),
        name: 'task1-5',
        meta: { title: '报表统计',icon: 'bbtj',roles: ['测试管理员'] },
        children: [
          {
            path: 'task1-5-1',
            component: () => import('@/views/CS/task1-5/task1-5-1'),
            name: 'task1-5-1',
            meta: { title: '外呼批次率',icon: 'whpcl',roles: ['测试管理员'] }
          },
          {
            path: 'task1-5-2',
            component: () => import('@/views/CS/task1-5/task1-5-2'),
            name: 'task1-5-2',
            meta: { title: '呼叫汇总',icon: 'hjhz',roles: ['测试管理员'] }
          },
        ]
      },
      //话费余额
      {
        path: 'task1-6',
        component: () => import('@/views/CS/task1-6'),
        name: 'task1-6',
        meta: {
          title: '话费余额',
          icon: 'ye',
          roles: ['测试管理员'] ,
          keepAlive: false, // 此组件不需要被缓存
        }
      },
      //添加渠道
      {
        path: 'task1-7',
        component: () => import('@/views/CS/task1-7'),
        name: 'task1-7',
        meta: { title: '添加渠道',icon: 'tjqd',roles: ['测试管理员'] }
      },
    ]
  },
  //404页面必须放在最后!!
  { path: '*', redirect: '/404', hidden: true }
];
// 因为可以动态的挂载路由，但是不能动态删除路由。所以才考略到，
// 在需要动态清空动态挂载路由的话，直接将一个新的路由对象赋值给旧的路由对象，这样就可以达到动态清除的工作



// const createRouter = () => new VueRouter({
//   scrollBehavior: () => ({ y: 0 }),
//   routes: staticRoutes
// })
//
//
// const router = createRouter()
//
// // 调用该方法动态清除动态挂载路由
// export function resetRouter () {
//   const newRouter = createRouter()
//   router.matcher = newRouter.matcher // reset router
// }

export default router
