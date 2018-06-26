export default class MockConnector {
  constructor(credentials, options) {
    this.credentials = credentials;
    this.options = options;
  }

  fetchDataSince(date) {
    setTimeout(() => alert('fetched'), 1000);
  }
}
