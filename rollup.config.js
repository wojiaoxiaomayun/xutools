import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import typescript from 'rollup-plugin-typescript'
import pkg from './package.json'
import css from 'rollup-plugin-css-porter';

export default [
  // UMD for browser-friendly build
  {
    input: 'src/index.ts',
    output: {
        name: 'dist',
        file: pkg.browser,
        format: 'umd'
    },
    plugins: [
      resolve(),
      commonjs(),
      typescript(),
      css()
    ]
  },
  {
    input: 'src/index.ts',
    output: {
        name: 'dist',
        file: pkg.iifejs,
        format: 'iife'
    },
    plugins: [
      resolve(),
      commonjs(),
      typescript(),
      css()
    ]
  },
  // CommonJS for Node and ES module for bundlers build
  {
    input: 'src/index.ts',
    external: ['ms'],
    plugins: [
      typescript()
    ],
    output: [
      {  file: pkg.cjs, format: 'cjs' },
      {  file: pkg.main, format: 'es' }
    ]
  }
]