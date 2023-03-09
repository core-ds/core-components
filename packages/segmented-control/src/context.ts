import { createContext } from 'react';

import { IDType } from './typing';

export type ContextType = {
    onChange: (id: IDType) => void;
};

export const SegmentedControlContext = createContext<ContextType>({
    onChange: () => null,
});
