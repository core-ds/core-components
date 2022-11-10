import React, { useContext } from 'react';
import cn from 'classnames';

import { getDataTestId } from '../../../../utils/getDataTestId';
import { PureCellContext } from '../../component';
import { ContentElement } from '../types';

import styles from './index.module.css';

type Props = {
    /**
     * Компоненты
     */
    children: ContentElement;

    /**
     * Компонент занимает все свободное пространство контейнера
     */
    fullStretch?: boolean;

    /**
     * Идентификатор для систем автоматизированного тестирования
     */
    dataTestId?: string;
};

export const Content: React.FC<Props> = ({ children, fullStretch = true, dataTestId }) => {
    const { direction } = useContext(PureCellContext);

    return (
        <section
            className={cn(styles.component, {
                [styles.horizontal]: direction === 'horizontal',
                [styles.fullStretch]: fullStretch,
            })}
            data-test-id={getDataTestId(dataTestId, 'content')}
        >
            {children}
        </section>
    );
};
