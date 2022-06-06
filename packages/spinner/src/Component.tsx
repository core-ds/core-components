import React, { FC } from 'react';
import cn from 'classnames';

import styles from './index.module.css';

export type SpinnerProps = {
    /**
     * Управление видимостью компонента
     */
    visible?: boolean;

    /**
     * Размер компонента
     */
    size?: 'xs' | 's' | 'm';

    /**
     * Дополнительный класс
     */
    className?: string;

    /**
     * Идентификатор компонента в DOM
     */
    id?: string;

    /**
     * Идентификатор для систем автоматизированного тестирования
     */
    dataTestId?: string;

    /**
     * Палитра, в контексте которой используется спиннер
     */
    colors?: 'default' | 'inverted';
};

export const Spinner: FC<SpinnerProps> = ({
    size = 's',
    colors = 'default',
    visible,
    id,
    className,
    dataTestId,
}) => {
    return (
        <span
            className={cn(className, styles.spinner, styles[colors], styles[size], {
                [styles.visible]: visible,
            })}
            id={id}
            data-test-id={dataTestId}
        />
    );
};
