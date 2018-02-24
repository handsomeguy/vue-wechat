<template>
  <div class="chat-box">
      <div class="panel-left">
            <div class="header">
                <div class="avatar">
                    <img class="img" src="../assets/header.jpg" >
                </div>
                <div class="info">
                    <div class="nickname">
                        <span class="display_name ng-binding">Mr.培森</span>
                        <a class="opt" href="javascript:;" ng-show="account.HeadImgUrl" ng-click="toggleSystemMenu()"><i class="web_wechat_add"></i></a>
                    </div>
                </div>
            </div>
            <div class="toggle-panel">
                <div class="single-item ">
                    <span class="public-chat" 
                    :class='[checkrecent?"chat-fri-hover":"chat-fri"]'
                    @click='toggleIcon(true)'
                    >
                    </span>
                </div>
                <div class="single-item">
                    <span class="public-chat" 
                    :class='[!checkrecent?"chat-list-hover":"chat-list"]'
                    @click='toggleIcon(false)'
                    >
                    </span>
                </div>
            </div>
            <div class="friend-container">
                <div class="recent" v-show='checkrecent'>
                    <recent-item 
                    v-for='fri in recentFriends'
                    :friend='fri'
                    :key='fri.id'
                    @changeName='changeName'
                    />
                </div>
                <div class="friendlist" v-show='!checkrecent'>
                    <record-item 
                    v-for='fri in friends' 
                    :friend='fri'
                    :key='fri.id'
                     />
                </div>
            </div>
      </div>
      <div class="panel-right">
          <chat-box v-show='checkrecent' :friend='talkingTo'/>
          <friend-infor v-show='!checkrecent' @updateRecent='updateRecent'/>
      </div>
  </div>
</template>

<script>
import recentItem from './recentItem'
import recordItem from './recordItem'
import friendInfor from './friendInfor'
import chatBox from './chatBox'
import req from '../request/request.js'
export default {
    name:'chat',
    components:{
        recentItem,
        recordItem,
        friendInfor,
        chatBox
    },
    data(){
        return{
            checkrecent:true,
            friends:[],
            recentFriends:[],
            talkingTo:{
                nickname:'新用户',
                id:''
            }
        }
    },
    created(){
        // 节点创建前获取好友列表
        req.getFriendList()
        .then((res)=>{
            if(res.data.result == 'failed'){
                this.$store.commit('toggleStatus','error,reason:'+res.data.reason)
                return;
            }
            let d = JSON.parse(res.data);
            d.forEach((ele,i)=>{
                this.global.hashFriend[ele.id] = ele.nickname;
            })
            this.friends = d;
            // console.log(this.global.hashFriend)
        })
        .catch((err)=>{
          console.log(err);
        })
    },
    mounted(){
        //插入节点后查询有无新消息
        setInterval(()=>{
            req.getUnreadMessage()
            .then((res)=>{
                let d = JSON.parse(res.data);
                let hash = {};
                d.forEach(function (ele,i) {
                    hash[ele.sender]==undefined?
                        hash[ele.sender] = [ele]:
                        hash[ele.sender].push(ele);
                })
                if(hash[this.$store.state.manTalking]!==undefined){
                    this.$store.commit('updateNewMessage',hash[this.$store.state.manTalking])
                    delete hash[this.$store.state.manTalking];
                }
                for(let p in hash){
                    this.updateUnread({
                        id:p,
                        nickname:this.global.hashFriend[p]
                    })
                }
                console.log(hash);
            })
            .catch((err)=>{
                if(err){
                    this.$store.commit('toggleStatus','error,reason:'+err)
                }
            })
        },5000)
    }, 
    methods:{
        changeName(nickname){
            this.talkingTo.nickname = nickname;
        },
        toggleIcon(flag){
            this.checkrecent = flag;
        },
        updateRecent(fri){
            var index = -1;
            this.recentFriends.forEach(function (ele,i) {
                if(ele.id == fri.id){
                    index = i;
                    return false;
                }
            })
            if(index < 0){
                this.recentFriends.unshift(fri);
            }else{
                let old = this.recentFriends.splice(index,1);
                this.recentFriends.unshift({
                    id:old[0].id,
                    nickname:old[0].nickname,
                    time:old[0].time,
                    record:old[0].record
                });
            }
            this.$store.commit('changeMan',fri.id);
        },
        updateUnread(fri){
            var index = -1;
            this.recentFriends.forEach(function (ele,i) {
                if(ele.id == fri.id){
                    index = i;
                    return false;
                }
            })
            if(index < 0){
                fri.red = true;
                this.recentFriends.unshift(fri);
            }else{
                let old = this.recentFriends.splice(index,1);
                this.recentFriends.unshift({
                    id:old[0].id,
                    nickname:old[0].nickname,
                    time:old[0].time,
                    record:old[0].record,
                    red:true
                });
            }
        }
    }
}
</script>

