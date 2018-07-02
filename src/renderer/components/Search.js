import React from 'react';
import { connect } from 'react-redux';
import Input from '@material-ui/core/Input';
import { getQuery } from '../selectors';
import { updateQuery, search } from '../actions';

@connect(state => ({ query: getQuery(state) }), { updateQuery, search })
export default class extends React.PureComponent {
  timer = null;

  handleChange = evt => {
    this.props.updateQuery(evt.target.value);
    if (this.timer) clearTimeout(this.timer);
    this.timer = setTimeout(() => this.props.search(), 300);
  };

  render() {
    const { query } = this.props;
    return (
      <div className="search">
        <Input placeholder="Search..." inputProps={{ value: query, onChange: this.handleChange }} />
      </div>
    );
  }
}
