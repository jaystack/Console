import BaseConnector from './BaseConnector';
import DbManager from '../NeDB';
import { SlackConversationTransformer } from '../../transformers/SlackTransformers';

const db = new DbManager();

export default class SlackConnector extends BaseConnector {
  async init(options) {
    await super.init(options, 'http://slack.com/api/');
    this.fetchConversations();
  }

  fetchConversations() {
    this.request('get', 'conversations.list')
      .then((resp) => {
        db.select('slack.conversations').upsertAll(resp.channels.map(SlackConversationTransformer))
          .then(() => db.select('slack.conversations').find()
            .then(res => console.log('SLACK CHANNELS TOTAL', res))
            .catch(err => console.error(err)))
          .catch(err => console.error(err));
      })
      .catch(err => console.error(err));
  }
}
