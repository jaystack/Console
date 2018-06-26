import BaseConnector from "./BaseConnector";

export default class EmailConnector extends BaseConnector {

  constructor(credentials, options = {}) {
    super(credentials, null, options);
  }
};
