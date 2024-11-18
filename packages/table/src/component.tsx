import {
    Pagination,
    Table as TableComponent,
    TBody,
    TCell,
    TExpandableRow,
    THead,
    THeadCell,
    TRow,
    TSortableHeadCell,
} from './components';

/** @deprecated Используйте атомарные импорты */
export const Table = Object.assign(TableComponent, {
    TBody,
    THead,
    THeadCell,
    TSortableHeadCell,
    TCell,
    TRow,
    TExpandableRow,
    Pagination,
});

export {
    TableComponent,
    TBody,
    THead,
    THeadCell,
    TSortableHeadCell,
    TCell,
    TRow,
    TExpandableRow,
    Pagination,
};
