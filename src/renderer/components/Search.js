import React from 'react';
import { connect } from 'react-redux';
import { getQuery } from '../selectors';
import { updateQuery } from '../actions';

@connect(state => ({ query: getQuery(state) }), { updateQuery })
export default class extends React.PureComponent {
  handleChange = evt => {
    this.props.updateQuery(evt.target.value);
  };

  render() {
    const { query } = this.props;
    return (
      <div>
        <input placeholder="query" value={query} onChange={this.handleChange} />
      </div>
    );
  }
}
