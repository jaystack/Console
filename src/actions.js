export const updateOptions = options => state => ({ ...state, options });

export const initMockConnector = (credentials, options) => state => (dispatch, getState, { mockConnector }) => {
  mockConnector.init(credentials, options);
};
