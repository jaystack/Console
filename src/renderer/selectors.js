import { createSelector } from 'reselect';

export const getIsFetching = state => state.isFetching;

export const getIsSettingsOpen = state => state.isSettingsOpen;

export const getProjects = state => state.projects;

export const getSelectedProjectId = state => state.selectedProjectId;

export const getSelectedProject = createSelector(
  [ getSelectedProjectId, getProjects ],
  (selectedProjectId, projects) =>
    selectedProjectId ? projects.find(project => project._id === selectedProjectId) : null
);

export const getConfig = state => state.config;

export const getQuery = state => state.query;

export const getItems = state => state.items;
