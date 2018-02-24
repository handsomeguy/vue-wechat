<template>
    <div class="contact-box">
        <p class="talking-name">{{friend.nickname}}</p>
        <div class="record-box" id='haha'>
            <p class="sm-tips" v-show='records.length == 0'>暂时没有消息</p>
            <div class="sm-record-box" v-show='records.length !== 0' ref='container'  >
                <chat-record 
                v-for='record in records'
                :key='record.index'
                :record='record'
                />
                <!-- <chat-record />
                <chat-record /> -->
            </div>
        </div>
        <div class="banner">
            <div class="tools-base">
                <span class="emoji"></span>
            </div>
            <div class="textinput-box">
                <textarea class="textinput" v-model='newMessage'></textarea>
            </div>
            <div class="banner-bottom">
                <button class="sendNewMessage right" @click='sendNewMessage'>发送</button>
                <span class="sm-tips-bottom right">按下Ctrl+Enter换行</span>
            </div>
        </div>
    </div>
</template>

<script>
import req from '../request/request'
import chatRecord from './chatRecord'
export default {
    props:['friend'],
    data(){
        return{
            records:[],
            newMessage:''
        }
    },
    components:{
        chatRecord
    },
    methods:{
        updateViewScroll(){
            this.$nextTick(()=>{
                document.getElementById('haha').scrollTop = document.getElementById('haha').scrollHeight
            })
        },
        sendNewMessage(){
            if(this.newMessage == '')return;
            console.log(this.newMessage);
            var message = this.newMessage;
            req.sendMessage({
                receiver:this.$store.state.manTalking,
                content:message
            })
            .then((res)=>{
                if(res.data.result == 'success'){
                    this.records.push({
                        sender:this.global.userid,
                        content:message,
                        date:'',
                        mark:false,
                        receiver:''
                    })
                    this.newMessage = '';
                    this.updateViewScroll();
                }else{
                    this.$store.commit('toggleStatus','error,reason:'+res.data.reason)
                }
            })
            .catch((err)=>{
               if(err){
                    this.$store.commit('toggleStatus','error,reason:'+err)
                }
            })
        },
        getNowFormatDate() {
            var date = new Date();
            var seperator1 = "-";
            var seperator2 = ":";
            var month = date.getMonth() + 1;
            var strDate = date.getDate();
            if (month >= 1 && month <= 9) {
                month = "0" + month;
            }
            if (strDate >= 0 && strDate <= 9) {
                strDate = "0" + strDate;
            }
            var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
                    + " " + date.getHours() + seperator2 + date.getMinutes()
                    + seperator2 + date.getSeconds();
            return currentdate;
        }
    },
    computed:{
        manTalking(){
            return this.$store.state.manTalking;
        },
        message(){
            return this.$store.state.newMessage;
        }
    },
    watch:{
        message(arr){
            arr = arr.map((ele,i)=>{
                ele.mark = false;
                this.records.push(ele);
                return ele;
            })
        },
        manTalking(val){
            req.getRecord({
                id:val
            })
            .then((res)=>{
                if(res.data.result == 'failed'){
                    this.$store.commit('toggleStatus','error,reason:'+res.data.reason)
                    return;
                }
                let d = JSON.parse(res.data);
                let now = this.getNowFormatDate();
                let date = now.substr(0,10);
                let reg = new RegExp(date,'g');
                d = d.map(function (ele,i) {
                    ele.date = ele.date.replace(reg,'');
                    if(i>=1){
                        if(ele.date.length > 10){
                            ele.mark = true;
                        }else{
                            ele.date = ele.date.replace(/\s/,'');
                            let me = parseInt(ele.date.substr(0,2));
                            let fr = parseInt(d[i-1].date.substr(0,2));
                            if(d[i-1].date.length > 10){
                                fr = -1;
                            }
                            if(me !== fr){
                                ele.mark = true;
                            }else{
                                let met = parseInt(ele.date.substr(3,2));
                                let frt = parseInt(d[i-1].date.substr(3,2));
                                if(met-5>frt){
                                    ele.mark = true;
                                }else{
                                    ele.mark = false;
                                }
                            }
                        }
                    }
                    return ele;
                })
                console.log(d);
                this.records = d;
                this.updateViewScroll();
            })
            .catch((err)=>{
               if(err){
                    this.$store.commit('toggleStatus','error,reason:'+err)
                }
            })
            
        }
    }
}
</script>

<style scoped>
.talking-name{
    margin:0px;
    line-height: 51px;
    border-bottom: 1px solid #d6d6d6;
}
.banner{
    height:181px;
}
.record-box{
    height:calc(100% - 248px);
    position: relative;
    overflow: auto;
    padding-bottom: 15px;
}
.contact-box{
    height: 100%;
}
.sm-tips{
    margin:0px;
    position: absolute;
    top:50%;
    left:50%;
    margin-top: -30px;
    margin-left: -50px;
    color:#ccc;
    font-size: 15px;
}
.tools-base{
    height:30px;
    border-top: 1px solid #d6d6d6;
}
.emoji{
    float: left;
    width: 30px;
    height: 30px;
    background: url('../assets/logo.png') no-repeat;
    background-position: -404px -398px;
    -webkit-background-size: 487px 462px;
    background-size: 487px 462px;
    margin-left: 15px;
    margin-top: 3px;
}
.textinput-box{
    width:100%;
}
.textinput{
    width: 95%;
    border: none;
    outline: none;
    resize: none;
    overflow: auto;
    height:100px;
    background-color: #eee;
    padding: 5px;
}
.right{
    float:right;
}
.sendNewMessage{
    background-color: #fff;
    color: #222;
    padding-left: 30px;
    padding-right: 30px;
    display: inline-block;
    border: 1px solid #c1c1c1;
    border-radius: 4px;
    -moz-border-radius: 4px;
    -webkit-border-radius: 4px;
    padding: 3px 20px;
    font-size: 14px;
    cursor: pointer;
    margin-right: 20px;
}
.sm-tips-bottom{
    color: #888;
    font-size: 12px;
    margin-left: 10px;
    margin-right: 7px;
    margin-top: 5px;
}
</style>
