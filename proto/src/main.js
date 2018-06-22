import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Buefy from "buefy";
import "./registerServiceWorker";
import "buefy/lib/buefy.css";
import "@mdi/font/css/materialdesignicons.min.css";

Vue.use(Buefy);
Vue.config.productionTip = false;

router.beforeEach((to, from, next) => {
  document.title = `Console${to.meta.title ? ` - ${to.meta.title}` : ""}`;
  next();
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
