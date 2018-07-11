import React from 'react';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import ConfirmDialog from './ConfirmDialog';
import AddSourceDialog from './AddSourceDialog';
import { getSelectedProject } from '../selectors';
import { removeProject, renameProject } from '../actions';

@connect(state => ({ project: getSelectedProject(state) }), { removeProject, renameProject })
export default class extends React.PureComponent {
  state = {
    isRemoveRequest: false,
    newName: null,
    isOpenAddSourceDialog: false
  };

  async componentDidUpdate(prevProps) {
    if (prevProps.project !== this.props.project) this.cancelRename();
  }

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

  handleTitleClick = () => {
    this.setState({ newName: this.props.project.name });
  };

  handleRenameInputChange = evt => {
    this.setState({ newName: evt.target.value });
  };

  handleRenameInputBlur = () => {
    this.confirmRename();
  };

  handleRenameInputKeyPress = evt => {
    if (evt.key === 'Enter') this.confirmRename();
    if (evt.key === 'Escape') this.cancelRename();
  };

  confirmRename() {
    if (!this.state.newName) return;
    this.props.renameProject(this.props.project._id, this.state.newName);
  }

  cancelRename() {
    this.setState({ newName: null });
  }

  handleAddSource = () => {
    this.setState({ isOpenAddSourceDialog: true });
  };

  handleAddSourceDialogClose = () => {
    this.setState({ isOpenAddSourceDialog: false });
  };

  renderTitle() {
    const { project: { name } } = this.props;
    const { newName } = this.state;
    return newName === null ? (
      <Typography variant="display2" gutterBottom onClick={this.handleTitleClick}>
        {name}
      </Typography>
    ) : (
      <Input
        placeholder="Project name"
        className="rename-input"
        autoFocus
        inputProps={{
          onBlur: this.handleRenameInputBlur,
          value: newName,
          onChange: this.handleRenameInputChange,
          onKeyUp: this.handleRenameInputKeyPress
        }}
      />
    );
  }

  render() {
    const { project } = this.props;
    const { isRemoveRequest, isOpenAddSourceDialog } = this.state;
    if (!project) return null;
    return (
      <div className="project-editor">
        <AddSourceDialog open={isOpenAddSourceDialog} onClose={this.handleAddSourceDialogClose} />
        <ConfirmDialog
          open={isRemoveRequest}
          text="Are you sure you want to delete this project?"
          onClose={this.handleRemoveDialogCancel}
          onSubmit={this.handleRemoveDialogSubmit}
          confirmButtonLabel="Delete"
        />
        <header>
          {this.renderTitle()}
          <Button variant="contained" color="primary" onClick={this.handleAddSource}>
            Add source
          </Button>
          <Button variant="contained" color="secondary" onClick={this.handleRemoveProject}>
            Delete
          </Button>
        </header>
      </div>
    );
  }
}
