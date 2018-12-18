import babel from 'rollup-plugin-babel';
import localResolve from 'rollup-plugin-local-resolve';
import json from 'rollup-plugin-json';
import { uglify } from 'rollup-plugin-uglify';
import { plugin as analyze } from 'rollup-plugin-analyzer';

const { UGLIFY } = process.env;

export default {
  input: './index.js',
  output: {
    name: 'UnicodeProperties',
    format: 'umd',
  },
  plugins: [
    // analyze(),
    localResolve(),
    json(),
    babel({
      // TODO: Use external .babelrc file?
      babelrc: false,
      presets: [
        ['@babel/preset-env', { modules: false, loose: true }]
      ],
      runtimeHelpers: true
    }),
    UGLIFY === 'true' && uglify(),
  ],
};
