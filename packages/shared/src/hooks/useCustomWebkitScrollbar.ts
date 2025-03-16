import { useState } from 'react';

import { useLayoutEffect_SAFE_FOR_SSR } from '@alfalab/hooks';

import { browserGetScrollbarSize, browserIsWebkitBased } from '../browser';

export function useCustomWebkitScrollbar() {
    const [shouldUseCustomScrollbar, setShouldUseCustomScrollbar] = useState<boolean>(false);

    useLayoutEffect_SAFE_FOR_SSR(() => {
        if (browserGetScrollbarSize() > 0 && browserIsWebkitBased()) {
            setShouldUseCustomScrollbar(true);
        }
    }, []);

    return shouldUseCustomScrollbar;
}
