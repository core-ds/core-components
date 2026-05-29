import {
    type AnchorHTMLAttributes,
    type ButtonHTMLAttributes,
    type InputHTMLAttributes,
} from 'react';
import { type HapticPreset as WebHapticPreset } from 'web-haptics';

// todo: add more haptic presets
export type HapticPreset = WebHapticPreset;
export type HapticComponent = 'button' | 'a' | 'input';

export interface HapticBaseProps {
    /**
     * Интерактивный элемент, на который навешивается haptic-поведение
     * @default button
     */
    Component?: HapticComponent;

    /**
     * Паттерн хаптика, который будет запущен по клику
     * @default selection
     */
    'data-haptic-pattern'?: HapticPreset;
}

type HapticButtonProps = Omit<
    ButtonHTMLAttributes<HTMLButtonElement>,
    'type' | 'data-haptic-pattern'
> & {
    Component?: 'button';
    type?: ButtonHTMLAttributes<HTMLButtonElement>['type'] | string;
} & HapticBaseProps;

type HapticAnchorProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'data-haptic-pattern'> & {
    Component: 'a';
} & HapticBaseProps;

type HapticInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'data-haptic-pattern'> & {
    Component: 'input';
} & HapticBaseProps;

export type HapticProps = HapticButtonProps | HapticAnchorProps | HapticInputProps;

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
