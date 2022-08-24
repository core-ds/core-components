import React from 'react';
import cn from 'classnames';
import { getDataTestId } from '../../../../utils/getDataTestId';

import { AddonElement } from '../types';

import styles from './index.module.css';

type Props = {
    /**
     * Вертикальное выравнивание
     */
    verticalAlign?: 'center';

    /**
     * Горизонтальные отступы
     */
    addonPadding?: boolean;

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
    verticalAlign,
    addonPadding = true,
    dataTestId,
}) => (
    <section
        className={cn(styles.component, {
            [styles.center]: verticalAlign,
            [styles.addonPadding]: addonPadding,
        })}
        data-test-id={getDataTestId(dataTestId, 'addon')}
    >
        {children}
    </section>
);
