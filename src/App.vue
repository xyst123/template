<template>
  <div id="app">
    <img src="./assets/logo.png"> 
    <router-view></router-view>
  </div>
</template>

<script>
import Hello from './components/Hello'

export default {
  name: 'app',
  components: {
    Hello
  }
}
</script>

<style>
#app {
  font-family: \.PingFangSC-Light,Helvetica Neue,Helvetica,Arial,PingFang SC,Heiti SC,Hiragino Sans GB,Microsoft YaHei,sans-serif;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
