import React from 'react';
import cn from 'classnames';

import { getDataTestId } from '@alfalab/core-components-shared';

import { FooterElement } from '../types';

import styles from './index.module.css';

type Props = {
    /**
     * Компоненты
     */
    children: FooterElement;

    /**
     * Вертикальные отступы
     */
    footerPadding?: 'default' | 'none';

    /**
     * Идентификатор для систем автоматизированного тестирования
     */
    dataTestId?: string;
};

export const Footer: React.FC<Props> = ({ children, footerPadding = 'default', dataTestId }) => (
    <footer
        className={cn(styles.component, styles[footerPadding])}
        data-test-id={getDataTestId(dataTestId, 'footer')}
    >
        {children}
    </footer>
);
