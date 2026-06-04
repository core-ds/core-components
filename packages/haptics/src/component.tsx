import React, {
    type AnchorHTMLAttributes,
    type ButtonHTMLAttributes,
    type ComponentProps,
    forwardRef,
    type InputHTMLAttributes,
    type Ref,
} from 'react';

import { HapticA } from './components/haptic-a';
import { HapticButton } from './components/haptic-button';
import { HapticInput } from './components/haptic-input';
import { type HapticPresetValue } from './types';

type HapticButtonProps = Omit<
    ButtonHTMLAttributes<HTMLButtonElement>,
    'type' | 'data-haptic-pattern'
> & {
    Component?: 'button';
    type?: 'button' | 'submit';
} & HapticBaseProps;

type HapticAnchorProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'data-haptic-pattern'> & {
    Component: 'a';
} & HapticBaseProps;

type HapticInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'data-haptic-pattern'> & {
    Component: 'input';
} & HapticBaseProps;

export type HapticProps = HapticButtonProps | HapticAnchorProps | HapticInputProps;

export interface HapticBaseProps {
    /**
     * Интерактивный элемент, на который навешивается haptic-поведение
     * @default button
     */
    Component?: 'button' | 'a' | 'input';

    /**
     * Haptic-пресет или кастомный vibration-конфиг. Если не передан, компонент наследует `CoreConfig.haptics`
     * @default selection
     */
    'data-haptic-preset'?: HapticPresetValue;
}

const HapticFeedback = (props: HapticProps, ref: Ref<HTMLElement>) => {
    const { Component = 'button', ...restProps } = props;

    const config = {
        a: (
            <HapticA
                {...(restProps as ComponentProps<typeof HapticA>)}
                ref={ref as unknown as Ref<HTMLAnchorElement>}
            />
        ),
        button: (
            <HapticButton
                {...(restProps as ComponentProps<typeof HapticButton>)}
                ref={ref as unknown as Ref<HTMLButtonElement>}
            />
        ),
        input: (
            <HapticInput
                {...(restProps as ComponentProps<typeof HapticInput>)}
                ref={ref as unknown as Ref<HTMLInputElement>}
            />
        ),
    };

    return config[Component];
};

export const Haptic = forwardRef<HTMLElement, HapticProps>(HapticFeedback);

Haptic.displayName = 'Haptic';
