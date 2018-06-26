import {
  SlackConnector,
  EmailConnector,
  GithubConnector,
  StrideConnector
} from './connectors';

export default class ConnectorFactory {
  static make(type, object) {
    let connector;

    switch (type) {
      case "slack":
        connector = new SlackConnector(object);
        break;

      case "email":
        connector = new EmailConnector(object);
        break;

      case "github":
        connector = new GithubConnector(object);
        break;

      case "stride":
        connector = new StrideConnector(object);
        break;
      default:
        break;
    }

    return connector;
  }
}
