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

export const getAccount = _id =>
  createSelector([ getAccounts ], accounts => accounts.find(account => account._id === _id)) || null;

export const getConversations = accountId =>
  createSelector([ getAccount(accountId) ], account => (account ? account.conversations : []));

export const getUsers = accountId =>
  createSelector([ getAccount(accountId) ], account => (account ? account.users : []));

export const getResolvedConversations = accountId =>
  createSelector([ getConversations(accountId), getUsers(accountId) ], (conversations, users) =>
    conversations.map(conversation => {
      switch (conversation.type) {
        case 'im':
          return { ...conversation, user: users.find(user => user.id === conversation.userId) };
        case 'group':
          return {
            ...conversation,
            users: conversation.userIds.map(userId => users.find(user => user.id === userId))
          };
        default:
          return conversation;
      }
    })
  );
