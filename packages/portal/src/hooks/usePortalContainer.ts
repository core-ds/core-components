import { useCoreConfig } from '@alfalab/core-components-config';

import { getDefaultPortalContainer } from '../utils';

export const usePortalContainer = () => {
    const { getPortalContainer } = useCoreConfig();

    return getPortalContainer ?? getDefaultPortalContainer;
};
