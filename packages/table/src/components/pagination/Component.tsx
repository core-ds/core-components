import React, { type FC, useCallback, useContext, useMemo } from 'react';
import cn from 'classnames';

import {
    Pagination as CorePagination,
    type PaginationProps as CorePaginationProps,
} from '@alfalab/core-components-pagination';
import { SelectDesktop, type SelectDesktopProps } from '@alfalab/core-components-select/desktop';
import { type BaseSelectChangePayload } from '@alfalab/core-components-select/shared';

import { TableContext } from '../table-context';

import { CustomSelectField } from './select-field';

import styles from './index.module.css';

export type PaginationProps = CorePaginationProps & {
    /**
     * Количество строк на страницу
     */
    perPage?: number;

    /**
     * Возможные варианты разбивки
     */
    possiblePerPage?: number[];

    /**
     * Обработчик переключения perPage
     */
    onPerPageChange?: (perPage: number) => void;

    /**
     * Скрывает переключатель количества строк на страницу
     */
    hidePerPageSelect?: boolean;

    /**
     * Идентификатор для систем автоматизированного тестирования
     */
    dataTestId?: string;
};

export const Pagination: FC<PaginationProps> = ({
    perPage = 25,
    possiblePerPage = [25, 50, 100],
    onPerPageChange = () => null,
    hidePerPageSelect = false,
    pagesCount,
    onPageChange = () => null,
    className,
    dataTestId,
    ...restPaginationProps
}) => {
    const { wrapperRef } = useContext(TableContext);

    const options = useMemo(
        () =>
            Array.from(new Set<number>(possiblePerPage.concat(perPage)))
                .sort((a, b) => a - b)
                .map((value) => ({
                    key: value.toString(),
                    content: `Показывать по ${value}`,
                })),
        [perPage, possiblePerPage],
    );

    const handlePerPageChange: SelectDesktopProps['onChange'] = useCallback(
        ({ selected }: BaseSelectChangePayload) => {
            onPerPageChange(Number(selected?.key));
        },
        [onPerPageChange],
    );

    const handlePageChange = useCallback(
        (pageIndex: number) => {
            onPageChange(pageIndex);

            setTimeout(() => {
                if (wrapperRef.current) {
                    wrapperRef.current.scrollIntoView();
                }
            }, 0);
        },
        [onPageChange, wrapperRef],
    );

    return (
        <div className={cn(styles.component, className)} data-test-id={dataTestId}>
            {hidePerPageSelect === false && (
                <SelectDesktop
                    options={options}
                    selected={perPage.toString()}
                    onChange={handlePerPageChange}
                    preventFlip={false}
                    size={48}
                    className={styles.select}
                    optionsListClassName={styles.menu}
                    optionClassName={styles.option}
                    Field={CustomSelectField}
                />
            )}

            {pagesCount > 1 && (
                <CorePagination
                    pagesCount={pagesCount}
                    onPageChange={handlePageChange}
                    className={styles.pagination}
                    {...restPaginationProps}
                />
            )}
        </div>
    );
};
