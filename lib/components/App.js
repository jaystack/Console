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

let _default = (_dec = (0, _reactRedux.connect)(state => ({ options: (0, _selectors.getOptions)(state) }), { readConfig: _actions.readConfig, updateOptions: _actions.updateOptions }), _dec(_class = class _default extends _react2.default.PureComponent {
  constructor(...args) {
    var _temp;

    return _temp = super(...args), this.state = {
      options: JSON.stringify(this.props.options, null, 2)
    }, this.handleChange = evt => {
      this.setState({ options: evt.target.value });
    }, this.handleSave = () => {
      this.props.updateOptions(JSON.parse(this.state.options));
    }, _temp;
  }

  async componentDidMount() {
    await this.props.readConfig();
  }

  render() {
    const { options } = this.state;
    return _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement(
        'button',
        { onClick: this.handleSave },
        'Save'
      ),
      _react2.default.createElement('textarea', { value: options, onChange: this.handleChange, style: { width: '100%', height: '300px' } })
    );
  }
}) || _class);

exports.default = _default;