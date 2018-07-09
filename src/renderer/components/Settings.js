import React from 'react';
import { connect } from 'react-redux';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import ProjectSettings from './ProjectSettings';
import { getIsSettingsOpen } from '../selectors';
import { toggleSettings } from '../actions';

@connect(state => ({ open: getIsSettingsOpen(state) }), { toggleSettings })
export default class extends React.PureComponent {
  handleClose = () => {
    this.props.toggleSettings(false);
  };

  render() {
    const { open } = this.props;
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
          <main>
            <ProjectSettings />
          </main>
        </div>
      </Dialog>
    );
  }
}
