import {
    type AnchorHTMLAttributes,
    type ButtonHTMLAttributes,
    type InputHTMLAttributes,
} from 'react';

import { type defaultPatterns } from './patterns';

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

export interface HapticPatternPreset {
    /**
     * Паттерн в виде массива фаз вибрации.
     */
    pattern: Vibration[];
}

export type HapticPreset = keyof typeof defaultPatterns;

export type HapticTriggerInput =
    | number
    | number[]
    | HapticPreset
    | Vibration[]
    | HapticPatternPreset;

export interface HapticTriggerOptions {
    /**
     * Сила вибрации по умолчанию для фаз без `intensity`.
     *
     * @default 0.5
     */
    intensity?: number;
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

export type HapticPresetProp = HapticPreset | HapticVibrationPreset | false;

export interface HapticBaseProps {
    /**
     * Haptic-пресет, кастомный vibration-конфиг или `false` для отключения.
     */
    'data-haptic-preset'?: HapticPresetProp;

    /**
     * Идентификатор для систем автоматизированного тестирования.
     * Для overlay iOS-fallback используется модификатор `-fallback`.
     */
    dataTestId?: string;
}

export interface HapticAProps extends AnchorHTMLAttributes<HTMLAnchorElement>, HapticBaseProps {}

export interface HapticButtonProps
    extends ButtonHTMLAttributes<HTMLButtonElement>,
        HapticBaseProps {}

export interface HapticInputProps extends InputHTMLAttributes<HTMLInputElement>, HapticBaseProps {}

export interface UseHapticParams {
    /**
     * Локальный пресет или `false` для отключения этого экземпляра хука.
     */
    preset?: HapticPresetProp;

    /**
     * Диагностика haptic feedback.
     * @description
     *  Добавляет `console.info` и звуковой отклик при взаимодействии с элементом Haptic.
     */
    debug?: boolean;
}

export interface UseHapticResponse {
    /**
     * Запускает haptic feedback.
     */
    trigger: (input?: HapticTriggerInput, options?: HapticTriggerOptions) => void;

    /**
     * Отменяет haptic feedback.
     */
    cancel: () => void;

    /**
     * Разрешён ли haptic глобальной и локальной политикой.
     */
    enabled: boolean;

    /**
     * Доступен ли haptic feedback через Vibration API или iOS switch.
     */
    isSupported: boolean;
}
