export const readConfig = () => state => async (dispatch, getState, { config }) => {
  const conf = await config.readConfig();
  dispatch(state => ({ ...state, config: conf }));
};

export const updateConfig = nextConfig => state => async (dispatch, getState, { config }) => {
  await config.writeConfig(nextConfig);
};

export const initMockConnector = (credentials, options) => state => (dispatch, getState, { mockConnector }) => {
  mockConnector.init(credentials, options);
};
