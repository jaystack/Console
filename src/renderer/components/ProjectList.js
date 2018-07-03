import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import RapidProjectCreator from './RapidProjectCreator';
import { getProjects, getIsSettingsOpen } from '../selectors';
import { selectProject } from '../actions';
import { Divider } from '@material-ui/core';

@connect(state => ({ projects: getProjects(state), open: getIsSettingsOpen(state) }), { selectProject })
export default class extends React.PureComponent {
  handleItemClick = id => () => this.props.selectProject(id);

  render() {
    const { projects } = this.props;
    return (
      <div className="project-list">
        <header>
          <RapidProjectCreator cancellable />
        </header>
        <List component="nav" subheader={<ListSubheader component="div">Projects</ListSubheader>}>
          {projects.map((project, i) => (
            <Fragment key={project._id}>
              <ListItem button onClick={this.handleItemClick(project._id)}>
                <ListItemText primary={project.name} />
              </ListItem>
              {i < projects.length - 1 ? <Divider /> : null}
            </Fragment>
          ))}
        </List>
      </div>
    );
  }
}
