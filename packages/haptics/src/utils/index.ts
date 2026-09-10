export { cancelHapticAudio, playHapticPattern } from './audio';
export { TICK_ID } from './constants';
export { getHapticEnvironment, useHapticEnvironment } from './environment';
export { triggerHaptic, cancelHaptic } from './haptic';
export { ensureDOM, triggerIosSwitchTick } from './helpers';
export * from './logger';
export {
    clamp,
    clampVibrations,
    normalizeInput,
    hapticPreset,
    toVibratePattern,
} from './vibration';
