import React, { ReactNode } from 'react';
import { ButtonMobile, ButtonMobileProps } from '@balafla/core-components-button/mobile';
import cn from 'classnames';

import styles from './index.module.css';

export type KeyPadButtonProps<T> = {
    /**
     * Вид кнопки.
     */
    view: ButtonMobileProps['view'];

    /**
     * Значение.
     */
    children: T;

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
    onClick?: (payload: T) => void;

    /**
     * Идентификатор для систем автоматизированного тестирования.
     */
    dataTestId?: string;
};

export function KeyPadButton<T extends ReactNode>({
    children,
    onClick,
    className,
    view = 'secondary',
    buttonClassName,
    dataTestId,
}: KeyPadButtonProps<T>) {
    return (
        <div className={cn(styles.component, className)}>
            <ButtonMobile
                className={cn(styles.button, styles[view], buttonClassName)}
                view={view}
                onClick={() => onClick?.(children)}
                dataTestId={dataTestId}
            >
                {children}
            </ButtonMobile>
        </div>
    );
}
