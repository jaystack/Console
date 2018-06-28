import React from 'react';
import { connect } from 'react-redux';
import { getItems } from '../selectors';
import Item from './Item';

@connect(state => ({ items: getItems(state) }))
export default class extends React.PureComponent {
  render() {
    const { items } = this.props;
    return <div>{items.map(item => <Item />)}</div>;
  }
}
