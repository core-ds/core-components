import { useContext } from 'react';

import { PortalContext } from '@alfalab/core-components-shared';

import { getDefaultPortalContainer } from '../utils';

export const usePortalContainer = () => {
    const getContextPortalContainer = useContext(PortalContext);

    if (getContextPortalContainer()) {
        return getContextPortalContainer;
    }

    return getDefaultPortalContainer;
};
