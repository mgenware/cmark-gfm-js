const gfm = require('../..');
const sanitizeHTML = require('sanitize-html');

const dangerous = '<script>alert(1)</script>\n<img src="x.jpg" onclick="alert(1)"/>\n<img src="cool.jpg"/>\n<figcaption>caption</figcaption>';

const unsafeHTML = gfm.convertUnsafe(dangerous);
const safeHTML = sanitizeHTML(unsafeHTML, {
  allowedTags: sanitizeHTML.defaults.allowedTags.concat([ 'img', 'figcaption' ]),
});

console.log(`Unsafe:\n${unsafeHTML}\nSafe: ${safeHTML}`);
