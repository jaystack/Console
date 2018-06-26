export const readConfig = () => state => async (dispatch, getState, { config }) => {
  const conf = await config.readConfig();
  console.log(conf);
};

export const updateOptions = options => state => ({ ...state, options });

export const initMockConnector = (credentials, options) => state => (dispatch, getState, { mockConnector }) => {
  mockConnector.init(credentials, options);
};
