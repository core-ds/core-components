import { type useWebHaptics } from 'web-haptics/react';

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

type WebHaptics = ReturnType<typeof useWebHaptics>;
type WebHapticsTrigger = WebHaptics['trigger'];

export type HapticInput = Parameters<WebHapticsTrigger>[0];
export type TriggerOptions = Parameters<WebHapticsTrigger>[1];

type HapticInputPattern = Extract<NonNullable<HapticInput>, Array<{ duration: number }>>;

type Vibration = HapticInputPattern[number];
export type HapticPattern = Vibration[];
export type HapticPresetValue = HapticPreset | (Partial<Vibration> & { repeat?: number });

export interface HapticTriggerConfig {
    enabled?: boolean;

    /**
     * Payload, который будет передан напрямую в `web-haptics.trigger`.
     */
    input?: HapticInput;

    /**
     * Паттерн в формате `web-haptics` preset object.
     */
    pattern?: HapticPattern;

    /**
     * Опции, которые будут переданы напрямую в `web-haptics.trigger`.
     */
    options?: TriggerOptions;
}

export interface HapticConfig extends HapticTriggerConfig, Partial<Vibration> {
    enabled?: boolean;

    /**
     * Haptic-паттерн
     * @default selection
     */
    'data-haptic-pattern'?: HapticPreset;

    /**
     * Повтор всего паттерна
     * @default 1
     */
    repeat?: number;
}
