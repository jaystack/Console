export const init = () => state => async (dispatch, getState, { connectors }) => {
  await dispatch(readConfig()); // first reading the config
  await dispatch(initConnectors()); // connector initialisation
  await dispatch(ensureData()); // ensuring the data
  await dispatch(search()); // init search without query (empty string), which ensures the timeline data
  // after the init search we have a non-empty items array in the store and we can now render it
};

export const readConfig = () => state => async (dispatch, getState, { config }) => {
  const conf = await config.readConfig();
  dispatch(state => ({ ...state, config: conf }));
};

export const updateConfig = nextConfig => state => async (dispatch, getState, { config }) => {
  await config.writeConfig(nextConfig);
};

export const initConnectors = () => state => async (dispatch, getState, { connectors }) => {
  const config = getState().config;
  const slackConfig = config.sources.find(subConfig => subConfig.type === 'slack');
  const githubConfig = config.sources.find(subConfig => subConfig.type === 'github');
  await connectors.slack.init(slackConfig);
  await connectors.github.init(githubConfig);
  // same do on the other connectors
};

export const ensureData = () => state => async (dispatch, getState, { connectors, db }) => {
  // check the db for existing data or fetch if necessary and put it into the db
};

export const search = () => state => async (dispatch, getState, { db }) => {
  const query = getState().query;
  const items = []; // search by the query and collect the results into the items array
  dispatch(state => ({ ...state, items }));
};
