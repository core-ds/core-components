import { createContext } from 'react';

type PortalContextType = () => Element | null;

export const PortalContext = createContext<PortalContextType>(() => null);
