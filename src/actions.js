export const increaseDots = () => state => ({ greeting: state.greeting + '.' });

export const fetchDataViaMockConnector = date => state => (dispatch, getState, { mockConnector }) => {
  mockConnector.fetchDataSince(date);
};
