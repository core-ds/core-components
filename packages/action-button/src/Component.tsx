import React, {
    type AnchorHTMLAttributes,
    type ButtonHTMLAttributes,
    forwardRef,
    useRef,
} from 'react';
import mergeRefs from 'react-merge-refs';
import cn from 'classnames';

import { NoStyleButton, useButtonLoading } from '@alfalab/core-components-button/shared';
import { useDisabled } from '@alfalab/core-components-config';
import { getDataTestId } from '@alfalab/core-components-shared';
import { Spinner } from '@alfalab/core-components-spinner';
import { useFocus } from '@alfalab/hooks';

import defaultColors from './default.module.css';
import styles from './index.module.css';
import invertedColors from './inverted.module.css';
import staticColors from './static.module.css';

const colorsStyles = {
    default: defaultColors,
    inverted: invertedColors,
    static: staticColors,
};

type Colors = 'default' | 'inverted' | 'static';

type ComponentProps = {
    /**
     * Иконка кнопки
     */
    icon: React.ReactNode;

    /**
     *  Размер кнопки
     */
    size?: 48;

    /**
     * Тип кнопки
     */
    view?: 'primary' | 'secondary';

    /**
     * Дополнительный класс
     */
    className?: string;

    /**
     * Дополнительный класс для обертки иконки
     */
    iconWrapperClassName?: string;

    /**
     * Значение href для ссылки
     */
    href?: string;

    /**
     * Заблокировать кнопку
     */
    disabled?: boolean;

    /**
     * Показать лоадер
     */
    loading?: boolean;

    /**
     * Идентификатор для систем автоматизированного тестирования.
     * Для спиннера используется модификатор -loader
     */
    dataTestId?: string;

    /**
     * Палитра, в контексте которой используется кнопка
     */
    colors?: Colors;
};

type AnchorProps = ComponentProps & AnchorHTMLAttributes<HTMLAnchorElement>;
type ButtonProps = ComponentProps & ButtonHTMLAttributes<HTMLButtonElement>;
export type ActionButtonProps = Partial<AnchorProps | ButtonProps>;

export const ActionButton = forwardRef<HTMLAnchorElement | HTMLButtonElement, ActionButtonProps>(
    (
        {
            className: classNameFromProps,
            icon,
            children: label,
            size = 48,
            view = 'primary',
            iconWrapperClassName,
            disabled: disabledFromProps,
            loading: loadingFromProps,
            colors = 'default',
            ...restProps
        },
        ref,
    ) => {
        const { dataTestId } = restProps;
        const colorStyles = colorsStyles[colors];
        const componentRef = useRef<HTMLElement>(null);
        const [focused] = useFocus(componentRef, 'keyboard');
        const loading = useButtonLoading(loadingFromProps);
        const disabled = useDisabled(disabledFromProps) || loading;
        const className = cn(
            styles.component,
            colorStyles.component,
            colorStyles[view],
            styles[`size-${size}`],
            loading && [styles.loading, colorStyles.loading],
            {
                [styles.focused]: focused,
            },
            classNameFromProps,
        );

        return (
            <NoStyleButton
                {...(restProps as React.ComponentProps<typeof NoStyleButton>)}
                ref={mergeRefs([componentRef, ref])}
                className={className}
                disabled={disabled}
                disabledClassName={cn(styles.disabled, colorStyles.disabled)}
            >
                <span
                    role='img'
                    className={cn(
                        styles.iconWrapper,
                        colorStyles.iconWrapper,
                        iconWrapperClassName,
                    )}
                >
                    {icon}
                    {loading && (
                        <Spinner
                            preset={24}
                            dataTestId={getDataTestId(dataTestId, 'loader')}
                            visible={true}
                            className={cn(styles.loader, colorStyles.loader)}
                        />
                    )}
                </span>
                <span className={styles.label}>{label}</span>
            </NoStyleButton>
        );
    },
);

ActionButton.displayName = 'ActionButton';
