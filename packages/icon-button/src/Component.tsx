import React, {
    AnchorHTMLAttributes,
    ButtonHTMLAttributes,
    ElementType,
    forwardRef,
    ReactElement,
} from 'react';
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
    icon: ElementType<{ className?: string }> | ReactElement;

    /**
     * Тип кнопки
     */
    view?: 'primary' | 'secondary' | 'transparent' | 'tertiary' | 'negative';

    /**
     * Размер компонента
     * @description xxs, xs, s deprecated, используйте вместо них 24, 32, 40 соответственно
     */
    size?: 'xxs' | 'xs' | 's' | 24 | 32 | 40 | 48 | 56;

    /**
     * Дополнительный класс
     */
    className?: string;

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

const SIZE_TO_CLASSNAME_MAP = {
    xxs: 'size-24',
    xs: 'size-32',
    s: 'size-48',
    24: 'size-24',
    32: 'size-32',
    40: 'size-40',
    48: 'size-48',
    56: 'size-56',
};

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
    (
        {
            className,
            icon: Icon,
            view = 'primary',
            size = 48,
            colors = 'default',
            alignIcon = 'center',
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
                {
                    [colorStyles[colors].loader]: restProps.loading,
                },
            )}
            size='s'
        >
            <span
                className={cn(
                    styles.iconWrapper,
                    styles[SIZE_TO_CLASSNAME_MAP[size]],
                    styles[alignIcon],
                )}
            >
                {React.isValidElement(Icon) ? (
                    React.cloneElement(Icon, { className: cn(styles.icon, Icon.props.className) })
                ) : (
                    <Icon className={styles.icon} />
                )}
            </span>
        </Button>
    ),
);
