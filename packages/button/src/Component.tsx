// TODO Вид кнопок зависит от порядка импорта стилей. Исправить!!!.
/* eslint-disable simple-import-sort/imports */
import React, {
    AnchorHTMLAttributes,
    ButtonHTMLAttributes,
    ElementType,
    ReactNode,
    useEffect,
    useRef,
    useState,
} from 'react';
import mergeRefs from 'react-merge-refs';
import cn from 'classnames';

import { Spinner } from '@alfalab/core-components-spinner';
import { useFocus } from '@alfalab/hooks';

import { getDataTestId } from '@alfalab/core-components-shared';

import styles from './index.module.css';
import defaultColors from './default.module.css';
import invertedColors from './inverted.module.css';

const colorStyles = {
    default: defaultColors,
    inverted: invertedColors,
};

export type ComponentProps = {
    /**
     * Тип кнопки
     */
    view?:
        | 'accent'
        | 'primary'
        | 'secondary'
        | 'tertiary'
        | 'outlined' // deprecated
        | 'filled' // deprecated
        | 'transparent' // deprecated
        | 'link'
        | 'ghost';

    /**
     * Слот слева
     */
    leftAddons?: ReactNode;

    /**
     * Слот справа
     */
    rightAddons?: ReactNode;

    /**
     * Размер компонента
     */
    size?: 'xxs' | 'xs' | 's' | 'm' | 'l' | 'xl';

    /**
     * Растягивает компонент на ширину контейнера
     */
    block?: boolean;

    /**
     * Дополнительный класс
     */
    className?: string;

    /**
     * Дополнительный класс для спиннера
     */
    spinnerClassName?: string;

    /**
     * Выводит ссылку в виде кнопки
     */
    href?: string;

    /**
     * Позволяет использовать кастомный компонент для кнопки (например Link из роутера)
     */
    Component?: ElementType;

    /**
     * Идентификатор для систем автоматизированного тестирования
     */
    dataTestId?: string;

    /**
     * Показать лоадер
     */
    loading?: boolean;

    /**
     * Не переносить текст кнопки на новую строку
     */
    nowrap?: boolean;

    /**
     * Набор цветов для компонента
     */
    colors?: 'default' | 'inverted';

    /**
     * Дочерние элементы.
     */
    children?: ReactNode;
};

export type AnchorButtonProps = ComponentProps & AnchorHTMLAttributes<HTMLAnchorElement>;
export type NativeButtonProps = ComponentProps & ButtonHTMLAttributes<HTMLButtonElement>;

export type ButtonProps = Partial<AnchorButtonProps | NativeButtonProps>;

/**
 * Минимальное время отображения лоадера - 500мс,
 * чтобы при быстрых ответах от сервера кнопка не «моргала».
 */
export const LOADER_MIN_DISPLAY_INTERVAL = 500;

const logWarning = (view: Required<ComponentProps>['view']) => {
    if (process.env.NODE_ENV !== 'development') {
        return;
    }

    const viewsMap: { [key: string]: string } = {
        filled: 'secondary',
        transparent: 'secondary',
        outlined: 'tertiary',
    };

    // eslint-disable-next-line no-console
    console.warn(
        // eslint-disable-next-line prefer-template
        `@alfalab/core-components/button: view='${view}' будет удален в следующих мажорных версиях. ` +
            `Используйте view='${viewsMap[view]}'. Чтобы поменять все кнопки на проекте разом, можно воспользоваться codemod: ` +
            'npx @alfalab/core-components-codemod --transformers=button-views src/**/*.tsx',
    );
};

