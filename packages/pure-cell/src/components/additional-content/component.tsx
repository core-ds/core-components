import React from 'react';
import cn from 'classnames';

import { getDataTestId } from '../../../../utils/getDataTestId';
import { AdditionalContentElement } from '../types';

import styles from './index.module.css';

type Props = {
    /**
     * Вертикальное выравнивание
     */
    verticalAlign?: 'top' | 'center' | 'bottom';

    /**
     * Компоненты
     */
    children: AdditionalContentElement;

    /**
     * Компонент занимает все свободное пространство контейнера
     */
    fullStretch?: boolean;

    /**
     * Идентификатор для систем автоматизированного тестирования
     */
    dataTestId?: string;
};

export const AdditionalContent: React.FC<Props> = ({
    children,
    verticalAlign = 'top',
    fullStretch = false,
    dataTestId,
}) => (
    <section
        className={cn(styles.component, styles[verticalAlign], {
            [styles.fullStretch]: fullStretch,
        })}
        data-test-id={getDataTestId(dataTestId, 'additional-content')}
    >
        {children}
    </section>
);
