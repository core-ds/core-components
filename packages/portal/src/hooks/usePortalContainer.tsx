import { useContext } from 'react';
import { PortalContext } from '@balafla/core-components-shared';

import { getDefaultPortalContainer } from '../utils';

export const usePortalContainer = () => {
    const getContextPortalContainer = useContext(PortalContext);

    if (getContextPortalContainer()) {
        return getContextPortalContainer;
    }

    return getDefaultPortalContainer;
};
