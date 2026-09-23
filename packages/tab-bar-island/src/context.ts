import { createContext } from 'react';

import { DEFAULT_COLORS } from '@alfalab/core-components-tab-bar-island/default-props';
import { type TabBarIslandUnderlayContextValue } from '@alfalab/core-components-tab-bar-island/types';

export const TabBarIslandContext = createContext<TabBarIslandUnderlayContextValue>({
    colors: DEFAULT_COLORS,
});
