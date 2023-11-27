/* eslint-disable complexity */
import React, {
    AnchorHTMLAttributes,
    ButtonHTMLAttributes,
    useEffect,
    useRef,
    useState,
} from 'react';
import mergeRefs from 'react-merge-refs';
import cn from 'classnames';

import { getDataTestId } from '@alfalab/core-components-shared';
import { Spinner } from '@alfalab/core-components-spinner';
import { useFocus } from '@alfalab/hooks';

import { CommonButtonProps, ComponentProps, PrivateButtonProps } from '../../typings';

import defaultColors from './default.module.css';
import commonStyles from './index.module.css';
import invertedColors from './inverted.module.css';

const colorStyles = {
    default: defaultColors,
    inverted: invertedColors,
};

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

export const BaseButton = React.forwardRef<
    HTMLAnchorElement | HTMLButtonElement,
    CommonButtonProps & PrivateButtonProps
>(
    (
        {
            children,
            view = 'secondary',
            shape = 'rectangular',
            textResizing = 'hug',
            hint,
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
            styles = {},
            colorStylesMap = { default: {}, inverted: {} },
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

        const showHint = hint && ['m', 'l', 'xl'].includes(size);

        const iconOnly = !children;

        const componentProps = {
            className: cn(
                commonStyles.component,
                commonStyles[view],
                commonStyles[size],
                commonStyles[textResizing],
                shape === 'rectangular' && styles[size],
                shape === 'rounded' && commonStyles[shape],
                colorStyles[colors].component,
                colorStyles[colors][view],
                colorStylesMap[colors].component,
                {
                    [colorStylesMap[colors][view]]: Boolean(colorStylesMap[colors][view]),
                    [commonStyles.focused]: focused,
                    [commonStyles.block]: block,
                    [commonStyles.iconOnly]: iconOnly,
                    [commonStyles.loading]: showLoader,
                    [commonStyles.withRightAddons]: Boolean(rightAddons) && !iconOnly,
                    [commonStyles.withLeftAddons]: Boolean(leftAddons) && !iconOnly,
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
                {leftAddons && <span className={commonStyles.addons}>{leftAddons}</span>}
                {children && (
                    <span
                        className={cn(commonStyles.text, {
                            [commonStyles.nowrap]: nowrap,
                            [commonStyles.stretchText]:
                                !(leftAddons || rightAddons) || textResizing === 'fill',
                        })}
                    >
                        {children}
                        {showHint && <span className={commonStyles.hint}>{hint}</span>}
                    </span>
                )}

                {showLoader && (
                    <Spinner
                        dataTestId={getDataTestId(dataTestId, 'loader')}
                        visible={true}
                        className={cn(
                            commonStyles.loader,
                            colorStyles[colors].loader,
                            spinnerClassName,
                        )}
                    />
                )}

                {rightAddons && <span className={commonStyles.addons}>{rightAddons}</span>}
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
