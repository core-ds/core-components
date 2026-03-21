import { useCallback, useRef, useState } from 'react';

import { normalizeValue } from '../utils/calculate-value';

export interface UseRateOptions {
    value?: number;
    defaultValue?: number;
    count: number;
    allowClear: boolean;
    disabled: boolean;
    readOnly: boolean;
    onChange?: (value: number) => void;
    onHoverChange?: (value: number) => void;
    onKeyDown?: (event: React.KeyboardEvent<HTMLDivElement>) => void;
}

export interface UseRateReturn {
    /** Текущее значение рейтинга */
    currentValue: number;
    /** Hover-значение (для предпросмотра) */
    hoverValue: number | null;
    /** Ссылка на контейнер */
    containerRef: React.RefObject<HTMLDivElement>;
    /** Обработчик клика по элементу */
    handleItemClick: (index: number) => void;
    /** Обработчик hover на элементе */
    handleItemHover: (index: number) => void;
    /** Обработчик ухода с hover */
    handleHoverLeave: () => void;
    /** Обработчик клавиатуры */
    onKeyDown?: (event: React.KeyboardEvent<HTMLDivElement>) => void;
}

/**
 * Хук для управления состоянием компонента Rate
 */
export function useRate(options: UseRateOptions): UseRateReturn {
    const {
        value: controlledValue,
        defaultValue = 0,
        count,
        allowClear,
        disabled,
        readOnly,
        onChange,
        onHoverChange,
        onKeyDown,
    } = options;

    const containerRef = useRef<HTMLDivElement>(null);
    const [hoverValue, setHoverValue] = useState<number | null>(null);

    // Определяем, контролируемый или неконтролируемый режим
    const isControlled = controlledValue !== undefined;
    const [uncontrolledValue, setUncontrolledValue] = useState(() =>
        normalizeValue(defaultValue, count),
    );

    const currentValue = isControlled ? controlledValue : uncontrolledValue;

    // Синхронизация при изменении controlledValue
    useCallback(() => {
        if (!isControlled) {
            setUncontrolledValue(normalizeValue(defaultValue, count));
        }
    }, [defaultValue, count, isControlled]);

    // Обработчик клика
    const handleItemClick = useCallback(
        (index: number) => {
            if (disabled || readOnly) {
                return;
            }

            const newValue = index + 1;

            // Проверка на сброс при повторном клике
            if (allowClear && newValue === currentValue) {
                const finalValue = 0;

                if (!isControlled) {
                    setUncontrolledValue(finalValue);
                }

                onChange?.(finalValue);

                return;
            }

            if (!isControlled) {
                setUncontrolledValue(newValue);
            }

            onChange?.(newValue);
        },
        [allowClear, currentValue, disabled, isControlled, onChange, readOnly],
    );

    // Обработчик hover
    const handleItemHover = useCallback(
        (index: number) => {
            if (disabled || readOnly) {
                return;
            }

            const newValue = index + 1;

            setHoverValue(newValue);
            onHoverChange?.(newValue);
        },
        [disabled, readOnly, onHoverChange],
    );

    // Обработчик ухода с hover
    const handleHoverLeave = useCallback(() => {
        setHoverValue(null);
        onHoverChange?.(0);
    }, [onHoverChange]);

    return {
        currentValue,
        hoverValue,
        containerRef,
        handleItemClick,
        handleItemHover,
        handleHoverLeave,
        onKeyDown,
    };
}
