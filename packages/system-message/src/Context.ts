import { createContext } from 'react';

import type { TSystemMessageContext } from './types';

export const SystemMessageContext = createContext<TSystemMessageContext>({
    view: 'desktop',
});
