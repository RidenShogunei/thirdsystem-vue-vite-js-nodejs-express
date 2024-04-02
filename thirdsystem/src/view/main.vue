<template>
<div class="home">
  <div class="logosize">
    <img :src="logo" /><span :style="{ fontSize: '30px', fontStyle: 'italic',color:'rgb(15, 112, 112)',marginLeft:'10px',fontWeight:'bold' }">英文打字辅助记忆系统</span>
  </div>
  <div class="change"><chosewindow></chosewindow></div>
  <div class="show bottom-fixed"><countpage></countpage></div>
  </div>
</template>

<script setup>
import logo from "../assets/logo.png";
import chosewindow from "../components/chosewindow.vue"
import countpage from "../components/countpage.vue"
</script>

<style scoped>
.home {
    display: flex;
    background-color: azure;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    justify-content: space-between;
    align-items: flex-start;
    
}
.logosize img{
    height: 80px;
    width: 80px;
}
.logosize{
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 30px;
    margin-top: 30px;
}
.change{
    width: 20%;
    margin-top: 30px;
    margin-right: 40px;
}

.bottom-fixed {
  position: fixed;
  bottom: 20px;
  left: 20%;
  right: 20%;
  text-align: center;
}
.show{
    width: 60%;
    background-color:rgb(219, 219, 22) ;
}

</style>