import React, { ReactNode } from 'react';
import { ButtonMobile, ButtonMobileProps } from '@balafla/core-components-button/mobile';
import { os } from '@balafla/core-components-shared';
import cn from 'classnames';

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
            className={cn(styles.button, styles[view], buttonClassName, {
                [styles.isIOS]: os.isIOS(),
            })}
            view={view}
            onClick={() => onClick?.(children)}
            dataTestId={dataTestId}
            {...(title && { title })}
        >
            {children}
        </ButtonMobile>
    );
}
