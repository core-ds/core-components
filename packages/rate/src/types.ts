import { type KeyboardEvent, type ReactNode, type CSSProperties } from 'react';

/**
 * Ссылка на методы компонента Rate
 */
export interface RateRef {
    /**
     * Установить фокус
     */
    focus: () => void;
    /**
     * Убрать фокус
     */
    blur: () => void;
}

/**
 * Размеры компонента
 */
export type RateSize = 's' | 'm' | 'l';

/**
 * Пропсы компонента Rate
 */
export interface RateProps {
    /**
     * Контролируемое значение рейтинга
     */
    value?: number;
    /**
     * Начальное значение (для неконтролируемого режима)
     */
    defaultValue?: number;
    /**
     * Количество элементов рейтинга
     */
    count?: number;
    /**
     * Сброс значения по повторному клику на активный элемент
     */
    allowClear?: boolean;
    /**
     * Отключение взаимодействия
     */
    disabled?: boolean;
    /**
     * Только отображение (без взаимодействия)
     */
    readOnly?: boolean;
    /**
     * Кастомный символ для отображения
     * Может быть React-элементом или функцией, принимающей индекс
     */
    character?: ReactNode | ((index: number) => ReactNode);
    /**
     * Подсказки для каждого элемента рейтинга
     */
    tooltips?: string[];
    /**
     * Размер компонента
     */
    size?: RateSize;
    /**
     * Дополнительный CSS-класс
     */
    className?: string;
    /**
     * Inline-стили
     */
    style?: CSSProperties;
    /**
     * Обработчик изменения значения
     */
    onChange?: (value: number) => void;
    /**
     * Обработчик изменения hover-состояния
     */
    onHoverChange?: (value: number) => void;
    /**
     * Обработчик нажатия клавиш
     */
    onKeyDown?: (event: KeyboardEvent<HTMLDivElement>) => void;
    /**
     * Ссылка на DOM-элемент
     */
    ref?: RateRef;
}

/**
 * Пропсы для внутреннего компонента RateItem
 */
export interface RateItemProps {
    /**
     * Индекс элемента (0-based)
     */
    index: number;
    /**
     * Текущее значение рейтинга
     */
    currentValue: number;
    /**
     * Hover-значение (для предпросмотра)
     */
    hoverValue: number | null;
    /**
     * Отключен ли элемент
     */
    disabled: boolean;
    /**
     * Только чтение
     */
    readOnly: boolean;
    /**
     * Кастомный символ
     */
    character?: ReactNode;
    /**
     * Подсказка
     */
    tooltip?: string;
    /**
     * Обработчик клика
     */
    onClick: (index: number) => void;
    /**
     * Обработчик hover
     */
    onHover: (index: number) => void;
    /**
     * Обработчик ухода с hover
     */
    onHoverLeave: () => void;
}
