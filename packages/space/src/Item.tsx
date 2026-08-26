import * as React from 'react';

import { type Direction } from './utils';

export interface ItemProps {
    className: string;
    dividerClassName: string;
    horizontalSize: number;
    verticalSize: number;
    length: number;
    children: React.ReactNode;
    index: number;
    direction?: Direction;
    divider?: string | React.ReactNode;
    wrap?: boolean;
    useCssGaps: boolean;
}

type ItemStyle = React.CSSProperties & {
    '--space-vertical-gap'?: string;
    '--space-horizontal-gap'?: string;
};

const Item = (props: ItemProps) => {
    const {
        className,
        dividerClassName,
        horizontalSize,
        verticalSize,
        length,
        direction,
        index,
        children,
        divider,
        wrap,
        useCssGaps,
    } = props;

    let style: ItemStyle | undefined;

    if (!useCssGaps) {
        if (direction === 'vertical') {
            /*
             * Передаём размер в CSS вместо установки marginBottom по React-индексу.
             * CSS сможет определить реально непустые элементы уже после рендера.
             */
            style = {
                '--space-vertical-gap': `${verticalSize / (divider ? 2 : 1)}px`,
            };
        } else if (wrap) {
            /*
             * Для wrap сохраняется прежний алгоритм, поскольку CSS-селекторы
             * не позволяют определить начало новой flex-строки.
             */
            style = {
                ...(index < length - 1 && { marginRight: horizontalSize / (divider ? 2 : 1) }),
                paddingBottom: verticalSize,
            };
        } else {
            /*
             * Для горизонтального Space без переноса используется тот же подход:
             * отступ получает следующий непустой DOM-элемент.
             */
            style = {
                '--space-horizontal-gap': `${horizontalSize / (divider ? 2 : 1)}px`,
            };
        }
    }

    if (children === null || children === undefined) {
        return null;
    }

    return (
        <React.Fragment>
            <div className={className} style={style}>
                {children}
            </div>
            {index < length - 1 && divider && (
                <span className={dividerClassName} style={style}>
                    {divider}
                </span>
            )}
        </React.Fragment>
    );
};

export default Item;
