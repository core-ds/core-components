import { useCoreConfig } from '@alfalab/core-config';

import { getDefaultPortalContainer } from '../utils';

export const usePortalContainer = () => {
    const { portalContainer } = useCoreConfig();

    if (portalContainer) {
        return () => portalContainer;
    }

    return getDefaultPortalContainer;
};
