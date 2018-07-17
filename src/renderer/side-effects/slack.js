import invoke from './request';

const baseUrl = 'http://slack.com/api/';

const request = (token, method, url, { headers = {}, ...args } = {}) =>
  invoke(method, baseUrl + url, { headers: { ...headers, Authorization: `Bearer ${token}` }, ...args }).then(
    res => res.data
  );

export const resolveAccountByToken = async token => {
  const { team: { id, name: teamName } } = await request(token, 'get', 'team.info');
  const { profile: { real_name: username } } = await request(token, 'get', 'users.profile.get');
  const { ims } = await request(token, 'get', 'im.list');
  const { groups } = await request(token, 'get', 'groups.list');
  const { channels } = await request(token, 'get', 'channels.list');
  const { members } = await request(token, 'get', 'users.list');
  const conversations = [
    ...ims.map(({ id, user: userId }) => ({ type: 'im', id, userId })),
    ...groups.map(({ id, members: userIds }) => ({ type: 'group', id, userIds })),
    ...channels.map(({ id, name }) => ({ type: 'channel', id, name }))
  ];
  const users = members.map(({ id, name }) => ({ id, name }));
  return { id, username, teamName, conversations, users };
};
