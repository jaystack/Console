import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Icon from '@material-ui/core/Icon';
import MenuList from '@material-ui/core/MenuList';
import ListSubheader from '@material-ui/core/ListSubheader';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

const MAX = 50;

export default class extends React.PureComponent {
  static propTypes = {
    items: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]).isRequired,
        icon: PropTypes.string,
        label: PropTypes.string
      })
    ).isRequired,
    selected: PropTypes.arrayOf(PropTypes.string),
    onItemClick: PropTypes.func,
    subheader: PropTypes.string,
    scrollable: PropTypes.bool
  };

  static defaultProps = {
    items: [],
    selected: [],
    onItemClick: id => {},
    scrollable: true
  };

  state = {
    max: this.props.scrollable ? MAX : Infinity
  };

  handleScroll = evt => {
    if (!this.props.scrollable) return;
    if (evt.target.scrollTop >= evt.target.scrollHeight - evt.target.offsetHeight - 100) {
      this.setState({ max: this.state.max + MAX });
    }
  };

  handleItemClick = id => () => {
    this.props.onItemClick(id);
  };

  render() {
    const { items, subheader, selected, scrollable } = this.props;
    const { max } = this.state;
    return (
      <div className="menu">
        <MenuList
          subheader={subheader && <ListSubheader component="div">{subheader}</ListSubheader>}
          classes={{ root: classnames('menu-list', scrollable && 'scrollable') }}
          onScroll={this.handleScroll}
        >
          {items.slice(0, max).map(({ id, icon, label }) => (
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
