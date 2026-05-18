import React, {
    forwardRef,
    type ReactNode,
    type TableHTMLAttributes,
    useMemo,
    useRef,
} from 'react';
import cn from 'classnames';

import { type ColumnConfiguration, TableContext } from '../table-context';

import { findAllHeadCellsProps } from './utils';

import styles from './index.module.css';

export type TableProps = TableHTMLAttributes<HTMLTableElement> & {
    /**
     * Компактный вид
     */
    compactView?: boolean;

    /**
     * Уменьшение горизонтальных паддингов
     */
    compactHorizontal?: boolean;

    /**
     * Дополнительный класс
     */
    className?: string;

    /**
     * Дочерние компоненты
     */
    children: React.ReactElement | React.ReactElement[];

    /**
     * Оборачивает таблицу в стилизованный контейнер
     */
    wrapper?: boolean;

    /**
     * Слот для пагинации
     */
    pagination?: ReactNode;

    /**
     * Идентификатор для систем автоматизированного тестирования
     */
    dataTestId?: string;

    /**
     * Если true то заголовок будет фиксироваться при скроле
     */
    stickyHeader?: boolean;
};

export const Table = forwardRef<HTMLTableElement, TableProps>(
    (
        {
            className,
            children,
            compactView = false,
            compactHorizontal = false,
            wrapper = true,
            pagination,
            dataTestId,
            stickyHeader = false,
            ...restProps
        },
        ref,
    ) => {
        const wrapperRef = useRef<HTMLDivElement>(null);

        const columnsConfiguration: ColumnConfiguration[] = useMemo(
            () =>
                findAllHeadCellsProps(children).map((columnProps, index) => ({
                    width: columnProps.width,
                    textAlign: columnProps.textAlign,
                    hidden: columnProps.hidden,
                    index,
                })),
            [children],
        );

        /* eslint-disable react/jsx-no-constructed-context-values */
        return (
            <TableContext.Provider
                value={{
                    stickyHeader,
                    columnsConfiguration,
                    compactView,
                    compactHorizontal,
                    wrapperRef,
                }}
            >
                <div
                    ref={wrapperRef}
                    className={cn(styles.component, className, {
                        [styles.wrapper]: wrapper,
                        [styles.hasPagination]: !!pagination,
                        [styles.stickyHeader]: stickyHeader,
                    })}
                    data-test-id={dataTestId}
                >
                    <table ref={ref} className={styles.table} {...restProps}>
                        {children}
                    </table>

                    {pagination}
                </div>
            </TableContext.Provider>
        );
    },
);
