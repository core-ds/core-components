import React, { FC, useCallback, useContext, useMemo } from 'react';
import cn from 'classnames';

import {
    Pagination as CorePagination,
    PaginationProps as CorePaginationProps,
} from '@alfalab/core-components-pagination';
import { BaseSelectChangePayload, Select, SelectProps } from '@alfalab/core-components-select';

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
     * Идентификатор для систем автоматизированного тестирования
     */
    dataTestId?: string;
};

export const Pagination: FC<PaginationProps> = ({
    perPage = 25,
    possiblePerPage = [25, 50, 100],
    onPerPageChange = () => null,
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

    const handlePerPageChange: SelectProps['onChange'] = useCallback(
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
            <Select
                options={options}
                selected={perPage.toString()}
                onChange={handlePerPageChange}
                preventFlip={false}
                size='s'
                className={styles.select}
                optionsListClassName={styles.menu}
                optionClassName={styles.option}
                Field={CustomSelectField}
            />
            {pagesCount > 1 && (
                <CorePagination
                    pagesCount={pagesCount}
                    onPageChange={handlePageChange}
                    {...restPaginationProps}
                />
            )}
        </div>
    );
};
