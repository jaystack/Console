import React from 'react';
import { connect } from 'react-redux';
import { getConfig } from '../selectors';
import { updateConfig } from '../actions';

@connect(state => ({ config: getConfig(state) }), { updateConfig })
export default class extends React.PureComponent {
  state = {
    config: this.getConfig(this.props)
  };

  async componentWillReceiveProps(nextProps) {
    if (nextProps.config !== this.props.config) this.setState({ config: this.getConfig(nextProps) });
  }

  getConfig(props) {
    return props.config ? JSON.stringify(props.config, null, 2) : '';
  }

  handleChange = evt => {
    this.setState({ config: evt.target.value });
  };

  handleSave = () => {
    this.props.updateConfig(JSON.parse(this.state.config));
  };

  render() {
    const { config } = this.state;
    return (
      <div>
        <textarea value={config} onChange={this.handleChange} style={{ width: '100%', height: '300px' }} />
        <button onClick={this.handleSave}>Save</button>
      </div>
    );
  }
}
