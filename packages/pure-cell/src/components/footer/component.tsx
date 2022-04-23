import React from 'react';

import { getDataTestId } from '../../../../utils/getDataTestId';
import { FooterElement } from '../types';

import styles from './index.module.css';

type Props = {
    /**
     * Компоненты
     */
    children: FooterElement;
    /**
     * Идентификатор для систем автоматизированного тестирования
     */
    dataTestId?: string;
};

export const Footer: React.FC<Props> = ({ children, dataTestId }) => (
    <footer className={styles.component} data-test-id={getDataTestId(dataTestId, 'footer')}>
        {children}
    </footer>
);
