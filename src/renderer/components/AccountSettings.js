import React from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import AddAccountDialog from './AddAccountDialog';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import { getAccounts } from '../selectors';

@connect(state => ({ accounts: getAccounts(state) }))
export default class extends React.PureComponent {
  state = {
    isOpenAddAccountDialog: false
  };

  handleAddButtonClick = () => this.setState({ isOpenAddAccountDialog: true });

  handleAddAccountDialogClose = () => this.setState({ isOpenAddAccountDialog: false });

  render() {
    const { accounts } = this.props;
    const { isOpenAddAccountDialog } = this.state;
    return (
      <div className="account-settings">
        <header>
          <Button variant="contained" color="primary" size="medium" onClick={this.handleAddButtonClick}>
            Add account
          </Button>
        </header>
        <AddAccountDialog open={isOpenAddAccountDialog} onClose={this.handleAddAccountDialogClose} />
        <main>{accounts.map(account => <Account key={account._id} {...account} />)}</main>
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

  render() {
    const { name } = this.props;
    return (
      <Paper classes={{ root: 'account-tile' }}>
        <div className="img-container">
          <img alt="account-type" src={this.getImg()} />
        </div>
        <div className="name-container">
          <Typography variant="display1">{name}</Typography>
        </div>
        <div className="button-container">
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </div>
      </Paper>
    );
  }
}
