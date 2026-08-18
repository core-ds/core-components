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

export type HapticPattern = Vibration[];

export interface HapticPatternPreset {
    pattern: Vibration[];
}

export type HapticInput = number | string | number[] | HapticPattern | HapticPatternPreset;

export interface Options {
    /**
     * Сила вибрации по умолчанию.
     *
     * @default 0.5
     */
    intensity?: number;
}

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

export type HapticPresetValue = HapticPreset | (Partial<Vibration> & { repeat?: number });

export type HapticComponentValue = HapticPresetValue | false;

export type HapticBaseProps = {
    'data-haptic-preset'?: HapticComponentValue;
};

export interface HapticTriggerConfig {
    enabled?: boolean;

    /**
     * Payload, который будет передан напрямую в `triggerHaptic`.
     */
    input?: HapticInput;

    /**
     * Паттерн в виде массива фаз вибрации.
     */
    pattern?: HapticPattern;

    /**
     * Опции, которые будут переданы напрямую в `triggerHaptic`.
     */
    options?: Options;
}

export interface HapticConfig extends HapticTriggerConfig, Partial<Vibration> {
    enabled?: boolean;

    /**
     * Haptic-пресет, кастомный vibration-конфиг или `false` для отключения.
     */
    'data-haptic-preset'?: HapticComponentValue;

    /**
     * Повтор всего паттерна
     * @default 1
     */
    repeat?: number;
}
