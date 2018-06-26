'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _repatch = require('repatch');

var _repatch2 = _interopRequireDefault(_repatch);

var _MockConnector = require('./side-effects/MockConnector');

var _MockConnector2 = _interopRequireDefault(_MockConnector);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const initialState = {
  greeting: 'Hello World',
  options: {
    slack: {
      account: {},
      channels: [{ name: 'console' }]
    },
    github: {
      account: {},
      repos: [{ name: 'Console' }]
    }
  }
};

const mockConnector = new _MockConnector2.default();

const store = new _repatch2.default(initialState).addMiddleware(_repatch.thunk.withExtraArgument({ mockConnector }));

window.store = store;

exports.default = store;