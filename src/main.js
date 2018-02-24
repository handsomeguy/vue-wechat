// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router'
import 'font-awesome/css/font-awesome.css';
import axios from 'axios'
import _ from 'lodash'
import qs from 'qs';
import global from './global.js'

Vue.config.productionTip = false;
axios.defaults.baseURL = '/api';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
Vue.prototype.$ajax = axios;
// 全局变量
Vue.prototype.global = global;

Vue.use(Vuex);

axios.defaults.transformRequest = [function (data) {
  // Do whatever you want to transform the data
  let ret = '';
  let arr = [];
  for (let it in data) {
    arr.push(encodeURIComponent(it) + '=' + encodeURIComponent(data[it]));
  }
  ret = arr.join('&');
  return ret
}];
//POST传参序列化(添加请求拦截器)
// axios.interceptors.request.use((config) => {
// 	//在发送请求之前做某件事
//     if(config.method  === 'post'){
//       console.log(config.data);
//         config.data = qs.stringify(config.data);
//         console.log(config.data);
//       }
//     return config;
// },(error) =>{
//      _.toast("错误的传参", 'fail');
//     return Promise.reject(error);
// });

const store = new Vuex.Store({
  state: {
    count: 0,
    tipsMark: false,
    tipsText:'network error',
    // 当前高亮的friend 也是正在查看的好友信息版面
    highlightFriend:'',
    manTalking:'',
    newMessage:[]
  },
  mutations: {
    increment (state) {
      state.count++
    },
    //更新新的消息数据
    updateNewMessage(state,arr){
      state.newMessage = arr;
    },
    // 切换tips面板
    toggleStatus(state,text){
      state.tipsMark = state.tipsMark==true?false:true;
      state.tipsText = text;
    },
    //高亮好友item
    highlightItem(state,id){
      state.highlightFriend = id;
    },
    //修改当前对话好友
    changeMan(state,id){
      state.manTalking = id;
    }
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
