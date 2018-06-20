/* =========
 * Mutations
 * =========
 */

import * as types from "./mutation-types";

export default {
  [types.CLEAR_FILTERS](state) {
    state.filterSelections = {
      project: null,
      client: null,
      contact: null
    };
  },
  [types.UPDATE_FILTER](state, payload) {
    state.filterSelections[payload.filter] = payload.value;
  },
  [types.SET_SEARCH](state, search) {
    state.search = search;
  }
};
