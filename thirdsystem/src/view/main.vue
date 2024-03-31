<template>
<div @click="change" :style="{ fontSize: '30px' }">
{{ trueword }}
</div>
</template>

<script setup>
const store =useStore();
const trueword =ref(1);
const change=()=>{
    trueword.value++;
    store.commit('changecount',trueword.value)
    console.log(store.state.count)
}

</script>