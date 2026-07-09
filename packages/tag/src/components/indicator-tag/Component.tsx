import React, { forwardRef, type MouseEventHandler } from 'react';
import cn from 'classnames';

import { Indicator } from '@alfalab/core-components-indicator';

import { type BaseTagProps, type StyleColors } from '../../typings';
import { Button as BaseButton } from '../button';

import { indicatorTagGeometry, indicatorTagPaths, resolveValueToIndicatorShiftX } from './paths';

import defaultColors from './default.module.css';
import commonStyles from './index.module.css';
import invertedColors from './inverted.module.css';

const colorCommonStyles = {
    default: defaultColors,
    inverted: invertedColors,
} as const;

const INDICATOR_TAG_SIZES = [32, 40, 48] as const;
const INDICATOR_TAG_VIEWS = ['filled', 'muted'] as const;

export interface IndicatorTagProps
    extends Omit<
        BaseTagProps,
        | 'Component'
        | 'colorStylesMap'
        | 'onClick'
        | 'styles'
        | 'view'
        | 'variant'
        | 'allowBackdropBlur'
        | 'childrenRef'
        | 'size'
    > {
    size?: 32 | 40 | 48;
    view?: 'filled' | 'muted';
    colorStyles?: StyleColors['default'];
    styles?: BaseTagProps['styles'];
    onClick?: MouseEventHandler<HTMLButtonElement>;
    focused?: boolean;
}

export const IndicatorTag = forwardRef<HTMLButtonElement, IndicatorTagProps>(
    (
        {
            size = 40,
            indicatorProps,
            colors = 'default',
            className,
            childrenClassName,
            shape = 'rounded',
            view = 'muted',
            checked,
            children,
            leftAddons,
            rightAddons,
            dataTestId,
            onClick,
            focused = false,
            colorStyles = {},
            style,
            styles = {},
            ...restProps
        },
        ref,
    ) => {
        const indicatorTagSize = INDICATOR_TAG_SIZES.includes(size) ? size : 40;
        const hasIndicator = indicatorProps !== undefined;

        const { mode: modeProp, value, ...restIndicatorProps } = indicatorProps ?? {};
        const mode = modeProp ?? (typeof value === 'number' ? 'count' : 'dot');

        const isDotMode = mode === 'dot';
        const dotModeValue = isDotMode ? undefined : value;
        const pathMode = hasIndicator ? mode : 'none';

        const colorStyle = colorCommonStyles?.[colors];
        const indicatorView = INDICATOR_TAG_VIEWS.includes(view) ? view : 'filled';

        const { width, height, indicatorX, indicatorY } =
            indicatorTagGeometry[shape][mode][indicatorTagSize];

        const shapePath = indicatorTagPaths[shape][pathMode][indicatorTagSize];

        const buttonProps = {
            className: cn(
                commonStyles.badgeIcon,
                commonStyles[`size-${indicatorTagSize}`],
                colorStyle.badgeIcon,
                colorStyle[indicatorView],
                styles[shape],
                colorStyles?.[indicatorView],
                colorStyles?.badgeIcon,
                className,
                {
                    [commonStyles.focused]: focused,
                    [colorStyle.checked]: Boolean(checked),
                },
            ),
            style,
            'data-test-id': dataTestId,
        };

        return (
            <BaseButton ref={ref} onClick={onClick} {...buttonProps} {...restProps}>
                <svg
                    className={commonStyles.svg}
                    width={width}
                    height={height}
                    viewBox={`0 0 ${width} ${height}`}
                    aria-hidden={true}
                    focusable={false}
                >
                    <path
                        className={cn(
                            commonStyles.shapePath,
                            colorStyle.shapePath,
                            colorStyles?.shapePath,
                            {
                                [colorStyle.checkedShapePath]: Boolean(checked),
                            },
                        )}
                        d={shapePath}
                    />
                </svg>

                <div
                    className={cn(
                        commonStyles.shapeInner,
                        colorStyle.shapeInner,
                        commonStyles[shape],
                        commonStyles[mode],
                        {
                            [colorStyle.checkedInner]: Boolean(checked),
                        },
                        childrenClassName,
                    )}
                    aria-hidden={true}
                >
                    {leftAddons}
                </div>

                {hasIndicator ? (
                    <Indicator
                        {...restIndicatorProps}
                        className={commonStyles.indicator}
                        style={{
                            left: indicatorX + resolveValueToIndicatorShiftX(dotModeValue),
                            top: indicatorY,
                        }}
                        size={isDotMode ? 8 : 16}
                        value={dotModeValue}
                    />
                ) : null}
            </BaseButton>
        );
    },
);
