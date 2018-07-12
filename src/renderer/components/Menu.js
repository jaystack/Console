import React from 'react';
import PropTypes from 'prop-types';
import Icon from '@material-ui/core/Icon';
import MenuList from '@material-ui/core/MenuList';
import ListSubheader from '@material-ui/core/ListSubheader';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

export default class extends React.PureComponent {
  static propTypes = {
    items: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        icon: PropTypes.string,
        label: PropTypes.string.isRequired
      })
    ).isRequired,
    selected: PropTypes.arrayOf(PropTypes.string),
    onItemClick: PropTypes.func,
    subheader: PropTypes.string
  };

  static defaultProps = {
    items: [],
    selected: [],
    onItemClick: id => {}
  };

  handleItemClick = id => () => {
    this.props.onItemClick(id);
  };

  render() {
    const { items, subheader, selected } = this.props;
    return (
      <div>
        <MenuList subheader={subheader && <ListSubheader component="div">{subheader}</ListSubheader>}>
          {items.map(({ id, icon, label }) => (
            <MenuItem key={id} onClick={this.handleItemClick(id)} selected={selected.includes(id)}>
              {icon && (
                <ListItemIcon>
                  <Icon className={getIconAsClass(icon)} color="primary">
                    {getIconAsChild(icon)}
                  </Icon>
                </ListItemIcon>
              )}
              {icon ? <ListItemText classes={{ primary: 'menu-item-text' }} inset primary={label} /> : label}
            </MenuItem>
          ))}
        </MenuList>
      </div>
    );
  }
}

const mdiPattern = /^mdi /;

const getIconAsClass = icon => (mdiPattern.test(icon) ? icon : '');
const getIconAsChild = icon => (mdiPattern.test(icon) ? '' : icon);
