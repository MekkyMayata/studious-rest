const assert = require('assert');
const server = require('../index');

describe('checking the server setup', () => {

  it('validates the server port', () => {
    assert(server._connectionKey === '6::::4000');
  })
});