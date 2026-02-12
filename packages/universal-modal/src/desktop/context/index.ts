import { createContext } from 'react';

import { type UniversalModalContextType } from '../types/context';

export const UniversalModalContext = createContext<UniversalModalContextType>({
    width: 500,
});
