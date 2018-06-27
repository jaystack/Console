import BaseConnector from './BaseConnector'

export default class SlackConnector extends BaseConnector {
  constructor(options) {
    super(options, "https://slack.com/api/")
  }
}
