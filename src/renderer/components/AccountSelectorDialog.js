import React from 'react';
import { connect } from 'react-redux';
import Dialog from '@material-ui/core/Dialog';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Avatar from '@material-ui/core/Avatar';
import { getAccounts } from '../selectors';
import { getAccountName } from '../utils';

@connect(state => ({ accounts: getAccounts(state) }))
export default class extends React.PureComponent {
  render() {
    const { open, onClose, onSelect, onExit, accounts } = this.props;
    return (
      <Dialog open={open} onClose={onClose} onExited={onExit}>
        <DialogTitle>Select account</DialogTitle>
        <DialogContent>
          <MenuList>
            {accounts.map(account => (
              <MenuItem key={account.id} onClick={() => onSelect(account)}>
                <ListItemIcon>
                  <Avatar alt={account.type} src={`static/${account.type}-logo.png`} />
                </ListItemIcon>
                <ListItemText inset primary={getAccountName(account)} />
              </MenuItem>
            ))}
          </MenuList>
        </DialogContent>
      </Dialog>
    );
  }
}
