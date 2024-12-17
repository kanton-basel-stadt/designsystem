import * as _unplugin from 'unplugin';
import { UnpluginFactory } from 'unplugin';
import { Options } from './types.js';
import 'unplugin-icons';

declare const unpluginFactory: UnpluginFactory<Options>;
declare const unplugin: _unplugin.UnpluginInstance<Options, boolean>;

export { unplugin as default, unplugin, unpluginFactory };
