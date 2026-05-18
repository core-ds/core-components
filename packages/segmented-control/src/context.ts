import { createContext } from 'react';

import { type IDType } from './typing';

export type ContextType = {
    onChange: (id: IDType) => void;
    colors?: 'default' | 'inverted';
};

export const SegmentedControlContext = createContext<ContextType>({
    onChange: () => null,
    colors: 'default',
});
