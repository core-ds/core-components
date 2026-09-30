import { createContext } from 'react';

import { type IDType } from './typing';

export type ContextType = {
    onChange: (id: IDType) => void;
    colors?: 'default' | 'inverted';
    size?: 32 | 40 | 48;
};

export const SegmentedControlContext = createContext<ContextType>({
    onChange: () => null,
    colors: 'default',
});
