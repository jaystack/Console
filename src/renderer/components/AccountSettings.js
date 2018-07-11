import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import AddAccountDialog from './AddAccountDialog';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import ConfirmDialog from './ConfirmDialog';
import { getAccounts } from '../selectors';
import { removeAccount } from '../actions';

@connect(state => ({ accounts: getAccounts(state) }), { removeAccount })
export default class extends React.PureComponent {
  state = {
    isOpenAddAccountDialog: false,
    removableAccountId: null
  };

  handleAddButtonClick = () => this.setState({ isOpenAddAccountDialog: true });

  handleAddAccountDialogClose = () => this.setState({ isOpenAddAccountDialog: false });

  handleRemoveAccount = _id => this.setState({ removableAccountId: _id });

  handleRemoveDialogCancel = () => {
    this.setState({ removableAccountId: null });
  };

  handleRemoveDialogSubmit = () => {
    this.props.removeAccount(this.state.removableAccountId);
    this.setState({ removableAccountId: null });
  };

  getRemovableAccountTitle() {
    const { removableAccountId } = this.state;
    if (!removableAccountId) return '';
    const account = this.props.accounts.find(account => account._id === removableAccountId);
    return `Delete ${account.name} ${account.type} account`;
  }

  renderEmptyContent() {
    return (
      <div className="empty-content">
        <Typography variant="subheading" gutterBottom align="center">
          You have no accounts.
        </Typography>
        <Button variant="contained" color="primary" size="medium" onClick={this.handleAddButtonClick}>
          Add your first account
        </Button>
      </div>
    );
  }

  renderContent() {
    const { accounts } = this.props;
    return (
      <Fragment>
        <header>
          <Button variant="contained" color="primary" size="medium" onClick={this.handleAddButtonClick}>
            Add account
          </Button>
        </header>
        <main>
          <div className="grid-container">
            <div className="account-grid">
              {accounts.map(account => (
                <Account
                  key={account._id}
                  onRemove={this.handleRemoveAccount}
                  _id={account._id}
                  type={account.type}
                  title={account.username}
                  subtitle={account.type === 'slack' ? account.teamName : ''}
                />
              ))}
            </div>
          </div>
        </main>
      </Fragment>
    );
  }

  render() {
    const { accounts } = this.props;
    const { isOpenAddAccountDialog, removableAccountId } = this.state;
    return (
      <div className="account-settings">
        <AddAccountDialog open={isOpenAddAccountDialog} onClose={this.handleAddAccountDialogClose} />
        <ConfirmDialog
          open={!!removableAccountId}
          title={this.getRemovableAccountTitle()}
          text="Are you sure you want to delete this account?"
          onClose={this.handleRemoveDialogCancel}
          onSubmit={this.handleRemoveDialogSubmit}
          confirmButtonLabel="Delete"
        />
        {accounts.length > 0 ? this.renderContent() : this.renderEmptyContent()}
      </div>
    );
  }
}

class Account extends React.PureComponent {
  getImg() {
    switch (this.props.type) {
      case 'slack':
        return 'static/slack-logo.png';
      case 'github':
        return 'static/github-logo.png';
      case 'email':
        return 'static/email-logo.png';
      default:
        return '';
    }
  }

  handleRemoveClick = () => {
    this.props.onRemove(this.props._id);
  };

  render() {
    const { title, subtitle } = this.props;
    return (
      <Paper classes={{ root: 'account-tile' }}>
        <div className="img-container">
          <img alt="account-type" src={this.getImg()} />
        </div>
        <div className="name-container">
          <Typography variant="title" color="textSecondary">
            {title}
          </Typography>
          <Typography variant="subheading" color="textSecondary">
            {subtitle}
          </Typography>
        </div>
        <div className="button-container">
          <IconButton onClick={this.handleRemoveClick}>
            <DeleteIcon />
          </IconButton>
        </div>
      </Paper>
    );
  }
}
