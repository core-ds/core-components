import React, { forwardRef, type MouseEventHandler } from 'react';
import cn from 'classnames';

import { type BaseTagProps, type StyleColors } from '../../typings';
import { Button as BaseButton } from '../button';

import defaultColors from './default.module.css';
import commonStyles from './index.module.css';
import invertedColors from './inverted.module.css';

const colorCommonStyles = {
    default: defaultColors,
    inverted: invertedColors,
} as const;

interface NativeTagProps
    extends Omit<BaseTagProps, 'Component' | 'colorStylesMap' | 'onClick' | 'shape'> {
    shape: 'rounded' | 'rectangular';
    colorStyles: StyleColors['default'];
    onClick?: MouseEventHandler<HTMLButtonElement>;
    focused?: boolean;
}

export const NativeTag = forwardRef<HTMLButtonElement, NativeTagProps>(
    (
        {
            allowBackdropBlur,
            rightAddons,
            leftAddons,
            indicatorProps,
            children,
            size,
            checked,
            className,
            dataTestId,
            colors = 'default',
            onClick,
            colorStyles,
            childrenClassName,
            childrenRef,
            disabled,
            shape,
            styles = {},
            view = 'outlined',
            focused = false,
            ...restProps
        },
        ref,
    ) => {
        const sizeClassName = `size-${size}`;

        const buttonProps = {
            className: cn(
                commonStyles.component,
                colorCommonStyles[colors].component,
                colorStyles.component,
                commonStyles[sizeClassName],
                styles[sizeClassName],
                colorCommonStyles[colors][view],
                commonStyles[view],
                {
                    [commonStyles.allowBackdropBlur]: allowBackdropBlur,
                    [commonStyles.checked]: checked,
                    [commonStyles[shape]]: Boolean(commonStyles[shape]),
                    [styles[shape]]: Boolean(styles[shape]),
                    [colorCommonStyles[colors].checked]: checked,
                    [colorStyles[view]]: Boolean(colorStyles[view]),
                    [commonStyles.focused]: focused,
                    [commonStyles.withRightAddons]: Boolean(rightAddons),
                    [commonStyles.withLeftAddons]: Boolean(leftAddons),
                    [commonStyles.noContent]: Boolean((leftAddons || rightAddons) && !children),
                },
                className,
            ),
            'data-test-id': dataTestId,
            disabled,
        };

        return (
            <BaseButton ref={ref} onClick={onClick} {...buttonProps} {...restProps}>
                {leftAddons ? <span className={commonStyles.addons}>{leftAddons}</span> : null}

                {children ? (
                    <span ref={childrenRef} className={childrenClassName}>
                        {children}
                    </span>
                ) : null}

                {rightAddons ? <span className={commonStyles.addons}>{rightAddons}</span> : null}
            </BaseButton>
        );
    },
);
