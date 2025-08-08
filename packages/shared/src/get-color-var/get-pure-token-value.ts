import darkMap from '@alfalab/core-components-themes/dark-map';
import * as colorVars from '@alfalab/core-components-vars/colors-bluetint.module';

import { Theme } from './types';

type Props = {
    token: string;
    /**
     * Тема
     * @default 'light'
     */
    theme?: Theme;
};
/**
 * v1
 * 1 Парсинг всех токенов цветов *-colors.css в значения (одни и теже токены могут быть разные в зависимости от темы, поэтому надо прокидывать бандлы)
 * 2 Просто подставить в обьекте
 * 3 Для темной темы запарсить dark.сss файл в обьект с переопределением
 * 4 Для темной темы использовать скрипт из плагины с подменой токенов, которые использовал в плагине и
 */

/**
 * v2
 * 1 Парсинг всех токенов цветов *-colors.css в значения (одни и теже токены могут быть разные в зависимости от темы, поэтому надо прокидывать бандлы)
 * 2 Просто подставить в обьекте
 * 3 Для темной темы запарсить dark.сss файл в обьект с переопределением
 * 4 Для темной темы использовать скрипт из плагины с подменой токенов, которые использовал в плагине
 */
export const getPureTokenValue = ({ token, theme }: Props) => {
    console.log('🚀 ~ getPureTokenValue ~ token:', token);
    const colorVars1 = colorVars as any;

    console.log('🚀 ~ getPureTokenValue ~ colorVars1:', colorVars1);
    const darkMap1 = darkMap as any;

    if (theme === 'dark') {
        return colorVars1[darkMap1[token]];
    }

    return colorVars1[token];
};
