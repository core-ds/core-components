import { createContext } from 'react';

import { type SegmentedControlProps } from './typing';

export type ContextType = Pick<
    SegmentedControlProps,
    'onChange' | 'segmentWidth' | 'size' | 'colors'
> &
    Partial<Pick<SegmentedControlProps, 'selectedId'>>;

export const SegmentedControlContext = createContext<ContextType>({
    onChange: () => null,
    colors: 'default',
});
