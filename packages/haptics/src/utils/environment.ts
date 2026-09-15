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

    /**
     * Основной ввод — мышь или трекпад.
     */
    finePointer: boolean;
}

const SERVER: HapticEnvironment = { vibration: false, iosFallback: false, finePointer: false };

let snapshot: HapticEnvironment = SERVER;

const hasFinePointer = (): boolean =>
    typeof window !== 'undefined' &&
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(hover: hover) and (pointer: fine)').matches;

export const getHapticEnvironment = (): HapticEnvironment => {
    const vibration = typeof navigator !== 'undefined' && typeof navigator.vibrate === 'function';
    const iosFallback = !vibration && isIOS();
    const finePointer = hasFinePointer();

    if (
        snapshot.vibration !== vibration ||
        snapshot.iosFallback !== iosFallback ||
        snapshot.finePointer !== finePointer
    ) {
        snapshot = { vibration, iosFallback, finePointer };
    }

    return snapshot;
};

const subscribe = () => () => {};
const getServerSnapshot = () => SERVER;

export const useHapticEnvironment = (): HapticEnvironment =>
    useSyncExternalStore(subscribe, getHapticEnvironment, getServerSnapshot);
