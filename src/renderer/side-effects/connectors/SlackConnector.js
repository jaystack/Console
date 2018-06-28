import BaseConnector from './BaseConnector';
import Axios from 'axios';
import DbManager from '../NeDB';
import {
  SlackConversationTransformer,
  SlackMessageTransformer
} from '../../transformers/SlackTransformers';

const db = new DbManager();

export default class SlackConnector extends BaseConnector {
  async init(options) {
    await super.init(options, 'http://slack.com/api/', true);
    const conversations = await this.fetchConversations();
    const messages = await this.fetchMessages(conversations.map(el => el.id));
    return { conversations, messages };
  }

  async fetchConversations() {
    const resp = await this.request('get', this.queryString('conversations.list',{
      types: 'public_channel,im',
    }));
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
    const lastRecord = await db.select('slack.messages').lastRecord();
    if (lastRecord) {
      await this.refreshHistory(conversationId, lastRecord);
    } else {
      const now = new Date();
      const conversation = await this.request('get', this.queryString(
        'conversations.history', {
          channel: conversationId,
          oldest: (now.getTime() / 1000) - (24 * 60 * 60 * 1000 * 31),
          inclusive: true,
          limit: 1000,
        })
      );
      await db.select('slack.messages').insert(
        conversation.messages.map(
          el => Object.assign(SlackMessageTransformer(el), {channel_id: conversationId})
        )
      );
    }
    const res = await db.select('slack.messages').find();
    return res;
  }

  async refreshHistory(conversationId, lastRecord) {
    const conversation = await this.request('get', this.queryString(
      'conversations.history', {
        channel: conversationId,
        oldest: lastRecord.created,
        inclusive: false,
        limit: 1000,
      })
    );
    if (conversation.messages.length) conversation.messages.map(SlackMessageTransformer)
    await this.insertMessage(conversation.messages, conversationId, SlackMessageTransformer);
  }

  async insertMessage(docs, conversationId, transformer) {
    await db.select('slack.messages').insert(
      docs.map(
        el => Object.assign(transformer(el), {channel_id: conversationId})
      )
    );
  }

  async fetchDataSince(date) {
    const res = await db.select('slack.messages').find({
      created: { $gt: date}
    });
    return res.sort((a,b) => a.created > b.created);
  }
}
