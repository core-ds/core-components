import React, { forwardRef, useMemo } from 'react';
import mergeRefs from 'react-merge-refs';
import cn from 'classnames';

import { RateGroup } from './components/rate-group';
import { useRate } from './hooks';
import { type RateProps, type RateRef } from './types';

import styles from './index.module.css';

/**
 * Компонент рейтинга для оценки и ввода рейтинга с помощью иконок
 *
 * @example
 * ```tsx
 * <Rate defaultValue={3} />
 * ```
 */
export const Rate = forwardRef<HTMLDivElement & RateRef, RateProps>(
    (
        {
            value,
            defaultValue = 0,
            count = 5,
            allowClear = true,
            disabled = false,
            readOnly = false,
            character,
            tooltips,
            size = 'm',
            className,
            style,
            onChange,
            onHoverChange,
            onKeyDown,
        },
        ref,
    ) => {
        const {
            currentValue,
            hoverValue,
            containerRef,
            handleItemClick,
            handleItemHover,
            handleHoverLeave,
        } = useRate({
            value,
            defaultValue,
            count,
            allowClear,
            disabled,
            readOnly,
            onChange,
            onHoverChange,
            onKeyDown,
        });

        // Создаём пропсы для каждого элемента
        const items = useMemo(
            () =>
                Array.from({ length: count }).map((_, index) => ({
                    index,
                    currentValue,
                    hoverValue,
                    disabled,
                    readOnly,
                    character,
                    tooltip: tooltips?.[index],
                    onClick: handleItemClick,
                    onHover: handleItemHover,
                    onHoverLeave: handleHoverLeave,
                })),
            [
                count,
                currentValue,
                hoverValue,
                disabled,
                readOnly,
                character,
                tooltips,
                handleItemClick,
                handleItemHover,
                handleHoverLeave,
            ],
        );

        const combinedRef = mergeRefs([ref, containerRef]);

        return (
            <div
                ref={combinedRef}
                className={cn(styles.container, className)}
                style={style}
                aria-disabled={disabled}
            >
                <RateGroup items={items} size={size} onKeyDown={onKeyDown} />
            </div>
        );
    },
);
