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

  handleSelectAccount = account => this.setState({ account });

  handleSelect = async selection => {
    const { account: { type, _id } } = this.state;
    const source = {
      type,
      accountId: _id,
      [type === 'slack' ? 'conversationId' : type === 'github' ? 'repositoryId' : 'email']: selection
    };
    await this.props.addSource(source);
    this.props.onClose();
  };

  render() {
    const { open, onClose } = this.props;
    const { account } = this.state;
    return (
      <Fragment>
        <AccountSelectorDialog open={open && account === null} onSelect={this.handleSelectAccount} onClose={onClose} />
        <SlackConfigurator
          open={open && !!account && account.type === 'slack'}
          onClose={onClose}
          onSelect={this.handleSelect}
          accountId={account ? account._id : null}
        />
      </Fragment>
    );
  }
}
