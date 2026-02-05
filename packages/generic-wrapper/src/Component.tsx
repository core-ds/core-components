import React, { type FC, type ReactNode } from 'react';
import cn from 'classnames';

import { type GapProps } from '@alfalab/core-components-gap';

import styles from './index.module.css';

export type ReducedGapType = Exclude<
    GapProps['size'],
    1 | 26 | 28 | 32 | 40 | 48 | 64 | 72 | 96 | 128 | 256
>;

export type PaddingPropType = {
    top?: ReducedGapType;
    right?: ReducedGapType;
    bottom?: ReducedGapType;
    left?: ReducedGapType;
};

export type GapType =
    | 0
    | 2
    | 4
    | 8
    | 12
    | 16
    | 20
    | 24
    | 32
    | 40
    | 48
    | 56
    | 64
    | 72
    | 80
    | 96
    | 128;

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
     * @description 3xs, 2xs, xs, s, m, l, xl deprecated,
     * используйте 0, 2, 4, 8, 12, 16, 20, 24
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

    /**
     * Отступы между элементами флекс-контейнера
     */
    gap?: GapType;
};

export const GenericWrapper: FC<GenericWrapperProps> = ({
    children,
    padding,
    alignItems,
    justifyContent,
    className,
    dataTestId,
    column = false,
    grow = false,
    gap,
    ...restProps
}) => {
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
                styles[`gap-${gap}`],
            )}
            data-test-id={dataTestId}
            {...restProps}
        >
            {children}
        </div>
    );
};
