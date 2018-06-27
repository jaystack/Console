export default class BaseConnector {
  async init(options) {
    this.options = options;
    // do some init method
  }

  async fetchDataSince(date) {
    // do some data fetch
  }
}
