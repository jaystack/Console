import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';

export default class extends React.PureComponent {
  render() {
    const { open, onClose } = this.props;
    return (
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Add account</DialogTitle>
        <DialogContent>...</DialogContent>
      </Dialog>
    );
  }
}
