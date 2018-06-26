'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _dec, _class;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _selectors = require('../selectors');

var _actions = require('../actions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let _default = (_dec = (0, _reactRedux.connect)(state => ({ greeting: (0, _selectors.getGreeting)(state) }), { increaseDots: _actions.increaseDots, fetchDataViaMockConnector: _actions.fetchDataViaMockConnector }), _dec(_class = class _default extends _react2.default.PureComponent {
  constructor(...args) {
    var _temp;

    return _temp = super(...args), this.handleMoreDotClick = () => {
      this.props.increaseDots();
    }, this.handleAsyncStuffClick = () => {
      this.props.fetchDataViaMockConnector(Date.parse('2018-01-01T00:00:00.000Z'));
    }, _temp;
  }

  render() {
    const { greeting } = this.props;
    return _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement(
        'h1',
        null,
        greeting
      ),
      _react2.default.createElement(
        'button',
        { onClick: this.handleMoreDotClick },
        'More dot'
      ),
      _react2.default.createElement(
        'button',
        { onClick: this.handleAsyncStuffClick },
        'Some async stuff'
      )
    );
  }
}) || _class);

exports.default = _default;