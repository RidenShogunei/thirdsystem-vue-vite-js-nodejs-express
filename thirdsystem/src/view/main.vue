<template>
  <div class="home"  @keyup="handleKeyPress">
    <div class="logosize" :class="store.state.start ? '' : 'blur'">
      <img :src="logo" /><span :style="{
      fontSize: '30px',
      fontStyle: 'italic',
      color: 'rgb(15, 112, 112)',
      marginLeft: '10px',
      fontWeight: 'bold',
    }">英文打字辅助记忆系统</span>
    </div>
    <div class="type" :class="store.state.start ? '' : 'blur'">
      <typepart></typepart>
    </div>
    <div class="start-message" v-show="!store.state.start">
      点击任意键盘按钮开始
    </div>
    <div class="change">
      <chosewindow></chosewindow>
    </div>
    <div class="show bottom-fixed" :class="store.state.start ? '' : 'blur'">
      <countpage></countpage>
    </div>
  </div>
</template>

<script setup>
import logo from "../assets/vue.svg";
import chosewindow from "../components/chosewindow.vue";
import countpage from "../components/countpage.vue";
import typepart from "../components/typePart.vue";
const store = useStore();
function newdata() {
  if (localStorage.getItem("TOEFL") && !isNaN(localStorage.getItem("TOEFL"))) {
    store.state.TOEFLnownumber = localStorage.getItem("TOEFL");
  }
  if (localStorage.getItem("GRE") && !isNaN(localStorage.getItem("GRE"))) {
    store.state.GREnownumber = localStorage.getItem("GRE");
  }
}
newdata();

onMounted(() => {
  window.addEventListener('keydown', startGame);
});

onUnmounted(() => {
  window.removeEventListener('keydown', startGame);
});
function startGame() {
  store.state.start = true;
}
</script>

<style scoped>
.blur {
  filter: blur(7px);
}

.start-message {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
}

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

.logosize img {
  height: 80px;
  width: 80px;
}

.logosize {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 30px;
  margin-top: 30px;
}

.change {
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

.show {
  width: 60%;
  background-color: rgb(219, 219, 22);
}

.type {
  margin-top: 15%;
  width: 40%;
  height: 40%;
  background-color: antiquewhite;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
}
</style>
