import commonjs from 'rollup-plugin-commonjs';
import copy from 'rollup-plugin-copy';
import execute from 'rollup-plugin-execute';
import livereload from 'rollup-plugin-livereload';
import resolve from 'rollup-plugin-node-resolve';
import svelte from 'rollup-plugin-svelte';
import { terser } from 'rollup-plugin-terser';
import autoPreprocess from 'svelte-preprocess';

const production = !process.env.ROLLUP_WATCH;

export default {
  input: 'src/main.js',
  output: {
    sourcemap: !production,
    format: 'iife',
    name: 'app',
    file: 'dist/bundle.js'
  },
  plugins: [
    execute([
      'node-sass -q src/global.scss dist/global.css'
    ]),
    
    svelte({
      dev: !production,
      preprocess: autoPreprocess()
    }),

    resolve({
      browser: true,
      dedupe: importee =>
        importee === 'svelte' || importee.startsWith('svelte/')
    }),

    commonjs(),

    copy({
      targets: [
        { src: 'src/index.html', dest: 'dist' },
        { src: 'src/favicon.png', dest: 'dist' }
      ]
    }),

    !production && livereload('dist'),
    production && terser()
  ],
  watch: {
    clearScreen: false
  }
};
