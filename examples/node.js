const gfm = require('..');

const markdown = '# Hi\nThis ~text~~~~ is ~~~~curious 😡🙉🙈~.';
let html = gfm.convert(markdown);
console.log(html);

// Specify an option
html = gfm.convert(markdown, gfm.Option.sourcePos);
console.log(html);
