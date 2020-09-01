import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: "",
    holdings: [],
    shareList: [],
    orderList: {},
    sharePrice: []
  },
  mutations: {
    clearAll(state) {
      state.holdings = [];
      state.shareList = [];
      state.orderList = {};
      state.sharePrice = [];
    },
    addSharePrice(state, share) {
      state.sharePrice.push(share);
    },
    removeShareList(state, index) {
      state.shareList.splice(index, 1);
    },
    addShareList(state, share) {
      state.shareList.push(share);
    },
    addHoldings(state, holdings) {
      state.holdings.push(holdings);
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
  getters: {
    isNotEmptyHoldings(state) {
      return state.holdings.filter(share => share.quantity > 0);
    }
  },
  actions: {},
  modules: {}
});