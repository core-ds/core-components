import React from 'react';
import cn from 'classnames';

import { getDataTestId } from '@alfalab/core-components-shared';

import { AddonElement } from '../types';

import styles from './index.module.css';

type Props = {
    /**
     * Вертикальное выравнивание
     */
    verticalAlign?: 'auto' | 'top' | 'center' | 'bottom';

    /**
     * Горизонтальные отступы
     */
    addonPadding?: 'default' | 'none';

    /**
     * Компоненты
     */
    children: AddonElement;

    /**
     * Идентификатор для систем автоматизированного тестирования
     */
    dataTestId?: string;
};

export const Addon: React.FC<Props> = ({
    children,
    verticalAlign = 'top',
    addonPadding = 'default',
    dataTestId,
}) => (
    <section
        className={cn(styles.component, styles[addonPadding], styles[verticalAlign])}
        data-test-id={getDataTestId(dataTestId, 'addon')}
    >
        {children}
    </section>
);
