import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: ""
  },
  mutations: {
    setUser(state, user) {
      if (user == "logout") {
        state.user = null;
      } else {
        state.user = user.toLowerCase();
      }
    }
  },
  actions: {},
  modules: {}
});