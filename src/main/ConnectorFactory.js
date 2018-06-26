import SlackConnector from './connectors/SlackConnector';
import EmailConnector from './connectors/EmailConnector';
import GithubConnector from './connectors/GithubConnector';
import StrideConnector from './connectors/StrideConnector';

export default class ConnectorFactory {
  static make(type, credentials, options = {}) {
    let connector;

    switch (type) {
      case "slack":
        connector = new SlackConnector(credentials, options);
        break;

      case "email":
        connector = new EmailConnector(credentials, options);
        break;

      case "github":
        connector = new GithubConnector(credentials, options);
        break;

      case "stride":
        connector = new StrideConnector(credentials, options);
        break;
      default:
        break;
    }

    return connector;
  }
}
