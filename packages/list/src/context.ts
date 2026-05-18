import { createContext, type ReactNode } from 'react';

import { type ColorMarkerType } from './types';

export type TListContext = {
    /**
     * Упорядоченный список
     */
    orderedList?: boolean;

    /**
     * Маркер
     * @default '–' for ul and 'decimal' for ol
     */
    markerType?: 'lower-alpha' | 'decimal' | string | ReactNode;

    /**
     * Цвет маркера
     */
    colorMarker?: ColorMarkerType;

    /**
     * Список обратного счета
     */
    reversed?: boolean;

    /**
     * Номер пункта
     */
    index?: number;

    /**
     * Начало отсчета элементов списка
     */
    start?: number;
};

export const ListContext = createContext<TListContext>({});
