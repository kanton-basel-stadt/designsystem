import * as vite from 'vite';
import { Options } from './types.js';
import 'unplugin-icons';

declare const _default: (options: Options) => vite.Plugin<any> | vite.Plugin<any>[];

export { _default as default };
