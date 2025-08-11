import addonsColorVars from '@alfalab/core-components-vars/colors-addons-map';
import bluetintColorVars from '@alfalab/core-components-vars/colors-bluetint-map';

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
 * Возвращает значение токена цвета из общей мапы цветов.
 * @param {Theme} [props.theme='light'] - Тема.
 * @returns {string | undefined} Значение токена цвета или undefined, если токен не найден.
 */
export const getPureTokenValue = ({ token }: Props): string | undefined => {
    const colors = { ...bluetintColorVars, ...addonsColorVars } as Record<string, string>;

    return colors[token];
};
