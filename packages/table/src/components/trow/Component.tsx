import React, { forwardRef, HTMLAttributes } from 'react';
import cn from 'classnames';

import { TCell, TCellProps } from '../tcell';

import styles from './index.module.css';

type TCellElement = React.ReactElement<TCellProps, typeof TCell>;

export type TRowProps = HTMLAttributes<HTMLTableRowElement> & {
    /**
     * Компоненты ячеек
     */
    children: TCellElement | TCellElement[];

    /**
     * Дополнительный класс
     */
    className?: string;

    /**
     * Стиль выбранной строки
     */
    selected?: boolean;

    /**
     * Убирает нижнюю границу
     */
    withoutBorder?: boolean;

    /**
     * Идентификатор для систем автоматизированного тестирования
     */
    dataTestId?: string;
};

export const TRow = forwardRef<HTMLTableRowElement, TRowProps>(
    ({ children, className, selected, withoutBorder, dataTestId, ...restProps }, ref) => (
        <tr
            className={cn(styles.component, className, {
                [styles.clickable]: typeof restProps.onClick !== 'undefined',
                [styles.selected]: selected,
                [styles.withoutBorder]: withoutBorder,
            })}
            data-test-id={dataTestId}
            ref={ref}
            {...restProps}
        >
            {React.Children.map(children, (child, index) => React.cloneElement(child, { index }))}
        </tr>
    ),
);

TRow.displayName = 'TRow';
