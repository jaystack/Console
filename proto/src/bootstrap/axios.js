import Vue from 'vue';
import Axios from 'axios';
import store from '@/store';

export default () => {

  Axios.defaults.baseURL = Vue.appEnv.API_LOCATION;
  console.log(Vue.appEnv.API_LOCATION);
  Axios.defaults.headers.common.Accept = 'application/json';
  Axios.interceptors.response.use(
    response => response,
    (error) => {
      if (error.response.status === 401) {
        store.dispatch('auth/logout');
      }

      return Promise.reject(error);
    });

// Bind Axios to Vue.
  Vue.$http = Axios;
  window.$http = Vue.$http;
  Object.defineProperty(Vue.prototype, '$http', {
    get() {
      return Axios;
    },
  });

}
