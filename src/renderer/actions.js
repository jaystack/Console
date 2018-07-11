import { getConfig, getQuery } from './selectors';
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
  const accounts = await db.select('accounts').find();
  dispatch(state => ({ ...state, accounts }));
};

export const resolveSlackAccount = token => state => async (dispatch, getState, { connectors }) => {
  const slack = connectors.getConstructor('slack');
  return await slack.resolveAccountByToken(token);
};

export const readProjects = () => state => async (dispatch, getState, { db }) => {
  const projects = await db.select('projects').find();
  dispatch(state => ({ ...state, projects, selectedProjectId: projects.length > 0 ? projects[0]._id : null }));
};

export const createProject = name => state => async (dispatch, getState, { db }) => {
  const { _id } = await db.select('projects').insert({ name, sources: [] });
  await dispatch(readProjects());
  dispatch(selectProject(_id));
};

export const removeProject = _id => state => async (dispatch, getState, { db }) => {
  await db.select('projects').remove({ _id });
  await dispatch(readProjects());
};

export const renameProject = (_id, name) => state => async (dispatch, getState, { db }) => {
  await db.select('projects').update({ _id }, { name });
  await dispatch(readProjects());
};

export const selectProject = selectedProjectId => state => ({ ...state, selectedProjectId });
