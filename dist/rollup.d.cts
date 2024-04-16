import * as rollup from 'rollup';
import { Options } from './types.cjs';
import 'unplugin-icons';

declare const _default: (options: Options) => rollup.Plugin<any> | rollup.Plugin<any>[];

export { _default as default };
