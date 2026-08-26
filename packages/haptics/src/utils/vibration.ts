import { defaultPatterns } from '../patterns';
import {
    type HapticComponentValue,
    type HapticInput,
    type HapticPattern,
    type Vibration,
} from '../typings';

import { CYCLE, DEFAULT_REPEAT, MAX_PHASE_MS } from './constants';

export const clamp = (value: number): number => Math.max(0, Math.min(1, value));

/** Преобразует component preset в формат запуска haptic feedback. */
export const hapticPreset = (preset?: HapticComponentValue): HapticInput | undefined => {
    if (preset === undefined || preset === false || typeof preset === 'string') {
        return preset || undefined;
    }

    const { repeat = DEFAULT_REPEAT, ...vibration } = preset;

    // ! todo: fix bug iOs local tap
    const count = Number.isFinite(repeat)
        ? Math.max(DEFAULT_REPEAT, Math.floor(repeat))
        : DEFAULT_REPEAT;

    return Array.from({ length: count }, () => vibration) as HapticPattern;
};

/** Обрезает `duration` каждой фазы до {@link MAX_PHASE_MS}. */
export const clampVibrations = (vibrations: Vibration[] | null): Vibration[] | null => {
    if (!vibrations) return null;

    const clamped: Vibration[] = [];

    for (const vibration of vibrations) {
        const { delay } = vibration;
        const isValid =
            Number.isFinite(vibration.duration) &&
            vibration.duration >= 0 &&
            (delay === undefined || (Number.isFinite(delay) && delay >= 0));

        if (!isValid) {
            return null;
        }

        clamped.push({
            ...vibration,
            duration: Math.min(vibration.duration, MAX_PHASE_MS),
        });
    }

    return clamped;
};

/** Приводит `HapticInput` к массиву фаз вибрации. */
export const normalizeInput = (input: HapticInput): Vibration[] | null => {
    if (typeof input === 'number') {
        return [{ duration: input }];
    }

    if (typeof input === 'string') {
        const preset = defaultPatterns[input as keyof typeof defaultPatterns];

        if (!preset) {
            return null;
        }

        return preset.pattern.map((vibration) => ({ ...vibration }));
    }

    if (Array.isArray(input)) {
        if (input.length === 0) return [];

        // shorthand `number[]` — чередование вибрация/пауза
        if (typeof input[0] === 'number') {
            const durations = input as number[];
            const vibrations: Vibration[] = [];

            for (let i = 0; i < durations.length; i += 2) {
                const delay = i > 0 ? durations[i - 1] : 0;

                vibrations.push({
                    ...(delay > 0 && { delay }),
                    duration: durations[i],
                });
            }

            return vibrations;
        }

        return (input as Vibration[]).map((vibration) => ({ ...vibration }));
    }

    return input.pattern.map((vibration) => ({ ...vibration }));
};

/** Разбивает одну фазу на набор импульсов и пауз. */
const modulateVibration = (duration: number, intensity: number): number[] => {
    if (intensity >= 1) return [duration];
    if (intensity <= 0) return [];

    const onTime = Math.max(1, Math.round(CYCLE * intensity));
    const offTime = CYCLE - onTime;
    const result: number[] = [];

    let remaining = duration;

    while (remaining >= CYCLE) {
        result.push(onTime, offTime);
        remaining -= CYCLE;
    }

    if (remaining > 0) {
        const remainderOn = Math.max(1, Math.round(remaining * intensity));
        const remainderOff = remaining - remainderOn;

        result.push(remainderOn);

        if (remainderOff > 0) result.push(remainderOff);
    }

    return result;
};

/** Собирает плоский паттерн для `navigator.vibrate()`, применяя PWM-модуляцию интенсивности к каждой фазе. */
export const toVibratePattern = (vibrations: Vibration[], defaultIntensity: number): number[] => {
    const result: number[] = [];

    const appendSilence = (ms: number) => {
        // чётная длина означает, что последний сегмент — пауза, её можно продлить
        if (result.length > 0 && result.length % 2 === 0) {
            result[result.length - 1] += ms;
        } else {
            if (result.length === 0) result.push(0);
            result.push(ms);
        }
    };

    for (const vibration of vibrations) {
        const intensity = clamp(vibration.intensity ?? defaultIntensity);
        const delay = vibration.delay ?? 0;

        if (delay > 0) {
            appendSilence(delay);
        }

        const modulated = modulateVibration(vibration.duration, intensity);

        if (modulated.length === 0) {
            // нулевая интенсивность — фаза превращается в паузу
            if (vibration.duration > 0) appendSilence(vibration.duration);
        } else {
            result.push(...modulated);
        }
    }

    return result;
};
