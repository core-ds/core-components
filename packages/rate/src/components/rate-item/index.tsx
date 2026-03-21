import React, { forwardRef, useMemo } from 'react';
import cn from 'classnames';
import mergeRefs from 'react-merge-refs';
import type { RateItemProps } from '../../types';
import { getItemState } from '../../utils/calculate-value';

import styles from './index.module.css';

/**
 * Компонент отдельного элемента рейтинга (звезды)
 */
export const RateItem = forwardRef<HTMLDivElement, RateItemProps>(
    (
        {
            index,
            value,
            currentValue,
            hoverValue,
            allowHalf,
            disabled,
            readOnly,
            character,
            tooltip,
            onClick,
            onHover,
            onHoverLeave,
        },
        ref,
    ) => {
        const { isActive, isHalfActive } = useMemo(
            () => getItemState(index, hoverValue !== null ? hoverValue : currentValue),
            [index, hoverValue, currentValue]
        );

        const isInteractive = !disabled && !readOnly;

        const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
            if (!isInteractive) return;

            const rect = event.currentTarget.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const isHalfClick = allowHalf && x < rect.width / 2;

            onClick(index, isHalfClick, event);
        };

        const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
            if (!isInteractive) return;

            const rect = event.currentTarget.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const isHalf = allowHalf && x < rect.width / 2;

            onHover(index, isHalf);
        };

        const characterNode = useMemo(() => {
            if (typeof character === 'function') {
                return character(index);
            }
            return character ?? '★';
        }, [character, index]);

        return (
            <div
                ref={ref}
                role="radio"
                aria-checked={isActive || isHalfActive}
                aria-disabled={disabled}
                aria-readonly={readOnly}
                title={tooltip}
                data-tooltip={tooltip}
                className={cn(
                    styles.container,
                    disabled && styles.disabled,
                    isInteractive && styles.interactive,
                    (isActive || isHalfActive) && styles.active
                )}
                onClick={handleClick}
                onMouseMove={handleMouseMove}
                onMouseLeave={onHoverLeave}
                tabIndex={isInteractive ? 0 : -1}
            >
                {/* Полный символ (фон) */}
                <div className={cn(styles.symbol, styles.symbolFull)}>
                    {characterNode}
                </div>

                {/* Заполненная часть */}
                <div
                    className={cn(
                        styles.symbol,
                        styles.symbolActive,
                        isActive && styles.symbolFullActive,
                        isHalfActive && styles.symbolHalfActive
                    )}
                >
                    {characterNode}
                </div>
            </div>
        );
    }
);
