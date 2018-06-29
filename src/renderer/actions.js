import { getConfig, getQuery } from './selectors';

export const init = () => state => async (dispatch, getState, { connectors }) => {
  await dispatch(readConfig());
  await dispatch(initSources());
  await dispatch(search());
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
  const items = []; // search by the query and collect the results into the items array
  dispatch(state => ({ ...state, items }));
};

export const updateQuery = query => state => ({ ...state, query });
