<template>
  <div class="single-record">
      <p class="record-time" v-show='record.mark'>{{record.date}}</p>
      <div class="maintext" :class="[mytext?'mytext':'friendtext']">
          <img src="../assets/header.jpg" alt="" class="headimg">
          <div class="record-text">
              {{record.content}}
          </div>
      </div>
  </div>
</template>

<script>
export default {
    props:['record'],
    computed:{
        mytext(){
            return this.record.sender == this.global.userid
        }
    }
}
</script>

<style>
.record-time{
    display: inline-block;
    font-size: 12px;
    padding: 1px 18px;
    color: #b2b2b2;
}
.record-text{
    max-width: 500px;
    min-height: 1em;
    display: inline-block;
    vertical-align: top;
    position: relative;
    text-align: left;
    font-size: 14px;
    border-radius: 3px;
    margin: 0 10px;
    padding: 10px;
    word-break: break-all;
}
.headimg{
    width: 40px;
    height: 40px;
    border-radius: 2px;
    -moz-border-radius: 2px;
    -webkit-border-radius: 2px;
    cursor: pointer;
}
.single-record{
    padding: 0 15px;
    margin-bottom: 10px;
    overflow: hidden;
}
.mytext .headimg{
    float:right;
}
.mytext .record-text{
    float:right;
    background-color: #B2E281;
}
.friendtext .headimg{
    float:left;
}
.friendtext .record-text{
    float:left;
    background-color: white;
}
.mytext .record-text:after{
    position: absolute;
    top: 14px;
    border: 6px solid transparent;
    content: " ";
    border-left-color: #b2e281;
    border-left-width: 4px;
    left: 100%;
}
.friendtext .record-text:after{
    position: absolute;
    top: 14px;
    border: 6px solid transparent;
    content: " ";
    border-right-color: white;
    border-right-width: 4px;
    left:-10px;
}
</style>
