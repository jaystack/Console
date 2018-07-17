import React from 'react';
import { connect } from 'react-redux';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import SearchableList from './SearchableList';
import { getRepos } from '../selectors';

@connect((state, { accountId }) => ({ repos: getRepos(state, accountId) }))
export default class extends React.PureComponent {
  getListItems() {
    return this.props.repos.map(repo => {
      return { id: repo.id, label: repo.name };
    });
  }

  render() {
    const { open, onClose, onSelect } = this.props;
    return (
      <Dialog open={open} onExited={this.handleExit}>
        <DialogTitle id="form-dialog-title">Add Slack Conversation</DialogTitle>
        <DialogContent classes={{ root: 'slack-source-configuration-dialog-content' }}>
          <SearchableList items={this.getListItems()} onSelect={onSelect} />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}
