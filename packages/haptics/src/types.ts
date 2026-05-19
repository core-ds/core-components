import {
    type AnchorHTMLAttributes,
    type ButtonHTMLAttributes,
    type ElementType,
    type HTMLAttributes,
    type InputHTMLAttributes,
} from 'react';

// todo: add more haptic types
export type HapticType = 'checkbox';

// todo: add more haptic presets
export type HapticPreset = 'selection';

export interface HapticBaseProps {
    /**
     * Компонент или тег, на который навешивается haptic-поведение
     */
    Component?: ElementType;

    /**
     * Тип элемента, для которого нужно применить haptic-поведение
     */
    haptic: HapticType;
}

type NativeInteractiveProps = Partial<
    | InputHTMLAttributes<HTMLInputElement>
    | ButtonHTMLAttributes<HTMLButtonElement>
    | AnchorHTMLAttributes<HTMLAnchorElement>
>;

// REFACTOR TYPES FOR CLIENT HAPTICS

export type HapticProps = HapticBaseProps & HTMLAttributes<HTMLElement> & NativeInteractiveProps;

export interface TriggerHapticOptions {
    enabled?: boolean;
}

export type TriggerHaptic = (preset: HapticPreset, options?: TriggerHapticOptions) => void;

export interface ClientHapticsApi {
    enabled: boolean;
    triggerHaptic: TriggerHaptic;
}

export interface UseClientHapticsParams {
    enabled?: boolean;
}
