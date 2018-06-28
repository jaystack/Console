import BaseConnector from './BaseConnector';
import DbManager from '../NeDB';
import {
  SlackConversationTransformer,
  SlackMessageTransformer
} from '../../transformers/SlackTransformers';

const db = new DbManager();

export default class SlackConnector extends BaseConnector {
  async init(options) {
    await super.init(options, 'http://slack.com/api/');
    const conversations = await this.fetchConversations();
    const conversation = await this.fetchHistory('C82QNUFPD');
    console.log(conversation);
    return { conversations };
  }

  async fetchConversations() {
    const resp = await this.request('get', 'conversations.list');
    await db.select('slack.conversations')
      .upsertAll(resp.channels.map(SlackConversationTransformer));
    const res = await db.select('slack.conversations').find();
    return res;
  }

  async fetchHistory(conversationId) {
    const conversation = await this.request('get', this.queryString(
      'conversations.history', {
        channel: conversationId,
        inclusive: true
      })
    );
    await db.select('slack.messages').upsertAll(
      conversation.messages.map(
        el => Object.assign( SlackMessageTransformer(el), { channel_id: conversationId })
      )
    );
    const res = await db.select('slack.messages').find();
    return res;
  }

  async fetchDataSince(date) {
    const res = await db.select('slack.messages').find({
      created: { $gt: date}
    });
    return res.sort((a,b) => a.created > b.created);
  }
}
