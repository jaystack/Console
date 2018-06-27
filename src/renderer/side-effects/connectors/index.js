import SlackConnector from './SlackConnector';
import GithubConnector from './GithubConnector';

export default {
  slack: new SlackConnector(),
  github: new GithubConnector()
};
