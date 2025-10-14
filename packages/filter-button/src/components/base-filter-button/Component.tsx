import React, { forwardRef } from 'react';
import cn from 'classnames';

import { Button } from '@alfalab/core-components-button';
import { Indicator } from '@alfalab/core-components-indicator';

import { type BaseFilterButtonProps, type TFilterButtonSize } from '../../types';

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
        {
            children,
            className,
            dataTestId,
            colors = 'default',
            size = 40,
            disabled,
            onClick,
            indicator = false,
            indicatorType = 'dot',
            indicatorValue,
            fixedWidth = true,
            optionsList,
        },
        ref,
    ) => {
        const hasCount = indicatorType === 'count' && typeof indicatorValue !== 'undefined';
        const showIndicator = indicator && (indicatorType === 'dot' || hasCount);

        return (
            <div
                className={cn(
                    styles.wrapper,
                    styles[SIZE_TO_CLASSNAME_MAP[size]],
                    fixedWidth && styles.fixedWidth,
                    className,
                )}
                data-test-id={dataTestId}
            >
                <Button
                    ref={ref}
                    view='secondary'
                    shape='rectangular'
                    size={size}
                    textResizing='hug'
                    colors={colors}
                    disabled={disabled}
                    onClick={disabled ? undefined : onClick}
                    block={fixedWidth}
                    dataTestId={dataTestId}
                >
                    {children}
                </Button>

                {showIndicator && (
                    <span className={styles.indicatorWrapper} aria-hidden={true}>
                        {hasCount ? (
                            <Indicator
                                className={styles.indicator}
                                height={20}
                                value={indicatorValue && indicatorValue > 9 ? 9 : indicatorValue}
                                view={colors === 'inverted' ? 'white' : 'red'}
                                data-test-id={dataTestId ? `${dataTestId}-indicator` : undefined}
                            />
                        ) : (
                            <span className={cn(styles.dot, colorStyles[colors].dot)} />
                        )}
                    </span>
                )}

                {optionsList}
            </div>
        );
    },
);
