var dammit = require('../'),
    assert = require('assert');

describe('async, dammit', function() {

  it('makes synchronous functions async', function(done) {
    var sync = function addOne(n) { return n + 1; },
        async = dammit(sync);
    async(2, function(error, value) {
      assert.equal(error, null, 'error is not null: ' + error);
      assert.equal(value, 3, 'value is not 3: ' + value);
      done();
    });
  });

  it('handles errors', function(done) {
    var sync = function throwError(n) {
          throw 'error';
        },
        async = dammit(sync);
    async(2, function(error, value) {
      assert.equal(error, 'error', 'unexpected error: ' + error);
      assert.equal(value, undefined, 'value is defined: ' + value);
      done();
    });
  });

  it('passes along arguments', function(done) {
    var sync = function doSomething(a, b, c) {
          assert.equal(arguments.length, 3, 'bad arguments.length: ' + arguments.length);
          return {a: a, b: b, c: c};
        },
        async = dammit(sync);
    async(1, 2, 3, function(error, value) {
      assert.equal(error, null, 'error is not null: ' + error);
      assert.deepEqual(value, {a: 1, b: 2, c: 3}, 'unexpected value: ' + JSON.stringify(value));
      done();
    });
  });

  it('passes calling context', function(done) {
    var context = {foo: 'bar'},
        sync = function syncThis() {
          return this;
        },
        async = dammit(sync);
    async.call(context, function(error, value) {
      assert.equal(error, null, 'error is not null: ' + error);
      assert.strictEqual(value, context, 'unexpected value: ' + JSON.stringify(value));
      done();
    });
  });

});
