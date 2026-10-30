import {
    type AnchorHTMLAttributes,
    type ButtonHTMLAttributes,
    type InputHTMLAttributes,
} from 'react';

import {
    type HapticPreset,
    type HapticPresetProp,
    type HapticVibrationPreset,
    type Vibration,
} from '@alfalab/core-components-config';

export type { HapticPreset, HapticPresetProp, HapticVibrationPreset, Vibration };

export interface HapticPatternPreset {
    /**
     * Паттерн в виде массива фаз вибрации.
     */
    pattern: Vibration[];
}

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

export interface HapticBaseProps {
    /**
     * Haptic-пресет, кастомный vibration-конфиг или `false` для отключения.
     * @default selection
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
