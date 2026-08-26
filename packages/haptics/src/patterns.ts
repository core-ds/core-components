import { type HapticPatternPreset } from './typings';

export const defaultPatterns = {
    /** Двойной отклик с нарастанием — паттерн "Успех". */
    success: {
        pattern: [
            { duration: 30, intensity: 0.5 },
            { delay: 60, duration: 40, intensity: 1 },
        ],
    },
    /** Двойной отклик с паузой — паттерн "Предупреждение". */
    warning: {
        pattern: [
            { duration: 40, intensity: 0.8 },
            { delay: 100, duration: 40, intensity: 0.6 },
        ],
    },
    /** Несколько резких откликов — паттерн "Ошибка". */
    error: {
        pattern: [
            { duration: 40, intensity: 0.7 },
            { delay: 40, duration: 40, intensity: 0.7 },
            { delay: 40, duration: 40, intensity: 0.9 },
            { delay: 40, duration: 50, intensity: 0.6 },
        ],
    },
    /** Лёгкий одиночный отклик */
    light: {
        pattern: [{ duration: 15, intensity: 0.4 }],
    },
    /** Средний отклик для обычных действий. */
    medium: {
        pattern: [{ duration: 25, intensity: 0.7 }],
    },
    /** Сильный отклик для значимых действий. */
    heavy: {
        pattern: [{ duration: 35, intensity: 1 }],
    },
    /** Мягкий отклик. */
    soft: {
        pattern: [{ duration: 40, intensity: 0.5 }],
    },
    /** Короткий жёсткий отклик. */
    rigid: {
        pattern: [{ duration: 10, intensity: 1 }],
    },
    /** Едва заметный отклик при смене выбора. */
    selection: {
        pattern: [{ duration: 8, intensity: 0.3 }],
    },
    /** Два отклика с паузой. */
    nudge: {
        pattern: [
            { duration: 80, intensity: 0.8 },
            { delay: 80, duration: 50, intensity: 0.3 },
        ],
    },
    /** Длинная непрерывная вибрация. */
    buzz: {
        pattern: [{ duration: 1000, intensity: 1 }],
    },
} as const satisfies Record<string, HapticPatternPreset>;
