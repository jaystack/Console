import React from 'react';
import { connect } from 'react-redux';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import { getResolvedConversations } from '../selectors';
import { resolveSlackAccount } from '../actions';

@connect((state, { accountId }) => ({ conversations: getResolvedConversations(accountId)(state) }), {
  resolveSlackAccount
})
export default class extends React.PureComponent {
  handleSubmit = () => {
    this.props.onSubmit(this.state);
    this.props.onClose();
  };

  render() {
    const { open, onClose, conversations } = this.props;
    console.log(conversations);
    return (
      <Dialog open={open} onExited={this.handleExit}>
        <DialogTitle id="form-dialog-title">Add Slack Conversation</DialogTitle>
        <DialogContent>
          <DialogContentText>...</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            Cancel
          </Button>
          <Button onClick={this.handleSubmit} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}
