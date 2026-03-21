import React, { forwardRef } from 'react';
import cn from 'classnames';
import type { RateItemProps } from '../../types';
import { RateItem } from '../rate-item';

import styles from './index.module.css';

export interface RateGroupProps {
    /**
     * Массив пропсов для каждого элемента
     */
    items: RateItemProps[];
    /**
     * Дополнительный CSS-класс
     */
    className?: string;
    /**
     * Обработчик фокуса на группе
     */
    onFocus?: (event: React.FocusEvent<HTMLDivElement>) => void;
    /**
     * Обработчик потери фокуса
     */
    onBlur?: (event: React.FocusEvent<HTMLDivElement>) => void;
    /**
     * Обработчик клавиатуры
     */
    onKeyDown?: (event: React.KeyboardEvent<HTMLDivElement>) => void;
    /**
     * Автоматический фокус
     */
    autoFocus?: boolean;
}

/**
 * Группа элементов рейтинга
 */
export const RateGroup = forwardRef<HTMLDivElement, RateGroupProps>(
    ({ items, className, onFocus, onBlur, onKeyDown, autoFocus }, ref) => {
        return (
            <div
                ref={ref}
                role="radiogroup"
                className={cn(styles.group, className)}
                onFocus={onFocus}
                onBlur={onBlur}
                onKeyDown={onKeyDown}
                tabIndex={0}
                autoFocus={autoFocus}
            >
                {items.map((itemProps, index) => (
                    <RateItem key={index} {...itemProps} />
                ))}
            </div>
        );
    }
);
