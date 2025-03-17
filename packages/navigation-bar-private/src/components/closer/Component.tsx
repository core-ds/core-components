import React, { ButtonHTMLAttributes, ElementType, FC } from 'react';
import cn from 'classnames';

import { IconButton } from '@alfalab/core-components-icon-button';
import { CrossHeavyMIcon } from '@alfalab/icons-glyph/CrossHeavyMIcon';
import { CrossMIcon } from '@alfalab/icons-glyph/CrossMIcon';

import styles from './index.module.css';

export interface CloserProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    /**
     * Вид компонента
     */
    view: 'desktop' | 'mobile';

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

export const Closer: FC<CloserProps> = ({
    view,
    className,
    sticky,
    icon = view === 'desktop' ? CrossHeavyMIcon : CrossMIcon,
    dataTestId,
    onClose,
    ...restProps
}) => {
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
                style={{ zIndex: 2 }}
                className={cn(styles.button, { [styles.mobile]: view === 'mobile' })}
                aria-label='закрыть'
                onClick={handleClick}
                icon={icon}
                dataTestId={dataTestId}
                {...restProps}
            />
        </div>
    );
};
