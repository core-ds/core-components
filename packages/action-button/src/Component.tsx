import React, {
    AnchorHTMLAttributes,
    ButtonHTMLAttributes,
    forwardRef,
    Fragment,
    useRef,
} from 'react';
import mergeRefs from 'react-merge-refs';
import cn from 'classnames';

import { getDataTestId } from '@alfalab/core-components-shared';
import { Spinner } from '@alfalab/core-components-spinner';
import { useFocus } from '@alfalab/hooks';

import { LOADER_MIN_DISPLAY_INTERVAL } from './constants/loader-min-display-interval';
import { useLoader } from './hooks';

import defaultColors from './default.module.css';
import styles from './index.module.css';
import invertedColors from './inverted.module.css';
import staticColors from './static.module.css';

const colorStyles = {
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
            className,
            icon,
            children,
            href,
            size = 48,
            view = 'primary',
            type = 'button',
            iconWrapperClassName,
            disabled,
            loading,
            dataTestId,
            colors = 'default',
            ...rest
        },
        ref,
    ) => {
        const componentRef = useRef<HTMLElement>(null);

        const [focused] = useFocus(componentRef, 'keyboard');

        const { showLoader } = useLoader(!!loading, LOADER_MIN_DISPLAY_INTERVAL);

        const styleSize = `size-${size}`;

        const componentProps = {
            className: cn(
                styles.component,
                colorStyles[colors][view],
                styles[styleSize],
                {
                    [styles.focused]: focused,
                    [styles.disabled]: disabled,
                    [colorStyles[colors].disabled]: disabled,
                    [styles.loading]: showLoader,
                },
                className,
            ),
            'data-test-id': dataTestId,
        };

        const buttonChildren = (
            <Fragment>
                <span
                    role='img'
                    className={cn(
                        styles.iconWrapper,
                        colorStyles[colors].iconWrapper,
                        styles[styleSize],
                        iconWrapperClassName,
                    )}
                >
                    {showLoader ? (
                        <Spinner
                            preset={24}
                            dataTestId={getDataTestId(dataTestId, 'loader')}
                            visible={true}
                            className={cn(styles.loader, colorStyles[colors].loader)}
                        />
                    ) : (
                        icon
                    )}
                </span>
                <span className={styles.label}>{children}</span>
            </Fragment>
        );

        if (href) {
            return (
                <a
                    role='button'
                    ref={mergeRefs([componentRef, ref])}
                    href={href}
                    aria-disabled={disabled || loading}
                    {...componentProps}
                    {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}
                >
                    {buttonChildren}
                </a>
            );
        }

        return (
            <button
                ref={mergeRefs([componentRef, ref])}
                // eslint-disable-next-line react/button-has-type
                type={type as ButtonHTMLAttributes<HTMLButtonElement>['type']}
                disabled={disabled || loading}
                {...componentProps}
                {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}
            >
                {buttonChildren}
            </button>
        );
    },
);

ActionButton.displayName = 'ActionButton';
