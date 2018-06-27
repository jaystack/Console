import BaseConnector from './BaseConnector'
import DbManager from "../NeDB";
const db = new DbManager();

export default class SlackConnector extends BaseConnector {
  async init(options) {
    await super.init(options, 'http://slack.com/api/');
    this.request('get', 'conversations.list')
      .then(resp => {
        db.dbs.slack.conversations.insert(resp.channels)
          .then(resp => console.log("SLACK CHANNELS", resp))
          .catch(err => console.error(err))
      })
      .catch(err => console.error(err));
  }
}
