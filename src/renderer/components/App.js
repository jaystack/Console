import React from 'react';
import { connect } from 'react-redux';
import { init } from '../actions';
import Config from './Config';
import Search from './Search';
import Timeline from './Timeline';

@connect(null, { init })
export default class extends React.PureComponent {
  async componentDidMount() {
    await this.props.init();
  }

  render() {
    return (
      <div>
        <Search />
        <Config />
        <Timeline />
      </div>
    );
  }
}
