import Vue from "vue";
import Router from "vue-router";
import Connectors from "./connectors";

import Home from "../views/Home";
import Dashboard from "../views/Dashboard";
import Login from "../views/Login";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
      meta: {
        auth: true,
      }
    },
    {
      path: "/dashboard",
      component: Dashboard,
      children: Connectors,
      meta: {
        auth: true,
      }
    },
    {
      path: "/login",
      name: "login",
      component: Login,
      meta: {
        guest: true,
      }
    },
  ]
});
