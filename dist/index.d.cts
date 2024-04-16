import { UnpluginFactory, UnpluginInstance } from 'unplugin';
import { Options } from './types.cjs';
import 'unplugin-icons';

declare const unpluginFactory: UnpluginFactory<Options>;
declare const unplugin: UnpluginInstance<Options, boolean>;

export { unplugin as default, unplugin, unpluginFactory };
