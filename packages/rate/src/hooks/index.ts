import { useCallback, useEffect, useRef, useState } from 'react';
import type { RateRef } from '../types';
import { normalizeValue, calculateValue, getItemState } from '../utils/calculate-value';

export interface UseRateOptions {
    value?: number;
    defaultValue?: number;
    count: number;
    allowHalf: boolean;
    allowClear: boolean;
    disabled: boolean;
    readOnly: boolean;
    onChange?: (value: number) => void;
    onHoverChange?: (value: number) => void;
    onFocus?: () => void;
    onBlur?: () => void;
}

export interface UseRateReturn {
    /** Текущее значение рейтинга */
    currentValue: number;
    /** Hover-значение (для предпросмотра) */
    hoverValue: number | null;
    /** Ссылка на контейнер */
    containerRef: React.RefObject<HTMLDivElement>;
    /** Ссылка на методы компонента */
    rateRef: React.RefObject<RateRef>;
    /** Обработчик клика по элементу */
    handleItemClick: (index: number, isHalf: boolean) => void;
    /** Обработчик hover на элементе */
    handleItemHover: (index: number, isHalf: boolean) => void;
    /** Обработчик ухода с hover */
    handleHoverLeave: () => void;
    /** Обработчик фокуса */
    handleFocus: () => void;
    /** Обработчик потери фокуса */
    handleBlur: () => void;
    /** Обработчик клавиатуры */
    handleKeyDown: (event: React.KeyboardEvent<HTMLDivElement>) => void;
    /** Установить фокус программно */
    focus: () => void;
    /** Убрать фокус программно */
    blur: () => void;
}

/**
 * Хук для управления состоянием компонента Rate
 */
export function useRate(options: UseRateOptions): UseRateReturn {
    const {
        value: controlledValue,
        defaultValue = 0,
        count,
        allowHalf,
        allowClear,
        disabled,
        readOnly,
        onChange,
        onHoverChange,
        onFocus,
        onBlur,
    } = options;

    const containerRef = useRef<HTMLDivElement>(null);
    const rateRef = useRef<RateRef>(null);
    const [hoverValue, setHoverValue] = useState<number | null>(null);
    const [isFocused, setIsFocused] = useState(false);

    // Определяем, контролируемый или неконтролируемый режим
    const isControlled = controlledValue !== undefined;
    const [uncontrolledValue, setUncontrolledValue] = useState(() =>
        normalizeValue(defaultValue, count, allowHalf)
    );

    const currentValue = isControlled ? controlledValue : uncontrolledValue;

    // Синхронизация при изменении controlledValue
    useEffect(() => {
        if (isControlled) {
            // В контролируемом режиме просто принимаем значение
            return;
        }
        // В неконтролируемом режиме обновляем только при изменении пропсов
        setUncontrolledValue(normalizeValue(defaultValue, count, allowHalf));
    }, [defaultValue, count, allowHalf, isControlled]);

    // Обработчик клика
    const handleItemClick = useCallback(
        (index: number, isHalf: boolean) => {
            if (disabled || readOnly) return;

            const newValue = calculateValue(index, isHalf, allowHalf);

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
        [allowClear, allowHalf, currentValue, disabled, isControlled, onChange, readOnly]
    );

    // Обработчик hover
    const handleItemHover = useCallback(
        (index: number, isHalf: boolean) => {
            if (disabled || readOnly) return;

            const newValue = calculateValue(index, isHalf, allowHalf);
            setHoverValue(newValue);
            onHoverChange?.(newValue);
        },
        [disabled, readOnly, allowHalf, onHoverChange]
    );

    // Обработчик ухода с hover
    const handleHoverLeave = useCallback(() => {
        setHoverValue(null);
        onHoverChange?.(0);
    }, [onHoverChange]);

    // Обработчик фокуса
    const handleFocus = useCallback(() => {
        setIsFocused(true);
        onFocus?.();
    }, [onFocus]);

    // Обработчик потери фокуса
    const handleBlur = useCallback(() => {
        setIsFocused(false);
        handleHoverLeave();
        onBlur?.();
    }, [handleHoverLeave, onBlur]);

    // Обработчик клавиатуры
    const handleKeyDown = useCallback(
        (event: React.KeyboardEvent<HTMLDivElement>) => {
            if (disabled || readOnly) return;

            const currentValueNum = Number(currentValue) || 0;
            let newValue = currentValueNum;

            switch (event.key) {
                case 'ArrowRight':
                case 'ArrowUp':
                    event.preventDefault();
                    newValue = allowHalf
                        ? Math.min(currentValueNum + 0.5, count)
                        : Math.min(currentValueNum + 1, count);
                    break;
                case 'ArrowLeft':
                case 'ArrowDown':
                    event.preventDefault();
                    newValue = allowHalf
                        ? Math.max(currentValueNum - 0.5, 0)
                        : Math.max(currentValueNum - 1, 0);
                    break;
                case 'Home':
                    event.preventDefault();
                    newValue = 0;
                    break;
                case 'End':
                    event.preventDefault();
                    newValue = count;
                    break;
                case 'Enter':
                case ' ':
                    event.preventDefault();
                    // Устанавливаем текущее значение при нажатии Enter/Space
                    if (currentValueNum === 0) {
                        newValue = allowHalf ? 0.5 : 1;
                    }
                    break;
                default:
                    return;
            }

            if (!isControlled) {
                setUncontrolledValue(newValue);
            }
            onChange?.(newValue);
        },
        [allowHalf, count, currentValue, disabled, isControlled, onChange, readOnly]
    );

    // Методы для ref
    const focus = useCallback(() => {
        if (containerRef.current && document.activeElement !== containerRef.current) {
            containerRef.current.focus();
        }
    }, []);

    const blur = useCallback(() => {
        if (containerRef.current) {
            containerRef.current.blur();
        }
    }, []);

    // Экспортируем методы через ref
    useEffect(() => {
        if (rateRef.current) {
            rateRef.current.focus = focus;
            rateRef.current.blur = blur;
        }
    }, [focus, blur]);

    return {
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
    };
}
