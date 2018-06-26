import React from 'react';
import { connect } from 'react-redux';
import { getGreeting } from '../selectors';
import { increaseDots } from '../actions';

@connect(state => ({ greeting: getGreeting(state) }), { increaseDots })
export default class extends React.PureComponent {
  handleClick = () => {
    this.props.increaseDots();
  };

  render() {
    const { greeting } = this.props;
    return <div><h1>{greeting}</h1><button onClick={this.handleClick}>More dot</button></div>;
  }
}
