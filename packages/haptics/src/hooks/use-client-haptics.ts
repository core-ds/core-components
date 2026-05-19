import { useCallback } from 'react';

import {
    type ClientHapticsApi,
    type HapticPreset,
    type TriggerHapticOptions,
    type UseClientHapticsParams,
} from '../types';
import { triggerHaptic } from '../utils';

/**
 * Хук для ручного запуска haptic-фидбека из компонентов.
 */
export const useHaptic = ({
    enabled: externalEnabled,
}: UseClientHapticsParams = {}): ClientHapticsApi => {
    const isEnabled = externalEnabled !== false;

    const trigger = useCallback(
        (preset: HapticPreset, options: TriggerHapticOptions = {}) => {
            const enabled = options.enabled ?? externalEnabled;

            triggerHaptic(preset, { ...options, enabled });
        },
        [externalEnabled],
    );

    return {
        enabled: isEnabled,
        triggerHaptic: trigger,
    };
};
