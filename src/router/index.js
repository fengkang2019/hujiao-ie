import Vue from 'vue'
import Router from 'vue-router'

//解决两次点击跳转相同路由问题
const routerPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error => error)
}

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: "/",
      name: "login",
      component: () => import("@/pages/Login")
    },
    {
      path: "/index",
      name: "index",
      component: () => import("@/pages/Index"),
      redirect: { name: "longcutoff" },
      children: [
        {
          path: "/longcutoff",
          name: "longcutoff",
          component: () => import("@/pages/Longcutoff")
        },
        {
          path: "/callrecord",
          name: "callrecord",
          component: () => import("@/pages/Callrecord")
        },
        {
          path: "/cutoffreason",
          name: "cutoffreason",
          component: () => import("@/pages/Cutoffreason")
        },
        {
          path: "/equipmentlist",
          name: "equipmentlist",
          component: () => import("@/pages/EquipmentList")
        },
        {
          path: "/equipmentmonitor",
          name: "equipmentmonitor",
          component: () => import("@/pages/Equipmentmonitor")
        },
        {
          path: "/equipmentanalyze",
          name: "equipmentanalyze",
          component: () => import("@/pages/Equipmentanalyze")
        },
        {
          path: "/parklotmonitor",
          name: "parklotmonitor",
          component: () => import("@/pages/Parklotmonitor")
        },
        {
          path: "/servicemanage",
          name: "servicemanage",
          component: () => import("@/pages/Servicemanage")
        },
        {
          path: "/FRPmonitor",
          name: "FRPmonitor",
          component: () => import("@/pages/FRPmonitor")
        }

      ]
    },
    { path: "**", redirect: { name: "longcutoff" } }


  ],
  mode:"hash"
})

export default router;