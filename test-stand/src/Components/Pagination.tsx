import React from 'react';
import { Pagination } from '@alfalab/core-components-pagination';
import { Wrapper } from './Wrapper';

const PaginationExample = () => {
    const DATA_SIZE = 20;
    const PER_PAGE = 1;

    const [page, setPage] = React.useState(0);

    const handlePageChange = (pageIndex: number) => setPage(pageIndex);

    const pagesCount = Math.ceil(DATA_SIZE / PER_PAGE);

    return (
        <Wrapper>
            <Pagination
                currentPageIndex={page}
                pagesCount={pagesCount}
                onPageChange={handlePageChange}
            />
        </Wrapper>
    );
};

export default PaginationExample;
