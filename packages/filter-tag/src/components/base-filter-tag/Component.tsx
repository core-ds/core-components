import React, { forwardRef, KeyboardEvent, MouseEvent, ReactNode, useRef } from 'react';
import cn from 'classnames';

import { useFocus } from '@alfalab/hooks';
import { ChevronDownCompactSIcon } from '@alfalab/icons-glyph/ChevronDownCompactSIcon';
import { ChevronDownMIcon } from '@alfalab/icons-glyph/ChevronDownMIcon';
import { CrossCircleMIcon } from '@alfalab/icons-glyph/CrossCircleMIcon';
import { CrossCircleSIcon } from '@alfalab/icons-glyph/CrossCircleSIcon';

import commonStyles from './index.module.css';

export type BaseFilterTagProps = {
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

    /**
     * Основные стили компонента.
     */
    styles?: { [key: string]: string };
};

const isKeyBoardEvent = (
    event: MouseEvent<HTMLDivElement> | KeyboardEvent<HTMLDivElement>,
): event is KeyboardEvent<HTMLDivElement> =>
    (event as KeyboardEvent<HTMLDivElement>).key !== undefined;

export const BaseFilterTag = forwardRef<HTMLDivElement, BaseFilterTagProps>(
    (
        {
            children,
            checked,
            disabled,
            open,
            onClick,
            size = 's',
            variant = 'default',
            shape,
            view = 'outlined',
            onClear = () => null,
            showClear = true,
            className,
            dataTestId,
            styles = {},
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

        const shapeClassName = shape || variantClassName;

        return (
            // eslint-disable-next-line jsx-a11y/click-events-have-key-events
            <div
                className={cn(
                    className,
                    commonStyles.component,
                    commonStyles[shapeClassName],
                    commonStyles[size],
                    styles.component,
                    styles[shapeClassName],
                    styles[size],
                    {
                        [commonStyles.checked]: checked,
                        [styles.checked]: checked,
                        [commonStyles.disabled]: disabled,
                        [styles.disabled]: disabled,
                        [commonStyles.focused]: focused,
                        [commonStyles.open]: open,
                    },
                )}
                ref={ref}
                data-test-id={dataTestId}
                onClick={disabled ? undefined : onClick}
            >
                <button
                    type='button'
                    ref={valueRef}
                    disabled={disabled}
                    className={cn(
                        commonStyles.valueButton,
                        styles.valueButton,
                        commonStyles[size],
                        styles[size],
                        commonStyles[shapeClassName],
                        styles[shapeClassName],
                        commonStyles[view],
                        {
                            [styles[view]]: Boolean(styles[view]),
                            [commonStyles.checked]: checked,
                            [styles.checked]: checked,
                            [commonStyles.open]: open,
                            [commonStyles.close]: !showClear,
                            [styles.close]: !showClear,
                        },
                    )}
                >
                    <span>{children}</span>
                    <span className={commonStyles.chevron}>
                        {size === 'xxs' ? <ChevronDownCompactSIcon /> : <ChevronDownMIcon />}
                    </span>
                </button>

                {checked && !disabled && showClear && (
                    <div
                        role='button'
                        className={cn(
                            commonStyles.clear,
                            styles.clear,
                            commonStyles[size],
                            styles[size],
                            styles[shapeClassName],
                            commonStyles[shapeClassName],
                        )}
                        onClick={handleClear}
                        onKeyDown={handleClear}
                        tabIndex={0}
                    >
                        <span className={commonStyles.iconWrapper}>
                            {size === 'xxs' ? <CrossCircleSIcon /> : <CrossCircleMIcon />}
                        </span>
                    </div>
                )}
            </div>
        );
    },
);
