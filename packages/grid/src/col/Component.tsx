import React, { useMemo } from 'react';
import cn from 'classnames';

import { type ResponsivePropertyType } from '../typings';
import { createClassNames } from '../utils';

import guttersStyles from '../gutters.module.css';
import styles from './index.module.css';

export type ColProps = {
    /**
     * Дополнительный класс
     */
    className?: string;

    /**
     * Управление выравниванием колонок по вертикальной оси
     */
    align?: 'top' | 'middle' | 'bottom';

    /**
     * Управление шириной колонки.
     * Возможные значения: `[1..12, available, auto]`
     * или `{ mobile: [1..12], tablet: [1..12], desktop: [1..12] }`
     * или `{ mobile: { xs: [1..12], s: [1..12], m: [1..12], l: [1..12] },
     * tablet: { s: [1..12], m: [1..12] },
     * desktop: { s: [1..12], m: [1..12], l: [1..12], xl: [1..12] } }`.
     */
    width?: ResponsivePropertyType;

    /**
     * Управлние смещением колонки.
     * Возможные значения: `[1..11]`
     * или `{ mobile: [1..11], tablet: [1..11], desktop: [1..11] }`
     * или `{ mobile:{ xs: [1..11], { s: [1..11], m: [1..11], l: [1..11] },
     * tablet: { s: [1..11], m: [1..11] },
     * desktop: { s: [1..11], m: [1..11], l: [1..11], xl: [1..11] } }`.
     */
    offset?: ResponsivePropertyType;

    /**
     * Управление порядком колонок.
     * Возможные значения: `[1..12, first, last]`
     * или `{ mobile: [1..last], tablet: [1..last], desktop: [1..last] }`
     * или `{ mobile: { xs: [1..last], s: [1..last], m: [1..last], l: [1..last] },
     * tablet: { s: [1..last], m: [1..last] },
     * desktop: { s: [1..last], m: [1..last], l: [1..last], xl: [1..last] } }`.
     */
    order?: ResponsivePropertyType;

    /**
     * Html тег компонента.
     */
    tag?: keyof JSX.IntrinsicElements;

    /**
     * Контент
     */
    children?: React.ReactNode;

    /**
     * Идентификатор для систем автоматизированного тестирования
     */
    dataTestId?: string;
};

export const Col: React.FC<ColProps> = ({
    tag: Component = 'div',
    className,
    align,
    order,
    offset,
    width,
    children,
    dataTestId,
}) => {
    const classNames = useMemo(
        () => createClassNames({ order, offset, width }, styles),
        [order, offset, width],
    );

    return (
        <Component
            className={cn(
                guttersStyles.col,
                styles.component,
                align && styles[`align-${align}`],
                ...classNames,
                className,
            )}
            data-test-id={dataTestId}
        >
            {children}
        </Component>
    );
};
