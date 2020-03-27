//注册全局组件
import Vue from "vue";
import Pie from "@/components/echarts/Pie.vue";
import Bar from "@/components/echarts/Bar.vue";

Vue.component("my-pie",Pie);
Vue.component("my-bar",Bar)