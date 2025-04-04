import React, { useContext } from 'react';
import { getDataTestId } from '@balafla/core-components-shared';
import cn from 'classnames';

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
    const { direction, dataTestId: contextDataTestId } = useContext(PureCellContext);

    return (
        <section
            className={cn(styles.component, { [styles.horizontal]: direction === 'horizontal' })}
            data-test-id={getDataTestId(dataTestId || contextDataTestId, 'content')}
        >
            {children}
        </section>
    );
};
