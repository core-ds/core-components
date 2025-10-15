import { type PluginCreator } from 'postcss';

export const postcssMixinNames: PluginCreator<MixinNamesPluginOptions>;
export type MixinNamesPluginOptions = {
    importTo?: (names: string[]) => void;
};
