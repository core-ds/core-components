import React, { useContext } from 'react';
import cn from 'classnames';

import { getDataTestId } from '@alfalab/core-components-shared';

import { PureCellContext } from '../../component';
import { ContentElement } from '../types';

import styles from './index.module.css';

type Props = {
    /**
     * Компоненты
     */
    children: ContentElement;

    /**
     * Идентификатор для систем автоматизированного тестирования.
     * Используется модификатор -content
     */
    dataTestId?: string;
};

export const Content: React.FC<Props> = ({ children, dataTestId }) => {
    const { direction } = useContext(PureCellContext);

    return (
        <section
            className={cn(styles.component, { [styles.horizontal]: direction === 'horizontal' })}
            data-test-id={getDataTestId(dataTestId, 'content')}
        >
            {children}
        </section>
    );
};
