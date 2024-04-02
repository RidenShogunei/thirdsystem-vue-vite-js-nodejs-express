<template>
  <div class="window">
    <a-card class="card">
      <div class="container">
        <div class="change">
          <a-dropdown-button>
            {{ now }}
            <template #overlay>
              <a-menu @click="handleMenuClick">
                <a-menu-item key="1"> 托福 </a-menu-item>
                <a-menu-item key="2"> GRE </a-menu-item>
              </a-menu>
            </template>
          </a-dropdown-button>
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
const now = ref("托福 ");
const store = useStore();
const state = ref(false);
const handleMenuClick = (e) => {
  store.commit("changebook", e.key);
  if (store.state.book === 1) {
    now.value = "托福";
  } else {
    now.value = "GRE";
  }
};
const start = () => {
  state.value=!state.value;
  store.commit("changestart", state.value);
  console.log('change?',store.state.start)
};
</script>

<style scoped>
.container {
  display: flex;
  justify-content: space-around;
  align-items: center;
}
</style>
