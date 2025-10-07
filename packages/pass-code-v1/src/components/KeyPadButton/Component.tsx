import React, { type FC, type ReactNode } from 'react';
import cn from 'classnames';

import { BaseButtonCandidate } from '@alfalab/core-components-button/components/base-button-candidate';

import styles from './index.module.css';

export type KeyPadButtonProps = {
    /**
     * Вид кнопки.
     */
    view: 'secondary' | 'text';

    /**
     * Значение.
     */
    children?: ReactNode;

    /**
     * Дополнительный класс.
     */
    className?: string;

    /**
     * Дополнительный класс кнопки.
     */
    buttonClassName?: string;

    /**
     * Коллбэк нажатия на кнопку.
     */
    onClick?: () => void;

    /**
     * Идентификатор для систем автоматизированного тестирования.
     */
    dataTestId?: string;
};

export const KeyPadButton: FC<KeyPadButtonProps> = ({
    view = 'secondary',
    buttonClassName,
    children,
    dataTestId,
    onClick,
}) => (
    <BaseButtonCandidate
        className={cn(styles.component, styles[view], buttonClassName)}
        onClick={onClick}
        dataTestId={dataTestId}
    >
        {children}
    </BaseButtonCandidate>
);
