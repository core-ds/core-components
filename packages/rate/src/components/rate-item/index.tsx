import React, { forwardRef, useMemo } from 'react';
import cn from 'classnames';
import { type RateItemProps } from '../../types';
import { getItemState } from '../../utils/calculate-value';

import styles from './index.module.css';

/**
 * Компонент отдельного элемента рейтинга (звезды)
 */
export const RateItem = forwardRef<HTMLDivElement, RateItemProps>(
    (
        {
            index,
            currentValue,
            hoverValue,
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
        const isActive = useMemo(
            () => getItemState(index, hoverValue !== null ? hoverValue : currentValue),
            [index, hoverValue, currentValue],
        );

        const isInteractive = !disabled && !readOnly;

        const handleClick = () => {
            if (!isInteractive) {
                return;
            }

            onClick(index);
        };

        const handleMouseMove = () => {
            if (!isInteractive) {
                return;
            }

            onHover(index);
        };

        const characterNode = useMemo(() => {
            if (character) {
                return character;
            }

            return '★';
        }, [character]);

        return (
            <div
                ref={ref}
                role="radio"
                aria-checked={isActive}
                aria-disabled={disabled}
                title={tooltip}
                data-tooltip={tooltip}
                className={cn(styles.container, disabled && styles.disabled, isInteractive && styles.interactive, isActive && styles.active)}
                onClick={handleClick}
                onMouseMove={handleMouseMove}
                onMouseLeave={onHoverLeave}
                tabIndex={isInteractive ? 0 : -1}
                onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        handleClick();
                    }
                }}
            >
                {/* Полный символ (фон) */}
                <div className={cn(styles.symbol, styles.symbolFull)}>
                    {characterNode}
                </div>

                {/* Заполненная часть */}
                <div
                    className={cn(styles.symbol, styles.symbolActive, isActive && styles.symbolFullActive)}
                >
                    {character}
                </div>
            </div>
        );
    },
);
