import BaseConnector from './BaseConnector';
import PromiseThrottle from 'promise-throttle';
import {
  SlackConversationTransformer,
  SlackMessageTransformer,
  SlackUserTransformer
} from '../../utils/SlackTransformers';

const queues = {
  tierOne: new PromiseThrottle({ requestsPerSecond: 1 / 60, promiseImplementation: Promise }),
  tierTwo: new PromiseThrottle({ requestsPerSecond: 20 / 60, promiseImplementation: Promise }),
  tierThree: new PromiseThrottle({ requestsPerSecond: 50 / 60, promiseImplementation: Promise }),
  tierFour: new PromiseThrottle({ requestsPerSecond: 100 / 60, promiseImplementation: Promise })
};

export default class SlackConnector extends BaseConnector {
  static baseUrl = 'http://slack.com/api';

  static async resolveAccountByToken(token) {
    const { team: { id, name: teamName } } = await this.request(token, 'get', 'team.info');
    const { profile: { real_name: username } } = await this.request(token, 'get', 'users.profile.get');
    const { ims } = await this.request(token, 'get', 'im.list');
    const { groups } = await this.request(token, 'get', 'groups.list');
    const { channels } = await this.request(token, 'get', 'channels.list');
    const { members } = await this.request(token, 'get', 'users.list');
    const conversations = [
      ...ims.map(({ id, user: userId }) => ({ type: 'im', id, userId })),
      ...groups.map(({ id, members: userIds }) => ({ type: 'group', id, userIds })),
      ...channels.map(({ id, name }) => ({ type: 'channel', id, name }))
    ];
    const users = members.map(({ id, name }) => ({ id, name }));
    return { id, username, teamName, conversations, users };
  }

  async init(options) {
    await super.init(options);
    const conversations = await this.fetchConversations();
    const users = await this.fetchUsers();
    const messages =
      Array.isArray(options.channels) && options.channels.length ? await this.fetchMessages(options.channels) : [];
    return { conversations, messages, users };
  }

  async fetchConversations() {
    const resp = await this.request(
      'get',
      this.constructor.queryString('conversations.list', {
        types: 'public_channel,private_channel,mpim,im'
      })
    );
    const formatted = resp.channels.map(SlackConversationTransformer);
    await this.db.select('slack.conversations').upsertAll(formatted);
    const res = await this.db.select('slack.conversations').find();
    return res;
  }

  async fetchDataSince(date) {
    const res = await this.db.select('slack.messages').find({
      created: { $gt: date }
    });
    return res.sort((a, b) => a.created > b.created);
  }

  async fetchHistory(conversationId) {
    const lastRecord = await this.db.select('slack.messages').lastRecord();
    if (lastRecord) {
      await this.refreshHistory(conversationId, lastRecord);
    } else {
      const now = new Date();
      const conversation = await this.request(
        'get',
        this.constructor.queryString('conversations.history', {
          channel: conversationId,
          oldest: now.getTime() / 1000 - 24 * 60 * 60 * 31,
          inclusive: true,
          limit: 1000
        })
      );
      await this.insertMessage(conversation.messages, conversationId, SlackMessageTransformer);
    }
    const res = await this.db.select('slack.messages').find();
    return res;
  }

  async fetchMessages(ids) {
    return Promise.all(ids.map(id => queues.tierThree.add(this.fetchHistory.bind(this, id))));
  }

  async fetchUsers() {
    const resp = await this.request('get', 'users.list');
    const formatted = resp.members.map(SlackUserTransformer);
    await this.db.select('slack.users').upsertAll(formatted);
    const res = await this.db.select('slack.users').find();
    return res;
  }

  async insertMessage(docs, conversationId, transformer) {
    await this.db.select('slack.messages').insert(docs.map(el => ({ ...transformer(el), channelId: conversationId })));
  }

  async refreshHistory(conversationId, lastRecord) {
    const conversation = await this.request(
      'get',
      this.constructor.queryString('conversations.history', {
        channel: conversationId,
        oldest: lastRecord.created,
        limit: 1000
      })
    );
    await this.insertMessage(
      conversation.messages.filter(el => el.id !== lastRecord.id),
      conversationId,
      SlackMessageTransformer
    );
  }
}
