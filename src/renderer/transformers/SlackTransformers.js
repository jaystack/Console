const conversationType = conv => {
  if (conv.is_channel) return 'channel';
  if (conv.is_group) return 'group';
  if (conv.is_im) return 'im';
  if (conv.is_mpim) return 'mpim';
  return false;
};

export const SlackConversationTransformer = conv => ({
  id: conv.id,
  name: conv.name,
  created: conv.created,
  type: conversationType(conv),
  creator_id: conv.creator,
});


export const SlackMessageTransformer = message => ({
  id: `${message.user}.${message.ts}`,
  created: message.ts,
  content: message.text,
  user: message.user,
  reactions: JSON.stringify(message.reactions)
});
