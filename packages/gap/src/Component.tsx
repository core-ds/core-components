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
    | '8xl';

export type GapProps = {
    /**
     * Размер отступа
     */
    size: Size;

    /**
     * Вид отступа (вертикальный или горизонтальный)
     * @default - 'vertical'
     */
    direction?: 'horizontal' | 'vertical';

    /**
     * Дополнительный класс
     */
    className?: string;

    /**
     * Идентификатор для систем автоматизированного тестирования
     */
    dataTestId?: string;
};

export const Gap = ({ size, direction = 'vertical', className, dataTestId }: GapProps) => (
    <div
        data-test-id={dataTestId}
        data-gap-size={size}
        className={cn(styles.gap, styles[direction], className)}
    />
);
