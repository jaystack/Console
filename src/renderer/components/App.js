import React from 'react';
import { connect } from 'react-redux';
import { getOptions } from '../selectors';
import { updateOptions, readConfig } from '../actions';

@connect(state => ({ options: getOptions(state) }), { readConfig, updateOptions })
export default class extends React.PureComponent {
  state = {
    options: JSON.stringify(this.props.options, null, 2)
  };

  async componentDidMount() {
    await this.props.readConfig();
  }

  handleChange = evt => {
    this.setState({ options: evt.target.value });
  };

  handleSave = () => {
    this.props.updateOptions(JSON.parse(this.state.options));
  };

  render() {
    const { options } = this.state;
    return (
      <div>
        <button onClick={this.handleSave}>Save</button>
        <textarea value={options} onChange={this.handleChange} style={{ width: '100%', height: '300px' }} />
      </div>
    );
  }
}
