import React from 'react';
import cn from 'classnames';

import { getDataTestId } from '../../../../utils/getDataTestId';
import { GraphicsElement } from '../types';

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

    /**
     * Вертикальное выравнивание
     */
    verticalAlign?: 'top' | 'center' | 'bottom';
};

export const Graphics: React.FC<Props> = ({ children, dataTestId, verticalAlign = 'top' }) => (
    <section
        className={cn(styles.component, styles[verticalAlign])}
        data-test-id={getDataTestId(dataTestId, 'graphics')}
    >
        {children}
    </section>
);
