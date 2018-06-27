import React from 'react';
import { connect } from 'react-redux';
import { init } from '../actions';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
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
        <AppBar position="static" color="default">
          <Toolbar>
            <Typography variant="title" color="inherit">
              Console_
            </Typography>
            <Search />
          </Toolbar>
        </AppBar>
        <Config />
        <Timeline />
      </div>
    );
  }
}
