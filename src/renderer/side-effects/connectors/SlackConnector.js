import BaseConnector from './BaseConnector';
import DbManager from '../NeDB';
import { SlackConversationTransformer } from '../../transformers/SlackTransformers';

const db = new DbManager();

export default class SlackConnector extends BaseConnector {
  async init(options) {
    await super.init(options, 'http://slack.com/api/');
    const conversations = this.fetchConversations();
    return { conversations };
  }

  async fetchConversations() {
    const resp = await this.request('get', 'conversations.list');
    await db.select('slack.conversations').upsertAll(resp.channels.map(SlackConversationTransformer));
    const res = await db.select('slack.conversations').find();
    console.log('SLACK CHANNELS TOTAL', res);
    return res;
  }
}
