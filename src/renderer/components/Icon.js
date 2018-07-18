import React from 'react';
import classnames from 'classnames';
import Icon from '@material-ui/core/Icon';

export default class extends React.PureComponent {
  render() {
    const { children: icon, color } = this.props;
    return (
      <Icon className={classnames('icon', getIconAsClass(icon))} color={color}>
        {getIconAsChild(icon)}
      </Icon>
    );
  }
}

const mdiPattern = /^mdi /;

const getIconAsClass = icon => (mdiPattern.test(icon) ? icon : '');
const getIconAsChild = icon => (mdiPattern.test(icon) ? '' : icon);
