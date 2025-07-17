import React, { ReactNode } from 'react';
import cn from 'classnames';

import { ButtonMobile, ButtonMobileProps } from '@alfalab/core-components-button/mobile';

import styles from './index.module.css';

export type KeyPadButtonProps<T> = {
    /**
     * Вид кнопки
     */
    view: ButtonMobileProps['view'];

    /**
     * Значение
     */
    children: T;

    /**
     * Дополнительный класс
     */
    className?: string;

    /**
     * Дополнительный класс кнопки
     */
    buttonClassName?: string;

    /**
     * Коллбэк нажатия на кнопку
     */
    onClick?: (payload: T) => void;

    /**
     * Идентификатор для систем автоматизированного тестирования
     */
    dataTestId?: string;

    /**
     * Заголовок кнопки
     */
    title?: string;
};

export function KeyPadButton<T extends ReactNode>({
    children,
    onClick,
    view = 'secondary',
    buttonClassName,
    dataTestId,
    title,
}: KeyPadButtonProps<T>) {
    return (
        <ButtonMobile
            className={cn(styles.button, styles[view], buttonClassName)}
            view={view}
            onClick={() => onClick?.(children)}
            dataTestId={dataTestId}
            {...(title && { title })}
        >
            {children}
        </ButtonMobile>
    );
}
