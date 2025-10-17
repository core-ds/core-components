import React, { forwardRef } from 'react';
import cn from 'classnames';

import { IconButton } from '@alfalab/core-components-icon-button';
import { Indicator } from '@alfalab/core-components-indicator';
import { SlidersMIcon } from '@alfalab/icons-glyph/SlidersMIcon';

import { type BaseFilterButtonProps, type TFilterButtonSize } from '../../types';
import { getVariant } from '../../utils';

import { MaskedContent } from './MaskedContent';

import defaultColors from './default.module.css';
import styles from './index.module.css';
import invertedColors from './inverted.module.css';

const colorStyles = {
    default: defaultColors,
    inverted: invertedColors,
};

const SIZE_TO_CLASSNAME_MAP: Record<TFilterButtonSize, 'size-32' | 'size-40'> = {
    32: 'size-32',
    40: 'size-40',
};

export const BaseFilterButton = forwardRef<HTMLButtonElement, BaseFilterButtonProps>(
    (
        { className, dataTestId, colors = 'default', size, pathMask = 'rectangle', indicatorProps },
        ref,
    ) => {
        const hasIndicator = Boolean(indicatorProps);
        const variant = getVariant({ hasIndicator, indicatorProps });

        return (
            <div className={cn(styles.wrapper, styles[SIZE_TO_CLASSNAME_MAP[size]], className)}>
                <MaskedContent
                    className={colorStyles[colors].bgColor}
                    variant={variant}
                    size={size}
                    pathMask={pathMask}
                >
                    <IconButton
                        ref={ref}
                        colors={colors}
                        size={size}
                        icon={SlidersMIcon}
                        dataTestId={dataTestId}
                        aria-label='Filter'
                    />
                </MaskedContent>

                {hasIndicator && (
                    <div
                        className={cn(styles.indicatorWrapper, {
                            [styles.dots]: !indicatorProps?.value,
                        })}
                    >
                        <Indicator
                            view='red'
                            border={false}
                            size={indicatorProps?.value ? 16 : 8}
                            maxValue={10}
                            {...indicatorProps}
                        />
                    </div>
                )}
            </div>
        );
    },
);
