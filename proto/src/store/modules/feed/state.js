/* =====
 * State
 * =====
 */

export default {
  filters: {
    project: ["Project One", "Project Two", "Project Three"],
    client: ["Client One", "Client Two", "Client Three"],
    contact: ["Contact One", "Contact Two", "Contact Three"]
  },
  filterSelections: {
    project: null,
    client: null,
    contact: null
  },
  includes: ["slack", "email", "drive", "github"],
  search: null
};
