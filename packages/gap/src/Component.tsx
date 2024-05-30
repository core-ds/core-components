import React from 'react';
import cn from 'classnames';

import styles from './index.module.css';

type Size =
    | '3xs'
    | '2xs'
    | 'xs'
    | 's'
    | 'm'
    | 'l'
    | 'xl'
    | '2xl'
    | '3xl'
    | '4xl'
    | '5xl'
    | '6xl'
    | '7xl'
    | '8xl'
    | 0
    | 1
    | 2
    | 4
    | 8
    | 12
    | 16
    | 20
    | 24
    | 28
    | 32
    | 40
    | 48
    | 64
    | 72
    | 96
    | 128
    | 256;

export type GapProps = {
    /**
     * Размер отступа
     * @description 3xs, 2xs, xs, s, m, l, xl, 2xl, 3xl, 4xl, 5xl, 6xl, 7xl, 8xl deprecated,
     * используйте 2, 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 72, 96, 128, 256
     */
    size: Size;

    /**
     * Вид отступа (вертикальный или горизонтальный)
     * @default - 'vertical'
     */
    direction?: 'horizontal' | 'vertical';

    /**
     * HTML тег
     * @default 'div'
     */
    tag?: 'div' | 'span';

    /**
     * Дополнительный класс
     */
    className?: string;

    /**
     * Идентификатор для систем автоматизированного тестирования
     */
    dataTestId?: string;
};

const SIZE_TO_CLASSNAME_MAP = {
    '3xs': 'size-2',
    '2xs': 'size-4',
    xs: 'size-8',
    s: 'size-12',
    m: 'size-16',
    l: 'size-20',
    xl: 'size-24',
    '2xl': 'size-32',
    '3xl': 'size-40',
    '4xl': 'size-48',
    '5xl': 'size-64',
    '6xl': 'size-72',
    '7xl': 'size-96',
    '8xl': 'size-128',
    0: 'size-0',
    1: 'size-1',
    2: 'size-2',
    4: 'size-4',
    8: 'size-8',
    12: 'size-12',
    16: 'size-16',
    20: 'size-20',
    24: 'size-24',
    28: 'size-28',
    32: 'size-32',
    40: 'size-40',
    48: 'size-48',
    64: 'size-64',
    72: 'size-72',
    96: 'size-96',
    128: 'size-128',
    256: 'size-256',
};

export const Gap = ({
    size,
    direction = 'vertical',
    tag: Component = 'div',
    className,
    dataTestId,
}: GapProps) => (
    <Component
        data-test-id={dataTestId}
        data-gap-size={SIZE_TO_CLASSNAME_MAP[size]}
        className={cn(styles.gap, styles[direction], className)}
    />
);
