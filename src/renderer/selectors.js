import { createSelector } from 'reselect';

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
  conversations.map(conversation => {
    switch (conversation.type) {
      case 'im':
        return { ...conversation, user: (users.find(user => user.id === conversation.userId) || {}).name };
      case 'group':
        return {
          ...conversation,
          users: conversation.userIds.map(userId => (users.find(user => user.id === userId) || {}).name)
        };
      default:
        return conversation;
    }
  })
);

export const getRepos = createSelector(
  getAccount,
  account => (account && account.type === 'github' ? account.repos : [])
);
