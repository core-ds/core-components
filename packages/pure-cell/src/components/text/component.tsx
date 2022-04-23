import React, { useContext } from 'react';
import cn from 'classnames';

import { Typography } from '@alfalab/core-components-typography';

import { PureCellContext } from '../../component';
import { getDataTestId } from '../../../../utils/getDataTestId';

import styles from './index.module.css';

type Props = {
    /**
     * Количество строк
     */
    rowLimit?: 1 | 2;
    /**
     * Размер текста
     */
    view: 'primary-small' | 'component';
    /**
     * Цвет текста
     */
    color: 'secondary' | 'primary';
    /**
     * Идентификатор для систем автоматизированного тестирования
     */
    dataTestId?: string;
};

export const Text: React.FC<Props> = ({ children, rowLimit, view, color, dataTestId }) => {
    const { direction = 'horizontal' } = useContext(PureCellContext);

    return (
        <Typography.Text
            view={view}
            color={color}
            className={cn(
                direction === 'horizontal' && styles[direction],
                rowLimit && styles[`rowLimit${rowLimit}`],
            )}
            data-test-id={getDataTestId(dataTestId, 'text')}
        >
            {children}
        </Typography.Text>
    );
};
