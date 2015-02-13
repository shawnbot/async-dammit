module.exports = function asyncdammit(sync) {
  'use strict';
  return function async() {
    var args = [].slice.call(arguments),
        next = args.pop(),
        nextType = typeof next,
        value;
    if (nextType !== 'function') {
      throw new Error('expected callback function as last argument, got: ' + nextType);
    }
    try {
      value = sync.apply(this, args);
    } catch (err) {
      return next(err);
    }
    next(null, value);
  };
};
