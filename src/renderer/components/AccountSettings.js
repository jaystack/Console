import React from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import AddAccountDialog from './AddAccountDialog';

@connect()
export default class extends React.PureComponent {
  state = {
    isOpenAddAccountDialog: false
  };

  handleAddButtonClick = () => this.setState({ isOpenAddAccountDialog: true });

  handleAddAccountDialogClose = () => this.setState({ isOpenAddAccountDialog: false });

  render() {
    const { isOpenAddAccountDialog } = this.state;
    return (
      <div className="account-settings">
        <header>
          <Button variant="contained" color="primary" size="medium" onClick={this.handleAddButtonClick}>
            Add account
          </Button>
        </header>
        <AddAccountDialog open={isOpenAddAccountDialog} onClose={this.handleAddAccountDialogClose} />
      </div>
    );
  }
}
