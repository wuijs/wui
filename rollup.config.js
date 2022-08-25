import builtins from 'rollup-plugin-node-builtins';
import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import { babel } from '@rollup/plugin-babel';
import dts from "rollup-plugin-dts";

const extensions = ['.js', '.ts'];
const plugins = [
  builtins(),
  commonjs(),
  nodeResolve({ extensions }),
  babel({ extensions, include: ['./src/**/*'] }),
];

const umdConfig = {
  input: 'src/index.ts',
  output: { dir: 'lib', format: 'umd' },
  plugins,
};

const esConfig = {
  input: 'src/index.ts',
  output: { file: 'lib/index.es.js', format: 'es' },
  plugins,
};

const dtsConfig = {
  input: './src/index.ts',
  output: { file: './lib/index.d.ts', format: 'es' },
  plugins: [dts()]
}

export default [umdConfig, esConfig, dtsConfig];