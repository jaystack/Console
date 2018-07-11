import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { resolveSlackAccount, createAccount } from '../actions';

@connect(null, { createAccount })
export default class extends React.PureComponent {
  state = {
    type: null
  };

  componentDidUpdate(prevProps) {
    if (prevProps.open !== this.props.open) this.setState({ type: null });
  }

  handleSelectType = type => this.setState({ type });

  handleSubmit = async account => {
    await this.props.createAccount({ type: this.state.type, ...account });
    this.props.onClose();
  };

  render() {
    const { open, onClose } = this.props;
    const { type } = this.state;
    return (
      <Fragment>
        <TypeSelectorDialog open={open && type === null} onSelect={this.handleSelectType} onClose={onClose} />
        <SlackConfigurator open={open && type === 'slack'} onClose={onClose} onSubmit={this.handleSubmit} />
      </Fragment>
    );
  }
}

class TypeSelectorDialog extends React.PureComponent {
  render() {
    const { open, onClose, onSelect, onExit } = this.props;
    return (
      <Dialog open={open} onClose={onClose} onExited={onExit}>
        <DialogTitle>Add account</DialogTitle>
        <DialogContent>
          <div className="select-account-type-container">
            <Tile type="slack" imgSrc="static/slack-logo.png" label="Slack" onClick={onSelect} />
            <Tile type="github" imgSrc="static/github-logo.png" label="Github" />
            <Tile type="email" imgSrc="static/email-logo.png" label="Email" />
          </div>
        </DialogContent>
      </Dialog>
    );
  }
}

class Tile extends React.PureComponent {
  handleClick = () => {
    if (this.props.onClick) this.props.onClick(this.props.type);
  };

  render() {
    const { imgSrc, label } = this.props;
    return (
      <Paper classes={{ root: 'tile' }} onClick={this.handleClick}>
        <div className="img-container">
          <img alt="slack" src={imgSrc} />
        </div>
        <footer>
          <Typography variant="subheading" color="textSecondary">
            {label}
          </Typography>
        </footer>
      </Paper>
    );
  }
}

@connect(null, { resolveSlackAccount })
class SlackConfigurator extends React.PureComponent {
  timer = null;

  state = {
    id: null,
    name: null,
    token: ''
  };

  handleChange = evt => {
    this.setState({ token: evt.target.value });
    if (this.timer) clearTimeout(this.timer);
    this.timer = setTimeout(async () => {
      try {
        const { team: { id, name } } = await this.props.resolveSlackAccount(this.state.token);
        this.setState({ id, name });
      } catch (error) {
        this.setState({ id: null, name: null });
      }
    }, 300);
  };

  handleExit = () => {
    this.setState({ id: null, name: null, token: '' });
  };

  handleSubmit = () => {
    this.props.onSubmit(this.state);
    this.props.onClose();
  };

  render() {
    const { open, onClose } = this.props;
    const { token, id, name } = this.state;
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
            autoFocus
            margin="dense"
            label="Legacy token"
            classes={{ marginDense: 'legacy-token-input' }}
            value={token}
            onChange={this.handleChange}
          />
          {name && <DialogContentText>{name}</DialogContentText>}
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
