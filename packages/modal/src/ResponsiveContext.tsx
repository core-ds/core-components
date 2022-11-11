import React from 'react';

import type { TResponsiveModalContext } from './typings';

export const ResponsiveContext = React.createContext<TResponsiveModalContext>({
    view: 'desktop',
    size: 's',
});
