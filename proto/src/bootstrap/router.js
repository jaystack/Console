import Vue from "vue";
import router from "../router";
import store from "../store";

router.beforeEach((to, from, next) => {

  document.title = `Console${to.meta.title ? ` - ${to.meta.title}` : ""}`;
  if (to.matched.some(m => m.meta.auth) && !store.state.auth.authenticated) {
    /*
     * If the user is not authenticated and visits
     * a page that requires authentication, redirect to the login page
     */
    next({
      name: 'login',
    });
  } else if (to.matched.some(m => m.meta.guest) && store.state.auth.authenticated) {
    /*
     * If the user is authenticated and visits
     * an guest page, redirect to the dashboard page
     */
    next({
      name: 'home',
    });
  } else {
    next();
  }
});

Vue.router = router;
