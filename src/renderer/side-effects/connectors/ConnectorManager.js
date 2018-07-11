import SlackConnector from './SlackConnector';
import GithubConnector from './GithubConnector';

export default class ConnectorManager {
  static instance;

  constructor() {
    if (this.constructor.instance) return this.constructor.getInstance();
    this.connectors = [];
    this.constructor.instance = this;
    this.constructors = {
      slack: SlackConnector,
      github: GithubConnector
    };
  }

  createBySources(sources, db) {
    this.connectors = sources.map(({ type }) => {
      const Connector = this.getConstructor(type);
      return new Connector(db);
    });
  }

  of(index) {
    return this.connectors[index];
  }

  getConstructor(type) {
    return this.constructors[type];
  }
}
