import { defaultPatterns } from 'web-haptics';

import {
    type HapticConfig,
    type HapticPattern,
    type HapticPreset,
    type HapticPresetValue,
    type HapticTriggerConfig,
} from './types';

const DEFAULT_REPEAT = 1;
const DEFAULT_PRESET: HapticPreset = 'selection';

const normalizeRepeat = (repeat = DEFAULT_REPEAT) => Math.max(1, Math.floor(repeat));

/**
 * Повторяет весь haptic-паттерн целиком.
 *
 * `repeat=2` для `[A, B]` вернёт `[A, B, A, B]`.
 */
export const repeatHapticPattern = (pattern: HapticPattern, repeat = DEFAULT_REPEAT) =>
    Array.from({ length: normalizeRepeat(repeat) }).flatMap(() => pattern);

const resolvePresetValue = (
    presetValue: HapticPresetValue,
): Omit<HapticTriggerConfig, 'pattern'> => {
    if (typeof presetValue === 'string') {
        return {
            input: defaultPatterns[presetValue].pattern as HapticPattern,
            enabled: true,
        };
    }

    const { repeat = DEFAULT_REPEAT, ...vibration } = presetValue;

    return {
        input: repeatHapticPattern([vibration] as HapticPattern, repeat),
        enabled: true,
    };
};

export type ResolveHapticConfigParams = {
    /**
     * Локальный haptic-пресет, переданный в хук или компонент.
     */
    preset?: HapticPresetValue;

    /**
     * Глобальный haptic-конфиг из `CoreConfig`.
     */
    global?: HapticConfig;
};

/**
 * Собирает итоговый haptic-конфиг из локального `preset` и глобального `CoreConfig.haptics`.
 *
 * Правила приоритета:
 * - если `preset` не передан, используется только `global.enabled=true`
 * - если `preset` передан, он включает haptic даже при `global.enabled=false`
 * - строковый `preset` запускает только выбранный preset
 * - объектный `preset` считается кастомным vibration-конфигом
 */
export const resolveHapticConfig = ({
    preset,
    global,
}: ResolveHapticConfigParams): Omit<HapticTriggerConfig, 'pattern'> | null => {
    const hasLocalPreset = preset !== undefined;

    if (!hasLocalPreset && global?.enabled !== true) return null;

    if (preset !== undefined) {
        return resolvePresetValue(preset);
    }

    if (global?.enabled === false) return null;

    if (global?.['data-haptic-preset'] !== undefined) {
        return resolvePresetValue(global['data-haptic-preset']);
    }

    const { input, pattern, options, intensity, repeat = DEFAULT_REPEAT } = global ?? {};

    const inputFromGlobal =
        input ??
        pattern ??
        repeatHapticPattern(defaultPatterns[DEFAULT_PRESET].pattern as HapticPattern, repeat);

    const optionsFromGlobal =
        options || intensity !== undefined
            ? {
                  ...(intensity !== undefined && { intensity }),
                  ...options,
              }
            : undefined;

    return {
        input: inputFromGlobal,
        options: optionsFromGlobal,
        enabled: global?.enabled === true,
    };
};
