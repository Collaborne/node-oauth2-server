import * as statuses from 'statuses';

export class OAuthError extends Error {
  code: any;
  status: any;
  statusCode: any;
  constructor(messageOrError: string | Error, properties: any = {}) {
    super();
    let message =
      messageOrError instanceof Error ? messageOrError.message : messageOrError;
    const error = messageOrError instanceof Error ? messageOrError : undefined;
    const props = { code: 500, ...properties};

    if (error) {
      props.inner = error;
    }
    if (!message) {
      message = statuses[props.code] || '';
    }
    this.code = this.status = this.statusCode = props.code;
    this.message = message;

    const ignoreAttr = ['code', 'message'];
    Object.keys(props)
      .filter(key => !ignoreAttr.includes(key))
      .forEach(key => (this[key] = props[key]));

    // XXX: Is this really needed?
    Error.captureStackTrace(this, OAuthError);
  }
}
