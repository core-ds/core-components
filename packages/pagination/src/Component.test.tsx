import React from 'react';
import { render } from '@testing-library/react';
import { Pagination } from './Component';

describe('Pagination', () => {
    it('should support large numbers', () => {
        const { container } = render(<Pagination pagesCount={1100} currentPageIndex={1099} />);

        const selected = container.querySelector('.checked');

        expect(selected).toHaveTextContent('1 100');
    });
});
