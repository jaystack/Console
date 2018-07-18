import React from 'react';
import { connect } from 'react-redux';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import SearchableList from './SearchableList';
import { getResolvedConversations } from '../selectors';
import { getConversationIcon } from '../utils';

@connect((state, { accountId }) => ({ conversations: getResolvedConversations(state, accountId) }))
export default class extends React.PureComponent {
  getListItems() {
    return this.props.conversations.map(conversation => {
      switch (conversation.type) {
        case 'im':
          return { id: conversation.id, label: conversation.user, icon: getConversationIcon(conversation.type) };
        case 'group':
          return {
            id: conversation.id,
            label: conversation.users.join(', '),
            icon: getConversationIcon(conversation.type)
          };
        case 'channel':
          return { id: conversation.id, label: conversation.name, icon: getConversationIcon(conversation.type) };
        default:
          return null;
      }
    });
  }

  render() {
    const { open, onClose, onSelect } = this.props;
    return (
      <Dialog open={open} onExited={this.handleExit}>
        <DialogTitle>Add Slack Conversation</DialogTitle>
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
