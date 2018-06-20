// IMPORTS
import DashHome from "./views/Dashbaord/DashHome";
import EmailPanel from "./views/Dashbaord/DashEmail";
import SlackPanel from "./views/Dashbaord/DashSlack";

// EXPORTS
export const dashboard = {
  path: "",
  name: "dashboard",
  component: DashHome
};

export const slack = {
  name: "dashboard.slack",
  path: "slack",
  component: SlackPanel
};

export const email = {
  name: "dashboard.email",
  path: "email",
  component: EmailPanel
};

export default [dashboard, slack, email];
