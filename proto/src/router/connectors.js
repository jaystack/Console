// IMPORTS
import DashHome from "../views/Dashboard/DashHome";
import AccountPanel from "../views/Dashboard/DashAccount";
import EmailPanel from "../views/Dashboard/DashEmail";
import SlackPanel from "../views/Dashboard/DashSlack";
import DrivePanel from "../views/Dashboard/DashDrive";
import GitHubPanel from "../views/Dashboard/DashGit";

// EXPORTS
export const dashboard = {
  path: "",
  name: "dashboard",
  component: DashHome,
  meta: { title: "Dashboard" }
};

export const account = {
  path: "account",
  name: "dashboard.account",
  component: AccountPanel,
  meta: { title: "Account" }
};

export const slack = {
  name: "dashboard.slack",
  path: "slack",
  component: SlackPanel,
  meta: { title: "Slack" }
};

export const email = {
  name: "dashboard.email",
  path: "email",
  component: EmailPanel,
  meta: { title: "Email" }
};

export const drive = {
  name: "dashboard.drive",
  path: "drive",
  component: DrivePanel,
  meta: { title: "Drive" }
};

export const github = {
  name: "dashboard.github",
  path: "github",
  component: GitHubPanel,
  meta: { title: "Github" }
};

export default [dashboard, account, slack, email, drive, github];
