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

export type ResolveHapticConfigParams = {
    /**
     * Локальный haptic-пресет, переданный в компонент.
     */
    dataHapticPreset?: HapticPresetValue;

    /**
     * Глобальный haptic-конфиг из `CoreConfig`.
     */
    global?: HapticConfig;
};

/**
 * Собирает итоговый haptic-конфиг из локального `haptic` и глобального `CoreConfig.haptics`.
 *
 * Правила приоритета:
 * - если `data-haptic-preset` не передан, используется только `global.enabled=true`
 * - если `data-haptic-preset` передан, он включает haptic даже при `global.enabled=false`
 * - строковый `data-haptic-preset` запускает только выбранный preset
 * - объектный `data-haptic-preset` считается кастомным vibration-конфигом
 */
export const resolveHapticConfig = ({
    dataHapticPreset,
    global,
}: ResolveHapticConfigParams): Omit<HapticTriggerConfig, 'pattern'> | null => {
    const hasLocalPreset = dataHapticPreset !== undefined;

    if (!hasLocalPreset && global?.enabled !== true) return null;

    if (typeof dataHapticPreset === 'string') {
        return {
            input: defaultPatterns[dataHapticPreset].pattern as HapticPattern,
            enabled: true,
        };
    }

    if (dataHapticPreset) {
        const { repeat = DEFAULT_REPEAT, ...vibration } = dataHapticPreset;

        return {
            input: repeatHapticPattern([vibration] as HapticPattern, repeat),
            enabled: true,
        };
    }

    const {
        input,
        pattern,
        options,
        intensity,
        repeat = DEFAULT_REPEAT,
        'data-haptic-pattern': preset = DEFAULT_PRESET,
        enabled: resolvedEnabled,
    } = global ?? {};

    if (resolvedEnabled === false) return null;

    const inputFromGlobal =
        input ??
        pattern ??
        repeatHapticPattern(defaultPatterns[preset].pattern as HapticPattern, repeat);
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
        enabled: resolvedEnabled === true,
    };
};
