const PREFIX = '[haptics]';

// todo: refactor log events before deploy prod...
export type HapticLogEvent =
    | 'trigger'
    | 'vibrate'
    | 'ios:tick'
    | 'cancel'
    | 'overlay:mount'
    | 'overlay:tap';

/**
 * Диагностика для проверки на реальных устройствах.
 * Включается через `CoreConfig.haptics.debug`.
 */
export const hapticLog = (
    debug: boolean,
    event: HapticLogEvent,
    payload?: Record<string, unknown>,
): void => {
    if (!debug) return;

    // eslint-disable-next-line no-console
    console.info(`${PREFIX} ${event}`, payload ?? {});
};
