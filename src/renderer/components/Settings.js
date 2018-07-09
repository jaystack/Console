import React from 'react';
import { connect } from 'react-redux';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import ListIcon from '@material-ui/icons/List';
import PeopleIcon from '@material-ui/icons/People';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { withStyles } from '@material-ui/core/styles';
import ProjectSettings from './ProjectSettings';
import { getIsSettingsOpen } from '../selectors';
import { toggleSettings } from '../actions';

@withStyles(theme => ({
  menuItem: {
    '&:focus': {
      backgroundColor: theme.palette.primary.main,
      '& $primary, & $icon': {
        color: theme.palette.common.white
      }
    }
  },
  primary: {},
  icon: {}
}))
@connect(state => ({ open: getIsSettingsOpen(state) }), { toggleSettings })
export default class extends React.PureComponent {
  handleClose = () => {
    this.props.toggleSettings(false);
  };

  render() {
    const { open, classes } = this.props;
    return (
      <Dialog fullScreen open={open}>
        <div className="settings">
          <AppBar style={{ position: 'relative', flex: '0 0 auto' }}>
            <Toolbar>
              <Typography variant="title" color="inherit" style={{ flex: 1, marginLeft: '20px' }}>
                Settings
              </Typography>
              <IconButton color="inherit" onClick={this.handleClose} aria-label="Close">
                <CloseIcon />
              </IconButton>
            </Toolbar>
          </AppBar>
          <div className="content">
            <nav>
              <MenuList>
                <MenuItem className={classes.menuItem}>
                  <ListItemIcon className={classes.icon}>
                    <PeopleIcon />
                  </ListItemIcon>
                  <ListItemText classes={{ primary: classes.primary }} inset primary="Accounts" />
                </MenuItem>
                <MenuItem className={classes.menuItem}>
                  <ListItemIcon className={classes.icon}>
                    <ListIcon />
                  </ListItemIcon>
                  <ListItemText classes={{ primary: classes.primary }} inset primary="Projects" />
                </MenuItem>
              </MenuList>
            </nav>
            <main>
              <ProjectSettings />
            </main>
          </div>
        </div>
      </Dialog>
    );
  }
}
