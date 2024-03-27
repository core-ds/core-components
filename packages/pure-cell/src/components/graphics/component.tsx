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

    /**
     * Отступ от графики
     */
    graphicPadding?: 'airy' | 'default' | 'compact' | 'tiny' | 'none';
};

export const Graphics: React.FC<Props> = ({
    children,
    dataTestId,
    verticalAlign = 'top',
    graphicPadding,
}) => {
    const pureCellContext = useContext(PureCellContext);

    const defaultGraphicPadding = pureCellContext.direction === 'horizontal' ? 'airy' : 'default';

    return (
        <section
            className={cn(
                styles.component,
                styles[verticalAlign],
                styles[pureCellContext.direction || 'horizontal'],
                styles[graphicPadding || defaultGraphicPadding],
            )}
            data-test-id={getDataTestId(dataTestId || pureCellContext.dataTestId, 'graphics')}
        >
            {children}
        </section>
    );
};
