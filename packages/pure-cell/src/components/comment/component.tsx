import React from 'react';

import { Typography } from '@alfalab/core-components-typography';
import { getDataTestId } from '../../../../utils/getDataTestId';

import { CommentElement } from '../types';

import styles from './index.module.css';

type Props = {
    /**
     * Компоненты
     */
    children: CommentElement;
    /**
     * Идентификатор для систем автоматизированного тестирования
     */
    dataTestId?: string;
};

export const Comment: React.FC<Props> = ({ children, dataTestId }) => (
    <div className={styles.component} data-test-id={getDataTestId(dataTestId, 'comment')}>
        <Typography.Text tag='div' view='primary-small' className={styles.text} color='primary'>
            {children}
        </Typography.Text>
    </div>
);
