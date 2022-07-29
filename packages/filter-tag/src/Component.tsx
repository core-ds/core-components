import React, { forwardRef, KeyboardEvent, MouseEvent, ReactNode, useRef } from 'react';

import { useFocus } from '@alfalab/hooks';
import { ChevronDownMIcon } from '@alfalab/icons-glyph/ChevronDownMIcon';
import { ChevronDownCompactSIcon } from '@alfalab/icons-glyph/ChevronDownCompactSIcon';
import { CrossCircleMIcon } from '@alfalab/icons-glyph/CrossCircleMIcon';
import { CrossCircleSIcon } from '@alfalab/icons-glyph/CrossCircleSIcon';

import cn from 'classnames';

import styles from './index.module.css';

export type FilterTagProps = {
    /**
     * Состояние выбора
     */
    checked?: boolean;

    /**
     * Состояние открытия
     */
    open?: boolean;

    /**
     * Состояние блокировки
     */
    disabled?: boolean;

    /**
     * Обработчик клика
     */
    onClick?: (event: MouseEvent<HTMLDivElement>) => void;

    /**
     * Обработчик очистки
     */
    onClear?: () => void;

    /**
     * Контент
     */
    children?: ReactNode;

    /**
     * Идентификатор для систем автоматизированного тестирования
     */
    dataTestId?: string;

    /**
     * Размер компонента
     */
    size?: 'xxs' | 'xs' | 's';

    /**
     * Вариант тега
     */
    variant?: 'default' | 'alt';

    /**
     * Дополнительный класс
     */
    className?: string;
};

const isKeyBoardEvent = (
    event: MouseEvent<HTMLDivElement> | KeyboardEvent<HTMLDivElement>,
): event is KeyboardEvent<HTMLDivElement> =>
    (event as KeyboardEvent<HTMLDivElement>).key !== undefined;

export const FilterTag = forwardRef<HTMLDivElement, FilterTagProps>(
    (
        {
            children,
            checked,
            disabled,
            open,
            onClick,
            size = 's',
            variant = 'default',
            onClear = () => null,
            className,
            dataTestId,
            ...restProps
        },
        ref,
    ) => {
        const valueRef = useRef<HTMLButtonElement>(null);

        const [focused] = useFocus(valueRef, 'keyboard');

        const handleClear = (event: MouseEvent<HTMLDivElement> | KeyboardEvent<HTMLDivElement>) => {
            event.stopPropagation();

            if (isKeyBoardEvent(event)) {
                const clickSimilarKeys = ['Enter'].includes(event.key);
                if (clickSimilarKeys) onClear();
                return;
            }

            onClear();
        };

        const variantClassName = variant === 'default' ? 'defaultVariant' : variant;

        return (
            // eslint-disable-next-line jsx-a11y/click-events-have-key-events
            <div
                className={cn(
                    className,
                    [styles.component],
                    styles[variantClassName],
                    styles[size],
                    {
                        [styles.checked]: checked,
                        [styles.disabled]: disabled,
                        [styles.focused]: focused,
                        [styles.open]: open,
                    },
                )}
                ref={ref}
                data-test-id={dataTestId}
                onClick={disabled ? undefined : onClick}
                {...restProps}
            >
                <button
                    type='button'
                    ref={valueRef}
                    disabled={disabled}
                    className={cn(styles.valueButton, styles[size], styles[variantClassName], {
                        [styles.checked]: checked,
                        [styles.open]: open,
                    })}
                >
                    <span>{children}</span>
                    <span className={styles.chevron}>
                        {size === 'xxs' ? <ChevronDownCompactSIcon /> : <ChevronDownMIcon />}
                    </span>
                </button>

                {checked && !disabled && (
                    <div
                        role='button'
                        className={cn(styles.clear, styles[size], styles[variantClassName])}
                        onClick={handleClear}
                        onKeyDown={handleClear}
                        tabIndex={0}
                    >
                        {size === 'xxs' ? <CrossCircleSIcon /> : <CrossCircleMIcon />}
                    </div>
                )}
            </div>
        );
    },
);
