import { getPureTokenValue } from './get-pure-token-value';
import { modifyColor } from './modify-color';
import { translateColors } from './translatecolors';
import { Color, HexColor, PaletteColor, Theme } from './types';

const getColorWithTheme = (color: PaletteColor, theme: Theme) => {
    const cssColorValue = translateColors(color);
    const { type, value } = cssColorValue;

    if (type === 'WITHOUT_THEME') {
        return value;
    }

    return `${theme}-${value}`;
};

const isPaletteColor = (color: string): color is PaletteColor =>
    /^(?:accent|background|base|border|decorative|graphic|modal|neutral|overlay|qualitative|sequential|special|static|status|text|transparent)/.test(
        color,
    );

const isHexColor = (color: string): color is HexColor => /^#[a-z\d]+$/i.test(color);

/**
 * Возвращает css переменную для цвета, либо сам цвет (если передан не через переменную)
 *
 * Примеры результатов:
 * - figma переменная: var(--color-light-bg-secondary)
 * - HEX: #444fff
 */
export const getColorVar = ({
    color,
    prefix = '',
    theme = 'light',
    pure = false,
}: {
    /**
     * Имя переменной в figma для цвета или HEX
     * Пример: backgroundColorAccent, #ccc
     */
    color?: Color;
    /**
     * Префикс для переменной css
     * @default ''
     */
    prefix?: string;
    /**
     * Использовать ли реальные значения
     * @default false
     */
    pure?: boolean;
    /**
     * Тема
     * @default 'light'
     */
    theme?: Theme;
}) => {
    if (!color) {
        return undefined;
    }

    // Тип состоит из 2-х частей

    // Часть 1, преобразование по названию цвета
    if (isPaletteColor(color)) {
        const cssColor = getColorWithTheme(color, theme);

        console.log('🚀 ~ cssColor:', `--color-${cssColor}`);
        if (pure) {
            return getPureTokenValue({ token: color, theme });
        }

        const prefixWithDelimiter = prefix && `-${prefix}`;

        return `var(-${prefixWithDelimiter}-color-${cssColor})`;
    }

    // Часть 2, проверка на hex
    if (isHexColor(color)) {
        return modifyColor(color);
    }

    // Часть 3, поведение не по схеме: просто отдаём цвет так, как он пришел
    // eslint-disable-next-line no-console
    console.error(
        'Цвет передан не в схеме. Заведите задачу на починку контракта на мидле. Color=',
        color,
    );

    return color;
};
