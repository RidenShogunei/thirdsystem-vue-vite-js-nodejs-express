import { createStore } from 'vuex';

export default createStore({
  state: {count:0},
  mutations: {changecount(state,number){
    state.count=number
  }},
  actions: {},
  modules: {},
});