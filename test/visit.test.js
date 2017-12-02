'use strict';

var chai = require('chai');
var expect = chai.expect;
var fav = {}; fav.prop = {}; fav.prop.visit = require('..');

var visit = fav.prop.visit;

var logs = [];

function logger(key, value, index, count, parentKeys) {
  logs.push([key, value, index, count, parentKeys]);
}

describe('visit', function () {

  beforeEach(function() {
    logs = [];
  });

  it('Should visit all nodes in a plain object tree - empty', function() {
    var obj = {};
    visit(obj, logger);
    expect(logs).to.deep.equal([]);
  });

  it('Should visit all nodes in a plain object tree - depth=1', function() {
    var obj = { a: 1, b: true, c: 'abc' };
    visit(obj, logger);
    expect(logs).to.deep.equal([
      ['a', 1, 0, 3, []],
      ['b', true, 1, 3, []],
      ['c', 'abc', 2, 3, []],
    ]);
  });

  it('Should visit all nodes in a plain object tree - depth>=2', function() {
    var obj = { a: 1, b: { c: true, d: { e: 'abc' } } };
    visit(obj, logger);
    expect(logs).to.deep.equal([
      ['a', 1, 0, 2, []],
      ['b', { c: true, d: { e: 'abc' } }, 1, 2, []],
      ['c', true, 0, 2, ['b']],
      ['d', { e: 'abc' }, 1, 2, ['b']],
      ['e', 'abc', 0, 1, ['b', 'd']],
    ]);
  });

  it('Should not visit properties which are not plain objects', function() {
    var fn = function f() {};
    var obj = { a: [1, 2], b: { c: new Date(0) }, d: fn };
    visit(obj, logger);
    expect(logs).to.deep.equal([
      ['a', [1, 2], 0, 3, []],
      ['b', { c: new Date(0) }, 1, 3, []],
      ['c', new Date(0), 0, 1, ['b']],
      ['d', fn, 2, 3, []],
    ]);
  });

  it('Should do nothing when argument is not a plain object', function() {
    visit(undefined, logger);
    expect(logs.length).to.equal(0);

    visit(null, logger);
    expect(logs.length).to.equal(0);

    visit(true, logger);
    expect(logs.length).to.equal(0);

    visit(false, logger);
    expect(logs.length).to.equal(0);

    visit(0, logger);
    expect(logs.length).to.equal(0);

    visit(123, logger);
    expect(logs.length).to.equal(0);

    visit('', logger);
    expect(logs.length).to.equal(0);

    visit('ABC', logger);
    expect(logs.length).to.equal(0);

    visit([], logger);
    expect(logs.length).to.equal(0);

    visit([1, 2, 3], logger);
    expect(logs.length).to.equal(0);

    visit(function ff() {}, logger);
    expect(logs.length).to.equal(0);

    visit(new Date(), logger);
    expect(logs.length).to.equal(0);
  });

  it('Should do nothing when second argument is not a function', function() {
    var obj = { a: 1, b: true, c: 'abc' };
    visit(obj);
    visit(obj, undefined);
    visit(obj, null);
    visit(obj, true);
    visit(obj, false);
    visit(obj, 0);
    visit(obj, 123);
    visit(obj, '');
    visit(obj, 'abc');
    visit(obj, []);
    visit(obj, [1, 2, 3]);
    visit(obj, {});
    visit(obj, { a: 1, b: 'B' });
    visit(obj, new Date());

    if (typeof Symbol === 'function') {
      visit(obj, Symbol('foo'));
    }
  });

  it('Should not visit properties which are symbols', function() {
    if (typeof Symbol !== 'function') {
      this.skip();
      return;
    }

    var foo = Symbol('foo'), bar = Symbol('bar');
    var obj = { a: foo, b: { c: bar } };
    visit(obj, logger);
    expect(logs).to.deep.equal([
      ['a', foo, 0, 2, []],
      ['b', { c: bar }, 1, 2, []],
      ['c', bar, 0, 1, ['b']],
    ]);
  });

  it('Should do nothing when argument is not a symbol', function() {
    if (typeof Symbol !== 'function') {
      this.skip();
      return;
    }

    visit(Symbol('foo'), logger);
    expect(logs.length).to.equal(0);
  });

  it('Should stop digging when 2nd argument function return true', function() {
    var src = { a: { b: { c: { d: 123 }, e: { f: 'FFF' } } } };
    visit(src, function(key, value, index, count, parentKeys) {
      logs.push([key, parentKeys]);
      return (parentKeys.length >= 2);
    });

    expect(logs).to.deep.equal([
      ['a', []],
      ['b', ['a']],
      ['c', ['a', 'b']],
      ['e', ['a', 'b']],
    ]);
  });
});
