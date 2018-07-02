import { getConfig, getQuery } from './selectors';
import { MessageResolver } from './utils/SlackResolvers';

export const toggleFetching = isFetching => state => ({ ...state, isFetching });

export const toggleConfig = isConfigOpen => state => ({ ...state, isConfigOpen });

export const init = () => state => async (dispatch, getState, { connectors }) => {
  dispatch(toggleFetching(true));
  await dispatch(readConfig());
  await dispatch(initSources());
  await dispatch(search());
  dispatch(toggleFetching(false));
};

export const readConfig = () => state => async (dispatch, getState, { config, connectors }) => {
  const conf = await config.readConfig();
  dispatch(state => ({ ...state, config: conf }));
  connectors.createBySources(conf.sources);
};

export const updateConfig = nextConfig => state => async (dispatch, getState, { config }) => {
  await config.writeConfig(nextConfig);
};

export const initSources = () => state => async (dispatch, getState, { connectors }) => {
  const { sources } = getConfig(getState());
  await Promise.all(sources.map((sourceConfig, i) => connectors.of(i).init(sourceConfig)));
};

export const search = () => state => async (dispatch, getState, { db }) => {
  const query = getQuery(getState());
  const queryPatterns = query.split(/\s+/g).map(word => new RegExp(word, 'ig'));
  const slackMessages = await db
    .select('slack.messages')
    .find(!query ? {} : { $and: queryPatterns.map(pattern => ({ content: { $regex: pattern } })) }, {
      sort: { created: -1 }
    });
  const slackConversations = await db.select('slack.conversations').find();
  const slackUsers = await db.select('slack.users').find();
  const items = [ ...slackMessages.map(MessageResolver(slackConversations, slackUsers)) ];
  dispatch(state => ({ ...state, items }));
};

export const updateQuery = query => state => ({ ...state, query });
