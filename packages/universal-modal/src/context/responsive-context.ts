import { createContext } from 'react';

import type { TResponsiveModalContext } from '../typings';

export const ResponsiveContext = createContext<TResponsiveModalContext>({
    modalWidth: 500,
    hasFooter: false,
    hasHeader: false,
});
