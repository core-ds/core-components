import { createContext } from 'react';

import type { UniversalModalContextType } from '../typings';

export const UniversalModalContext = createContext<UniversalModalContextType>({
    modalWidth: 500,
    hasFooter: false,
    hasHeader: false,
});
