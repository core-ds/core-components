import React, { type ButtonHTMLAttributes, type ElementType } from 'react';
import cn from 'classnames';

import { IconButton } from '@alfalab/core-components-icon-button';

import type stylesDesktop from './desktop.module.css';
import type stylesMobile from './mobile.module.css';

/** Closer Desktop / Mobile Props */
export interface CloserBaseProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    /**
     * Дополнительный класс
     */
    className?: string;

    /**
     * Позиция крестика
     */
    align?: 'left' | 'right';

    /**
     * Фиксирует крестик
     */
    sticky?: boolean;

    /**
     * Иконка
     */
    icon?: ElementType;

    /**
     * Идентификатор для систем автоматизированного тестирования
     */
    dataTestId?: string;

    /**
     * Коллбэк закрытия.
     */
    onClose?: (
        event: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>,
        reason?: 'backdropClick' | 'escapeKeyDown' | 'closerClick',
    ) => void;
}

type CloserBasePrivateProps = Omit<CloserBaseProps, 'icon'> & {
    /**
     * Иконка
     */
    icon: ElementType;

    /**
     * Вид компонента
     */
    view: 'desktop' | 'mobile';

    /**
     * Стили
     */
    styles: typeof stylesDesktop | typeof stylesMobile;
};

export const CloserBase = ({
    view,
    className,
    sticky,
    icon,
    dataTestId,
    onClose,
    styles,
    ...restProps
}: CloserBasePrivateProps) => {
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        onClose?.(event, 'closerClick');
    };

    return (
        <div
            className={cn(styles.closer, className, {
                [styles.sticky]: sticky,
            })}
        >
            <IconButton
                size={view === 'desktop' ? 's' : 'xs'}
                className={styles.button}
                aria-label='закрыть'
                onClick={handleClick}
                icon={icon}
                dataTestId={dataTestId}
                {...restProps}
            />
        </div>
    );
};
