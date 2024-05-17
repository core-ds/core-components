import React, { ReactNode } from 'react';
import cn from 'classnames';

import { GapProps } from '@alfalab/core-components-gap';

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

export type GenericWrapperProps = React.HTMLAttributes<HTMLDivElement> & {
    /**
     * Дочерние элементы.
     */
    children: ReactNode;

    /**
     * Свойство управляет направлением основной оси внутри флекс-контейнера
     */
    column?: boolean;

    /**
     * Внутренние отступы
     */
    padding?: PaddingPropType;

    /**
     * Свойство для выравнивания элементов внутри контейнера по поперечной оси.
     */
    alignItems?: 'stretch' | 'end' | 'start' | 'center' | 'baseline';

    /**
     * Свойство выравнивает флекс-элементы внутри флекс-контейнера по основной оси.
     */
    justifyContent?: 'between' | 'around' | 'evenly' | 'center' | 'start' | 'end';

    /**
     * Дополнительный класс
     */
    className?: string;

    /**
     * Идентификатор для систем автоматизированного тестирования
     */
    dataTestId?: string;

    /**
     * Позволяет заполнить всё доступное пространство родительского элемента.
     */
    grow?: boolean;
};

export const GenericWrapper = ({
    children,
    padding,
    alignItems,
    justifyContent,
    className,
    dataTestId,
    column = false,
    grow = false,
    ...restProps
}: GenericWrapperProps) => {
    const paddingStyles = padding && {
        [styles[`padding-top-${padding.top}`]]: padding.top,
        [styles[`padding-right-${padding.right}`]]: padding.right,
        [styles[`padding-bottom-${padding.bottom}`]]: padding.bottom,
        [styles[`padding-left-${padding.left}`]]: padding.left,
    };
    const alignmentStyles = alignItems && styles[`align-${alignItems}`];
    const justifyContentStyles = justifyContent && styles[`justify-${justifyContent}`];
    const growStyles = grow && styles.grow;
    const columnsStyles = column && styles.column;

    return (
        <div
            className={cn(
                styles.component,
                columnsStyles,
                alignmentStyles,
                paddingStyles,
                justifyContentStyles,
                growStyles,
                className,
            )}
            data-test-id={dataTestId}
            {...restProps}
        >
            {children}
        </div>
    );
};
