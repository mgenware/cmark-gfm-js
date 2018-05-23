const gfm = require('../..');
const ting = require('ting');

const dangerous = '<script>alert(1)</script>\n<img src="x.jpg" onclick="alert(1)"/>\n<img src="cool.jpg"/>\n<figcaption>caption</figcaption>';

const unsafeHTML = gfm.convertUnsafe(dangerous);
const safeHTML = ting.sanitize(unsafeHTML);

console.log(`Unsafe:\n${unsafeHTML}\nSafe: ${safeHTML}`);
