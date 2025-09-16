import { createContext, type RefObject } from 'react';

import { type TextAlignProperty } from '../../typings';

export type ColumnConfiguration = {
    width?: string | number;
    textAlign?: TextAlignProperty;
    hidden?: boolean;
    index: number;
};

export type TableContextType = {
    columnsConfiguration: ColumnConfiguration[];
    stickyHeader: boolean;
    compactView: boolean;
    compactHorizontal: boolean;
    wrapperRef: RefObject<HTMLDivElement>;
};

export const DEFAULT_TABLE_CONTEXT: TableContextType = {
    columnsConfiguration: [],
    compactView: false,
    stickyHeader: false,
    compactHorizontal: false,
    wrapperRef: { current: null },
};

export const TableContext = createContext<TableContextType>(DEFAULT_TABLE_CONTEXT);
