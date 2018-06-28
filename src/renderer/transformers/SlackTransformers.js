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
  created: new Date(conv.created * 1000).toUTCString(),
  type: conversationType(conv),
  creator_id: conv.creator,
});
