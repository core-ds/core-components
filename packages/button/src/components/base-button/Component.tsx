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
        link: 'transparent',
        ghost: 'text',
    };

    // eslint-disable-next-line no-console
    console.warn(
        // eslint-disable-next-line prefer-template
        `@alfalab/core-components/button: view='${view}' будет удален в следующих мажорных версиях. ` +
            `Используйте view='${viewsMap[view]}'. Чтобы поменять все кнопки на проекте разом, можно воспользоваться codemod: ` +
            'npx @alfalab/core-components-codemod --transformers=button-views-45 src/**/*.tsx',
    );
};

const SIZE_TO_CLASSNAME_MAP = {
    xxs: 'size-32',
    xs: 'size-40',
    s: 'size-48',
    m: 'size-56',
    l: 'size-64',
    xl: 'size-72',
    32: 'size-32',
    40: 'size-40',
    48: 'size-48',
    56: 'size-56',
    64: 'size-64',
    72: 'size-72',
};

export const BaseButton = React.forwardRef<
    HTMLAnchorElement | HTMLButtonElement,
    CommonButtonProps & PrivateButtonProps
>(
    (
        {
            allowBackdropBlur,
            children,
            view = 'secondary',
            shape = 'rectangular',
            textResizing = 'hug',
            hint,
            leftAddons,
            rightAddons,
            size = 56,
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
        if (['link', 'ghost'].includes(view)) {
            logWarning(view);
        }

        const buttonRef = useRef<HTMLElement>(null);

        const [focused] = useFocus(buttonRef, 'keyboard');

        const [loaderTimePassed, setLoaderTimePassed] = useState(true);

        const timerId = useRef(0);

        const showLoader = loading || !loaderTimePassed;

        const showHint =
            hint && ['size-56', 'size-64', 'size-72'].includes(SIZE_TO_CLASSNAME_MAP[size]);

        const iconOnly = !children;

        const componentProps = {
            className: cn(
                commonStyles.component,
                commonStyles[view],
                commonStyles[SIZE_TO_CLASSNAME_MAP[size]],
                commonStyles[textResizing],
                shape === 'rectangular' && styles[SIZE_TO_CLASSNAME_MAP[size]],
                shape === 'rounded' && commonStyles[shape],
                colorStyles[colors].component,
                colorStyles[colors][view],
                colorStylesMap[colors].component,
                {
                    [commonStyles.allowBackdropBlur]: allowBackdropBlur,
                    [colorStylesMap[colors][view]]: Boolean(colorStylesMap[colors][view]),
                    [commonStyles.focused]: focused,
                    [commonStyles.block]: block,
                    [commonStyles.iconOnly]: iconOnly,
                    [commonStyles.loading]: showLoader,
                    [commonStyles.withRightAddons]: Boolean(rightAddons) && !iconOnly,
                    [commonStyles.withLeftAddons]: Boolean(leftAddons) && !iconOnly,
                    [colorStyles[colors].loading]: showLoader,
                    [colorStylesMap[colors].loading]: showLoader,
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
                        className={cn(commonStyles.label, {
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
                    <Spinner.Preset
                        dataTestId={getDataTestId(dataTestId, 'loader')}
                        visible={true}
                        className={cn(
                            commonStyles.loader,
                            colorStyles[colors].loader,
                            colorStylesMap[colors].loader,
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
