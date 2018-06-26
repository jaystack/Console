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
  greeting: 'Hello World'
};

const mockConnector = new _MockConnector2.default({ token: 'shh' }, { account: 'Z' });

const store = new _repatch2.default(initialState).addMiddleware(_repatch.thunk.withExtraArgument({ mockConnector }));

window.store = store;

exports.default = store;