import React from 'react';
import { connect } from 'react-redux';
import Menu from './Menu';
import RapidProjectCreator from './RapidProjectCreator';
import { getProjects, getIsSettingsOpen, getSelectedProjectId } from '../selectors';
import { selectProject } from '../actions';

@connect(
  state => ({
    projects: getProjects(state),
    open: getIsSettingsOpen(state),
    selectProjectId: getSelectedProjectId(state)
  }),
  { selectProject }
)
export default class extends React.PureComponent {
  handleItemClick = id => this.props.selectProject(id);

  render() {
    const { projects, selectProjectId } = this.props;
    return (
      <div className="project-list">
        <header>
          <RapidProjectCreator cancellable />
        </header>
        <Menu
          subheader="Projects"
          items={projects.map(({ _id, name }) => ({ id: _id, label: name }))}
          selected={selectProjectId}
          onItemClick={this.handleItemClick}
        />
      </div>
    );
  }
}
