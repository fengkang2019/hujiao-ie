

import axios from "axios";
import router from "@/router";
let AUTH_TOKEN = "";

//设置基路径
axios.defaults.baseURL = process.env.API_ROOT;
axios.defaults.headers.post["Content-Type"] = 'application/x-www-form-urlencoded';




// 拦截器配置    Interceptors 
// 发送请求之前 添加拦截器  
axios.interceptors.request.use(function (config) {
    //发送之前做的事


    return config;
}, function (error) {
    return Promise.reject(error);

})
//响应数据 的拦截器

axios.interceptors.response.use(function (response) {
    //成功接收到数据
    console.log(response)
    return response;

}, function (error) {
    console.log(error)
    return Promise.reject(error)
})


export default axios;