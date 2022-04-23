import React from 'react';

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
     * Идентификатор для систем автоматизированного тестирования
     */
    dataTestId?: string;
};

export const Category: React.FC<Props> = ({ categoryName, categoryPercent, dataTestId }) => (
    <div className={styles.component} data-test-id='cell-pure-category'>
        <Typography.Text
            view='primary-small'
            color='secondary'
            dataTestId={getDataTestId(dataTestId, 'category-name')}
            className={styles.categoryName}
        >
            {categoryName}
        </Typography.Text>
        {categoryPercent && (
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
    </div>
);
