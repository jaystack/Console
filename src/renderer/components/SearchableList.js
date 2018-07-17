import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Menu from './Menu';

export default class extends React.PureComponent {
  static propTypes = {
    items: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]).isRequired,
        label: PropTypes.string.isRequired,
        icon: PropTypes.string
      })
    ).isRequired
  };

  timer = null;

  state = {
    search: ''
  };

  handleChange = evt => {
    this.setState({ search: evt.target.value });
  };

  getFilteredItems() {
    const { items } = this.props;
    const { search } = this.state;
    return search ? items.filter(item => new RegExp(search, 'ig').test(item.label)) : items;
  }

  render() {
    const { onSelect } = this.props;
    const { search } = this.state;
    return (
      <div className="searchable-list">
        <header>
          <TextField
            InputLabelProps={{ shrink: true }}
            InputProps={{ value: search, onChange: this.handleChange }}
            placeholder="Search"
            fullWidth
            margin="none"
          />
        </header>
        <main>
          <Menu items={this.getFilteredItems()} onItemClick={onSelect} />
        </main>
      </div>
    );
  }
}
