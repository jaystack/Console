import { createSelector } from 'reselect';
import { getAccountName } from './utils';
import { resolveConversation } from './utils/SlackResolvers';

export const getIsFetching = state => state.isFetching;

export const getIsSettingsOpen = state => state.activeSettingsMenuItem !== null;

export const getActiveSettingsMenuItem = state => state.activeSettingsMenuItem;

export const getAccounts = state => state.accounts;

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

export const getAccount =
  createSelector([ getAccounts, (_, accountId) => accountId ], (accounts, accountId) =>
    accounts.find(account => account._id === accountId)
  ) || null;

export const getConversations = createSelector(
  getAccount,
  account => (account && account.type === 'slack' ? account.conversations : [])
);

export const getSlackUsers = createSelector(
  getAccount,
  account => (account && account.type === 'slack' ? account.users : [])
);

export const getResolvedConversations = createSelector([ getConversations, getSlackUsers ], (conversations, users) =>
  conversations.map(resolveConversation(users))
);

export const getRepos = createSelector(
  getAccount,
  account => (account && account.type === 'github' ? account.repos : [])
);

export const getResolvedSourcesOfSelectedProject = createSelector(
  [ getSelectedProject, getAccounts ],
  (project, accounts) =>
    project.sources
      .map(source => {
        const account = accounts.find(account => account._id === source.accountId);
        if (!account) return null;
        switch (source.type) {
          case 'slack':
            const conversation = account.conversations.find(conversation => conversation.id === source.conversationId);
            return {
              ...source,
              accountDetails: { username: account.username, teamName: account.teamName },
              conversation: resolveConversation(account.users)(conversation)
            };
          case 'github':
            const repo = account.repos.find(repo => repo.id === source.repositoryId);
            return { ...source, accountDetails: { username: account.username }, repo };
          default:
            return source;
        }
      })
      .filter(_ => _)
);
