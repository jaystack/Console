import React from 'react';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import Icon from './Icon';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import ConfirmDialog from './ConfirmDialog';
import AddSourceDialog from './AddSourceDialog';
import { getSelectedProject, getResolvedSourcesOfSelectedProject } from '../selectors';
import { removeProject, renameProject, removeSource } from '../actions';
import { getAccountIcon, getConversationName, getConversationIcon } from '../utils';

@connect(state => ({ project: getSelectedProject(state), sources: getResolvedSourcesOfSelectedProject(state) }), {
  removeProject,
  renameProject,
  removeSource
})
export default class extends React.PureComponent {
  state = {
    isRemoveRequest: false,
    removableSourceIndex: null,
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

  handleRemoveSource = removableSourceIndex => () => {
    this.setState({ removableSourceIndex });
  };

  handleRemoveSourceDialogCancel = () => {
    this.setState({ removableSourceIndex: null });
  };

  handleRemoveSourceDialogSubmit = () => {
    this.props.removeSource(this.state.removableSourceIndex);
    this.setState({ removableSourceIndex: null });
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

  renderEmptyContent() {
    return (
      <div className="empty-content">
        <Typography variant="subheading" gutterBottom align="center">
          You have no sources.
        </Typography>
        <Button variant="contained" color="primary" size="medium" onClick={this.handleAddSource}>
          Add your first source
        </Button>
      </div>
    );
  }

  render() {
    const { project, sources } = this.props;
    const { isRemoveRequest, isOpenAddSourceDialog, removableSourceIndex } = this.state;
    if (!project) return null;
    const hasSources = sources.length > 0;
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
        <ConfirmDialog
          open={removableSourceIndex !== null}
          text="Are you sure you want to delete this source?"
          onClose={this.handleRemoveSourceDialogCancel}
          onSubmit={this.handleRemoveSourceDialogSubmit}
          confirmButtonLabel="Delete"
        />
        <header>
          {this.renderTitle()}
          {hasSources && (
            <Button variant="contained" color="primary" onClick={this.handleAddSource}>
              Add source
            </Button>
          )}
          <Button variant="contained" color="secondary" onClick={this.handleRemoveProject}>
            Delete
          </Button>
        </header>
        <main>
          {hasSources && (
            <div className="source-grid">
              {sources.map((source, i) => (
                <SourceTile
                  key={i}
                  accountIcon={getAccountIcon(source.type)}
                  {...getSourceTileProps(source)}
                  onRemove={this.handleRemoveSource(i)}
                />
              ))}
            </div>
          )}
          {!hasSources && this.renderEmptyContent()}
        </main>
      </div>
    );
  }
}

class SourceTile extends React.PureComponent {
  render() {
    const { icon, accountIcon, title, subtitle, onRemove } = this.props;
    return (
      <Paper classes={{ root: 'source-tile slack-source-tile' }}>
        <header>
          <Icon>{icon}</Icon>
          <Typography variant="subheading" classes={{ subheading: 'title' }}>
            {title}
          </Typography>
          <IconButton onClick={onRemove}>
            <DeleteIcon />
          </IconButton>
        </header>
        <footer>
          <Avatar alt="slack-logo" src={accountIcon} classes={{ root: 'account-icon' }} />
          <Typography variant="caption">{subtitle}</Typography>
        </footer>
      </Paper>
    );
  }
}

const getSourceTileProps = source => {
  switch (source.type) {
    case 'slack':
      return {
        icon: getConversationIcon(source.conversation.type),
        title: getConversationName(source.conversation),
        subtitle: source.accountDetails.teamName
      };
    case 'github':
      return {
        icon: 'mdi mdi-source-fork',
        title: source.repo.name,
        subtitle: source.repo.owner
      };
    default:
      return {};
  }
};

/* const getSourceTileComponent = (source, i) => {
  switch (source.type) {
    case 'slack':
      return <SlackSourceTile key={i} source={source} index={i} />;
    case 'github':
      return <GithubSourceTile key={i} source={source} index={i} />;
    default:
      return null;
  }
};

@connect(null, { removeSource })
class SlackSourceTile extends React.PureComponent {
  handleRemove = () => {
    this.props.removeSource(this.props.index);
  };

  render() {
    const { source } = this.props;
    return (
      <Paper classes={{ root: 'source-tile slack-source-tile' }}>
        <header>
          <Icon>{getConversationIcon(source.conversation.type)}</Icon>
          <Typography variant="subheading" classes={{ subheading: 'title' }}>
            {getConversationName(source.conversation)}
          </Typography>
          <IconButton onClick={this.handleRemove}>
            <DeleteIcon />
          </IconButton>
        </header>
        <footer>
          <Avatar alt="slack-logo" src={getAccountIcon(source.type)} classes={{ root: 'account-icon' }} />
          <Typography variant="caption">{source.accountDetails.teamName}</Typography>
        </footer>
      </Paper>
    );
  }
}

@connect(null, { removeSource })
class GithubSourceTile extends React.PureComponent {
  handleRemove = () => {
    this.props.removeSource(this.props.index);
  };

  render() {
    const { source } = this.props;
    return (
      <Paper classes={{ root: 'source-tile github-source-tile' }}>
        <header>
          <Icon>mdi mdi-source-fork</Icon>
          <Typography variant="subheading" classes={{ subheading: 'title' }}>
            {source.repo.name}
          </Typography>
          <IconButton onClick={this.handleRemove}>
            <DeleteIcon />
          </IconButton>
        </header>
        <footer>
          <Avatar alt="github-logo" src={getAccountIcon(source.type)} classes={{ root: 'account-icon' }} />
          <Typography variant="caption">{source.repo.owner}</Typography>
        </footer>
      </Paper>
    );
  }
}
 */
