import { useState } from 'react';

import { useLayoutEffect_SAFE_FOR_SSR } from '@alfalab/hooks';

import { browser } from '../browser';

export function useCustomWebkitScrollbar() {
    const [shouldUseCustomScrollbar, setShouldUseCustomScrollbar] = useState<boolean>(false);

    useLayoutEffect_SAFE_FOR_SSR(() => {
        if (browser.getScrollbarSize() > 0 && browser.isWebkitBased()) {
            setShouldUseCustomScrollbar(true);
        }
    }, []);

    return shouldUseCustomScrollbar;
}
