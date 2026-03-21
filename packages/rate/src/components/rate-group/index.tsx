import React, { forwardRef } from 'react';
import cn from 'classnames';
import { type RateItemProps, type RateSize } from '../../types';
import { RateItem } from '../rate-item';

import styles from './index.module.css';

const sizeMap: Record<RateSize, string> = {
    s: styles.sizeS,
    m: styles.sizeM,
    l: styles.sizeL,
};

export interface RateGroupProps {
    /**
     * Массив пропсов для каждого элемента
     */
    items: RateItemProps[];
    /**
     * Размер компонента
     */
    size?: RateSize;
    /**
     * Дополнительный CSS-класс
     */
    className?: string;
    /**
     * Обработчик клавиатуры
     */
    onKeyDown?: (event: React.KeyboardEvent<HTMLDivElement>) => void;
}

/**
 * Группа элементов рейтинга
 */
export const RateGroup = forwardRef<HTMLDivElement, RateGroupProps>(
    ({ items, size = 'm', className, onKeyDown }, ref) => (
        <div
            ref={ref}
            role="radiogroup"
            className={cn(styles.group, sizeMap[size], className)}
            onKeyDown={onKeyDown}
            tabIndex={0}
        >
            {items.map(({ index, ...itemProps }) => (
                <div key={index} className={styles.item}>
                    <RateItem index={index} {...itemProps} />
                </div>
            ))}
        </div>
    ),
);
