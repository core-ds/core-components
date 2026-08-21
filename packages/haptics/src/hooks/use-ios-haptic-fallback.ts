import { useEffect, useState } from 'react';

import { ensureDOM, isIosFallback } from '../utils';

/** Возвращает `true`, когда для haptic feedback нужен iOS switch-overlay. */
export const useIosHapticFallback = (enabled: boolean): boolean => {
    const [fallback, setFallback] = useState(false);

    useEffect(() => {
        setFallback(enabled && isIosFallback && ensureDOM() !== null);
    }, [enabled]);

    return fallback;
};
