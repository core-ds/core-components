import React, { forwardRef, KeyboardEvent, MouseEvent, ReactNode, useRef } from 'react';
import cn from 'classnames';

import { useFocus } from '@alfalab/hooks';
import { ChevronDownCompactSIcon } from '@alfalab/icons-glyph/ChevronDownCompactSIcon';
import { ChevronDownMIcon } from '@alfalab/icons-glyph/ChevronDownMIcon';
import { CrossCircleMIcon } from '@alfalab/icons-glyph/CrossCircleMIcon';
import { CrossCircleSIcon } from '@alfalab/icons-glyph/CrossCircleSIcon';

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
     * Дополнительный класс
     */
    className?: string;

    /**
     * Показывать крестик для очистки выбора
     */
    showClear?: boolean;

    /**
     * @deprecated данный проп больше не используется, временно оставлен для обратной совместимости
     * Используйте props shape и view
     * Вариант тега
     */
    variant?: 'default' | 'alt';

    /**
     * Форма тега
     */
    shape?: 'rounded' | 'rectangular';

    /**
     * Стиль тега
     */
    view?: 'outlined' | 'filled';
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
            shape = 'rounded',
            view = 'outlined',
            onClear = () => null,
            showClear = true,
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

        const variantClassName = variant === 'default' ? 'rounded' : 'rectangular';

        return (
            // eslint-disable-next-line jsx-a11y/click-events-have-key-events
            <div
                className={cn(
                    className,
                    [styles.component],
                    styles[variantClassName],
                    styles[shape],
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
                    className={cn(
                        styles.valueButton,
                        styles[size],
                        styles[variantClassName],
                        styles[shape],
                        styles[view],
                        {
                            [styles.checked]: checked,
                            [styles.open]: open,
                            [styles.close]: !showClear,
                        },
                    )}
                >
                    <span>{children}</span>
                    <span className={styles.chevron}>
                        {size === 'xxs' ? <ChevronDownCompactSIcon /> : <ChevronDownMIcon />}
                    </span>
                </button>

                {checked && !disabled && showClear && (
                    <div
                        role='button'
                        className={cn(
                            styles.clear,
                            styles[size],
                            styles[variantClassName],
                            styles[shape],
                        )}
                        onClick={handleClear}
                        onKeyDown={handleClear}
                        tabIndex={0}
                    >
                        <span className={styles.iconWrapper}>
                            {size === 'xxs' ? <CrossCircleSIcon /> : <CrossCircleMIcon />}
                        </span>
                    </div>
                )}
            </div>
        );
    },
);
