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
    const messages = await this.fetchMessages(conversations.map(el => el.id));
    return { conversations, messages };
  }

  async fetchConversations() {
    const resp = await this.request('get', 'conversations.list');
    const formatted = resp.channels.map(SlackConversationTransformer);
    await db.select('slack.conversations').upsertAll(formatted);
    const res = await db.select('slack.conversations').find();
    return res;
  }

  async fetchMessages(ids) {
    let messages = [];
    ids.forEach(id => messages.push(this.fetchHistory(id))); // Grab the messages
    return Promise.all(messages);
  }

  async fetchHistory(conversationId) {
    const now = new Date();
    const conversation = await this.request('get', this.queryString(
      'conversations.history', {
        channel: conversationId,
        from: new Date(now.getTime() - (24*60*60*1000) * 31).getTime(),
        to: now.getTime(),
        inclusive: true,
        limit: 1000,
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
