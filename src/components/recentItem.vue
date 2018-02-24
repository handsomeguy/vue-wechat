<template>
    <div class="recent-item" :class="{'recent-item-hover':manTalking}" @click='changeMan'>
        <img src='../assets/header.jpg'/>
        <span class="redpoint" v-show='friend.red'></span>
        <div class="item-right">
            <div class="some-detail">
                <span class="friend-name">{{friend.nickname}}</span>
                <span class="recent-time">{{friend.time}}</span>
            </div>
            <span class="recent-record">{{friend.record}}</span>
        </div>  
    </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
    props:['friend'],
    data(){
        return{

        }
    },
    computed:{
        manTalking(){
            return this.$store.state.manTalking == this.friend.id
        }
    },
    methods:{
        changeMan(){
            this.$store.commit('changeMan',this.friend.id);
            this.$emit('changeName',this.friend.nickname);
            this.friend.red = false;
        }
    }
}
</script>

<style>
.recent-item{
    height: 60px;
    overflow: hidden;
    border-bottom: 1px solid #292c33;
    cursor: pointer;
    position: relative;
    font-size: 14px;
}
.recent-item img{
    float:left;
    width: 40px;
    height: 40px;
    border-radius: 2px;
    -moz-border-radius: 2px;
    -webkit-border-radius: 2px;
    margin-left: 18px;
    margin-top: 12px;
}
.item-right{
    float: left;
    margin-left: 5px;
    margin-top: 12px;
    text-align: left;
    width:200px;
}
.friend-name{
    color:white;
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    word-wrap: normal;
}
.recent-time{
    float:right;
    margin-right: 5px;
}
.recent-item-hover{
    background-color:#3A3F45;
}
.some-detail{
    width:100%;
}
.recent-item .recent-time,.recent-item .recent-record{
    color:#6b6f7c;
}
.recent-item:hover{
    background-color:#3A3F45;
}
.recent-item:hover .recent-time{
    color:white;
}
.recent-item:hover .recent-record{
    color:white;
}
.recent-item-hover .recent-time,.recent-item-hover .recent-record{
    color:white;
}
.redpoint{
    display: block;
    position: absolute;
    width: 8px;
    height: 8px;
    background-color: #FF4343;
    top:9px;
    left:53px;
    border-radius: 4px;
}
</style>