<style lang='scss'>
.chat-box{
    background-color: white;
    height: 80%;
    width: 1000px;
    height: 100%;
    margin: 0 auto;
    border-radius: 3px;
    -moz-border-radius: 3px;
    -webkit-border-radius: 3px;
    overflow: hidden;
}
.panel-left{
    position: relative;
    width: 280px;
    height: 100%;
    float: left;
    background: #2e3238;
}
.panel-right{
    position: relative;
    width: 720px;
    height: 100%;
    float: right;
    background: #eee;
}
.img{
    width: 40px;
    height: 40px;
    border-radius: 2px;
    -moz-border-radius: 2px;
    -webkit-border-radius: 2px;
    display: block;
    cursor: pointer;
}
.header {
    padding: 18px;
    position: relative;
}
.header .avatar {
    display: table-cell;
    vertical-align: middle;
    word-wrap: break-word;
    word-break: break-all;
    white-space: nowrap;
    padding-right: 10.625px;
}
.header .info .nickname .display_name {
    display: inline-block;
    font-weight: 400;
    width: 156px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    word-wrap: normal;
    color: #fff;
    font-size: 18px;
    vertical-align: top;
    line-height: 31px;
    text-decoration: none;
}
.web_wechat_add, .web_wechat_addfriend {
    display: inline-block;
    vertical-align: middle;
    width: 30px;
    height: 30px;
}
.web_wechat_add {
    background: url('../assets/logo.png') no-repeat;
    background-position: -434px -398px;
    -webkit-background-size: 487px 462px;
    background-size: 487px 462px;
}
.header .info {
    display: table-cell;
    vertical-align: middle;
    word-wrap: break-word;
    word-break: break-all;
    width: 2000px;
    text-align: left;
}
.toggle-panel{
    width:100%;
    height: 30px;
    padding-bottom: 6px;
    border-bottom: 1px solid #454545;
}
.single-item{
    float: left;
    width: 49%;
    height: 30px;
    border-right:1px solid #5D5D5D;
}
.public-chat{
    background: url('../assets/logo.png') no-repeat;
    display: inline-block;
    vertical-align: middle;
    width: 35px;
    height: 35px;
    cursor: pointer;
}
.chat-fri-hover{
    background-position: -185px -96px;
    -webkit-background-size: 487px 462px;
    background-size: 487px 462px;
}
.chat-fri{
    background-position: -150px -96px;
    -webkit-background-size: 487px 462px;
    background-size: 487px 462px;
}
.chat-list{
    background-position: -220px -96px;
    -webkit-background-size: 487px 462px;
    background-size: 487px 462px;
}
.chat-list-hover{
    background-position: -304px -246px;
    -webkit-background-size: 487px 462px;
    background-size: 487px 462px;
}
.friend-container{
    width:100%;
    height:calc(100% - 113px);
    overflow:auto;
}
.recent{
    width:100%;
    height:100%;
    overflow: auto;
}
/* 设置滚动条的样式 */
::-webkit-scrollbar {
    width: 12px;
}
/* 滚动槽 */
::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(139,139,139,0.85);
    border-radius: 10px;
}
/* 滚动条滑块 */
::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background: rgba(0,0,0,0.1);
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.5);
}
::-webkit-scrollbar-thumb:window-inactive {
    background: rgba(0,0,0,0.4);
}
 
</style>
