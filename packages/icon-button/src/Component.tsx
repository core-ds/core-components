import React, { AnchorHTMLAttributes, ButtonHTMLAttributes, ElementType, forwardRef } from 'react';
import cn from 'classnames';

import { Button, ButtonProps } from '@alfalab/core-components-button';

import defaultColors from './default.module.css';
import styles from './index.module.css';
import invertedColors from './inverted.module.css';

const colorStyles = {
    default: defaultColors,
    inverted: invertedColors,
};

export type IconButtonProps = {
    /**
     * Компонент иконки
     */
    icon: ElementType<{ className?: string }>;

    /**
     * Тип кнопки
     */
    view?: 'primary' | 'secondary' | 'transparent' | 'tertiary' | 'negative';

    /**
     * Размер компонента
     */
    size?: 'xxs' | 'xs' | 's';

    /**
     * Дополнительный класс
     */
    className?: string;

    /**
     * Идентификатор для систем автоматизированного тестирования
     */
    dataTestId?: string;

    /**
     * Набор цветов для компонента
     */
    colors?: 'default' | 'inverted';
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'size'> &
    Pick<ButtonProps, 'href' | 'loading'> &
    Pick<AnchorHTMLAttributes<HTMLAnchorElement>, 'target' | 'download'>;

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
    (
        { className, icon: Icon, view = 'primary', size = 's', colors = 'default', ...restProps },
        ref,
    ) => (
        <Button
            {...restProps}
            ref={ref}
            view='ghost'
            className={cn(
                'cc-icon-button',
                className,
                colorStyles[colors][view],
                colorStyles[colors].component,
                {
                    [colorStyles[colors].loader]: restProps.loading,
                },
            )}
            size='s'
        >
            <span className={cn(styles.iconWrapper, styles[size])}>
                <Icon className={styles.icon} />
            </span>
        </Button>
    ),
);
