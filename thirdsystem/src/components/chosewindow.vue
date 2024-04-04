<template>
  <div class="window">
    <a-card class="card">
      <div class="container">
        <div class="change">
          <a-dropdown-button>
            {{ now }}
            <template #overlay>
              <a-menu @click="handleMenuClick">
                <a-menu-item key="TOEFL"> 托福 </a-menu-item>
                <a-menu-item key="GRE"> GRE </a-menu-item>
              </a-menu>
            </template>
          </a-dropdown-button>
        </div>
        <div class="start">
          <div>
            <a-button danger @click="back">归零</a-button>
          </div>
        </div>
        <div class="start">
          <div>
            <a-button v-if="state === false" type="primary" @click="start">开始</a-button>
            <a-button v-else danger @click="start">中止</a-button>
          </div>
        </div>
      </div>
    </a-card>
  </div>
</template>

<script setup>
const now = ref("TOEFL ");
const store = useStore();
const state = computed(()=>{
  return store.state.start;
});
const handleMenuClick = (e) => {
  store.commit("changebook", e.key);
  if (store.state.book === 'TOEFL') {
    now.value = "TOEFL";
  } else {
    now.value = "GRE";
  }
};
const start = () => {
  let change = !state.value;
  store.commit("changestart", change);
};
const back = () => {
  store.commit("changetime", -1);
  store.commit("changeinputnumber", 0);
  store.commit("changecorrectnumber", 0);
  console.log("归零后",store.state.time)
}
</script>

<style scoped>
.container {
  display: flex;
  justify-content: space-around;
  align-items: center;
}
</style>
