// IMPORTS
import DashHome from "./views/Dashboard/DashHome";
import EmailPanel from "./views/Dashboard/DashEmail";
import SlackPanel from "./views/Dashboard/DashSlack";
import DrivePanel from "./views/Dashboard/DashDrive";
import GitHubPanel from "./views/Dashboard/DashGit";

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

export const drive = {
  name: "dashboard.drive",
  path: "drive",
  component: DrivePanel
};

export const github = {
  name: "dashboard.github",
  path: "github",
  component: GitHubPanel
};

export default [dashboard, slack, email, drive, github];
