import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);


const store = new Vuex.Store({
    state: {
        userLogin: {},
        route: "",
        loginHandle:"",
        deviceLists:[],
        parkCodeList:[],
    },
    actions: {

    },
    mutations: {
        //保存登录返回的数据
        saveUserLogin(state, userLogin) {
            state.userLogin = userLogin
        },
        //路由地址
        saveRoute(state, route) {
            state.route = route;
        },
        //句柄,已放弃
        saveLoginHandle(state,loginHandle){
            state.loginHandle =loginHandle;
        },
        //设备状态信息
        saveDeviceLists(state,deviceLists){
            state.deviceLists =deviceLists
        },
        //保存停车场列表信息
        saveParkCodeList(state,agentTree){
            state.parkCodeList =agentTree;
        }

    },
})
export default store;