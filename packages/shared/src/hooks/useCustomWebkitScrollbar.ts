import { useState } from 'react';

import { useLayoutEffect_SAFE_FOR_SSR } from '@alfalab/hooks';

import { getScrollbarSize, isWebkitBased } from '../browser';

export function useCustomWebkitScrollbar() {
    const [shouldUseCustomScrollbar, setShouldUseCustomScrollbar] = useState<boolean>(false);

    useLayoutEffect_SAFE_FOR_SSR(() => {
        if (getScrollbarSize() > 0 && isWebkitBased()) {
            setShouldUseCustomScrollbar(true);
        }
    }, []);

    return shouldUseCustomScrollbar;
}
