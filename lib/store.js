'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _repatch = require('repatch');

var _repatch2 = _interopRequireDefault(_repatch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const initialState = {
  greeting: 'Hello World'
};

const store = new _repatch2.default(initialState).addMiddleware(_repatch.thunk.withExtraArgument({}));

window.store = store;

exports.default = store;