import React, { ReactNode } from 'react';

import { getDataTestId } from '@alfalab/core-components-shared';
import { Typography } from '@alfalab/core-components-typography';

import styles from './index.module.css';

type Props = {
    /**
     * Наименование категории
     */
    categoryName: string;

    /**
     * Процент категории
     */
    categoryPercent?: number;

    /**
     * Слот справа
     */
    rightAddons?: ReactNode;

    /**
     * Идентификатор для систем автоматизированного тестирования.
     * Для наименования категории используется модификатор -category-name,
     * процент категории -category-percent, слота справа -category-right-addon
     */
    dataTestId?: string;
};

export const Category: React.FC<Props> = ({
    categoryName,
    categoryPercent,
    rightAddons,
    dataTestId,
}) => (
    <div className={styles.component} data-test-id='cell-pure-category'>
        <Typography.Text
            view='primary-small'
            color='secondary'
            dataTestId={getDataTestId(dataTestId, 'category-name')}
            className={styles.categoryName}
        >
            {categoryName}
        </Typography.Text>
        {categoryPercent !== undefined && (
            <Typography.Text
                tag='div'
                view='primary-small'
                color='secondary'
                className={styles.categoryPercent}
                dataTestId={getDataTestId(dataTestId, 'category-percent')}
            >
                {categoryPercent}%
            </Typography.Text>
        )}
        {rightAddons !== undefined && (
            <div
                className={styles.rightAddon}
                data-test-id={getDataTestId(dataTestId, 'category-right-addon')}
            >
                {rightAddons}
            </div>
        )}
    </div>
);
