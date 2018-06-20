/* =========
 * Mutations
 * =========
 */

import * as types from "./mutation-types";

export default {
  [types.A_MUTATION](state) {
    state.thing = null;
  }
};
