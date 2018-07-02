const USERIDS = /<@([UW].{8})>/g;

export const MessageResolver = (conversations, users) => message => {
  const content = message.content.replace(USERIDS, (_, userId) => resolveUserName(users, userId));
  return {
    ...message,
    content,
    userName: resolveUserName(users, message.user),
    channelName: resolveChannelName(conversations, message.channelId)
  };
};

const resolveChannelName = (conversations, id) => {
  if (!id) return '';
  const conversation = conversations.find(conv => conv.id === id);
  return conversation ? conversation.name || '' : '';
};

const resolveUserName = (users, id) => {
  if (!id) return '';
  const user = users.find(user => user.id === id);
  return user ? `@${user.username}` || '' : '';
};
