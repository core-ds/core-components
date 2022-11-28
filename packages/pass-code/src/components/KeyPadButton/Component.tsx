import React, { ReactNode } from 'react';
import cn from 'classnames';

import { Button, ButtonProps } from '@alfalab/core-components-button';

import styles from './index.module.css';

export type KeyPadButtonProps<T> = {
    /**
     * Вид кнопки.
     */
    view: ButtonProps['view'];

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
};

export function KeyPadButton<T extends ReactNode>({
    children,
    onClick,
    className,
    view = 'secondary',
    buttonClassName,
}: KeyPadButtonProps<T>) {
    return (
        <div className={cn(styles.component, className)}>
            <Button
                className={cn(styles.button, styles[view], buttonClassName)}
                view={view}
                onClick={() => onClick?.(children)}
            >
                {children}
            </Button>
        </div>
    );
}
