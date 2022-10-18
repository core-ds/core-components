import React, { ThHTMLAttributes, useContext } from 'react';
import cn from 'classnames';

import { TextAlignProperty } from '../../typings';

import styles from './index.module.css';
import { TableContext } from '../table-context';

export type THeadCellProps = ThHTMLAttributes<HTMLHeadingElement> & {
    /**
     * Дополнительный класс
     */
    className?: string;

    /**
     * Ширина колонки
     */
    width?: string | number;

    /**
     * Скрытие колонки
     */
    hidden?: boolean;

    /**
     * Выравнивание текста в колонке
     */
    textAlign?: TextAlignProperty;

    /**
     * Идентификатор для систем автоматизированного тестирования
     */
    dataTestId?: string;
};

export const THeadCell = ({
    children,
    className,
    dataTestId,
    style,
    width,
    textAlign,
    hidden,
    ...restProps
}: THeadCellProps) => {
    const { compactHorizontal, stickyHeader } = useContext(TableContext);

    if (hidden) return null;

    return (
        <th
            className={cn(
                styles.component,
                className,
                compactHorizontal && styles.compactHorizontal,
                {
                    [styles.stickyHeader]: stickyHeader,
                },
            )}
            style={{ ...style, width, textAlign }}
            data-test-id={dataTestId}
            {...restProps}
        >
            {children}
        </th>
    );
};
