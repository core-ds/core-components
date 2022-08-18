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
    verticalAlign,
    addonPadding = 'default',
    dataTestId,
}) => (
    <section
        className={cn(styles.component, styles[addonPadding], {
            [styles.center]: verticalAlign,
            [styles.none]: addonPadding === 'none',
            [styles.defaultPadding]: addonPadding === 'default',
        })}
        data-test-id={getDataTestId(dataTestId, 'addon')}
    >
        {children}
    </section>
);
