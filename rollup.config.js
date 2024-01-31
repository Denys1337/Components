import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import css from 'rollup-plugin-import-css';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import typescript from 'rollup-plugin-typescript2';
import vue from 'rollup-plugin-vue';

import packageJson from './package.json';

const pkg = require('./package.json');

export default {
  input: 'src/index.ts',
  output: [
    /*{
      format: 'cjs',
      file: packageJson.main,
      sourcemap: true,
    },*/
    {
      format: 'esm',
      file: packageJson.module,
      sourcemap: true,
    },
  ],
  plugins: [vue({ css: true }), peerDepsExternal(), resolve(), commonjs(), typescript(), css()],
  external: Object.keys(pkg.dependencies || {}),
  //external: ['vue', '@vue/composition-api'],
};