import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'
import resolve from '@rollup/plugin-node-resolve'
import babel from 'rollup-plugin-babel'
import eslint from '@rollup/plugin-eslint';
// This fork works just fine with @rollup/plugin-eslint
import typescript from 'rollup-plugin-typescript2';
import { terser } from 'rollup-plugin-terser'

import pkg from './package.json'

const extensions = ['.js', '.ts'];

export default [
  {
    input: 'src/index.ts',
    external: [
      ...Object.keys(pkg.dependencies || {}),
      ...Object.keys(pkg.peerDependencies || {}),
    ],
    output: [
      {
        file: pkg.main,
        format: 'cjs',
      },
      {
        file: pkg.module,
        format: 'esm',
      },
    ],
    plugins: [
      eslint({ throwOnError: true, exclude: ['dist/**', 'node_modules/**'] }),
      typescript({
        tsconfig: "tsconfig.json",
        noEmit: true,
        tsconfigOverride: { compilerOptions: { declaration: false } }
      }),
      json(),
      resolve({ extensions }),
      commonjs(),
      babel({
        extensions,
        include: ['src/**/*'],
      }),
      terser(),
    ],
  },
  {
    input: 'src/index.ts',
    output: [
      {
        name: 'boilerplate',
        file: pkg.browser,
        format: 'umd',
      },
    ],
    plugins: [
      eslint({ throwOnError: true, exclude: ['dist/**', 'node_modules/**'] }),
      typescript({
        tsconfig: "tsconfig.json",
        noEmit: true,
        tsconfigOverride: { compilerOptions: { declaration: false } }
      }),
      json(),
      resolve({ extensions }),
      commonjs(),
      babel({
        extensions,
        include: ['src/**/*'],
      }),
      terser(),
    ],
  },
]