import * as esbuild from 'esbuild';
import { Options } from './types.cjs';
import 'unplugin-icons';

declare const _default: (options: Options) => esbuild.Plugin;

export { _default as default };
