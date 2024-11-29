import React, { ReactNode, useContext } from 'react';

import { getDataTestId } from '@alfalab/core-components-shared';
import { Text } from '@alfalab/core-components-typography';

import { PureCellContext } from '../../component';

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
}) => {
    const pureCellContext = useContext(PureCellContext);

    return (
        <div className={styles.component} data-test-id='cell-pure-category'>
            <Text
                view='primary-small'
                color='secondary'
                dataTestId={getDataTestId(
                    dataTestId || pureCellContext.dataTestId,
                    'category-name',
                )}
                className={styles.categoryName}
            >
                {categoryName}
            </Text>
            {categoryPercent !== undefined && (
                <Text
                    tag='div'
                    view='primary-small'
                    color='secondary'
                    className={styles.categoryPercent}
                    dataTestId={getDataTestId(
                        dataTestId || pureCellContext.dataTestId,
                        'category-percent',
                    )}
                >
                    {categoryPercent}%
                </Text>
            )}
            {rightAddons !== undefined && (
                <div
                    className={styles.rightAddon}
                    data-test-id={getDataTestId(
                        dataTestId || pureCellContext.dataTestId,
                        'category-right-addon',
                    )}
                >
                    {rightAddons}
                </div>
            )}
        </div>
    );
};
