import React, { useContext } from 'react';
import { getDataTestId } from '@balafla/core-components-shared';
import cn from 'classnames';

import { PureCellContext } from '../../component';
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
     * Идентификатор для систем автоматизированного тестирования.
     * Используется модификатор -footer
     */
    dataTestId?: string;
};

export const Footer: React.FC<Props> = ({ children, footerPadding = 'default', dataTestId }) => {
    const pureCellContext = useContext(PureCellContext);

    return (
        <footer
            className={cn(styles.component, styles[footerPadding])}
            data-test-id={getDataTestId(dataTestId || pureCellContext.dataTestId, 'footer')}
        >
            {children}
        </footer>
    );
};
