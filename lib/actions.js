"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

const updateOptions = exports.updateOptions = options => state => _extends({}, state, { options });

const initMockConnector = exports.initMockConnector = (credentials, options) => state => (dispatch, getState, { mockConnector }) => {
  mockConnector.init(credentials, options);
};