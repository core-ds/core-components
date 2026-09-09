import { useSyncExternalStore } from 'use-sync-external-store/shim';

import { isIOS } from '@alfalab/core-components-shared';

export interface HapticEnvironment {
    /**
     * Доступен Vibration API.
     */
    vibration: boolean;

    /**
     * iOS без Vibration API — отдаёт `fallback`, чтобы тап ушёл в overlay и воспроизвёл системный tick.
     */
    iosFallback: boolean;
}

const SERVER: HapticEnvironment = { vibration: false, iosFallback: false };

let snapshot: HapticEnvironment = SERVER;

export const getHapticEnvironment = (): HapticEnvironment => {
    const vibration = typeof navigator !== 'undefined' && typeof navigator.vibrate === 'function';
    const iosFallback = !vibration && isIOS();

    if (snapshot.vibration !== vibration || snapshot.iosFallback !== iosFallback) {
        snapshot = { vibration, iosFallback };
    }

    return snapshot;
};

const subscribe = () => () => {};
const getServerSnapshot = () => SERVER;

export const useHapticEnvironment = (): HapticEnvironment =>
    useSyncExternalStore(subscribe, getHapticEnvironment, getServerSnapshot);
