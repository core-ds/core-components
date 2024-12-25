import React, { FC, ReactNode } from 'react';
import cn from 'classnames';

import layoutStyles from '../../footer/desktop/layout.module.css';
import styles from '../base-controls/index.module.css';

export type ControlsDesktopProps = {
    /**
     * Основной слот
     */
    primary?: ReactNode;

    /**
     * Дополнительный слот
     */
    secondary?: ReactNode;

    /**
     * Выравнивание элементов футера
     * @default start
     */
    layout?: 'start' | 'center' | 'space-between' | 'column';

    /**
     * Отступы между элементами футера
     */
    gap?: 16 | 24 | 32;

    /**
     * Идентификатор для систем автоматизированного тестирования
     */
    dataTestId?: string;
};

export const ControlsDesktop: FC<ControlsDesktopProps> = ({
    primary,
    secondary,
    gap,
    layout = 'start',
    dataTestId,
}) => (
    <div
        data-test-id={dataTestId}
        className={cn(styles.component, layoutStyles[layout], gap && layoutStyles[`gap-${gap}`])}
    >
        {primary}
        {secondary}
    </div>
);
