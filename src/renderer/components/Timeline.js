import React from 'react';
import { connect } from 'react-redux';
import { getItems } from '../selectors';
import SlackMessage from './SlackMessage';

const MAX = 25;

@connect(state => ({ items: getItems(state) }))
export default class extends React.PureComponent {
  state = {
    max: MAX
  };

  handleScroll = evt => {
    if (evt.target.scrollTop >= evt.target.scrollHeight - evt.target.offsetHeight - 100) {
      this.setState({ max: this.state.max + MAX });
    }
  };

  render() {
    const { items } = this.props;
    const { max } = this.state;
    return (
      <div className="timeline" onScroll={this.handleScroll}>
        {items.slice(0, max).map(renderItem)}
      </div>
    );
  }
}

const renderItem = item => {
  switch (item.type) {
    case 'slack':
      return <SlackMessage key={item.id} item={item} />;
    default:
      return null;
  }
};
