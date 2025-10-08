import React, { forwardRef } from 'react';
import cn from 'classnames';

import { useLoading } from '../../shared';
import { type ButtonRef, type CommonButtonProps, type PrivateButtonProps } from '../../typings';
import { BaseButtonCandidate } from '../base-button-candidate';
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
            className: classNameFromProps,
            spinnerClassName,
            href,
            loading = false,
            nowrap = false,
            colors = 'default',
            Component = ButtonComponent,
            styles = {},
            colorStylesMap = { default: {}, inverted: {} },
            disabled = false,
            type = 'button',
            ...restProps
        },
        ref,
    ) => {
        const showLoader = useLoading(loading);

        const showHint = hint && [56, 64, 72].includes(size);

        const iconOnly = !children;

        const sizeStyle = `size-${size}`;

        const className = cn(
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
                [commonStyles.iconOnly]: iconOnly,
                [commonStyles.loading]: showLoader,
                [commonStyles.withRightAddons]:
                    Boolean(rightAddons) && !iconOnly && !(view === 'text'),
                [commonStyles.withLeftAddons]:
                    Boolean(leftAddons) && !iconOnly && !(view === 'text'),
                [colorStyles[colors].loading]: showLoader,
                [colorStylesMap[colors].loading]: showLoader,
            },
            classNameFromProps,
        );

        const loaderClassName = cn(
            colorStyles[colors].loader,
            colorStylesMap[colors].loader,
            spinnerClassName,
        );

        return (
            <BaseButtonCandidate
                {...restProps}
                ref={ref}
                href={href}
                type={type}
                className={className}
                Component={Component}
                loading={showLoader}
                loaderClassName={loaderClassName}
                disabled={disabled}
                disabledClassName={cn(commonStyles.disabled, colorStyles[colors].disabled)}
            >
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
                {rightAddons && <span className={commonStyles.addons}>{rightAddons}</span>}
            </BaseButtonCandidate>
        );
    },
);
