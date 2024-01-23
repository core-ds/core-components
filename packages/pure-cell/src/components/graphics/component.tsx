import React, { useContext } from 'react';
import cn from 'classnames';

import { getDataTestId } from '@alfalab/core-components-shared';

import { PureCellContext } from '../../component';
import { GraphicsElement } from '../types';

import styles from './index.module.css';

export type Props = {
    /**
     * Компоненты
     */
    children: GraphicsElement;

    /**
     * Идентификатор для систем автоматизированного тестирования.
     * Используется модификатор -graphics
     */
    dataTestId?: string;

    /**
     * Вертикальное выравнивание
     */
    verticalAlign?: 'top' | 'center' | 'bottom';
};

export const Graphics: React.FC<Props> = ({ children, dataTestId, verticalAlign = 'top' }) => {
    const pureCellContext = useContext(PureCellContext);

    return (
        <section
            className={cn(styles.component, styles[verticalAlign])}
            data-test-id={getDataTestId(dataTestId || pureCellContext.dataTestId, 'graphics')}
        >
            {children}
        </section>
    );
};
