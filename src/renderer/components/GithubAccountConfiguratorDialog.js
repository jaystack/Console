import React from 'react';
import { connect } from 'react-redux';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { resolveGithubAccount } from '../actions';

@connect(null, { resolveGithubAccount })
export default class extends React.PureComponent {
  timer = null;

  state = {
    account: undefined,
    token: ''
  };

  handleChange = evt => {
    this.setState({ token: evt.target.value });
    if (this.timer) clearTimeout(this.timer);
    this.timer = setTimeout(async () => {
      try {
        if (!this.state.token) return this.setState({ account: undefined });
        const account = await this.props.resolveGithubAccount(this.state.token);
        this.setState({ account });
      } catch (error) {
        this.setState({ account: undefined });
      }
    }, 300);
  };

  handleExit = () => {
    this.setState({ account: undefined, token: '' });
  };

  handleSubmit = () => {
    if (!this.state.account) return;
    this.props.onSubmit({ ...this.state.account, token: this.state.token });
    this.props.onClose();
  };

  render() {
    const { open, onClose } = this.props;
    const { token, account: { id, username } = {} } = this.state;
    return (
      <Dialog open={open} onExited={this.handleExit}>
        <DialogTitle>Configure Github Account</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Provide your personal token. Read more{' '}
            <a
              rel="noopener noreferrer"
              target="_blank"
              href="https://help.github.com/articles/creating-a-personal-access-token-for-the-command-line/"
            >
              here
            </a>.
          </DialogContentText>
          <TextField
            margin="dense"
            label="Personal token"
            classes={{ marginDense: 'legacy-token-input' }}
            value={token}
            onChange={this.handleChange}
          />
          {username && <DialogContentText>{username}</DialogContentText>}
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
