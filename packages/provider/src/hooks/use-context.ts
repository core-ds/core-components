import { useContext } from 'react';

import { CoreComponentsContext } from '..';

/**
 * общий стор
 */
export const useCoreComponentsContext = () => useContext(CoreComponentsContext);
