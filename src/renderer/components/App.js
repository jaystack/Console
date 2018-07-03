import React from 'react';
import { connect } from 'react-redux';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MoreVert from '@material-ui/icons/MoreVert';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Settings from './Settings';
import Search from './Search';
import Timeline from './Timeline';
import Spinner from './Spinner';
import { getIsFetching } from '../selectors';
import { init, toggleSettings } from '../actions';

@connect(state => ({ ...state, isFetching: getIsFetching(state) }), { init, toggleSettings })
export default class extends React.PureComponent {
  state = {
    anchorEl: null
  };

  async componentDidMount() {
    await this.props.init();
  }

  toggleMenu = on => event => {
    this.setState({ anchorEl: on ? event.currentTarget : null });
  };

  handleMenuItem = () => {
    this.props.toggleSettings(true);
    this.toggleMenu(false)();
  };

  render() {
    const { isFetching } = this.props;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);

    return (
      <div className="app">
        <AppBar position="static" color="default">
          <Toolbar>
            <Typography variant="title" color="inherit">
              Console_
            </Typography>
            <Search />
            <div>
              <IconButton
                aria-owns={open ? 'menu-appbar' : null}
                aria-haspopup="true"
                onClick={this.toggleMenu(true)}
                color="inherit"
              >
                <MoreVert />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right'
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right'
                }}
                open={open}
                onClose={this.toggleMenu(false)}
              >
                <MenuItem onClick={this.handleMenuItem}>Settings</MenuItem>
              </Menu>
            </div>
          </Toolbar>
        </AppBar>
        <main>
          {isFetching && <Spinner />}
          <Settings />
          {!isFetching && <Timeline />}
        </main>
      </div>
    );
  }
}
