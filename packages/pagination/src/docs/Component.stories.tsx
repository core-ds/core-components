import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { number, select, boolean } from '@storybook/addon-knobs';
import { Pagination } from '@alfalab/core-components-pagination';

const meta: Meta<typeof Pagination> = {
    title: 'Components/Pagination',
    component: Pagination,
    id: 'Pagination',
};

type Story = StoryObj<typeof Pagination>;

export const pagination: Story = {
    name: 'Pagination',
    render: () => {
        const [page, setPage] = React.useState(0);
        const handlePageChange = (pageIndex) => setPage(pageIndex);
        return (
            <Pagination
                view={select('view', ['default', 'per-page'], 'default')}
                pagesCount={number('pagesCount', 10)}
                hideArrows={boolean('hideArrows', true)}
                activePadding={number('activePadding', 2)}
                sidePadding={number('sidePadding', 1)}
                currentPageIndex={page}
                onPageChange={handlePageChange}
            />
        );
    },
};

export default meta;
