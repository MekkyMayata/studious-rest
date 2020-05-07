const assert = require('assert');
const index = require("../fix");

describe('tests codebase', () => {

  // it('asserts', () => {
  //   assert(2 !== 'two');
  // })
  it('asserts', () => {
    assert(index.tests(2) === 4);
  })
})
