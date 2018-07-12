import React from 'react';
import { connect } from 'react-redux';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Menu from './Menu';
import ProjectSettings from './ProjectSettings';
import AccountSettings from './AccountSettings';
import { getIsSettingsOpen, getActiveSettingsMenuItem } from '../selectors';
import { toggleSettings } from '../actions';

@connect(state => ({ open: getIsSettingsOpen(state), activeSettingsMenuItem: getActiveSettingsMenuItem(state) }), {
  toggleSettings
})
export default class extends React.PureComponent {
  handleClose = () => {
    this.props.toggleSettings(false);
  };

  handleMenuClick = id => this.props.toggleSettings(id);

  render() {
    const { open, activeSettingsMenuItem } = this.props;
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
              <Menu
                selected={[ activeSettingsMenuItem ]}
                onItemClick={this.handleMenuClick}
                items={[
                  { id: 'accounts', icon: 'people', label: 'Accounts' },
                  { id: 'projects', icon: 'list', label: 'Projects' }
                ]}
              />
            </nav>
            <main>
              {activeSettingsMenuItem === 'projects' && <ProjectSettings />}
              {activeSettingsMenuItem === 'accounts' && <AccountSettings />}
            </main>
          </div>
        </div>
      </Dialog>
    );
  }
}
