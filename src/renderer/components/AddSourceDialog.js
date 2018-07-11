import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import AccountSelectorDialog from './AccountSelectorDialog';
import SlackConfigurator from './SlackSourceConfiguratorDialog';
import { addSource } from '../actions';

@connect(null, { addSource })
export default class extends React.PureComponent {
  state = {
    account: null
  };

  componentDidUpdate(prevProps) {
    if (prevProps.open !== this.props.open) this.setState({ account: null });
  }

  handleSelectType = account => this.setState({ account });

  handleSubmit = async source => {
    //await this.props.addSource({ type: this.state.type, ...source });
    this.props.onClose();
  };

  render() {
    const { open, onClose } = this.props;
    const { account } = this.state;
    return (
      <Fragment>
        <AccountSelectorDialog open={open && account === null} onSelect={this.handleSelectType} onClose={onClose} />
        <SlackConfigurator
          open={open && !!account && account.type === 'slack'}
          onClose={onClose}
          onSubmit={this.handleSubmit}
          account={account}
        />
      </Fragment>
    );
  }
}
