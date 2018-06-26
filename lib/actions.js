'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
const increaseDots = exports.increaseDots = () => state => ({ greeting: state.greeting + '.' });

const fetchDataViaMockConnector = exports.fetchDataViaMockConnector = date => state => (dispatch, getState, { mockConnector }) => {
  mockConnector.fetchDataSince(date);
};