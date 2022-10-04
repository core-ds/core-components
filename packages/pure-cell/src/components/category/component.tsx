import React, { ReactNode } from 'react';

import { Typography } from '@alfalab/core-components-typography';
import { getDataTestId } from '../../../../utils/getDataTestId';

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
    rightAddon?: ReactNode;

    /**
     * Идентификатор для систем автоматизированного тестирования
     */
    dataTestId?: string;
};

export const Category: React.FC<Props> = ({
    categoryName,
    categoryPercent,
    rightAddon,
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
        {rightAddon !== undefined && (
            <div
                className={styles.rightAddon}
                data-test-id={getDataTestId(dataTestId, 'category-right-addon')}
            >
                {rightAddon}
            </div>
        )}
    </div>
);
