'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
let MockConnector = class MockConnector {
  constructor(credentials, options) {
    this.credentials = credentials;
    this.options = options;
  }

  fetchDataSince(date) {
    setTimeout(() => alert('fetched'), 1000);
  }
};
exports.default = MockConnector;