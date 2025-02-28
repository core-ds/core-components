import React, { forwardRef, KeyboardEvent, MouseEvent, ReactNode, useRef } from 'react';
import cn from 'classnames';

import { useFocus } from '@alfalab/hooks';
import { ChevronDownCompactSIcon } from '@alfalab/icons-glyph/ChevronDownCompactSIcon';
import { ChevronDownMIcon } from '@alfalab/icons-glyph/ChevronDownMIcon';
import { CrossCircleMIcon } from '@alfalab/icons-glyph/CrossCircleMIcon';
import { CrossCircleSIcon } from '@alfalab/icons-glyph/CrossCircleSIcon';

import defaultColors from './default.module.css';
import commonStyles from './index.module.css';
import invertedColors from './inverted.module.css';

const colorStyles = {
    default: defaultColors,
    inverted: invertedColors,
};

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
     * @description xxs, xs, s deprecated, используйте вместо них 32, 40, 48 соответственно
     */
    size?: 'xxs' | 'xs' | 's' | 32 | 40 | 48;

    /**
     * Дополнительный класс
     */
    className?: string;

    /**
     * Показывать крестик для очистки выбора
     */
    showClear?: boolean;

    /**
     * Растягивает компонент на ширину контейнера
     * @default false
     */
    block?: boolean;

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

    /**
     * Набор цветов для компонента
     * @default default
     */
    colors?: 'default' | 'inverted';
};

const isKeyBoardEvent = (
    event: MouseEvent<HTMLDivElement> | KeyboardEvent<HTMLDivElement>,
): event is KeyboardEvent<HTMLDivElement> =>
    (event as KeyboardEvent<HTMLDivElement>).key !== undefined;

const SIZE_TO_CLASSNAME_MAP = {
    xxs: 'size-32',
    xs: 'size-40',
    s: 'size-48',
    32: 'size-32',
    40: 'size-40',
    48: 'size-48',
};

export const BaseFilterTag = forwardRef<HTMLDivElement, BaseFilterTagProps>(
    (
        {
            children,
            checked,
            disabled,
            open,
            onClick,
            size = 48,
            variant = 'default',
            shape,
            view = 'outlined',
            onClear = () => null,
            showClear = true,
            block = false,
            className,
            dataTestId,
            styles = {},
            colors = 'default',
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
                    colorStyles[colors].component,
                    commonStyles[shapeClassName],
                    commonStyles[SIZE_TO_CLASSNAME_MAP[size]],
                    styles.component,
                    styles[shapeClassName],
                    styles[SIZE_TO_CLASSNAME_MAP[size]],
                    {
                        [commonStyles.checked]: checked,
                        [colorStyles[colors].checked]: checked,
                        [styles.checked]: checked,
                        [commonStyles.disabled]: disabled,
                        [colorStyles[colors].disabled]: disabled,
                        [styles.disabled]: disabled,
                        [commonStyles.focused]: focused,
                        [commonStyles.open]: open,
                        [commonStyles.block]: block,
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
                        colorStyles[colors].valueButton,
                        styles.valueButton,
                        commonStyles[SIZE_TO_CLASSNAME_MAP[size]],
                        styles[SIZE_TO_CLASSNAME_MAP[size]],
                        commonStyles[shapeClassName],
                        styles[shapeClassName],
                        commonStyles[view],
                        colorStyles[colors][view],
                        {
                            [styles[view]]: Boolean(styles[view]),
                            [commonStyles.checked]: checked,
                            [colorStyles[colors].checked]: checked,
                            [styles.checked]: checked,
                            [commonStyles.open]: open,
                            [commonStyles.close]: !showClear,
                            [styles.close]: !showClear,
                            [commonStyles.block]: block,
                        },
                    )}
                >
                    <span className={commonStyles.content}>{children}</span>
                    <span className={cn(commonStyles.chevron, colorStyles[colors].chevron)}>
                        {['size-40', 'size-32'].includes(SIZE_TO_CLASSNAME_MAP[size]) ? (
                            <ChevronDownCompactSIcon />
                        ) : (
                            <ChevronDownMIcon />
                        )}
                    </span>
                </button>

                {checked && !disabled && showClear && (
                    <div
                        role='button'
                        className={cn(
                            commonStyles.clear,
                            [colorStyles[colors].clear],
                            styles.clear,
                            commonStyles[SIZE_TO_CLASSNAME_MAP[size]],
                            styles[SIZE_TO_CLASSNAME_MAP[size]],
                            styles[shapeClassName],
                            commonStyles[shapeClassName],
                        )}
                        onClick={handleClear}
                        onKeyDown={handleClear}
                        tabIndex={0}
                    >
                        <span className={commonStyles.iconWrapper}>
                            {SIZE_TO_CLASSNAME_MAP[size] === 'size-32' ? (
                                <CrossCircleSIcon />
                            ) : (
                                <CrossCircleMIcon />
                            )}
                        </span>
                    </div>
                )}
            </div>
        );
    },
);
