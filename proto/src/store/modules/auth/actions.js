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


  commit(types.LOGIN, 'RandomGeneratedToken');
  Vue.router.push({
    name: 'home',
  });
};

export const login = ({ commit }, data) => {

  commit(types.LOGIN, 'RandomGeneratedToken');
  Vue.router.push({
    name: 'home',
  });

  // Auth.login(data)
  //   .then(response => {
  //     console.log(response);
  //     commit(types.LOGIN, response);
  //     // store.dispatch('account/find');
  //     Vue.router.push({
  //       name: 'home',
  //     });
  //   }).catch((err) => {
  //     console.error(err);
  //   });


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
