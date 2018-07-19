import coreInvoke from './request';
import { sleep } from './time';

const baseUrl = 'https://api.github.com';

const getNext = links => {
  if (!links) return null;
  return links.split(/, /g).reduce((prevLink, linkInfo) => {
    const [ link, type ] = linkInfo.split(/; /g);
    return type === 'rel="next"' ? link.replace('<', '').replace('>', '') : prevLink;
  }, null);
};

export default () => {
  const queues = new Map();

  const addToQueue = request => {
    return new Promise((resolve, reject) => {
      const callback = (error, result) => (error ? reject(error) : resolve(result));
      if (queues.has(request.token)) queues.get(request.token).requests.push({ ...request, callback });
      else queues.set(request.token, { requests: [ { ...request, callback } ], inProgress: false });
      trigger(queues.get(request.token));
    });
  };

  const trigger = async queue => {
    if (queue.inProgress) return;
    const request = queue.requests.shift();
    if (!request) return;
    queue.inProgress = true;
    await fetch(request);
    await sleep(1000);
    queue.inProgress = false;
    trigger(queue);
  };

  const fetch = async ({ token, method, url, headers, query, body, callback }) => {
    try {
      const response = await coreInvoke(method, url, {
        headers: { ...headers, Authorization: `Bearer ${token}` },
        query,
        body
      });
      callback(null, response);
    } catch (error) {
      callback(error);
    }
  };

  const invoke = async (token, method, url, { headers = {}, query = {}, body, prevResults, isNext = false } = {}) => {
    const response = await addToQueue({
      token,
      method,
      url: isNext ? url : baseUrl + url,
      headers: { ...headers, Authorization: `Bearer ${token}` },
      query: isNext ? {} : { ...query, per_page: 100 },
      body
    });
    const result = prevResults ? [ ...prevResults, ...response.data ] : response.data;
    const next = getNext(response.headers.link);
    if (next) {
      await sleep(1000);
      return await invoke(token, method, next, { isNext: true, prevResults: result });
    } else {
      return result;
    }
  };

  const resolveAccountByToken = async token => {
    const { id, login: username } = await invoke(token, 'get', '/user');
    const repos = await invoke(token, 'get', '/user/repos');
    return { id, username, repos: repos.map(({ id, name, owner: { login: owner } }) => ({ id, name, owner })) };
  };

  return {
    resolveAccountByToken
  };
};
