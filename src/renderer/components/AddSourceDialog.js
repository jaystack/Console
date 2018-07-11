import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import TypeSelectorDialog from './TypeSelectorDialog';
import SlackConfigurator from './SlackSourceConfiguratorDialog';
import { addSource } from '../actions';

@connect(null, { addSource })
export default class extends React.PureComponent {
  state = {
    type: null
  };

  componentDidUpdate(prevProps) {
    if (prevProps.open !== this.props.open) this.setState({ type: null });
  }

  handleSelectType = type => this.setState({ type });

  handleSubmit = async source => {
    //await this.props.addSource({ type: this.state.type, ...source });
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
