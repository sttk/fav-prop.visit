(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g=(g.fav||(g.fav = {}));g=(g.prop||(g.prop = {}));g.visit = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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

    var stopDigging = fn.call(this, prop, val, i, n, parentProps, obj);

    if (!stopDigging && isPlainObject(val)) {
      visitEachProps(val, fn, i, n, parentProps.concat(prop));
    }
  }
}

module.exports = visit;

},{"@fav/prop.enum-own-props":3,"@fav/type.is-function":5,"@fav/type.is-plain-object":6}],2:[function(require,module,exports){
'use strict';

function enumOwnKeys(obj) {
  switch (typeof obj) {
    case 'object': {
      return Object.keys(obj || {});
    }
    case 'function': {
      return Object.keys(obj);
    }

    // Cause TypeError on Node.js v0.12 or earlier.
    case 'string': {
      return Object.keys(new String(obj));
    }
    default: {
      return [];
    }
  }
}

module.exports = enumOwnKeys;

},{}],3:[function(require,module,exports){
'use strict';

var enumOwnKeys = require('@fav/prop.enum-own-keys');
var enumOwnSymbols = require('@fav/prop.enum-own-symbols');

function enumOwnProps(obj) {
  return enumOwnKeys(obj).concat(enumOwnSymbols(obj));
}

module.exports = enumOwnProps;

},{"@fav/prop.enum-own-keys":2,"@fav/prop.enum-own-symbols":4}],4:[function(require,module,exports){
'use strict';

function enumOwnSymbols(obj) {
  /* istanbul ignore if */
  if (typeof Symbol !== 'function') {
    return [];
  }

  switch (typeof obj) {
    case 'object': {
      obj = obj || {};
      break;
    }
    case 'function': {
      break;
    }
    default: {
      return [];
    }
  }

  var symbols = Object.getOwnPropertySymbols(obj);
  for (var i = symbols.length - 1; i >= 0; i--) {
    var descriptor = Object.getOwnPropertyDescriptor(obj, symbols[i]);
    if (!descriptor.enumerable) {
      symbols.splice(i, 1);
    }
  }
  return symbols;
}

module.exports = enumOwnSymbols;

},{}],5:[function(require,module,exports){
'use strict';

function isFunction(value) {
  return (typeof value === 'function');
}

function isNotFunction(value) {
  return (typeof value !== 'function');
}

Object.defineProperty(isFunction, 'not', {
  enumerable: true,
  value: isNotFunction,
});

module.exports = isFunction;

},{}],6:[function(require,module,exports){
'use strict';

function isPlainObject(value) {
  if (typeof value !== 'object') {
    return false;
  }

  if (Object.prototype.toString.call(value) !== '[object Object]') {
    return false;
  }

  switch (Object.getPrototypeOf(value)) {
    case Object.prototype: {
      return true;
    }
    case null: {
      return true;
    }
    default: {
      return false;
    }
  }
}

function isNotPlainObject(value) {
  return !isPlainObject(value);
}

Object.defineProperty(isPlainObject, 'not', {
  enumerable: true,
  value: isNotPlainObject,
});

module.exports = isPlainObject;

},{}]},{},[1])(1)
});
