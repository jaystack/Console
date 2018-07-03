import React from 'react';
import { connect } from 'react-redux';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import ProjectList from './ProjectList';
import RapidProjectCreator from './RapidProjectCreator';
import ProjectEditor from './ProjectEditor';
import { getProjects, getIsSettingsOpen } from '../selectors';
import { toggleSettings } from '../actions';

@connect(state => ({ projects: getProjects(state), open: getIsSettingsOpen(state) }), { toggleSettings })
export default class extends React.PureComponent {
  state = {
    projects: this.props.projects
  };

  async componentDidUpdate(prevProps) {
    if (prevProps.projects !== this.props.projects) this.setState({ projects: this.props.projects });
  }

  handleClose = () => {
    this.props.toggleSettings(false);
  };

  renderContent() {
    return (
      <main>
        <ProjectList />
        <ProjectEditor />
      </main>
    );
  }

  renderEmptyContent() {
    return (
      <main>
        <div className="empty-content">
          <Typography variant="subheading" gutterBottom align="center">
            You have no projects.
          </Typography>
          <RapidProjectCreator buttonLabel="Create your first project" buttonSize="large" />
        </div>
      </main>
    );
  }

  render() {
    const { open, projects } = this.props;
    return (
      <Dialog fullScreen open={open} onClose={this.handleClose}>
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
          {projects.length > 0 ? this.renderContent() : this.renderEmptyContent()}
        </div>
      </Dialog>
    );
  }
}