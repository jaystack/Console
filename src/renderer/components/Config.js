import React from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import { getConfig, getIsConfigOpen } from '../selectors';
import { updateConfig, toggleConfig } from '../actions';

@connect(state => ({ config: getConfig(state), open: getIsConfigOpen(state) }), { updateConfig, toggleConfig })
export default class extends React.PureComponent {
  state = {
    config: this.getConfig(this.props)
  };

  async componentDidUpdate(prevProps) {
    if (prevProps.config !== this.props.config) this.setState({ config: this.getConfig(this.props) });
  }

  getConfig(props) {
    return props.config ? JSON.stringify(props.config, null, 2) : '';
  }

  handleChange = evt => {
    this.setState({ config: evt.target.value });
  };

  handleSave = () => {
    this.props.updateConfig(JSON.parse(this.state.config));
    this.props.toggleConfig(false);
  };

  handleClose = () => {
    this.props.toggleConfig(false);
  };

  render() {
    const { open } = this.props;
    const { config } = this.state;
    return (
<<<<<<< HEAD
      <div>
        <textarea
          value={config}
          onChange={this.handleChange}
          style={{ width: '100%', height: '300px', boxSizing: 'border-box' }}
        />
        <button onClick={this.handleSave}>Save</button>
      </div>
=======
      <Dialog fullScreen open={open} onClose={this.handleClose}>
        <div className="settings">
          <AppBar style={{ position: 'relative', flex: '0 0 auto' }}>
            <Toolbar>
              <IconButton color="inherit" onClick={this.handleClose} aria-label="Close">
                <CloseIcon />
              </IconButton>
              <Typography variant="title" color="inherit" style={{ flex: 1, marginLeft: '20px' }}>
                Settings
              </Typography>
              <Button color="inherit" onClick={this.handleSave}>
                save
              </Button>
            </Toolbar>
          </AppBar>
          <main>
            <textarea value={config} onChange={this.handleChange} />
          </main>
        </div>
      </Dialog>
>>>>>>> 42689461631a4454a26425fe53413e47fcdf4065
    );
  }
}
