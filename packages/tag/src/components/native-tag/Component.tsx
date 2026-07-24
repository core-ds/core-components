import React, {
    forwardRef,
    type KeyboardEvent,
    type MouseEvent,
    type MouseEventHandler,
} from 'react';
import cn from 'classnames';

import { noop } from '@alfalab/core-components-shared';
import { CrossCircleMIcon } from '@alfalab/icons-glyph/CrossCircleMIcon';
import { CrossCircleSIcon } from '@alfalab/icons-glyph/CrossCircleSIcon';

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
            size = 48,
            checked,
            className,
            dataTestId,
            colors = 'default',
            onClick,
            onClear = noop,
            showClear = false,
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

        const showClearButton = Boolean(checked && showClear && children && !disabled);
        const showRightAddons = Boolean(rightAddons) && !showClearButton;

        const hasRightSlot = showRightAddons || showClearButton;

        const handleClearClick = (event: MouseEvent<HTMLDivElement>) => {
            event.stopPropagation();
            onClear();
        };

        const handleClearKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
            event.stopPropagation();

            if (event.key === 'Enter') onClear();
        };

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
                    [colorStyles.checked]: checked && Boolean(colorStyles.checked),
                    [colorStyles[view]]: Boolean(colorStyles[view]),
                    [commonStyles.focused]: focused,
                    [commonStyles.withRightAddons]: showRightAddons,
                    [commonStyles.withLeftAddons]: Boolean(leftAddons),
                    [commonStyles.noContent]: Boolean((leftAddons || hasRightSlot) && !children),
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
                    <span ref={childrenRef} className={cn(commonStyles.content, childrenClassName)}>
                        {children}
                    </span>
                ) : null}

                {showRightAddons && <span className={commonStyles.addons}>{rightAddons}</span>}

                {hasRightSlot && !showRightAddons && (
                    <div
                        role='button'
                        className={cn(
                            commonStyles.addons,
                            commonStyles.clear,
                            colorCommonStyles[colors].clear,
                        )}
                        onClick={handleClearClick}
                        onKeyDown={handleClearKeyDown}
                        tabIndex={0}
                    >
                        {[32, 40].includes(size) ? <CrossCircleSIcon /> : <CrossCircleMIcon />}
                    </div>
                )}
            </BaseButton>
        );
    },
);
