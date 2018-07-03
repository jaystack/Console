import { MessageResolver } from './SlackResolvers';

const WHITESPACES = /\s+/g;
const MENTION = /$@.+/g;

export default async (query, db) => {
  const slackMessages = await searchInSlack(query, db);
  return [ ...slackMessages ];
};

export const searchInSlack = async (query, db) => {
  const keywords = query.split(WHITESPACES);
  const regularKeywords = keywords.filter(keyword => !MENTION.test(keyword));
  //const mentionKeywords = keywords.filter(keyword => MENTION.test(keyword)).map(keyword => keyword.replace(/@/g, ''));
  const conversations = await db.select('slack.conversations').find();
  const users = await db.select('slack.users').find();
  const queryPatterns = regularKeywords.map(word => new RegExp(word, 'ig'));
  const messages = await db
    .select('slack.messages')
    .find(!query ? {} : { $and: queryPatterns.map(pattern => ({ content: { $regex: pattern } })) }, {
      sort: { created: -1 }
    });
  return messages.map(MessageResolver(conversations, users));
};
