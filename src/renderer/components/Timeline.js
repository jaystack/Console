import React from 'react';
import { connect } from 'react-redux';
import { getItems } from '../selectors';
import Item from './Item';

@connect(state => ({ items: getItems(state) }))
export default class extends React.PureComponent {
  state = {
    max: 25
  };

  handleScroll = evt => {
    if (evt.target.scrollTop >= evt.target.scrollHeight - evt.target.offsetHeight - 100) {
      this.setState({ max: this.state.max + 25 });
    }
  };

  render() {
    const { items } = this.props;
    const { max } = this.state;
    return (
      <div className="timeline" onScroll={this.handleScroll}>
        {items.slice(0, max).map(item => <Item key={item.id} item={item} />)}
      </div>
    );
  }
}
