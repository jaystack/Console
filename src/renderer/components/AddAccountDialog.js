import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

export default class extends React.PureComponent {
  render() {
    const { open, onClose } = this.props;
    return (
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Add account</DialogTitle>
        <DialogContent>
          <div className="select-account-type-container">
            <Tile imgSrc="static/slack-logo.png" label="Slack" />
            <Tile imgSrc="static/github-logo.png" label="Github" />
            <Tile imgSrc="static/email-logo.png" label="Email" />
          </div>
        </DialogContent>
      </Dialog>
    );
  }
}

class Tile extends React.PureComponent {
  render() {
    const { imgSrc, label } = this.props;
    return (
      <Paper classes={{ root: 'tile' }}>
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
