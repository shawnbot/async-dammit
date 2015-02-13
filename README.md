# async-dammit
An asynchronous helper for a synchronous world.

1. Install with [npm](https://www.npmjs.com/):
  ```
  npm install async-dammit
  ```

2. Require it:
  ```js
  var _async = require('async-dammit');
  ```

3. Wrap your (least) favorite synchronous function:
  ```js
  var getStuffAsync = _async(getStuffSync);
  ```

4. Profit!
  ```js
  getStuffAsync('path/to/stuff', function(error, stuff) {
  });
  ```
