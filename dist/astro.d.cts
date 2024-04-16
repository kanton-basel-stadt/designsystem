import { Options } from './types.cjs';
import 'unplugin-icons';

declare const _default: (options: Options) => {
    name: string;
    hooks: {
        'astro:config:setup': (astro: any) => Promise<void>;
    };
};

export { _default as default };
