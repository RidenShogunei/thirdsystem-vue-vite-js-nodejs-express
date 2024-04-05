<template>
  <div @keyup="handleKeyPress" tabindex="0">
    <a-card>
      <div class="show">
        <div>
          <span v-for="(char, index) in word" :key="index" :class="{
    correct: index <= currentIndex,
    wrong: currentIndex === -1,
  }">{{ char }}</span>
        </div>
        <span :style="{ fontSize: '20px', color: 'gray' }">{{
    translation
  }}</span>
        <span :style="{ fontSize: '20px', color: 'gray' }">[{{
    note
          }}]</span>
      </div>
    </a-card>
  </div>
</template>

<script setup>
import getwordApi from "../api/getword";
const store = useStore();
const number = computed(() => {
  if (book.value === 'GRE') {
    return store.state.GREnownumber;
  } else {
    return store.state.TOEFLnownumber;
  }
});
const book = computed(() => {
  return store.state.book;
});
const state = computed(() => {
  return store.state.start;
});
const note = ref("")
const word = ref("");
const translation = ref("");
const currentIndex = ref(-1); // 当前匹配的字符索引
const len = computed(() => {
  return word.value.length;
});
const nowIndex = ref(0);
async function getword() {
  try {
    const response = await getwordApi({ number: number.value, book: book.value });
    console.log("收到的数据", response)
    const result = response;  // 添加这行代码
    word.value = result.data[0].word;
    translation.value = result.data[0].translation;
    note.value = result.data[0].note;
  } catch (error) {
    word.value = "mitigate";
    translation.value = "减轻，缓解";
    note.value = "lalala";
    console.error(error);
  }
}
function handleKeyPress(event) {
  console.log("进入判断了");
  if (!state.value) {
  } else if (currentIndex.value === len.value - 2&&event.key===word.value[nowIndex.value]) {
    currentIndex.value = -1;
    nowIndex.value = 0;
    store.commit("changeinputnumber");
    store.commit("changecorrectnumber");
    store.commit("changenownumber", book.value);
    localStorage.setItem(`${book.value}`, number.value)
  } else {
    const keyPressed = event.key;
    console.log("点击键盘", event.key);
    const correctKey = word.value[nowIndex.value];
    // 正确的按键值
    if (keyPressed === correctKey) {
      currentIndex.value = currentIndex.value + 1;
      nowIndex.value++;
      console.log("正确了", currentIndex.value);
    } else {
      currentIndex.value = -1;
      nowIndex.value = 0;
      store.commit("changeinputnumber");
      console.log("错误了", currentIndex.value);
    }
  }
}
getword();
watch(number, () => {
  getword();
});
watch(book, () => {
  getword();
})
onMounted(() => {
  document.addEventListener("keyup", handleKeyPress);
});
onBeforeUnmount(() => {
  document.removeEventListener("keyup", handleKeyPress);
});
</script>

<style scoped>
.show {
  font-family: "Times New Roman", Times, serif;
  font-size: 60px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.show span {
  display: inline-block;
  flex: 1;
}

.correct {
  color: red;
}

.wrong {
  color: black;
  animation: shake 0.5s;
}

@keyframes shake {
  0% {
    transform: translateX(0);
  }

  10% {
    transform: translateX(-5px);
  }

  20% {
    transform: translateX(5px);
  }

  30% {
    transform: translateX(-5px);
  }

  40% {
    transform: translateX(5px);
  }

  50% {
    transform: translateX(-5px);
  }

  60% {
    transform: translateX(5px);
  }

  70% {
    transform: translateX(-5px);
  }

  80% {
    transform: translateX(5px);
  }

  90% {
    transform: translateX(-5px);
  }

  100% {
    transform: translateX(0);
  }
}
</style>
