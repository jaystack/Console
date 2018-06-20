import Vue from "vue";
import Router from "vue-router";

import Home from "./views/Home";
import Dashboard from "./views/Dashboard";
import Connectors from "./connectors";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/dashboard",
      component: Dashboard,
      children: Connectors
    }
  ]
});
