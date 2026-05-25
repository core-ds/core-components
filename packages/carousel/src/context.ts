import { createContext, useContext } from 'react';

import { type CarouselContextValue } from './types';

export const CarouselContext = createContext<CarouselContextValue | null>(null);
export const useCarouselContext = () => useContext(CarouselContext)!;
