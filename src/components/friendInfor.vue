<template>
    <div class="friend-infor">
        <p class="infor-title">详细信息</p>
        <div class="infor-panel">
            <img src="../assets/header.jpg" alt="" class="head-img">
            <div class="sm-pane" v-show='hasCheckFriend'> 
                <p class="infor-nickname">{{fri.nickname}}</p>
                <p class="infor-intro">{{fri.introduction}}</p>
                <span class="infor-email infor-sm"><span class="sm-t">邮箱:</span>{{fri.email}}</span>
                <span class="infor-address infor-sm"><span class="sm-t">地址:</span>{{fri.address}}</span>
                <button class='send-to-friend' @click='sendToFriend'>发消息</button>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import req from '../request/request'
export default {
    data(){
        return{
            fri:{
                nickname:'新用户',
                email:'暂无',
                address:'暂无',
                introduction:'暂无'
            }
        }
    },
    methods:{
        // 切换面板 不想用事件 不想用store 直接访问parent作用域偷懒 妈的
        sendToFriend(){
            this.$parent.checkrecent = true;
            this.$emit('updateRecent',{
                id:this.$store.state.highlightFriend,
                nickname:this.fri.nickname
            })
        }
    },
    computed:{
        hasCheckFriend(){
            return this.$store.state.highlightFriend !== '';
        },
        ...mapState({
            highlightFriend:'highlightFriend'
        })
    },
    watch:{
        // 监听id点击 切换好友信息面板
        highlightFriend:function (val){
            req.getFriendInfor({
                id:val
            })
            .then((res)=>{
                if(res.data.result == 'failed'){
                    this.$store.commit('toggleStatus','error,reason:'+res.data.reason)
                    return;
                }
                let user = res.data;
                this.fri.nickname = user.nickname||'暂无';
                this.fri.email = user.mailbox||'暂无';
                this.fri.introduction = user.introduction||'暂无';
                this.fri.address = user.address||'暂无';
            })
            .catch((err)=>{
               if(err){
                    this.$store.commit('toggleStatus','error,reason:'+err)
                    return;
                }
            })
        }
    }
}
</script>

<style>
.infor-title{
    margin:0px;
    padding:16px 0px;
    border-bottom: 1px solid #d6d6d6;
}
.infor-panel{
    margin-top: 80px;
}
.head-img{
    display: block;
    width: 100px;
    height: 100px;
    margin: 0 auto;
    border-radius: 4px;
}
.infor-nickname{
    font-weight: 400;
    font-size: 24px;
    margin-bottom: 10px;
    display: inline-block;
}
.infor-intro{
    margin:0px;
    font-size: 14px;
    color: #888;
    margin-bottom: 20px;
}
.infor-sm{
    display: block;
    text-align: left;
    padding-left: 43%;
    font-size: 14px;
    color: #888;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    word-wrap: normal;
}
.send-to-friend{
    display: block;
    outline: none;
    cursor: pointer;
    border:none;
    color:white;
    margin:0 auto;
    width: 200px;
    text-align: center;
    color: #fff;
    line-height: 40px;
    background-color: #42ac3e;
    font-size: 14px;
    text-decoration: none;
    border-radius: 4px;
    -moz-border-radius: 4px;
    -webkit-border-radius: 4px;
    margin-top: 20px;
}
.sm-t{
    margin-right: 15px;
}
</style>
