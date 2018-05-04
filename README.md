# cmark-gfm-js

[![MEAN Module](https://img.shields.io/badge/MEAN%20Module-TypeScript-blue.svg?style=flat-square)](https://github.com/mgenware/MEAN-Module)
[![Build Status](https://img.shields.io/travis/mgenware/cmark-gfm-js.svg?style=flat-square&label=Build+Status)](https://travis-ci.org/mgenware/cmark-gfm-js)
[![npm version](https://img.shields.io/npm/v/cmark-gfm-js.svg?style=flat-square)](https://npmjs.com/package/cmark-gfm-js)

* A port of GitHub's [cmark](https://github.com/github/cmark) to JavaScript.
* Support Node.js and browser.
* 100% compatible with GitHub Flavored Markdown (GFM).
* Come with TypeScript definition file.

## Installation
### Node.js
```sh
yarn add cmark-gfm-js
```

### Browser
Download [cmark-gfm.js](https://raw.githubusercontent.com/mgenware/cmark-gfm-js/master/dist/cmark-gfm.js)

## Usage
Node.js:
```js
const gfm = require('cmark-gfm-js');

const markdown = '# Hi\nThis ~text~~~~ is ~~~~curious 😡🙉🙈~.'
const html = gfm.convert(markdown);
console.log(html);
// Prints: 
// <h1>Hi</h1>
// <p>This <del>text</del> is <del>curious 😡🙉🙈</del>.</p>
```

Browser:
```html
<p id="html"></p>
<script src="./dist/cmark-gfm.js"></script>
<script>
  if (!CmarkGFM) {
    console.error('window.CmarkGFM not defined. Please import the cmark-gfm-js script.');
  } else {
    var markdown = '# Hi\nThis ~text~~~~ is ~~~~curious 😡🙉🙈~.';
    var html = CmarkGFM.convert(markdown);
    
    document.getElementById('html').innerHTML = html;
  }
</script>
```
