/* =======
 * Actions
 * =======
 */

import * as types from "./mutation-types";

export const anAction = ({ commit }) => {
  commit(types.A_MUTATION);
};

export default {
  anAction
};
