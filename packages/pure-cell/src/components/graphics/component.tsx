import React from 'react';
import { GraphicsElement } from '../types';
import { getDataTestId } from '../../../../utils/getDataTestId';

import styles from './index.module.css';

export type Props = {
    /**
     * Компоненты
     */
    children: GraphicsElement;

    /**
     * Идентификатор для систем автоматизированного тестирования
     */
    dataTestId?: string;
};

export const Graphics: React.FC<Props> = ({ children, dataTestId }) => {
    return (
        <section className={styles.component} data-test-id={getDataTestId(dataTestId, 'graphics')}>
            {children}
        </section>
    );
};
