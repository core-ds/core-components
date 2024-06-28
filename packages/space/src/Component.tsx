import React, { Children, forwardRef, ReactNode } from 'react';
import cn from 'classnames';

import Item from './Item';
import { Align, Direction, Size } from './utils';

import styles from './index.module.css';

export type SpaceProps = {
    /**
     * Выравнивание
     */
    align?: Align;

    /**
     * Направление
     */
    direction?: Direction;

    /**
     * Размер отступов
     */
    size?: Size | [Size, Size];

    /**
     * Дополнительный класс
     */
    className?: string;

    /**
     * Дочерние компоненты
     */
    children: ReactNode;

    /**
     * Идентификатор для систем автоматизированного тестирования
     */
    dataTestId?: string;

    /**
     * Автоматический перенос строк, полезно при direction = 'horizontal'
     */
    wrap?: boolean;

    /**
     * Компонент разделителя
     */
    divider?: string | ReactNode;

    /**
     * Растягивать ли компонент на всю ширину
     */
    fullWidth?: boolean;

    /**
     * Использовать css gap
     * @description Поддержка ограничена. см https://caniuse.com/?search=gap
     */
    useCssGaps?: boolean;
};

const SpaceSizes: { [key in Size]: number } = {
    s: 12,
    m: 16,
    l: 20,
};

const getNumberSize = (size: Size) => (typeof size === 'string' ? SpaceSizes[size] : size || 0);

/**
 * Позаимствовано с благодарностью из Ant Design
 */

export const Space = forwardRef<HTMLDivElement, SpaceProps>((props, ref) => {
    const {
        children,
        className,
        align = 'start',
        direction = 'vertical',
        size = 'm',
        wrap = false,
        divider = false,
        fullWidth = false,
        dataTestId,
        useCssGaps = false,
    } = props;

    const [horizontalSize, verticalSize] = React.useMemo(
        () =>
            ((Array.isArray(size) ? size : [size, size]) as [Size, Size]).map((item) =>
                getNumberSize(item),
            ),
        [size],
    );

    const childNodes = Children.toArray(children);

    if (childNodes.length === 0) {
        return null;
    }

    const directionClassName = styles[direction];
    const alignClassName = styles[align];

    const containerClassName = cn(
        styles.spaceContainer,
        directionClassName,
        {
            [alignClassName]: align,
            [styles.spaceContainerFullWidth]: fullWidth,
        },
        className,
    );

    const itemClassName = cn(styles.spaceItem, {
        [styles.spaceItemFullWidth]: fullWidth,
    });

    const nodes = childNodes.map((child, i) => (
        /* eslint-disable react/no-array-index-key */
        <Item
            className={itemClassName}
            dividerClassName={styles.divider}
            key={`${itemClassName}-${i}`}
            direction={direction}
            horizontalSize={horizontalSize}
            verticalSize={verticalSize}
            length={childNodes.length}
            index={i}
            wrap={wrap}
            divider={divider}
            useCssGaps={useCssGaps}
        >
            {child}
        </Item>
        /* eslint-enable */
    ));

    return (
        <div
            data-test-id={dataTestId}
            className={cn(containerClassName, {
                [styles.wrap]: useCssGaps && wrap,
            })}
            style={{
                ...(useCssGaps && {
                    columnGap: horizontalSize / (divider ? 2 : 1),
                    rowGap: verticalSize / (divider ? 2 : 1),
                }),
                ...(wrap && !useCssGaps && { flexWrap: 'wrap', marginBottom: -verticalSize }),
            }}
            ref={ref}
        >
            {nodes}
        </div>
    );
});

Space.displayName = 'Space';
