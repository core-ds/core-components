import React, { ButtonHTMLAttributes, ElementType } from 'react';
import cn from 'classnames';

import { type IconButtonProps, IconButton } from '@alfalab/core-components-icon-button';

import styles from './index.module.css';

/** Публичные базовые свойства */
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
    icon: ElementType;

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

/** Публичные свойства для desktop/mobile */
export interface CloserProps extends Omit<CloserBaseProps, 'icon'> {
    /**
     * Иконка
     */
    icon?: ElementType;
}

/** Приватные свойства, для настройки из desktop/mobile */
interface IconButtonTransferProps {
    /**
     * IconButton
     */
    iconButtonProps: Pick<IconButtonProps, 'size' | 'className'>;
}

/** Общие базовые свойства */
export interface CloserComponentProps extends CloserBaseProps, IconButtonTransferProps {}

export const CloserComponent = ({
    className,
    sticky,
    icon,
    dataTestId,
    onClose,
    iconButtonProps,
    ...restProps
}: CloserComponentProps) => {
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
                aria-label='закрыть'
                onClick={handleClick}
                dataTestId={dataTestId}
                icon={icon}
                {...iconButtonProps}
                {...restProps}
            />
        </div>
    );
};
