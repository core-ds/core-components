import React from 'react';
import cn from 'classnames';

import styles from './index.module.css';

type Size =
    | 0
    | 1
    | 2
    | 4
    | 8
    | 12
    | 16
    | 20
    | 24
    | 26
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

export const Gap = ({
    size,
    direction = 'vertical',
    tag: Component = 'div',
    className,
    dataTestId,
}: GapProps) => (
    <Component
        data-test-id={dataTestId}
        data-gap-size={`size-${size}`}
        className={cn(styles.gap, styles[direction], className)}
    />
);
