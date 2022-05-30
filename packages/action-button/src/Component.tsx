import React, {
    AnchorHTMLAttributes,
    ButtonHTMLAttributes,
    forwardRef,
    Fragment,
    useRef,
} from 'react';
import mergeRefs from 'react-merge-refs';
import cn from 'classnames';

import { Loader } from '@alfalab/core-components-loader';
import { useFocus } from '@alfalab/hooks';

import styles from './index.module.css';

type ActionButtonProps = {
    /**
     * Иконка кнопки
     */
    icon: React.ReactNode;

    /**
     *  Размер кнопки
     * @default 'm'
     */
    size?: 's' | 'm';

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
    href?: AnchorHTMLAttributes<HTMLAnchorElement>['href'];

    /**
     * Заблокировать кнопку
     */
    disabled?: boolean;

    /**
     * Показать лоадер
     */
    loading?: boolean;

    /**
     * Id компонента для тестов
     */
    dataTestId?: string;

    /**
     * Палитра, в контексте которой используется кнопка
     * @default 'light'
     */
    palette?: 'light' | 'static';
};

type AnchorProps = ActionButtonProps & AnchorHTMLAttributes<HTMLAnchorElement>;
type ButtonProps = ActionButtonProps & ButtonHTMLAttributes<HTMLButtonElement>;
export type ComponentProps = Partial<AnchorProps | ButtonProps>;

export const ActionButton = forwardRef<HTMLAnchorElement | HTMLButtonElement, ComponentProps>(
    (
        {
            className,
            icon,
            children,
            href,
            size = 'm',
            type = 'button',
            iconWrapperClassName,
            disabled,
            loading,
            dataTestId,
            palette = 'light',
            ...rest
        },
        ref,
    ) => {
        const componentRef = useRef<HTMLElement>(null);
        const [focused] = useFocus(componentRef, 'keyboard');

        const componentProps = {
            className: cn(
                styles.component,
                styles[size],
                styles[palette],
                {
                    [styles.focused]: focused,
                    [styles.disabled]: disabled,
                    [styles.loading]: loading,
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
                        styles[size],
                        styles[palette],
                        iconWrapperClassName,
                    )}
                >
                    {loading ? <Loader dataTestId='loader' /> : icon}
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
