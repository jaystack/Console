/* ============
 * Getters for the auth module
 * ============
 *
 * The getters that are available on the
 * auth module.
 */

export default {
  getAuth: (state) => {
    return state.authenticated;
  }
};
