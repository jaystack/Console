import React from 'react';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import ConfirmDialog from './ConfirmDialog';
import { getSelectedProject } from '../selectors';
import { removeProject, renameProject } from '../actions';

@connect(state => ({ project: getSelectedProject(state) }), { removeProject, renameProject })
export default class extends React.PureComponent {
  state = {
    isRemoveRequest: false,
    newName: null
  };

  async componentDidUpdate(prevProps) {
    if (prevProps.project !== this.props.project) this.setState({ newName: null });
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

  handleRenameInputBlur = evt => {
    this.confirmTitleRename(evt);
  };

  handleRenameInputKeyPress = evt => {
    if (evt.key === 'Enter') this.confirmTitleRename(evt);
  };

  confirmTitleRename(evt) {
    if (!evt.target.value) return;
    this.props.renameProject(this.props.project._id, evt.target.value);
  }

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
          {this.renderTitle()}
          <Button variant="contained" color="secondary" onClick={this.handleRemoveProject}>
            Delete
          </Button>
        </header>
      </div>
    );
  }
}