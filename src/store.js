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
        saveRoute(state, route) {
            state.route = route;
        },
        saveLoginHandle(state,loginHandle){
            state.loginHandle =loginHandle;
        },
        saveDeviceLists(state,deviceLists){
            state.deviceLists =deviceLists
        },
        saveParkCodeList(state,agentTree){
            console.log(11)
            state.parkCodeList =agentTree;
        }

    },
})
export default store;