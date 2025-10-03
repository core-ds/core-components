import { useState } from 'react';

import { useLayoutEffect_SAFE_FOR_SSR } from '@alfalab/hooks';

import { getMatchMedia, releaseMatchMedia } from './utils';

/**
 * Хук для медиа запросов.
 * @param query media выражение или кастомный запрос из `mq.json`, например `--mobile`.
 * @param defaultValue Значение по-умолчанию.
 */
export const useMatchMedia = (query: string, defaultValue: boolean | (() => boolean) = false) => {
    const [matches, setMatches] = useState(defaultValue);

    useLayoutEffect_SAFE_FOR_SSR(() => {
        const mql = getMatchMedia(query);

        const handleMatchChange = () => setMatches(mql.matches);

        handleMatchChange();

        if (mql.addListener) {
            mql.addListener(handleMatchChange);
        } else {
            mql.addEventListener('change', handleMatchChange);
        }

        return () => {
            if (mql.removeListener) {
                mql.removeListener(handleMatchChange);
            } else {
                mql.removeEventListener('change', handleMatchChange);
            }

            releaseMatchMedia(query);
        };
    }, [query]);

    return [matches];
};
