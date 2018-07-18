export const getAccountName = account => {
  switch (account.type) {
    case 'slack':
      return `${account.username} at ${account.teamName}`;
    default:
      return account.username;
  }
};

export const getAccountIcon = type => {
  switch (type) {
    case 'slack':
      return 'static/slack-logo.png';
    case 'github':
      return 'static/github-logo.png';
    case 'email':
      return 'static/email-logo.png';
    default:
      return '';
  }
};

export const getConversationName = resolvedConversation => {
  switch (resolvedConversation.type) {
    case 'im':
      return resolvedConversation.user;
    case 'group':
      return resolvedConversation.users.join(', ');
    case 'channel':
      return resolvedConversation.name;
    default:
      return '';
  }
};

export const getConversationIcon = type => {
  switch (type) {
    case 'im':
      return 'person';
    case 'group':
      return 'people';
    case 'channel':
      return 'mdi mdi-pound';
    default:
      return '';
  }
};
