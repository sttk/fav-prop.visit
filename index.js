'use strict';

var isPlainObject = require('@fav/type.is-plain-object');
var isFunction = require('@fav/type.is-function');
var enumOwnProps = require('@fav/prop.enum-own-props');

function visit(obj, fn) {
  if (!isPlainObject(obj)) {
    return;
  }

  if (!isFunction(fn)) {
    return;
  }

  visitEachProps(obj, fn, 0, 1, []);
}

function visitEachProps(obj, fn, index, count, parentProps) {
  var props = enumOwnProps(obj);
  for (var i = 0, n = props.length; i < n; i++) {
    var prop = props[i];
    var val = obj[prop];

    var stopDigging = fn.call(this, prop, val, i, n, parentProps);

    if (!stopDigging && isPlainObject(val)) {
      visitEachProps(val, fn, i, n, parentProps.concat(prop));
    }
  }
}

module.exports = visit;
