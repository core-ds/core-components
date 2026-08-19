import React, { type FC, type ReactNode, useContext } from 'react';

import { GalleryContext } from '../../context';
import { PaginationError } from '../pagination-error/Component';

type PaginationBoundaryProps = {
    children?: ReactNode;
};

export const PaginationBoundary: FC<PaginationBoundaryProps> = ({ children }) => {
    const { paginationError } = useContext(GalleryContext);

    return paginationError ? <PaginationError /> : children;
};
