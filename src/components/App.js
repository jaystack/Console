import React from 'react';
import { connect } from 'react-redux';
import { getGreeting } from '../selectors';
import { increaseDots, fetchDataViaMockConnector } from '../actions';

@connect(state => ({ greeting: getGreeting(state) }), { increaseDots, fetchDataViaMockConnector })
export default class extends React.PureComponent {
  handleMoreDotClick = () => {
    this.props.increaseDots();
  };

  handleAsyncStuffClick = () => {
    this.props.fetchDataViaMockConnector(Date.parse('2018-01-01T00:00:00.000Z'));
  };

  render() {
    const { greeting } = this.props;
    return (
      <div>
        <h1>{greeting}</h1>
        <button onClick={this.handleMoreDotClick}>More dot</button>
        <button onClick={this.handleAsyncStuffClick}>Some async stuff</button>
      </div>
    );
  }
}
