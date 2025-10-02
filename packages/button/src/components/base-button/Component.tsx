import React, { Children, forwardRef } from 'react';
import cn from 'classnames';

import { useLoading } from '../../shared';
import { type ButtonRef, type CommonButtonProps, type PrivateButtonProps } from '../../typings';
import { BaseButtonCandidate } from '../base-button-candidate';
import { ButtonComponent } from '../button-component';
import { ButtonContent } from '../button-content';

import defaultColors from './default.module.css';
import commonStyles from './index.module.css';
import invertedColors from './inverted.module.css';

const colorStyles = {
    default: defaultColors,
    inverted: invertedColors,
} as const;

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
            loaderClassName = spinnerClassName,
            loading: loadingFromProps,
            nowrap,
            colors = 'default',
            Component = ButtonComponent,
            styles = {},
            colorStylesMap = { default: {}, inverted: {} },
            disabled,
            ...restProps
        },
        ref,
    ) => {
        const loading = useLoading(loadingFromProps);
        const hasLabel = Children.toArray(children).length > 0;
        const showHint = size >= 56 && Children.toArray(hint).length > 0;
        const sizeStyle = `size${size}`;
        const blurred =
            allowBackdropBlur &&
            (view === 'secondary' || (disabled && (view === 'accent' || view === 'primary')));

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
            {
                [commonStyles[shape]]: shape === 'rounded',
                [styles[sizeStyle]]: shape === 'rectangular',
                [commonStyles.defaultPaddings]: hasLabel && view !== 'text',
                [commonStyles.defaultWidth]: hasLabel && view !== 'text',
                [commonStyles.minWidth]: !hasLabel && view !== 'text',
                [commonStyles.minHeight]: view !== 'text',
                [commonStyles.blurred]: blurred,
            },
            loading && [
                commonStyles.loading,
                colorStyles[colors].loading,
                colorStylesMap[colors].loading,
            ],
            classNameFromProps,
        );

        return (
            <BaseButtonCandidate
                {...restProps}
                ref={ref}
                className={className}
                Content={ButtonContent}
                Component={Component}
                loading={loading}
                loaderClassName={cn(
                    commonStyles.loader,
                    colorStyles[colors].loader,
                    colorStylesMap[colors].loader,
                    loaderClassName,
                )}
                disabled={disabled}
                disabledClassName={cn(
                    colorStylesMap[colors].disabled,
                    colorStyles[colors].disabled,
                )}
            >
                {Children.toArray(leftAddons).length > 0 && (
                    <span className={commonStyles.addon}>{leftAddons}</span>
                )}
                {hasLabel && (
                    <span
                        className={cn(commonStyles.label, {
                            [commonStyles.nowrap]: nowrap,
                            [commonStyles.stretchText]: textResizing === 'fill',
                        })}
                    >
                        {children}
                        {showHint && (
                            <span
                                className={cn(
                                    commonStyles.hint,
                                    colorStylesMap[colors].hint,
                                    colorStyles[colors].hint,
                                )}
                            >
                                {hint}
                            </span>
                        )}
                    </span>
                )}
                {Children.toArray(rightAddons).length > 0 && (
                    <span className={commonStyles.addon}>{rightAddons}</span>
                )}
            </BaseButtonCandidate>
        );
    },
);
