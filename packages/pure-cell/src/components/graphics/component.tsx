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
     * Компонент занимает все свободное пространство контейнера
     */
    stretch?: boolean;

    /**
     * Идентификатор для систем автоматизированного тестирования
     */
    dataTestId?: string;
};

export const Graphics: React.FC<Props> = ({ children, stretch = false, dataTestId }) => (
    <section
        className={cn(styles.component, { [styles.stretch]: stretch })}
        data-test-id={getDataTestId(dataTestId, 'graphics')}
    >
        {children}
    </section>
);
