class BadRequest extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 40;
  }
}

module.exports = BadRequest;
