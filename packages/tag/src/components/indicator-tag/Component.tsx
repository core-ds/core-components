import React, { forwardRef, Fragment, type MouseEventHandler, useId } from 'react';
import cn from 'classnames';

import { Indicator } from '@alfalab/core-components-indicator';

import { type BaseTagProps, type StyleColors } from '../../typings';
import {
    resolveGeometry,
    resolveSizeToDimensions,
    resolveValueToIndicatorShiftX,
} from '../../utils';
import { Button as BaseButton } from '../button';

import defaultColors from './default.module.css';
import commonStyles from './index.module.css';
import invertedColors from './inverted.module.css';

const colorCommonStyles = {
    default: defaultColors,
    inverted: invertedColors,
} as const;

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
    size: 32 | 40;
    colorStyles?: StyleColors['default'];
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
            shape,
            checked,
            children,
            leftAddons,
            rightAddons,
            dataTestId,
            onClick,
            focused = false,
            colorStyles,
            ...restProps
        },
        ref,
    ) => {
        const maskId = useId();

        const isRect = shape === 'rectangular';
        const hasIndicator = indicatorProps !== undefined;

        const { mode: modeProp, value, ...restIndicatorProps } = indicatorProps ?? {};
        const mode = modeProp ?? (typeof value === 'number' ? 'count' : 'dot');

        const isDotMode = mode === 'dot';
        const dotModeValue = isDotMode ? undefined : value;

        const colorStyle = colorCommonStyles?.[colors];

        const { width, height } = resolveSizeToDimensions(size);

        const { badgeX, badgeY, cutoutR, cr, junctionR, junctionRect, junctions } = resolveGeometry(
            {
                width,
                height,
                shape,
                indicatorProps,
            },
        );

        const buttonProps = {
            className: cn(commonStyles.badgeIcon, colorStyle.badgeIcon, className, {
                [commonStyles.focused]: focused,
                [colorStyle.checked]: Boolean(checked),
            }),
            'data-test-id': dataTestId,
            style: { width, minWidth: width, height },
        };

        return (
            <BaseButton ref={ref} onClick={onClick} {...buttonProps} {...restProps}>
                <svg
                    className={commonStyles.svg}
                    width={width}
                    height={height}
                    viewBox={`0 0 ${width} ${height}`}
                    aria-hidden={true}
                    style={{ borderRadius: isRect ? `${cr}px` : '50%' }}
                >
                    <defs>
                        <mask id={maskId}>
                            {isRect ? (
                                <rect
                                    className={colorStyle.mask}
                                    width={width}
                                    height={height}
                                    rx={cr}
                                    ry={cr}
                                />
                            ) : (
                                <ellipse
                                    className={colorStyle.mask}
                                    cx={width / 2}
                                    cy={height / 2}
                                    rx={width / 2}
                                    ry={height / 2}
                                />
                            )}

                            {hasIndicator ? (
                                <Fragment>
                                    <circle cx={badgeX} cy={badgeY} r={cutoutR} />
                                    {junctions ? (
                                        <Fragment>
                                            <rect
                                                x={junctions[0].cx}
                                                y={junctions[0].cy - junctionRect}
                                                width={junctionRect}
                                                height={junctionRect}
                                            />
                                            <rect
                                                x={junctions[1].cx}
                                                y={junctions[1].cy - junctionRect}
                                                width={junctionRect}
                                                height={junctionRect}
                                            />
                                            <circle
                                                className={colorStyle.mask}
                                                cx={junctions[0].cx}
                                                cy={junctions[0].cy}
                                                r={junctionR}
                                            />
                                            <circle
                                                className={colorStyle.mask}
                                                cx={junctions[1].cx}
                                                cy={junctions[1].cy}
                                                r={junctionR}
                                            />
                                        </Fragment>
                                    ) : null}
                                </Fragment>
                            ) : null}
                        </mask>
                    </defs>

                    <foreignObject width={width} height={height} mask={`url(#${maskId})`}>
                        <div
                            className={cn(
                                commonStyles.shapeInner,
                                colorStyle.shapeInner,
                                colorStyles?.filled,
                                { [colorStyle.checkedInner]: Boolean(checked) },
                                childrenClassName,
                            )}
                        >
                            {leftAddons}
                        </div>
                    </foreignObject>
                </svg>

                {hasIndicator ? (
                    <Indicator
                        {...restIndicatorProps}
                        className={commonStyles.indicator}
                        style={{
                            left: badgeX + resolveValueToIndicatorShiftX(dotModeValue),
                            top: badgeY,
                        }}
                        size={isDotMode ? 8 : 16}
                        value={dotModeValue}
                    />
                ) : null}
            </BaseButton>
        );
    },
);
