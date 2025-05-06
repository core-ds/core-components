import React from 'react';
import cn from 'classnames';

import { TypographyText } from '@alfalab/core-components-typography';

import { PayloadProps } from '../../types/payload.types';
import { SeriaProps } from '../../types/seria.types';
import { TooltipProps } from '../../types/tooltip.types';

import styles from './index.module.css';

export interface TooltipContentProps extends TooltipProps {
    payload: PayloadProps[];
    series: SeriaProps[];
}

export const TooltipContent = ({
    payload,
    separator,
    label,
    tooltipArrowSide,
    arrow,
    series,
    labelFormatter,
    labelStyle,
}: TooltipContentProps) => {
    if (!label || payload.length === 0) return null;

    return (
        <div className={cn(styles.tooltip)}>
            {arrow && (
                <span
                    className={cn(
                        styles.tooltipArrow,
                        tooltipArrowSide ? '' : styles.tooltipArrowRight,
                    )}
                />
            )}
            <ul className={cn(styles.tooltipList)}>
                <li className={cn(styles.tooltipItem)} style={labelStyle}>
                    <TypographyText
                        view='primary-medium'
                        tag='span'
                        weight='medium'
                        className={cn(styles.tooltipLabel)}
                    >
                        {labelFormatter ? labelFormatter(label) : label}
                    </TypographyText>
                </li>
                {payload.map((entry: PayloadProps) => {
                    const data: SeriaProps | undefined = series.find(
                        (d: SeriaProps) => d.properties.dataKey === entry.dataKey,
                    );

                    if (data?.hideTooltip || data?.hide) return null;

                    return (
                        <li
                            className={cn(styles.tooltipItem)}
                            key={entry.dataKey}
                            style={{ color: entry.color }}
                        >
                            <TypographyText
                                view='primary-medium'
                                tag='span'
                                weight='medium'
                                className={cn(styles.tooltipValue)}
                            >
                                {entry?.formatter ? entry.formatter(entry.value) : entry.value}
                                {separator || ' '}
                            </TypographyText>
                            <TypographyText
                                view='secondary-large'
                                tag='span'
                                className={cn(styles.tooltipName)}
                            >{`${entry.name}`}</TypographyText>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};
