export default class MockConnector {
  init(credentials, options) {
    this.credentials = credentials;
    this.options = options;
  }

  fetchDataSince(date) {
    setTimeout(() => alert('fetched'), 1000);
  }
}
