import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

export default class extends React.PureComponent {
  render() {
    return (
      <div className="spinner">
        <CircularProgress />
      </div>
    );
  }
}
