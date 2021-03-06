import Vue from "vue";
import Vuex from "vuex";

// MODULES
import auth from "./modules/auth";
import feed from "./modules/feed";

// Use the store
Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    feed
  }
});
