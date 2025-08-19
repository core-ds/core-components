import { Color } from './types';

import { getColorVar } from './get-color-var';
import { translateColors } from './translatecolors';

import { colorMapper } from './color-mapper';
import { Theme } from './types';

describe('getColorVar', () => {
    type Case = {
        color?: Color;
        prefix?: string;
        theme?: Theme;
        expected?: string;
    };

    const casesWithoutPrefix: Case[] = [
        {
            expected: undefined,
        },
        {
            color: '' as Color,
            expected: undefined,
        },
        {
            color: 'graphicColorQuaternary',
            expected: 'var(--color-light-graphic-quaternary)',
        },
        {
            color: 'backgroundColorAttentionMuted',
            expected: 'var(--color-light-bg-attention-muted)',
        },
        {
            color: 'backgroundColorSecondary',
            expected: 'var(--color-light-bg-secondary)',
        },
        {
            color: 'backgroundColorNegativeMuted',
            expected: 'var(--color-light-bg-negative-muted)',
        },
        {
            color: 'backgroundColorPositiveMuted',
            expected: 'var(--color-light-bg-positive-muted)',
        },
        {
            color: 'backgroundColorTertiary',
            expected: 'var(--color-light-bg-tertiary)',
        },
        {
            color: 'staticBackgroundColorAccent',
            expected: 'var(--color-static-bg-accent)',
        },
        {
            color: 'borderColorAccent',
            expected: 'var(--color-light-border-accent)',
        },
        {
            color: 'staticBackgroundColorNeutralDark',
            expected: 'var(--color-static-bg-neutral-dark)',
        },
        {
            color: 'statusColorPositive',
            expected: 'var(--color-light-status-positive)',
        },
        {
            color: 'statusMutedColorPositive',
            expected: 'var(--color-light-status-muted-positive)',
        },
        {
            color: '#44ddAA',
            expected: '#44ddAA',
        },
        // Тест для поведения утилиты не по схеме. Надо чинить контракты, где такое встречается. Потом удалить поведение и этот тест.
        {
            color: ' #44ddAA ' as Color,
            expected: ' #44ddAA ',
        },
    ];

    const casesWithPrefix: Case[] = [
        {
            color: 'staticTextColorAccent',
            prefix: 'h',
            expected: 'var(--h-color-static-text-accent)',
        },
    ];

    it.each([...casesWithoutPrefix, ...casesWithPrefix])(
        'getColorVar (%#)',
        ({ color, prefix, expected, theme }) => {
            expect(getColorVar({ color, prefix, theme })).toBe(expected);
        },
    );
});

// Проверяем все цвета из набора color-mapper.ts,
describe('translateColors', () => {
    Object.entries(colorMapper).forEach(([key, val]) => {
        it(`should show valid results ${key} = ${JSON.stringify(val)}`, () => {
            expect(translateColors(key)).toEqual(val);
        });
    });
});
