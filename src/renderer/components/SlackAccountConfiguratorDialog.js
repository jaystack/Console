import React from 'react';
import { connect } from 'react-redux';
import { resolveSlackAccount } from '../actions';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

@connect(null, { resolveSlackAccount })
export default class extends React.PureComponent {
  timer = null;

  state = {
    id: null,
    username: null,
    teamName: null,
    token: ''
  };

  handleChange = evt => {
    this.setState({ token: evt.target.value });
    if (this.timer) clearTimeout(this.timer);
    this.timer = setTimeout(async () => {
      try {
        if (!this.state.token) return this.setState({ id: null, username: null, teamName: null });
        const { id, username, teamName } = await this.props.resolveSlackAccount(this.state.token);
        this.setState({ id, username, teamName });
      } catch (error) {
        this.setState({ id: null, username: null, teamName: null });
      }
    }, 300);
  };

  handleExit = () => {
    this.setState({ id: null, username: null, teamName: null, token: '' });
  };

  handleSubmit = () => {
    this.props.onSubmit(this.state);
    this.props.onClose();
  };

  render() {
    const { open, onClose } = this.props;
    const { token, id, username, teamName } = this.state;
    return (
      <Dialog open={open} onExited={this.handleExit}>
        <DialogTitle id="form-dialog-title">Configure Slack Account</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Provide your legacy token. You can create one{' '}
            <a rel="noopener noreferrer" target="_blank" href="https://api.slack.com/custom-integrations/legacy-tokens">
              here
            </a>.
          </DialogContentText>
          <TextField
            margin="dense"
            label="Legacy token"
            classes={{ marginDense: 'legacy-token-input' }}
            value={token}
            onChange={this.handleChange}
          />
          {username &&
          teamName && (
            <DialogContentText>
              {username} in {teamName}
            </DialogContentText>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            Cancel
          </Button>
          <Button onClick={this.handleSubmit} color="primary" disabled={!id}>
            Add
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}
