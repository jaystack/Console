import Vue from "vue";
import Router from "vue-router";
import Connectors from "./connectors";

import Home from "../views/Home";
import Dashboard from "../views/Dashboard";

Vue.use(Router);

export default new Router({
  mode: "history",
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
