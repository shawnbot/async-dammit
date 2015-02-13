module.exports = function asyncdammit(sync) {
  return function() {
    var args = [].slice.call(arguments),
        next = args.pop(),
        nextType = typeof next;
    if (nextType !== 'function') {
      throw new Error('expected callback function as last argument, got: ' + nextType);
    }
    try {
      var value = sync.apply(this, args);
    } catch (err) {
      return next(err);
    }
    next(null, value);
  };
};
