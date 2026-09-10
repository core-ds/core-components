const PREFIX = '[haptics]';

export type HapticLogEvent = 'trigger' | 'vibrate' | 'ios:tick' | 'audio' | 'cancel';

/**
 * Диагностика для проверки на реальных устройствах.
 * Включается через `CoreConfig.haptics.debug` или параметр `debug` хука.
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
