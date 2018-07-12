import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Menu from './Menu';

export default class extends React.PureComponent {
  static propTypes = {
    items: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
        icon: PropTypes.string.isRequired
      })
    ).isRequired
  };

  render() {
    const { items } = this.props;
    return (
      <div className="searchable-list">
        <header>
          <TextField
            InputLabelProps={{ shrink: true }}
            placeholder="Search"
            fullWidth
            margin="none"
          />
        </header>
        <main>
          <Menu items={items} />
        </main>
      </div>
    );
  }
}
