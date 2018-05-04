
const gfm = require('..');
const { convert } = gfm;
const assert = require('assert');

it('strikethrough', () => {
  assert.equal(convert('# Hi\nThis ~text~~~~ is ~~~~curious 😡🙉🙈~.'), '<h1>Hi</h1>\n<p>This <del>text</del> is <del>curious 😡🙉🙈</del>.</p>\n');
});

it('table-1', () => {
  assert.equal(convert(`| foo | bar |
| --- | --- |
| baz | bim |`), `<table>
<thead>
<tr>
<th>foo</th>
<th>bar</th>
</tr>
</thead>
<tbody>
<tr>
<td>baz</td>
<td>bim</td>
</tr></tbody></table>
`);
});

it('table-2', () => {
  assert.equal(convert(`| abc | def |
| --- | --- |`), `<table>
<thead>
<tr>
<th>abc</th>
<th>def</th>
</tr>
</thead></table>
`);
});

it('autolinks', () => {
  assert.equal(convert('<p><a href="http://www.commonmark.org">www.commonmark.org</a></p>'), '<p><a href="http://www.commonmark.org">www.commonmark.org</a></p>\n');
});

it('autolinks-2', () => {
  assert.equal(convert('www.commonmark.org/he<lp'), '<p><a href="http://www.commonmark.org/he">www.commonmark.org/he</a>&lt;lp</p>\n');
});

it('autolinks-3', () => {
  assert.equal(convert(`a.b-c_d@a.b

a.b-c_d@a.b.

a.b-c_d@a.b-

a.b-c_d@a.b_`), `<p><a href="mailto:a.b-c_d@a.b">a.b-c_d@a.b</a></p>
<p><a href="mailto:a.b-c_d@a.b">a.b-c_d@a.b</a>.</p>
<p>a.b-c_d@a.b-</p>
<p>a.b-c_d@a.b_</p>
`);
});

it('safe output', () => {
  assert.equal(convert(`<strong> <title> <style> <em>

<blockquote>
  <xmp> is disallowed.  <XMP> is also disallowed.
</blockquote>`), `<p><strong> &lt;title> &lt;style> <em></p>
<blockquote>
  &lt;xmp> is disallowed.  &lt;XMP> is also disallowed.
</blockquote>
`);
});