import React, { ReactNode } from 'react';
import cn from 'classnames';

import { GapProps } from '@alfalab/core-components-gap';

import { Addon, DataContent, Line } from './components';

import styles from './index.module.css';

export type ReducedGapType = Omit<
    GapProps['size'],
    '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | '7xl' | '8xl'
>;

export type PaddingPropType = {
    top?: ReducedGapType;
    right?: ReducedGapType;
    bottom?: ReducedGapType;
    left?: ReducedGapType;
};

export type GenericWrapperProps = {
    /**
     * Дочерние элементы. Ожидаются компоненты `GenericWrapper.Addon`, `GenericWrapper.DataContent`
     */
    children: ReactNode;

    /**
     * Свойство управляет направлением основной оси внутри флекс-контейнера
     */
    direction?: 'horizontal' | 'vertical';

    /**
     * Внутренние отступы
     */
    padding?: PaddingPropType;

    /**
     * Свойство для выравнивания элементов внутри контейнера по поперечной оси.
     */
    alignItems?: 'stretch' | 'end' | 'start' | 'center';

    /**
     * Свойство выравнивает флекс-элементы внутри флекс-контейнера по основной оси.
     */
    justifyContent?: 'between' | 'around' | 'evenly' | 'center';

    /**
     * Дополнительный класс
     */
    className?: string;

    /**
     * Идентификатор для систем автоматизированного тестирования
     */
    dataTestId?: string;
};

const GenericWrapperComponent = ({
    children,
    padding,
    direction = 'horizontal',
    alignItems,
    justifyContent,
    className,
    dataTestId,
}: GenericWrapperProps) => {
    const paddingStyles = padding && {
        [styles[`padding-top-${padding.top}`]]: padding.top,
        [styles[`padding-right-${padding.right}`]]: padding.right,
        [styles[`padding-bottom-${padding.bottom}`]]: padding.bottom,
        [styles[`padding-left-${padding.left}`]]: padding.left,
    };
    const alignmentStyles = alignItems && styles[`align-${alignItems}`];
    const justifyContentStyles = justifyContent && styles[`justify-${justifyContent}`];

    return (
        <div
            className={cn(
                styles[direction],
                alignmentStyles,
                paddingStyles,
                justifyContentStyles,
                className,
            )}
            data-test-id={dataTestId}
        >
            {children}
        </div>
    );
};

export const GenericWrapper = Object.assign(GenericWrapperComponent, {
    Addon,
    DataContent,
    Line,
});
