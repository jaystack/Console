'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _repatch = require('repatch');

var _repatch2 = _interopRequireDefault(_repatch);

var _MockConnector = require('./side-effects/MockConnector');

var _MockConnector2 = _interopRequireDefault(_MockConnector);

var _config = require('./side-effects/config');

var config = _interopRequireWildcard(_config);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const initialState = {
  greeting: 'Hello World',
  options: [{
    type: 'slack',
    credentials: {},
    account: {},
    channels: [{ name: 'console' }]
  }, {
    type: 'github',
    credentials: {},
    account: {},
    repos: [{ name: 'Console' }]
  }]
};

const mockConnector = new _MockConnector2.default();

const store = new _repatch2.default(initialState).addMiddleware(_repatch.thunk.withExtraArgument({ mockConnector, config }));

window.store = store;

exports.default = store;