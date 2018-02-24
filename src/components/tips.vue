<template>
    <transition name="fade">
        <div class="background-tips" v-show="mark" @click='toggleStatus'>
            <div class="tips">
                <p class="tipsText">
                    {{tipstext}}
                </p>
            </div>
        </div>
    </transition>
</template>

<script>
export default {
    data(){
        return{
        }
    },
    methods:{
        toggleStatus(){
            this.$store.commit('toggleStatus');
        }
    },
    computed:{
        mark(){
            return this.$store.state.tipsMark;
        },
        tipstext(){
            return this.$store.state.tipsText;
        }
    }
}
</script>

<style>
.tips{
    position: absolute;
    background-color: #E9E9E9;
    height: 60px;
    width: 200px;
    top:50%;
    left: 50%;
    margin-left: -100px;
    margin-top: -30px;
    border-radius: 5px;
}
.background-tips{
    height: 100%;
    width:100%;
    position: absolute;
    top:0px;
    left: 0px;

    background-color: rgba(0, 0, 0, 0.5)
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .3s
}
.fade-enter, .fade-leave-to /* .fade-leave-active in below version 2.1.8 */ {
  opacity: 0
}
</style>
