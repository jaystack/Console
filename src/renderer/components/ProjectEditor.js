import React from 'react';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ConfirmDialog from './ConfirmDialog';
import { getSelectedProject } from '../selectors';
import { removeProject } from '../actions';

@connect(state => ({ project: getSelectedProject(state) }), { removeProject })
export default class extends React.PureComponent {
  state = {
    isRemoveRequest: false
  };

  handleRemoveProject = () => {
    this.setState({ isRemoveRequest: true });
  };

  handleRemoveDialogCancel = () => {
    this.setState({ isRemoveRequest: false });
  };

  handleRemoveDialogSubmit = () => {
    this.props.removeProject(this.props.project._id);
    this.setState({ isRemoveRequest: false });
  };

  render() {
    const { project } = this.props;
    const { isRemoveRequest } = this.state;
    if (!project) return null;
    return (
      <div className="project-editor">
        <ConfirmDialog
          open={isRemoveRequest}
          text="Are you sure you want to delete this project?"
          onClose={this.handleRemoveDialogCancel}
          onSubmit={this.handleRemoveDialogSubmit}
          confirmButtonLabel="Delete"
        />
        <header>
          <Typography variant="display2" gutterBottom>
            {project.name}
          </Typography>
          <Button variant="contained" color="secondary" onClick={this.handleRemoveProject}>
            Delete
          </Button>
        </header>
      </div>
    );
  }
}
