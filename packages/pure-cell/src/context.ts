import { createContext } from 'react';

export type PureCellContextValue = {
    /** Направление */
    direction?: 'horizontal' | 'vertical';
    dataTestId?: string;
    setMainHover?: () => void;
    unsetMainHover?: () => void;
};

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const PureCellContext = createContext<PureCellContextValue>({});
