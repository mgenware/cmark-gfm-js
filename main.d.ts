// Type definitions for cmark-gfm-js
export as namespace CmarkGFM;

/*~ convert converts a GitHub Flavored Markdown (GFM) string to HTML.
 */
export function convert(markdown: string, options?: number): string;

/*~ convertUnsafe calls convert with GFM's tagfilter extension disabled.
 */
export function convertUnsafe(markdown: string, options?: number): string;

export enum Option {
  /**
   * ### Options affecting rendering
   */

  /** Include a `data-sourcepos` attribute on all block elements.
   */
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
