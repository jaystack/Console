import React from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';

@connect()
export default class extends React.PureComponent {
  render() {
    return (
      <div className="account-settings">
        <header>
          <Button variant="contained" color="primary" size="medium" onClick={this.handleClick}>
            Add account
          </Button>
        </header>
      </div>
    );
  }
}
