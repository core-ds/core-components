export interface Vibration {
    /**
     * Длительность фазы в миллисекундах.
     */
    duration: number;

    /**
     * Сила вибрации от 0 до 1.
     */
    intensity?: number;

    /**
     * Пауза перед фазой в миллисекундах.
     */
    delay?: number;
}

/**
 * Кастомный пресет — одна фаза вибрации с повтором.
 */
export interface HapticVibrationPreset extends Vibration {
    /**
     * Количество повторов фазы.
     * @default 1
     */
    repeat?: number;
}

/**
 * Имена встроенных пресетов. Паттерны — `defaultPatterns` в `@alfalab/core-components-haptics`.
 */
export type HapticPreset =
    | 'success'
    | 'warning'
    | 'error'
    | 'light'
    | 'medium'
    | 'heavy'
    | 'soft'
    | 'rigid'
    | 'selection'
    | 'nudge'
    | 'buzz';

export type HapticPresetProp = HapticPreset | HapticVibrationPreset | false;
