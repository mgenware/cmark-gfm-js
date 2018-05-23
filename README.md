# cmark-gfm-js

[![MEAN Module](https://img.shields.io/badge/MEAN%20Module-TypeScript-blue.svg?style=flat-square)](https://github.com/mgenware/MEAN-Module)
[![Build Status](https://img.shields.io/travis/mgenware/cmark-gfm-js.svg?style=flat-square&label=Build+Status)](https://travis-ci.org/mgenware/cmark-gfm-js)
[![npm version](https://img.shields.io/npm/v/cmark-gfm-js.svg?style=flat-square)](https://npmjs.com/package/cmark-gfm-js)
[![Node.js Version](http://img.shields.io/node/v/cmark-gfm-js.svg?style=flat-square)](https://nodejs.org/en/)

* A port of GitHub's [cmark](https://github.com/github/cmark) to JavaScript (using Emscripten)
* Support Node.js and browser
* [GitHub Flavored Markdown (GFM) Compatibility](#gfm-compatibility)
* [HTML Sanitization](#html-sanitization)
* [Benchmarks](https://github.com/mgenware/node-markdown-parser-performance)
* TypeScript friendly

## Installation
### Node.js
```sh
yarn add cmark-gfm-js
```

### Browser
Download [cmark-gfm.js](https://raw.githubusercontent.com/mgenware/cmark-gfm-js/master/dist/cmark-gfm.js)

## Usage
```typescript
/**
 * convert converts a GitHub Flavored Markdown (GFM) string to HTML.
 */
function convert(markdown: string, options?: number): string;

/**
 * convertUnsafe calls convert with GFM's tagfilter extension disabled. (See "HTML Sanitization" below for details)
 */
function convertUnsafe(markdown: string, options?: number): string;
```

## Examples
In Node.js:
```js
const gfm = require('cmark-gfm-js');

const markdown = '# Hi\nThis ~text~~~~ is ~~~~curious 😡🙉🙈~.';
let html = gfm.convert(markdown);
console.log(html);
/** Prints: 
  <h1>Hi</h1>
  <p>This <del>text</del> is <del>curious 😡🙉🙈</del>.</p>
*/

// Specify an option
html = gfm.convert(markdown, gfm.Option.sourcePos);
console.log(html);
/** Prints
  <h1 data-sourcepos="1:1-1:4">Hi</h1>
  <p data-sourcepos="2:1-2:44">This <del>text</del> is <del>curious 😡🙉🙈</del>.</p>
*/
```

In browser:
```html
<p id="text"></p>
<hr/>
<p id="html"></p>
<p id="htmlPreview"></p>
<script src="../dist/cmark-gfm.js"></script>
<script>
  if (!CmarkGFM) {
    document.getElementById('text').textContent = 'window.CmarkGFM not defined. Please build the project and refresh this page.';
  } else {
    var markdown = '# Hi\nThis ~text~~~~ is ~~~~curious 😡🙉🙈~.';
    var html = CmarkGFM.convert(markdown);
    
    document.getElementById('text').innerHTML = 'Markdown (GFM): <p><code>' + markdown + '</code></p>';
    document.getElementById('html').innerHTML = html;

    // Specify an option
    var htmlWithSourcePos = CmarkGFM.convert(markdown, CmarkGFM.Option.sourcePos);
    document.getElementById('htmlPreview').textContent = htmlWithSourcePos;
  }
</script>
```

## GFM Compatibility
[Task list items](https://github.github.com/gfm/#task-list-items-extension-) are not supported ([issue](https://github.com/github/cmark/issues/23)). Use emojis instead. e.g.
```
✅ Done.
❌ To be done.
```

## HTML Sanitization
### Some background
> TL;DR: See [A Good HTML Sanitizer](#a-good-html-sanitizer) for a working example of a HTML Sanitizer.

The current [CommonMark Spec 0.27](https://spec.commonmark.org/0.27/) allows raw HTML tags in markdown but does not state anything on sanitizing raw HTML data. cmark-gfm comes with two possible (but not perfect) builtin solutions.

* cmark comes with a `SAFE` option, which will suppress most raw HTML tags (see Options below). **Drawback**: many safe tags are killed, not configurable.
* cmark-gfm comes with an extension called `tagfilter`, which filters a set of HTML tags, and is written in GFM Spec. (see [spec](https://github.github.com/gfm/#disallowed-raw-html-extension-)). **Drawbacks**: cannot filter tags with malicious attributes, not configurable.

Let's see a real example:
```js
const gfm = require('cmark-gfm-js');

/** Consider the following markdown
  ❌ <script>alert(1)</script>
  ❌ <img src="x.jpg" onclick="alert(1)"/>
  ✅ <img src="cool.jpg"/>
  ✅ <figcaption>caption</figcaption>
*/
const dangerous = '<script>alert(1)</script>\n<img src="x.jpg" onclick="alert(1)"/>\n<img src="cool.jpg"/>\n<figcaption>caption</figcaption>';

// GFM's tagfilter is enabled by default.
const tagfiltered = gfm.convert(dangerous);
console.log(tagfiltered);
/** Prints
  &lt;script>alert(1)&lt;/script>
  <img src="x.jpg" onclick="alert(1)"/>
  <img src="cool.jpg"/>
  <figcaption>caption</figcaption>
*/

// Do not use GFM's tagfilter, use cmark's SAFE option.
// gfm.convertUnsafe will disable GFM's tagfilter extension.
const cmarkSafe = gfm.convertUnsafe(dangerous, gfm.Option.safe);
console.log(cmarkSafe);
/** Prints
  <!-- raw HTML omitted -->
  <!-- raw HTML omitted -->
*/
```

So actually none of the above solutions work perfectly. GFM's tag filter is not able to filter some tags with malicious attributes, while cmark's `SAFE` option seems like an overkill. 

### A Good HTML Sanitizer
**If you want to sanitize HTML in a good way, I suggest you completely ignore the builtin solutions above from cmark-gfm, instead output raw HTML with `gfm.convertUnsafe` and use a more professional HTML sanitizer instead. For example [ting](https://github.com/mgenware/ting)**:
```js
const gfm = require('cmark-gfm-js');
const ting = require('ting');

/** Dangerous markdown
  ❌ <script>alert(1)</script>
  ❌ <img src="x.jpg" onclick="alert(1)"/>
  ✅ <img src="cool.jpg"/>
  ✅ <figcaption>caption</figcaption>
*/
const dangerous = '<script>alert(1)</script>\n<img src="x.jpg" onclick="alert(1)"/>\n<img src="cool.jpg"/>\n<figcaption>caption</figcaption>';

const unsafeHTML = gfm.convertUnsafe(dangerous);
const safeHTML = ting.sanitize(unsafeHTML);

console.log(`Unsafe:\n${unsafeHTML}\nSafe: ${safeHTML}`);
/** Prints 
  Unsafe:
  <script>alert(1)</script>
  <img src="x.jpg" onclick="alert(1)"/>
  <img src="cool.jpg"/>
  <figcaption>caption</figcaption>

  Safe:
  <img src="x.jpg" />
  <img src="cool.jpg" />
  <figcaption>caption</figcaption>
*/
```

See `examples/sanitizeHTML` for full source code.

## cmark-gfm Options
```typescript
enum Option {
  /**
   * ### Options affecting rendering
   */

  /** Include a `data-sourcepos` attribute on all block elements. */
  sourcePos = (1 << 1),

  /** Render `softbreak` elements as hard line breaks.
   */
  softBreak = (1 << 2),

  /** Suppress raw HTML and unsafe links (`javascript:`, `vbscript:`,
   * `file:`, and `data:`, except for `image/png`, `image/gif`,
   * `image/jpeg`, or `image/webp` mime types).  Raw HTML is replaced
   * by a placeholder HTML comment. Unsafe links are replaced by
   * empty strings.
   */
  safe = (1 << 3),

  /** Render `softbreak` elements as spaces.
   */
  noBreaks = (1 << 4),

  /**
   * ### Options affecting parsing
   */

  /** Legacy option (no effect).
   */
  normalize = (1 << 8),

  /** Validate UTF-8 in the input before parsing, replacing illegal
   * sequences with the replacement character U+FFFD.
   */
  validateUTF8 = (1 << 9),

  /** Convert straight quotes to curly, --- to em dashes, -- to en dashes.
   */
  smart = (1 << 10),

  /** Use GitHub-style <pre lang="x"> tags for code blocks instead of <pre><code
   * class="language-x">.
   */
  githubPreLang = (1 << 11),

  /** Be liberal in interpreting inline HTML tags.
   */
  liberalHTMLTag = (1 << 12),

  /** Parse footnotes.
   */
  footnotes = (1 << 13),

  /** Only parse strikethroughs if surrounded by exactly 2 tildes.
   * Gives some compatibility with redcarpet.
   */
  strikethroughDoubleTilde = (1 << 14),

  /** Use style attributes to align table cells instead of align attributes.
   */
  tablePreferStyleAttributes = (1 << 15),
  
  /** tablePreferStyleAttributes.
   */
  default = tablePreferStyleAttributes,
}
```

## Who is using cmark-gfm-js
[Coldfunction](coldfunction.com) is using cmark-gfm-js to generate HTML from markdown in browser, and uses cmark-gfm in its backend services.
