export default class LambdaProxy {

  private event;
  private context;
  private callback;

  constructor(event, context, callback) {
    this.event = event;
    this.context = context;
    this.callback = callback;
  }

  getBody() {
    if (this.event) {
      return this.event.body ? JSON.parse(this.event.body) : event;
    }
    return null;
  }

  response(body) {
    const response = {
      statusCode: body ? 200 : 404,
      body: JSON.stringify(body)
    };
    if (this.context && this.context.succeed) {
      this.context.succeed(response);
    } else {
      this.callback(null, body);
    }
  }
}
