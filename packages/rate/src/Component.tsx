import React, { forwardRef, useMemo } from 'react';
import mergeRefs from 'react-merge-refs';
import cn from 'classnames';

import type { RateProps, RateRef } from './types';
import { useRate } from '@alfalab/core-components-rate/hooks';
import { RateGroup } from '@alfalab/core-components-rate/components/rate-group';

import styles from './index.module.css';

const sizeMap = {
    s: styles.sizeS,
    m: styles.sizeM,
    l: styles.sizeL,
} as const;

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
            allowHalf = false,
            allowClear = true,
            disabled = false,
            readOnly = false,
            autoFocus = false,
            character,
            tooltips,
            size = 'm',
            className,
            style,
            onChange,
            onHoverChange,
            onFocus,
            onBlur,
            onKeyDown,
            ...restProps
        },
        ref,
    ) => {
        const {
            currentValue,
            hoverValue,
            containerRef,
            rateRef,
            handleItemClick,
            handleItemHover,
            handleHoverLeave,
            handleFocus,
            handleBlur,
            handleKeyDown,
            focus,
            blur,
        } = useRate({
            value,
            defaultValue,
            count,
            allowHalf,
            allowClear,
            disabled,
            readOnly,
            onChange,
            onHoverChange,
            onFocus,
            onBlur,
        });

        // Создаём пропсы для каждого элемента
        const items = useMemo(
            () =>
                Array.from({ length: count }).map((_, index) => ({
                    index,
                    value: index + 1,
                    currentValue,
                    hoverValue,
                    allowHalf,
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
                allowHalf,
                disabled,
                readOnly,
                character,
                tooltips,
                handleItemClick,
                handleItemHover,
                handleHoverLeave,
            ]
        );

        const combinedRef = mergeRefs([ref, containerRef, rateRef]);

        return (
            <div
                ref={combinedRef}
                className={cn(styles.container, sizeMap[size], className)}
                style={style}
                aria-disabled={disabled}
                aria-readonly={readOnly}
            >
                <RateGroup
                    items={items}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    onKeyDown={handleKeyDown}
                    autoFocus={autoFocus && !disabled && !readOnly}
                />
            </div>
        );
    }
);
