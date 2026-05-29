import React, {
    type ComponentProps,
    forwardRef,
    type Ref,
} from 'react';

import { HapticA } from './components/haptic-a';
import { HapticButton } from './components/haptic-button';
import { HapticInput } from './components/haptic-input';
import { type HapticPreset, type HapticProps } from './types';

export const Haptic = forwardRef<HTMLElement, HapticProps>(
    ({ Component = 'button', 'data-haptic-pattern': hapticPattern = 'selection', ...restProps }, ref) => {
        const resolvedHapticPattern = hapticPattern as HapticPreset; // match with web-haptics

        if (Component === 'a') {
            return (
                <HapticA
                    {...(restProps as ComponentProps<typeof HapticA>)}
                    data-haptic-pattern={resolvedHapticPattern}
                    ref={ref as unknown as Ref<HTMLAnchorElement>}
                />
            );
        }

        if (Component === 'input') {
            return (
                <HapticInput
                    {...(restProps as ComponentProps<typeof HapticInput>)}
                    data-haptic-pattern={resolvedHapticPattern}
                    ref={ref as unknown as Ref<HTMLInputElement>}
                />
            );
        }

        return (
            <HapticButton
                {...(restProps as ComponentProps<typeof HapticButton>)}
                data-haptic-pattern={resolvedHapticPattern}
                ref={ref as unknown as Ref<HTMLButtonElement>}
            />
        );
    });

Haptic.displayName = 'Haptic';
