import Axios from './axios';
import Router from './router';
import Vue from 'vue';

export default () => {
  Vue.appEnv = {
    API_LOCATION: "http://localhost:3000/api/v1/"
  };
  Axios();
}
