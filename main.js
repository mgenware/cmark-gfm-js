const E_MODULE = require('./dist/libcmark');

const convert = E_MODULE.cwrap('cmark_gfm_markdown_to_html', 'string', ['string', 'number', 'number']);
module.exports = convert;
