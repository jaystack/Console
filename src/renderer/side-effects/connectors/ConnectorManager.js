import SlackConnector from './SlackConnector';
import GithubConnector from './GithubConnector';

const getConnector = type => {
  switch (type) {
    case 'slack':
      return SlackConnector;
    case 'github':
      return GithubConnector;
    default:
      throw new Error('Unknown source type');
  }
};

export default class ConnectorManager {
  static instance;

  constructor() {
    if (this.constructor.instance) return this.constructor.getInstance();
    this.connectors = [];
    this.constructor.instance = this;
  }

  createBySources(sources) {
    this.connectors = sources.map(({ type }) => {
      const Connector = getConnector(type);
      return new Connector();
    });
  }

  of(index) {
    return this.connectors[index];
  }
}
