const gfm = require('..');

const markdown = '# Hi\nThis ~text~~~~ is ~~~~curious 😡🙉🙈~.'
const html = gfm.convert(markdown);
console.log(html);
