// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

import promise from 'es6-promise';
import router from './router'
import store from "./store";
import $ from "jquery"
//时间处理
import moment from 'moment'
Vue.prototype.$moment = moment
import 'babel-polyfill'

promise.polyfill();
//elementUi
import "@/utils/elementUi.js"
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

//引入所有过滤器
import * as filters from "@/utils/filters"
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})


//echarts 表格
import echarts from 'echarts'
Vue.prototype.$echarts = echarts

//路由懒加载
import VueLazyload from "vue-lazyload";
Vue.use(VueLazyload);

// ajax异步请求
import axios from "@/utils/axios";
import VueAxios from 'vue-axios'
Vue.prototype.$axios = axios;

//全局配置图片查看器插件
import ImageViewer from "vue2-viewer";
Vue.use(ImageViewer)


// let dhweb = new DHAlarmWeb();
// Vue.prototype.$dhweb = dhweb;



// router.beforeEach((to, from, next) => {
//   console.log(to);
//   console.log(from);
//   console.log(next);
//   if (to.name == "longcutoff") {
//     Vue.prototype.$dhweb.login("fly001", "fly123456", process.env.EQUIPMENT_IP);
//     Vue.prototype.$dhweb.onLogin = function (data) {
//       console.log(data)
//       console.log(store.state)
//     }
//   }
//   next()
// })
console.log(" 呼叫中心正在启动  main.js dpr ==" + window.devicePixelRatio)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app")
