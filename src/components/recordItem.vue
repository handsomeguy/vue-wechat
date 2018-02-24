<template>
    <div class="record-item" :class="{'record-item-hover':highlight}" @click='highlightItem'>
        <img src='../assets/header.jpg'/>
        <p class="user-name">{{friend.nickname}}</p>
    </div>
</template>

<script>
export default {
    props:['friend'],
    data(){
        return{

        }
    },
    computed:{
        highlight(){
            return this.$store.state.highlightFriend == this.friend.id;
        }
    },
    methods:{
        highlightItem(){
            this.$store.commit('highlightItem',this.friend.id);
        }
    }
}
</script>

<style>
.record-item{
    overflow: hidden;
    padding: 10px 18px 9px;
    border-bottom: 1px solid #292c33;
    cursor: pointer;
}
.record-item:hover{
    background-color:#3A3F45;
}
.record-item-hover{
    background-color:#3A3F45;
}
.record-item img{
    float: left;
    width: 30px;
    height: 30px;
    border-radius: 2px;
    -moz-border-radius: 2px;
    -webkit-border-radius: 2px;
}
.user-name{
    float: left;
    text-align: left;
    margin:0px;
    margin-left: 6px;
    color: white;
    line-height: 30px;
}
</style>
