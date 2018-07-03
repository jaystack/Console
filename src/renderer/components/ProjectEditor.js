import React from 'react';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import { getSelectedProject } from '../selectors';

@connect(state => ({ project: getSelectedProject(state) }), {})
export default class extends React.PureComponent {
  render() {
    const { project } = this.props;
    if (!project) return null;
    return (
      <div className="project-editor">
        <Typography variant="display1" gutterBottom>
          {project.name}
        </Typography>
      </div>
    );
  }
}
