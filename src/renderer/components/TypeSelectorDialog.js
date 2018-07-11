import React from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';

export default class extends React.PureComponent {
  render() {
    const { open, onClose, onSelect, onExit } = this.props;
    return (
      <Dialog open={open} onClose={onClose} onExited={onExit}>
        <DialogTitle>Add account</DialogTitle>
        <DialogContent>
          <div className="select-account-type-container">
            <Tile type="slack" imgSrc="static/slack-logo.png" label="Slack" onClick={onSelect} />
            <Tile type="github" imgSrc="static/github-logo.png" label="Github" onClick={onSelect} />
            <Tile type="email" imgSrc="static/email-logo.png" label="Email" />
          </div>
        </DialogContent>
      </Dialog>
    );
  }
}

class Tile extends React.PureComponent {
  handleClick = () => {
    if (this.props.onClick) this.props.onClick(this.props.type);
  };

  render() {
    const { imgSrc, label } = this.props;
    return (
      <Paper classes={{ root: 'tile' }} onClick={this.handleClick}>
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
