import invoke from './request';
import { sleep } from './time';

const baseUrl = 'https://api.github.com';

const getNext = links => {
  if (!links) return null;
  return links.split(/, /g).reduce((prevLink, linkInfo) => {
    const [ link, type ] = linkInfo.split(/; /g);
    return type === 'rel="next"' ? link.replace('<', '').replace('>', '') : prevLink;
  }, null);
};

const request = async (token, method, url, { headers = {}, query = {}, prevResults, isNext = false, ...args } = {}) => {
  const response = await invoke(method, isNext ? url : baseUrl + url, {
    headers: { ...headers, Authorization: `Bearer ${token}` },
    query: isNext ? {} : { ...query, per_page: 100 },
    ...args
  });
  const result = prevResults ? [ ...prevResults, ...response.data ] : response.data;
  const next = getNext(response.headers.link);
  if (next) {
    await sleep(1000);
    return await request(token, method, next, { isNext: true, prevResults: result });
  } else {
    return result;
  }
};

export const resolveAccountByToken = async token => {
  const { id, login: username } = await request(token, 'get', '/user');
  const repos = await request(token, 'get', '/user/repos');
  return { id, username, repos: repos.map(({ id, name, owner: { login: owner } }) => ({ id, name, owner })) };
};
