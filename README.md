# [@fav/prop.visit][repo-url] [![NPM][npm-img]][npm-url] [![MIT License][mit-img]][mit-url] [![Build Status][travis-img]][travis-url] [![Build Status][appveyor-img]][appveyor-url] [![Coverage status][coverage-img]][coverage-url]

Visits each properties in a plain object tree.

> "fav" is an abbreviation of "favorite" and also the acronym of "for all versions".
> This package is intended to support all Node.js versions and many browsers as possible.
> At least, this package supports Node.js >= v0.10 and major Web browsers: Chrome, Firefox, IE11, Edge, Vivaldi and Safari.


## Install

To install from npm:

```sh
$ npm install --save @fav/prop.visit
```

***NOTE:*** *npm < 2.7.0 does not support scoped package, but even old version Node.js supports it. So when you use such older npm, you should download this package from [github.com][repo-url], and move it in `node_modules/@fav/prop.visit/` directory manually.*


## Usage

For Node.js:

```js
var visit = require('@fav/prop.visit');
var logs = [];
visit({ a: 100, b: { c: 'C' } }, function(key, value, index, count, parentKeys, parentNode) {
  logs.push([key, value, index, count, parentKeys, parentNode]);
});
// => [
//  [ 'a', 100, 0, 2, [], { a: 100, b: { c: 'C' } } ],
//  [ 'b', { c: 'C' }, 1, 2, [], { a: 100, b: { c: 'C' } } ],
//  [ 'c', 'C', 0, 1, [ 'b' ], { c: 'C' } ] ]
// ]
```

For Web browsers:

```html
<script src="fav.prop.visit.min.js"></script>
<script>
var visit = fav.prop.visit;
var logs = [];
visit({ a: 100, b: { c: 'C' } }, function(key, value, index, count, parentKeys, parentNode) {
  logs.push([key, value, index, count, parentKeys, parentNode]);
});
// => [
//  [ 'a', 100, 0, 2, [], { a: 100, b: { c: 'C' } } ],
//  [ 'b', { c: 'C' }, 1, 2, [], { a: 100, b: { c: 'C' } } ],
//  [ 'c', 'C', 0, 1, [ 'b' ], { c: 'C' } ] ]
// ]
</script>
```


## API

### <u>visit(obj, fn) : Void</u>

Visits each nodes in a plain object tree.
This function deeply traces property nodes which are plain objects only, and apply a given function to enumerable and own properties (keys and symbols) of the traced property nodes.

#### Parameters:

| Parameter |   Type   | Description                                        |
|-----------|:--------:|----------------------------------------------------|
| *obj*     | object   | A plain object to be traced its properties deeply. |
| *fn*      | function | A function to be applied to visited properties.    | 

The second argument function is passed following parameters, and the return value of this function controls if this function is applied to child and descendant properties of current property.

* **APIs of the second argument function**

    **Parameter:**

    | Parameter |   Type   | Description                             |
    |-----------|:--------:|-----------------------------------------|
    | *key*     | string   | A key of current property.              |
    | *value*   | *any*    | A value of current property.            |
    | *index*   | number   | Index of current property among sibling properties. |
    | *count*   | number   | Count of sibling properties             |
    | *parentKeys* | Array | An array which contains keys of ancestor properties and represents a trace path to current property. Also, the length of this array suggests the *depth* of property tree. | 
    | *parentNode* | object | A plain object which is a parent node. | 

    **Returns:**

    True, if stop digging child and descendant properties.

    **Type:** boolean

## Checked                                                                      

### Node.js (4〜9)

| Platform  |   4    |   5    |   6    |   7    |   8    |   9    |
|:---------:|:------:|:------:|:------:|:------:|:------:|:------:|
| macOS     |&#x25ef;|&#x25ef;|&#x25ef;|&#x25ef;|&#x25ef;|&#x25ef;|
| Windows10 |&#x25ef;|&#x25ef;|&#x25ef;|&#x25ef;|&#x25ef;|&#x25ef;|
| Linux     |&#x25ef;|&#x25ef;|&#x25ef;|&#x25ef;|&#x25ef;|&#x25ef;|

### io.js (1〜3)

| Platform  |   1    |   2    |   3    |
|:---------:|:------:|:------:|:------:|
| macOS     |&#x25ef;|&#x25ef;|&#x25ef;|
| Windows10 |&#x25ef;|&#x25ef;|&#x25ef;|
| Linux     |&#x25ef;|&#x25ef;|&#x25ef;|

### Node.js (〜0.12)

| Platform  |  0.7   |  0.8   |  0.9   |  0.10  |  0.11  |  0.12  |
|:---------:|:------:|:------:|:------:|:------:|:------:|:------:|
| macOS     |        |&#x25ef;|&#x25ef;|&#x25ef;|&#x25ef;|&#x25ef;|
| Windows10 |        |&#x25ef;|&#x25ef;|&#x25ef;|&#x25ef;|&#x25ef;|
| Linux     |&#x25ef;|&#x25ef;|&#x25ef;|&#x25ef;|&#x25ef;|&#x25ef;|

### Web browsers

| Platform  | Chrome | Firefox | Vivaldi | Safari |  Edge  | IE11   |
|:---------:|:------:|:-------:|:-------:|:------:|:------:|:------:|
| macOS     |&#x25ef;|&#x25ef; |&#x25ef; |&#x25ef;|   --   |   --   |
| Windows10 |&#x25ef;|&#x25ef; |&#x25ef; |   --   |&#x25ef;|&#x25ef;|
| Linux     |&#x25ef;|&#x25ef; |&#x25ef; |   --   |   --   |   --   |


## License

Copyright (C) 2017 Takayuki Sato

This program is free software under [MIT][mit-url] License.
See the file LICENSE in this distribution for more details.

[repo-url]: https://github.com/sttk/fav-prop.visit/
[npm-img]: https://img.shields.io/badge/npm-v0.3.0-blue.svg
[npm-url]: https://www.npmjs.com/package/@fav/prop.visit
[mit-img]: https://img.shields.io/badge/license-MIT-green.svg
[mit-url]: https://opensource.org/licenses/MIT
[travis-img]: https://travis-ci.org/sttk/fav-prop.visit.svg?branch=master
[travis-url]: https://travis-ci.org/sttk/fav-prop.visit
[appveyor-img]: https://ci.appveyor.com/api/projects/status/github/sttk/fav-prop.visit?branch=master&svg=true
[appveyor-url]: https://ci.appveyor.com/project/sttk/fav-prop-visit
[coverage-img]: https://coveralls.io/repos/github/sttk/fav-prop.visit/badge.svg?branch=master
[coverage-url]: https://coveralls.io/github/sttk/fav-prop.visit?branch=master
