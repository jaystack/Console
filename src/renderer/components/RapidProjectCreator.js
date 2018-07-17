import React from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import DoneIcon from '@material-ui/icons/Done';
import TextField from '@material-ui/core/TextField';
import { createProject } from '../actions';

@connect(null, { createProject })
export default class extends React.PureComponent {
  state = {
    name: null
  };

  handleNameChange = evt => this.setState({ name: evt.target.value });

  handleClick = () => this.setState({ name: '' });

  handleKeyPress = evt => {
    if (evt.key === 'Enter') this.submit();
    if (evt.key === 'Escape') this.cancel();
  };

  handleBlur = () => {
    if (!this.state.name) this.cancel();
  };

  handleSubmit = () => this.submit();

  submit() {
    if (!this.state.name) return;
    this.props.createProject(this.state.name);
    this.setState({ name: null });
  }

  cancel() {
    if (!this.props.cancellable) return;
    this.setState({ name: null });
  }

  render() {
    const { buttonLabel, buttonSize } = this.props;
    const { name } = this.state;
    return (
      <div className="rapid-project-creator">
        {name === null ? (
          <Button variant="contained" color="primary" size={buttonSize || 'medium'} onClick={this.handleClick}>
            {buttonLabel || 'Create new project'}
          </Button>
        ) : (
          <div className="input-container">
            <TextField
              placeholder="Project name"
              value={name}
              onChange={this.handleNameChange}
              onKeyUp={this.handleKeyPress}
              onBlur={this.handleBlur}
              autoFocus
            />
            <IconButton aria-label="Go" disabled={!name} onClick={this.handleSubmit}>
              <DoneIcon />
            </IconButton>
          </div>
        )}
      </div>
    );
  }
}
