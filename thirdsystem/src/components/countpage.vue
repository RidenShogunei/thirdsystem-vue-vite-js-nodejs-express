<template>
  <a-card>
    <div class="show">
      <div class="time">
        <div class="clock">
          {{ one }}<span>:</span>{{ two }}<span>:</span>{{ three }}
        </div>
        <div :style="{ fontSize: '20px' }">所用时间</div>
      </div>
      <div class="input">
        <div class="clock">{{ input }}</div>
        <div :style="{ fontSize: '20px' }">输入数</div>
      </div>
      <div class="correct">
        <div class="clock">{{ correct }}</div>
        <div :style="{ fontSize: '20px' }">正确数</div>
      </div>
      <div class="rate">
        <div class="clock">{{ rate }}</div>
        <div :style="{ fontSize: '20px' }">正确率</div>
      </div>
    </div>
  </a-card>
</template>

<script setup>
const store = useStore();
const input = computed(() => {
  return store.state.inputnumber;
});
const correct = computed(() => {
  return store.state.correctnumber;
});
const rate = computed(() => {
  return store.getters.correctrate;
});
const start = computed(() => {
  return store.state.start;
});
let timerId = null;
const one = ref("00"); // 时
const two = ref("00"); // 分
const three = ref("00"); // 秒
const abc = ref(0); // 秒的计数
const cde = ref(0); // 分的计数
const efg = ref(0); // 时的计数
const time = ref("");
const startHandle = () => {
  timerId = setInterval(() => {
    if (abc.value + 1 <= 9) {
      abc.value++;
      three.value = "0" + abc.value;
    } else if (abc.value + 1 < 60) {
      abc.value++;
      three.value = abc.value;
    } else {
      // 秒数满60，开始计入分钟
      abc.value = 0;
      three.value = "00";
      if (cde.value + 1 <= 9) {
        cde.value++;
        two.value = "0" + cde.value;
      } else if (cde.value + 1 < 60) {
        cde.value++;
        two.value = cde.value;
      } else {
        // 分钟数满60，开始计入小时
        cde.value = 0;
        two.value = "00";
        if (efg.value + 1 <= 9) {
          efg.value++;
          one.value = "0" + efg.value;
        } else {
          efg.value++;
          one.value = efg.value;
        }
      }
    }
  }, 100);
};
// 暂停计时
const endHandler = () => {
  timerId = clearInterval(timerId);
  time.value = one.value + ":" + two.value + ":" + three.value;
  store.commit("changetime", time.value);
  console.log("storetime", time.value);
};
watch(start, (newValue) => {
  console.log("newvalue", newValue);
  if (newValue === true) {
    console.log("use startHandle");
    startHandle();
  } else {
    console.log("use endHandle");
    endHandler();
  }
});
</script>

<style scoped>
.show {
  display: flex;
  justify-content: space-around;
}
.time {
  display: flex;
  flex-direction: column;
}
.input {
  display: flex;
  flex-direction: column;
}
.correct {
  display: flex;
  flex-direction: column;
}
.rate {
  display: flex;
  flex-direction: column;
}
.clock {
  font-family: "Times New Roman", Times, serif;
  font-size: 20px;
}
</style>
