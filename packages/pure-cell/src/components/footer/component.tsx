import React from 'react';

import cn from 'classnames';
import { getDataTestId } from '../../../../utils/getDataTestId';
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
    footerPadding?: boolean;

    /**
     * Идентификатор для систем автоматизированного тестирования
     */
    dataTestId?: string;
};

export const Footer: React.FC<Props> = ({ children, footerPadding = true, dataTestId }) => (
    <footer
        className={cn(styles.component, {
            [styles.footerPadding]: footerPadding,
        })}
        data-test-id={getDataTestId(dataTestId, 'footer')}
    >
        {children}
    </footer>
);
