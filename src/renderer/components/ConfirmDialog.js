import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default class extends React.PureComponent {
  render() {
    const { open, title, text, confirmButtonLabel, cancelButtonLabel, onSubmit, onClose } = this.props;
    return (
      <Dialog open={open} onClose={onClose}>
        {title && <DialogTitle>{title}</DialogTitle>}
        <DialogContent>
          <DialogContentText>{text}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            {cancelButtonLabel || 'Cancel'}
          </Button>
          <Button onClick={onSubmit} color="secondary">
            {confirmButtonLabel || 'Ok'}
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}
