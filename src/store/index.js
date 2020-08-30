import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: "",
    holdings: {}
  },
  mutations: {
    setUser(state, user) {
      if (user == "logout") {
        state.user = null;
      } else {
        state.user = user.toLowerCase();
      }
    },
    setHoldings(state, holdings) {
      if (state.holdings[holdings.shareName]) {
        if (holdings.type == "buy") {
          state.holdings[holdings.shareName].quantity += holdings.quantity;
        } else {
          state.holdings[holdings.shareName].quantity -= holdings.quantity;
        }
      } else {
        state.holdings[holdings.shareName] = holdings;
      }
    }
  },
  actions: {},
  modules: {}
});