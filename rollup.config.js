import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import builtins from 'rollup-plugin-node-builtins';
import uglify from 'rollup-plugin-uglify';

export default {
  input: './main.js',
  output: {
    name: 'cmark_gfm_js',
    file: 'dist/bundle_umd.js',
    format: 'umd',
  },
  plugins: [
    resolve({ jsnext: true, browser: true }),
    commonjs(),
    builtins(),
    uglify(),
  ],
};
