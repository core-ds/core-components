import React, { ButtonHTMLAttributes, ElementType, FC } from 'react';
import cn from 'classnames';

import { IconButton, IconButtonProps } from '@alfalab/core-components-icon-button';
import { CrossHeavyMIcon } from '@alfalab/icons-glyph/CrossHeavyMIcon';
import { CrossMIcon } from '@alfalab/icons-glyph/CrossMIcon';

import defaultColors from './default.module.css';
import styles from './index.module.css';
import invertedColors from './inverted.module.css';

const colorStyles = {
    default: defaultColors,
    inverted: invertedColors,
} as const;

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
     * Набор цветов для компонента
     */
    colors?: IconButtonProps['colors'];

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
    colors = 'default',
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
                className={cn(styles.button, colorStyles[colors].button, {
                    [colorStyles[colors].mobile]: view === 'mobile',
                })}
                aria-label='закрыть'
                onClick={handleClick}
                icon={icon}
                colors={colors}
                dataTestId={dataTestId}
                {...restProps}
            />
        </div>
    );
};
