import { getConfig, getQuery, getSelectedProjectId } from './selectors';
import searchByQuery from './utils/search';

export const toggleFetching = isFetching => state => ({ ...state, isFetching });

export const toggleSettings = selection => state => ({
  ...state,
  activeSettingsMenuItem: selection === true ? 'accounts' : selection ? selection : null
});

export const init = () => state => async (dispatch, getState, { connectors }) => {
  dispatch(toggleFetching(true));
  await dispatch(readProjects());
  await dispatch(readAccounts());
  await dispatch(readConfig());
  await dispatch(initSources());
  await dispatch(search());
  dispatch(toggleFetching(false));
};

export const initSources = () => state => async (dispatch, getState, { connectors }) => {
  const { sources } = getConfig(getState());
  await Promise.all(sources.map((sourceConfig, i) => connectors.of(i).init(sourceConfig)));
};

export const search = () => state => async (dispatch, getState, { db }) => {
  const query = getQuery(getState());
  const items = await searchByQuery(query, db);
  dispatch(state => ({ ...state, items }));
};

export const updateQuery = query => state => ({ ...state, query });

export const readConfig = () => state => async (dispatch, getState, { config, connectors, db }) => {
  const conf = await config.readConfig();
  dispatch(state => ({ ...state, config: conf }));
  connectors.createBySources(conf.sources, db);
};

export const updateConfig = nextConfig => state => async (dispatch, getState, { config }) => {
  await config.writeConfig(nextConfig);
};

export const readAccounts = () => state => async (dispatch, getState, { db }) => {
  const accounts = await db.select('accounts').find({}, { sort: { created: 1 } });
  dispatch(state => ({ ...state, accounts }));
};

export const createAccount = account => state => async (dispatch, getState, { db, time }) => {
  const insertedAccount = await db.select('accounts').insert({ ...account, created: time.getNow(true) });
  dispatch(state => ({ ...state, accounts: [ ...state.accounts, insertedAccount ] }));
};

export const removeAccount = _id => state => async (dispatch, getState, { db }) => {
  await db.select('accounts').remove({ _id });
  dispatch(state => ({ ...state, accounts: state.accounts.filter(account => account._id !== _id) }));
};

export const resolveSlackAccount = token => state => async (dispatch, getState, { connectors }) => {
  const slack = connectors.getConstructor('slack');
  return await slack.resolveAccountByToken(token);
};

export const resolveGithubAccount = token => state => async (dispatch, getState, { connectors }) => {
  const github = connectors.getConstructor('github');
  return await github.resolveAccountByToken(token);
};

export const readProjects = () => state => async (dispatch, getState, { db }) => {
  const projects = await db.select('projects').find({}, { sort: { created: 1 } });
  dispatch(state => ({ ...state, projects, selectedProjectId: projects.length > 0 ? projects[0]._id : null }));
};

export const createProject = name => state => async (dispatch, getState, { db, time }) => {
  const project = await db.select('projects').insert({ name, created: time.getNow(true), sources: [] });
  dispatch(state => ({ ...state, projects: [ ...state.projects, project ], selectedProjectId: project._id }));
};

export const removeProject = _id => state => async (dispatch, getState, { db }) => {
  await db.select('projects').remove({ _id });
  dispatch(state => {
    const nextProjects = state.projects.filter(project => project._id !== _id);
    return {
      ...state,
      projects: nextProjects,
      selectedProjectId: nextProjects.length > 0 ? nextProjects[0]._id : null
    };
  });
};

export const renameProject = (_id, name) => state => async (dispatch, getState, { db }) => {
  await db.select('projects').update({ _id }, { $set: { name } });
  dispatch(state => ({
    ...state,
    projects: state.projects.map(project => (project._id === _id ? { ...project, name } : project))
  }));
};

export const selectProject = selectedProjectId => state => ({ ...state, selectedProjectId });

export const addSource = source => state => async (dispatch, getState, { db }) => {
  const projectId = getSelectedProjectId(getState());
  await db.select('projects').update({ _id: projectId }, { $push: { sources: source } });
  dispatch(state => ({
    ...state,
    projects: state.projects.map(
      project => (project._id === projectId ? { ...project, sources: [ ...project.sources, source ] } : project)
    )
  }));
};
