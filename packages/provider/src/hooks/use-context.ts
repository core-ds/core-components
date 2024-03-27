import { useContext } from 'react';

import { CoreComponentsContext } from '..';

/**
 * Общее хранилеще настроек для всех вложенных компонентов
 */
export const useCoreComponentsContext = () => useContext(CoreComponentsContext);
