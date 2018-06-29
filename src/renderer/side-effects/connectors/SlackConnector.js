import BaseConnector from './BaseConnector';
import PromiseThrottle from 'promise-throttle';
import DbManager from '../NeDB';
import {
  SlackConversationTransformer,
  SlackMessageTransformer
} from '../../transformers/SlackTransformers';

const db = new DbManager();
const queues = {
  tierOne: new PromiseThrottle({ requestsPerSecond: 1 / 60, promiseImplementation: Promise}),
  tierTwo: new PromiseThrottle({ requestsPerSecond: 20 / 60, promiseImplementation: Promise}),
  tierThree: new PromiseThrottle({ requestsPerSecond: 50 / 60, promiseImplementation: Promise}),
  tierFour: new PromiseThrottle({ requestsPerSecond: 100 / 60, promiseImplementation: Promise}),
};

export default class SlackConnector extends BaseConnector {
  async init(options) {
    console.log(options)
    await super.init(options, 'http://slack.com/api/', true);
    const conversations = await this.fetchConversations();
    const messages = options.channels ? await this.fetchMessages(options.channels) : [];
    return { conversations, messages };
  }

  async fetchConversations() {
    const resp = await this.request('get', this.queryString('conversations.list',{
      types: 'public_channel,private_channel,mpim,im',
    }));
    const formatted = resp.channels.map(SlackConversationTransformer);
    await db.select('slack.conversations').upsertAll(formatted);
    const res = await db.select('slack.conversations').find();
    return res;
  }

  async fetchMessages(ids) {
    return Promise.all(ids.map(id =>
      queues.tierThree.add(
        this.fetchHistory.bind(this,id)
      ))
    );
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
      await this.insertMessage(conversation.messages, conversationId, SlackMessageTransformer);
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
