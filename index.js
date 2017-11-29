'use strict';

var isPlainObject = require('@fav/type.is-plain-object');
var isFunction = require('@fav/type.is-function');
var enumOwnKeys = require('@fav/prop.enum-own-keys');

function visit(obj, fn) {
  if (!isPlainObject(obj)) {
    return;
  }

  if (!isFunction(fn)) {
    return;
  }

  visitNode(obj, fn, 0, 1, []);
}

function visitNode(obj, fn, index, count, parentKeys) {
  var keys = enumOwnKeys(obj);
  for (var i = 0, n = keys.length; i < n; i++) {
    var key = keys[i];
    var val = obj[key];
    fn.call(this, key, val, i, n, parentKeys);

    if (isPlainObject(val)) {
      visitNode(val, fn, i, n, parentKeys.concat(key));
    }
  }
}

module.exports = visit;
