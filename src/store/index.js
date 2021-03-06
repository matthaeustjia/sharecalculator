import Vue from "vue";
import Vuex from "vuex";
import _ from "lodash";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
    shareList: [],
    orderList: [],
    sharePrice: []
  },
  mutations: {
    clearAll(state) {
      state.shareList = [];
      state.orderList = [];
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
    addOrderList(state, orderList) {
      state.orderList.push(orderList);
    },
    setUser(state, user) {
      if (!user) {
        state.user = null;
      } else {
        state.user = user.email;
      }
    }
  },
  getters: {
    isSold(state) {
      return state.orderList.filter(share => share.isSold);
    },
    isNotSold(state) {
      return state.orderList.filter(share => share.isSold === false);
    },
    groups(state, getters) {
      let grouped = _.groupBy(getters.isNotSold, "shareName");
      return grouped;
    }
  },
  actions: {},
  modules: {}
});
