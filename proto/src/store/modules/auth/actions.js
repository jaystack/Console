/* ============
 * Actions for the auth module
 * ============
 *
 * The actions that are available on the
 * auth module.
 */

import Vue from 'vue';
import store from '@/store';
import * as types from './mutation-types';
import AuthProxy from '@/proxies/AuthProxy';

const Auth = new AuthProxy();

export const check = ({ commit }) => {
  commit(types.CHECK);
};

export const register = ({ commit }) => {
  /*
   * Normally you would use a proxy to register the user:
   *
   * new Proxy()
   *  .register(payload)
   *  .then((response) => {
   *    commit(types.REGISTER, response);
   *  })
   *  .catch(() => {
   *    console.log('Request failed...');
   *  });
   */


  commit(types.LOGIN, 'RandomGeneratedToken');
  Vue.router.push({
    name: 'home',
  });
};

export const login = ({ commit }, data) => {


  Auth.login(data)
    .then(response => {
      console.log(response);
      commit(types.LOGIN, response);
      // store.dispatch('account/find');
      Vue.router.push({
        name: 'home',
      });
    }).catch((err) => {
      console.error(err);
      // Error.store({
      //   id: 'login',
      //   errors: err.errors,
      // });
    });


};

export const logout = ({ commit }) => {
  commit(types.LOGOUT);
  Vue.router.push({
    name: 'login.index',
  });
};

export default {
  check,
  register,
  login,
  logout,
};
