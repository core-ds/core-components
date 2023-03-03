import React from 'react';

import type { TSystemMessageContext } from './types';

export const SystemMessageContext = React.createContext<TSystemMessageContext>({
    view: 'desktop',
});
