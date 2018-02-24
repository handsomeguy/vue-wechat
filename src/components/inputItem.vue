<template>
<div class="input-item">
    <i class="fa fa-comment fa-awesome"></i>
    <input 
    :type="set.type" 
    :name="set.name" 
    class="form-control" 
    :placeholder="set.name"
    @keyup='updateValue'
    ref="input">
</div>
</template>

<script>
import _ from 'lodash';
export default {
    name:'inputitem',
    props:['set'],
    data(){
        return{
            haha:1
        }
    },
    methods:{
        // 停止输入50ms后更新数据
        updateValue:_.debounce(function () {
            this.set.value = this.$refs.input.value;
        },0)
    }
}
</script>


<style lang='scss'>
*{
    font-family: '微软雅黑';
}
.fa-awesome{
    color: #8F8F8F;
    position: absolute;
    left: 15px;
    font-size: 18px;
    top:5px;
}
.input-item{
    position: relative;
    width:80%;
    margin: 0 auto;
    margin-top: 15px;
}
.form-control{
    width:80%;
    padding:6px;
    padding-left: 40px;
    border:none;
    outline: none;
    border-radius: 5px;
    font-size: 15px;
}
</style>

