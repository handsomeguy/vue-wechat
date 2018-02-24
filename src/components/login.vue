<template>
  <div class="login-box">
      <!-- img -->
      <img src="../assets/mywife.png" class="head-img"  >
      <p class="head-title">PLEASE {{panel=='REGIST'?'LOG IN':'REGIST'}}</p>
      <!-- form -->
      <div class="input-container">    
        <inputitem v-for='item in items' :set='item' :key="item.key"></inputitem>
			</div>
      <!-- button -->
      <div class="input-group">
        <button class="submit-button" @click='submitData'>{{panel=='REGIST'?'LOG IN':'REGIST'}}</button>
      </div>
      <span class="togglePanel-style"></span>
      <span class="togglePanel" @click='togglePanel'>{{panel}}</span>
  </div>
</template>

<script>
import inputitem from './inputItem'
import qs from 'qs';
import _ from 'lodash';
import req from '../request/request.js'

export default {
  name: 'login',
  components:{
    inputitem
  },
  data () {
    return {
      // 数据框item
      items:[
        {
        type:'text',
        name:'account',
        key:1,
        value:''
        },
        {
        type:'password',
        name:'password',
        key:2,
        value:''
        }
      ],
      panel:'REGIST',
      action:'login'
    }
  },
  computed:{
    test(){
      return this.$store.state.count + 2;
    }
  },
  methods:{
    togglePanel(){
      this.panel = this.panel == 'LOG IN'?'REGIST':'LOG IN';
      this.action = this.action == 'login'?'register':'login';
    },
    submitData(){
      let valueObj = {};
      this.items.forEach(function (ele,i) {
        valueObj[ele.name] = ele.value;
      })
      switch(this.action){
        // login
        case 'login':
        req.login(valueObj)
        .then((res)=>{
          if(res.data.result !== 'success'){
            this.$store.commit('toggleStatus','error,reason:'+res.data.reason)
          }else{
            // this.$store.commit('toggleStatus','log in successfully');
            this.global.userid = res.data.id;
            this.$router.push('/chat');
          }
        })
        .catch((err)=>{
          console.log(err);
        })
        break;
        // register
        case 'register':
        req.register(valueObj)
        .then((res)=>{
          console.log(res)
        })
        .catch((err)=>{
          console.log(err);
        })
        break;
        default: break;
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
*{
  font-family: '微软雅黑';
}
.login-box{
  width:300px;
  height: 400px;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -200px;
  margin-left: -150px;
  background-color:rgba(83,83,83,0.6);
  border-radius: 5px;
}
.head-img{
  width: 150px;
  height: 150px;
  border-radius: 200px;
  display: inline-block;
  margin-top: 30px;
  opacity: 0.8;
}
.input-container{
  padding:3px;
}
.submit-button {
    border: none;
    outline: none;
    cursor: pointer;
    width: 80%;
    height: 30px;
    font-size: 15px;
    border-radius: 2px;
    margin-top: 20px;
    color: #D0D0D0;
    background-color: #515151;
    transition: all 0.2s ease-in-out;
}
.submit-button:hover {
    background-color: white;
    color: gray;
}
.togglePanel-style{
  display: block;
  position: absolute;
  right: 0px;
  bottom: 0px;
  width: 0;
  height: 0;
  border-bottom: 50px solid #515151;
  border-left: 110px solid transparent;
  cursor: pointer;
}
.togglePanel{
  color:#CCCCCC;
  position: absolute;
  right: 3px;
  bottom: 5px;
  cursor: pointer;
}
.head-title{
  color:white;
  margin: 0px;
  margin-top: 5px;
}
.hide{
  display: none;
}
</style>
