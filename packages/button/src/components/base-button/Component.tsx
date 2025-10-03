/* eslint-disable complexity */
import React, { forwardRef, type MouseEventHandler, useEffect, useRef, useState } from 'react';
import mergeRefs from 'react-merge-refs';
import cn from 'classnames';

import { getDataTestId, isNonNullable } from '@alfalab/core-components-shared';
import { Spinner } from '@alfalab/core-components-spinner';
import { useFocus } from '@alfalab/hooks';

import { LOADER_MIN_DISPLAY_INTERVAL } from '../../constants/loader-min-display-interval';
import { type ButtonRef, type CommonButtonProps, type PrivateButtonProps } from '../../typings';
import { ButtonComponent } from '../button-component';

import defaultColors from './default.module.css';
import commonStyles from './index.module.css';
import invertedColors from './inverted.module.css';

const colorStyles = {
    default: defaultColors,
    inverted: invertedColors,
};

export const BaseButton = forwardRef<ButtonRef, CommonButtonProps & PrivateButtonProps>(
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
            Component = ButtonComponent,
            onClick,
            styles = {},
            colorStylesMap = { default: {}, inverted: {} },
            disabled = false,
            type = 'button',
            ...restProps
        },
        ref,
    ) => {
        const buttonRef = useRef<HTMLElement>(null);

        const [focused] = useFocus(buttonRef, 'keyboard');

        const [loaderTimePassed, setLoaderTimePassed] = useState(true);

        const timerId = useRef<number | null>(null);

        const showLoader = loading || !loaderTimePassed;

        const showHint = hint && [56, 64, 72].includes(size);

        const iconOnly = !children;

        const sizeStyle = `size-${size}`;

        const passDisabledClass = disabled && Boolean(href);

        const componentProps = {
            className: cn(
                commonStyles.component,
                colorStyles[colors].component,
                styles.component,
                colorStylesMap[colors].component,
                commonStyles[view],
                colorStyles[colors][view],
                colorStylesMap[colors][view],
                commonStyles[sizeStyle],
                commonStyles[textResizing],
                shape === 'rectangular' && styles[sizeStyle],
                shape === 'rounded' && commonStyles[shape],
                {
                    [commonStyles.allowBackdropBlur]: allowBackdropBlur,
                    [commonStyles.focused]: focused,
                    [commonStyles.block]: block,
                    [commonStyles.iconOnly]: iconOnly,
                    [commonStyles.loading]: showLoader,
                    [commonStyles.withRightAddons]: Boolean(rightAddons) && !iconOnly,
                    [commonStyles.withLeftAddons]: Boolean(leftAddons) && !iconOnly,
                    [colorStyles[colors].loading]: showLoader,
                    [colorStylesMap[colors].loading]: showLoader,
                },
                passDisabledClass && [styles.disabled, colorStyles[colors].disabled],
                className,
            ),
            'data-test-id': dataTestId,
        };

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
                        {showHint && (
                            <span className={cn(commonStyles.hint, colorStyles[colors].hint)}>
                                {hint}
                            </span>
                        )}
                    </span>
                )}

                {showLoader && (
                    <Spinner
                        preset={24}
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
                    timerId.current = null;
                }, LOADER_MIN_DISPLAY_INTERVAL);
            }
        }, [loading]);

        useEffect(
            () => () => {
                if (isNonNullable(timerId.current)) {
                    window.clearTimeout(timerId.current);
                }
            },
            [],
        );

        const handleClick: MouseEventHandler<HTMLElement> = (event) => {
            if (disabled || showLoader) {
                event.preventDefault();
                event.stopPropagation();
            } else {
                onClick?.(event);
            }
        };

        return (
            <Component
                {...componentProps}
                {...restProps}
                href={href}
                type={type}
                disabled={disabled}
                onClick={handleClick}
                ref={mergeRefs([buttonRef, ref])}
            >
                {buttonChildren}
            </Component>
        );
    },
);
