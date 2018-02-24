<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <router-view></router-view>
    <tips></tips>
  </div>
</template>

<script>
import tips from './components/tips'
export default {
  name: 'app',
  components:{
    tips
  }
}
</script>

<style>
html,body{
  margin: 0px;
  height: 100%;
}
*{
  font-family: '微软雅黑';
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background-size: cover;
  overflow: hidden;
  height: 100%;
  background-image: url('./assets/background.jpg')
}
</style>
