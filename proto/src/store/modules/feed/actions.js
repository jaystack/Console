/* =======
 * Actions
 * =======
 */

import * as types from "./mutation-types";

export const clearFilters = ({ commit }) => {
  commit(types.CLEAR_FILTERS);
};

export const updateFilter = ({ commit }, payload) => {
  commit(types.UPDATE_FILTER, payload);
};

export default {
  clearFilters,
  updateFilter
};
