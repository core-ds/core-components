import React, {
    type AnchorHTMLAttributes,
    type ButtonHTMLAttributes,
    type ElementType,
    forwardRef,
    type ReactElement,
} from 'react';
import cn from 'classnames';

import { Button, type ButtonProps } from '@alfalab/core-components-button';

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
    icon: ElementType<{ className?: string }> | ReactElement<{ className?: string }>;

    /**
     * Тип кнопки
     */
    view?: 'primary' | 'secondary' | 'transparent' | 'tertiary' | 'negative';

    /**
     * Размер компонента
     * @default 48
     */
    size?: 24 | 32 | 40 | 48 | 56;

    /**
     * Дополнительный класс
     */
    className?: string;

    /**
     * Включает прозрачный фон
     * @default false
     */
    transparentBg?: boolean;

    /**
     * Выравнивание иконки
     * @default 'center'
     */
    alignIcon?: 'left' | 'center' | 'right';

    /**
     * Идентификатор для систем автоматизированного тестирования
     */
    dataTestId?: string;

    /**
     * Набор цветов для компонента
     */
    colors?: 'default' | 'inverted';
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'size'> &
    Pick<ButtonProps, 'Component' | 'href' | 'loading' | 'breakpoint'> &
    Pick<AnchorHTMLAttributes<HTMLAnchorElement>, 'target' | 'download'>;

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
    (
        {
            className,
            icon: Icon,
            view = 'primary',
            size = 48,
            colors = 'default',
            alignIcon = 'center',
            transparentBg = false,
            ...restProps
        },
        ref,
    ) => (
        <Button
            {...restProps}
            ref={ref}
            view='text'
            className={cn(
                'cc-icon-button',
                className,
                colorStyles[colors][view],
                colorStyles[colors].component,
                styles[`border-${size}`],
                {
                    [colorStyles[colors].loader]: restProps.loading,
                    [colorStyles[colors].transparentBg]: transparentBg,
                },
            )}
            size={48}
        >
            <span className={cn(styles.iconWrapper, styles[`size-${size}`], styles[alignIcon])}>
                {React.isValidElement(Icon) ? (
                    React.cloneElement(Icon as ReactElement<{ className?: string }>, {
                        className: cn(
                            styles.icon,
                            (Icon as ReactElement<{ className?: string }>).props.className,
                        ),
                    })
                ) : (
                    <Icon className={styles.icon} />
                )}
            </span>
        </Button>
    ),
);

IconButton.displayName = 'IconButton';
