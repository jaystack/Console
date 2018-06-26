import BaseConnector from "./BaseConnector";

export default class SlackConnector extends BaseConnector {

  constructor(credentials, options = {}) {
    super(credentials, "https://slack.com/api/", options);
  }
};
