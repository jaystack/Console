import React from 'react';
import { connect } from 'react-redux';
import ProjectList from './ProjectList';
import RapidProjectCreator from './RapidProjectCreator';
import ProjectEditor from './ProjectEditor';
import Typography from '@material-ui/core/Typography';
import { getProjects } from '../selectors';

@connect(state => ({ projects: getProjects(state) }))
export default class extends React.PureComponent {
  renderEmptyContent() {
    return (
      <div className="empty-content">
        <Typography variant="subheading" gutterBottom align="center">
          You have no projects.
        </Typography>
        <RapidProjectCreator buttonLabel="Create your first project" buttonSize="large" />
      </div>
    );
  }

  render() {
    const { projects } = this.props;
    const empty = projects.length === 0;
    return (
      <div className="project-settings">
        {empty && this.renderEmptyContent()}
        {!empty && <ProjectList />}
        {!empty && <ProjectEditor />}
      </div>
    );
  }
}
