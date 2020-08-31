import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: "",
    holdings: {},
    shareList: [],
    orderList: {}
  },
  mutations: {
    clearAll(state) {
      state.holdings = {};
      state.shareList = [];
      state.orderList = {};
    },
    removeShareList(state, index) {
      state.shareList.splice(index, 1);
    },
    addShareList(state, share) {
      state.shareList.push(share);
    },
    addHoldings(state, holdings) {
      state.holdings[holdings.key] = holdings;
    },
    addOrderList(state, orderList) {
      state.orderList[orderList.key] = orderList;
    },
    setUser(state, user) {
      if (user == "logout") {
        state.user = null;
      } else {
        state.user = user.toLowerCase();
      }
    }
  },
  getters: {},
  actions: {},
  modules: {}
});