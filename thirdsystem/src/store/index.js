import { createStore } from "vuex";

export default createStore({
  state: {
    book: "托福",
    start: false,
    time: 0,
    inputnumber: 0,
    correctnumber: 0,
    correctrate: 0,
  },
  mutations: {
    changebook(state, book) {
      state.book = book;
    },
    changestart(state, start) {
      state.start = start;
    },
    changetime(state, time) {
      state.time = time;
    },
    changeinputnumber(state, inputnumber) {
      state.inputnumber = inputnumber;
    },
    changecorrectnumber(state, correctnumber) {
      state.correctnumber = correctnumber;
    },
    changecorrectrate(state, correctrate) {
      state.correctrate = correctrate;
    },
  },
  actions: {},
  modules: {},
});
