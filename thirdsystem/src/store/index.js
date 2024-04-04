import { createStore } from "vuex";

export default createStore({
  state: {
    book: "TOEFL",
    start: false,
    time: 0,
    inputnumber: 0,
    correctnumber: 0,
    GREnownumber: 1,
    TOEFLnownumber: 1,
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
    changeinputnumber(state, input = null) {
      if (input === null)
        state.inputnumber = state.inputnumber + 1;
      else
        state.inputnumber = input;
    },

    changecorrectnumber(state, input = null) {
      if (input === null)
        state.correctnumber = state.correctnumber + 1;
      else
        state.correctnumber = input;
    },
    changenownumber(state, book) {
      if (book === "GRE")
        state.GREnownumber++;
      else
        state.TOEFLnownumber++;
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
