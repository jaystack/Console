import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Menu from './Menu';

const MAX = 50;
const WHITESPACES = /\s+/g;

export default class extends React.PureComponent {
  static propTypes = {
    items: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]).isRequired,
        label: PropTypes.string.isRequired,
        icon: PropTypes.string,
        sublabel: PropTypes.string
      })
    ).isRequired
  };

  state = {
    search: '',
    max: MAX
  };

  handleScroll = evt => {
    if (evt.target.scrollTop >= evt.target.scrollHeight - evt.target.offsetHeight - 100) {
      this.setState({ max: this.state.max + MAX });
    }
  };

  handleChange = evt => {
    this.setState({ search: evt.target.value, max: MAX });
  };

  getFilteredItems() {
    const { items } = this.props;
    const { search, max } = this.state;
    const patterns = search.split(WHITESPACES).filter(_ => _).map(word => new RegExp(word, 'i'));
    return (patterns.length > 0
      ? items.filter(
          item =>
            !!item.sublabel
              ? patterns.every(pattern => pattern.test(item.label + ' ' + item.sublabel))
              : patterns.every(pattern => pattern.test(item.label))
        )
      : items).slice(0, max);
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
        <main onScroll={this.handleScroll}>
          <Menu items={this.getFilteredItems()} onItemClick={onSelect} scrollable={false} />
        </main>
      </div>
    );
  }
}
