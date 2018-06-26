import BaseConnector from "./BaseConnector";

export default class StrideConnector extends BaseConnector {

  constructor(credentials, options = {}) {
    super(credentials, "stride.com", options);
  }
};