export const Button = React.forwardRef<HTMLAnchorElement | HTMLButtonElement, ButtonProps>(
    (
        {
            children,
            view = 'secondary',
            leftAddons,
            rightAddons,
            size = 'm',
            block = false,
            className,
            spinnerClassName,
            dataTestId,
            href,
            loading = false,
            nowrap = false,
            colors = 'default',
            Component = href ? 'a' : 'button',
            onClick,
            ...restProps
        },
        ref,
    ) => {
        if (['outlined', 'filled', 'transparent'].includes(view)) {
            logWarning(view);
        }

        const buttonRef = useRef<HTMLElement>(null);

        const [focused] = useFocus(buttonRef, 'keyboard');

        const [loaderTimePassed, setLoaderTimePassed] = useState(true);

        const timerId = useRef(0);

        const showLoader = loading || !loaderTimePassed;

        const iconOnly = !children;

        const componentProps = {
            className: cn(
                styles.component,
                styles[view],
                styles[size],
                colorStyles[colors].component,
                colorStyles[colors][view],
                {
                    [styles.focused]: focused,
                    [styles.block]: block,
                    [styles.iconOnly]: iconOnly,
                    [styles.loading]: showLoader,
                    [styles.withRightAddons]: Boolean(rightAddons) && !iconOnly,
                    [styles.withLeftAddons]: Boolean(leftAddons) && !iconOnly,
                    [colorStyles[colors].loading]: showLoader,
                },
                className,
            ),
            'data-test-id': dataTestId || null,
        };

        const {
            disabled,
            type = 'button',
            ...restButtonProps
        } = restProps as ButtonHTMLAttributes<HTMLButtonElement>;

        const buttonChildren = (
            <React.Fragment>
                {leftAddons && <span className={styles.addons}>{leftAddons}</span>}
                {children && (
                    <span
                        className={cn(styles.text, {
                            [styles.nowrap]: nowrap,
                            [styles.stretchText]: !(leftAddons || rightAddons),
                        })}
                    >
                        {children}
                    </span>
                )}

                {showLoader && (
                    <Spinner
                        dataTestId={getDataTestId(dataTestId, 'loader')}
                        visible={true}
                        className={cn(styles.loader, colorStyles[colors].loader, spinnerClassName)}
                    />
                )}

                {rightAddons && <span className={styles.addons}>{rightAddons}</span>}
            </React.Fragment>
        );

        useEffect(() => {
            if (loading) {
                setLoaderTimePassed(false);

                timerId.current = window.setTimeout(() => {
                    setLoaderTimePassed(true);
                }, LOADER_MIN_DISPLAY_INTERVAL);
            }
        }, [loading]);

        useEffect(
            () => () => {
                window.clearTimeout(timerId.current);
            },
            [],
        );

        const handleClick = (
            e: React.MouseEvent<HTMLAnchorElement, MouseEvent> &
                React.MouseEvent<HTMLButtonElement, MouseEvent>,
        ) => {
            if (disabled || showLoader) {
                e.preventDefault();
                e.stopPropagation();

                return;
            }
            onClick?.(e);
        };

        if (href) {
            const { target } = restProps as AnchorHTMLAttributes<HTMLAnchorElement>;

            // Для совместимости с react-router-dom, меняем href на to
            const hrefProps = { [typeof Component === 'string' ? 'href' : 'to']: href };

            return (
                <Component
                    rel={target === '_blank' ? 'noreferrer noopener' : undefined}
                    {...componentProps}
                    {...(restProps as AnchorHTMLAttributes<HTMLAnchorElement>)}
                    {...hrefProps}
                    onClick={handleClick}
                    disabled={disabled || showLoader}
                    ref={mergeRefs([buttonRef, ref])}
                >
                    {buttonChildren}
                </Component>
            );
        }

        return (
            <Component
                {...componentProps}
                {...restButtonProps}
                onClick={handleClick}
                type={type}
                disabled={disabled || showLoader}
                ref={mergeRefs([buttonRef, ref])}
            >
                {buttonChildren}
            </Component>
        );
    },
);

/**
 * Для отображения в сторибуке
 */
Button.defaultProps = {
    view: 'secondary',
    size: 'm',
    block: false,
    loading: false,
    nowrap: false,
};
