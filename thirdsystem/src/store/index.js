import { createStore } from "vuex";

export default createStore({
  state: {
    book: "托福",
    start: false,
    time: 0,
    inputnumber: 0,
    correctnumber: 0,
    nownumber: 1,
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
    changeinputnumber(state) {
      state.inputnumber = state.inputnumber+1;
    },
    changecorrectnumber(state) {
      state.correctnumber = state.correctnumber+1;
    },
    changecorrectrate(state, correctrate) {
      state.correctrate = correctrate;
    },
    changenownumber(state, nownumber) {
      state.nownumber = nownumber;
    },
  },
  actions: {},
  modules: {},
  getters: {
    correctrate: state => {
      if (state.inputnumber === 0) {
        return '0.00%';
      } else {
        let rate = (state.correctnumber / state.inputnumber) * 100;
        return rate.toFixed(2) + '%';
      }
    }
  }
});
